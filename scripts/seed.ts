import { createCampaign, getDb, recordClick } from "../lib/db";

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seed() {
  const db = getDb();
  const existing = db.prepare("SELECT COUNT(*) as count FROM campaigns").get() as { count: number };
  if (existing.count > 0) {
    console.log(`Database already has ${existing.count} campaigns; skipping seed.`);
    console.log("Delete data/utm-tracker.db to reseed.");
    return;
  }

  const campaigns = [
    {
      name: "Spring launch — newsletter wave 1",
      hypothesis:
        "Existing newsletter subscribers will convert at 2× the warm-list baseline because they already get value from us.",
      expectedOutcome: "≥ 8% CTR, ≥ 1.5% signup rate over 14 days.",
      owner: "@derek",
      targetUrl: "https://example.com/spring-launch",
      utmSource: "newsletter",
      utmMedium: "email",
      utmCampaign: "spring-launch-2026",
      utmContent: "hero-cta-a",
    },
    {
      name: "Reddit r/marketing — case study post",
      hypothesis:
        "Marketers will engage with a teardown-style post linking back to a gated case study; lower CTR than email but higher quality.",
      expectedOutcome: "≥ 200 clicks within 48h; ≥ 25 leads.",
      owner: "@derek",
      targetUrl: "https://example.com/case-studies/acme",
      utmSource: "reddit",
      utmMedium: "social",
      utmCampaign: "case-study-distribution",
      utmTerm: "marketers",
    },
    {
      name: "Podcast sponsorship — Indie Hackers",
      hypothesis: "Podcast listeners convert poorly on direct response, but mid-roll mentions seed brand awareness.",
      expectedOutcome: "≥ 80 short-link clicks; track assisted conversions.",
      owner: "@katharina",
      targetUrl: "https://example.com/pricing",
      utmSource: "indiehackers-podcast",
      utmMedium: "podcast",
      utmCampaign: "podcast-q2",
      utmContent: "midroll-30s",
    },
  ];

  for (const c of campaigns) {
    const created = createCampaign(c);
    const clicks = randomBetween(15, 80);
    for (let i = 0; i < clicks; i++) {
      recordClick({
        campaignId: created.id,
        referer: pickRefer(c.utmMedium),
        userAgent: pickUserAgent(),
      });
    }
    console.log(`Seeded ${c.name} with ${clicks} clicks`);
  }

  console.log("Done.");
}

function pickRefer(medium: string): string | null {
  if (medium === "email") return null;
  if (medium === "social") return "https://www.reddit.com/r/marketing/";
  if (medium === "podcast") return null;
  return null;
}

function pickUserAgent(): string {
  const agents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  ];
  return agents[Math.floor(Math.random() * agents.length)];
}

seed();
