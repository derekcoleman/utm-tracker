import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { customAlphabet } from "nanoid";
import type { Campaign, CampaignStatus, CampaignWithStats, Click, CreateCampaignInput } from "./types";

const SLUG_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const slugId = customAlphabet(SLUG_ALPHABET, 7);

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (dbInstance) return dbInstance;

  const dbPath = process.env.UTM_DB_PATH || path.join(process.cwd(), "data", "utm-tracker.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      hypothesis TEXT,
      expected_outcome TEXT,
      owner TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      target_url TEXT NOT NULL,
      utm_source TEXT NOT NULL,
      utm_medium TEXT NOT NULL,
      utm_campaign TEXT NOT NULL,
      utm_term TEXT,
      utm_content TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
      occurred_at TEXT NOT NULL DEFAULT (datetime('now')),
      referer TEXT,
      user_agent TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_clicks_campaign ON clicks(campaign_id, occurred_at);
  `);

  dbInstance = db;
  return db;
}

type CampaignRow = {
  id: number;
  slug: string;
  name: string;
  hypothesis: string | null;
  expected_outcome: string | null;
  owner: string | null;
  status: string;
  target_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string | null;
  utm_content: string | null;
  created_at: string;
};

function rowToCampaign(row: CampaignRow): Campaign {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    hypothesis: row.hypothesis,
    expectedOutcome: row.expected_outcome,
    owner: row.owner,
    status: row.status as CampaignStatus,
    targetUrl: row.target_url,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    utmTerm: row.utm_term,
    utmContent: row.utm_content,
    createdAt: row.created_at,
  };
}

export function createCampaign(input: CreateCampaignInput): Campaign {
  const db = getDb();
  const slug = slugId();
  const stmt = db.prepare(`
    INSERT INTO campaigns
      (slug, name, hypothesis, expected_outcome, owner, target_url,
       utm_source, utm_medium, utm_campaign, utm_term, utm_content)
    VALUES (@slug, @name, @hypothesis, @expectedOutcome, @owner, @targetUrl,
            @utmSource, @utmMedium, @utmCampaign, @utmTerm, @utmContent)
  `);
  const result = stmt.run({
    slug,
    name: input.name,
    hypothesis: input.hypothesis ?? null,
    expectedOutcome: input.expectedOutcome ?? null,
    owner: input.owner ?? null,
    targetUrl: input.targetUrl,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmTerm: input.utmTerm ?? null,
    utmContent: input.utmContent ?? null,
  });
  return getCampaignById(Number(result.lastInsertRowid))!;
}

export function getCampaignById(id: number): Campaign | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM campaigns WHERE id = ?").get(id) as CampaignRow | undefined;
  return row ? rowToCampaign(row) : null;
}

export function getCampaignBySlug(slug: string): Campaign | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM campaigns WHERE slug = ?").get(slug) as CampaignRow | undefined;
  return row ? rowToCampaign(row) : null;
}

export function listCampaignsWithStats(): CampaignWithStats[] {
  const db = getDb();
  const campaigns = db.prepare("SELECT * FROM campaigns ORDER BY created_at DESC").all() as CampaignRow[];
  if (campaigns.length === 0) return [];

  const ids = campaigns.map((c) => c.id);
  const placeholders = ids.map(() => "?").join(",");

  const counts = db
    .prepare(
      `SELECT campaign_id, COUNT(*) as count, MAX(occurred_at) as last
       FROM clicks WHERE campaign_id IN (${placeholders}) GROUP BY campaign_id`,
    )
    .all(...ids) as { campaign_id: number; count: number; last: string }[];

  const countMap = new Map(counts.map((c) => [c.campaign_id, { count: c.count, last: c.last }]));

  // Weekly buckets: last 7 days, oldest first
  const weeklyRows = db
    .prepare(
      `SELECT campaign_id, date(occurred_at) as day, COUNT(*) as count
       FROM clicks WHERE campaign_id IN (${placeholders})
         AND occurred_at >= datetime('now', '-7 days')
       GROUP BY campaign_id, day`,
    )
    .all(...ids) as { campaign_id: number; day: string; count: number }[];

  const weeklyMap = new Map<number, Map<string, number>>();
  for (const r of weeklyRows) {
    if (!weeklyMap.has(r.campaign_id)) weeklyMap.set(r.campaign_id, new Map());
    weeklyMap.get(r.campaign_id)!.set(r.day, r.count);
  }

  const days = lastNDays(7);

  return campaigns.map((c) => {
    const stats = countMap.get(c.id);
    const dayMap = weeklyMap.get(c.id) ?? new Map();
    return {
      ...rowToCampaign(c),
      clickCount: stats?.count ?? 0,
      lastClickAt: stats?.last ?? null,
      weeklyClicks: days.map((d) => dayMap.get(d) ?? 0),
    };
  });
}

export function recordClick(args: {
  campaignId: number;
  referer?: string | null;
  userAgent?: string | null;
}): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO clicks (campaign_id, referer, user_agent) VALUES (?, ?, ?)`,
  ).run(args.campaignId, args.referer ?? null, args.userAgent ?? null);
}

export function getClicksForCampaign(campaignId: number, limit = 100): Click[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, campaign_id as campaignId, occurred_at as occurredAt, referer, user_agent as userAgent
       FROM clicks WHERE campaign_id = ? ORDER BY occurred_at DESC LIMIT ?`,
    )
    .all(campaignId, limit) as Click[];
  return rows;
}

function lastNDays(n: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
