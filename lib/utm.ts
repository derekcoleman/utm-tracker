import type { Campaign } from "./types";

export function buildUtmUrl(campaign: {
  targetUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string | null;
  utmContent?: string | null;
}): string {
  const url = new URL(normalizeUrl(campaign.targetUrl));
  url.searchParams.set("utm_source", campaign.utmSource);
  url.searchParams.set("utm_medium", campaign.utmMedium);
  url.searchParams.set("utm_campaign", campaign.utmCampaign);
  if (campaign.utmTerm) url.searchParams.set("utm_term", campaign.utmTerm);
  if (campaign.utmContent) url.searchParams.set("utm_content", campaign.utmContent);
  return url.toString();
}

export function shortLink(campaign: Pick<Campaign, "slug">, baseUrl?: string): string {
  const base =
    baseUrl ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  return `${base.replace(/\/$/, "")}/go/${campaign.slug}`;
}

function normalizeUrl(input: string): string {
  let v = input.trim();
  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
  return v;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}
