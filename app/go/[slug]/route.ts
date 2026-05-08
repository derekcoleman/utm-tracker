import { NextResponse } from "next/server";
import { getCampaignBySlug, recordClick } from "@/lib/db";
import { buildUtmUrl } from "@/lib/utm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const campaign = getCampaignBySlug(params.slug);
  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  if (campaign.status === "archived") {
    return NextResponse.json({ error: "Campaign archived" }, { status: 410 });
  }

  const headers = new Headers(req.headers);
  recordClick({
    campaignId: campaign.id,
    referer: headers.get("referer"),
    userAgent: headers.get("user-agent"),
  });

  const destination = buildUtmUrl(campaign);
  return NextResponse.redirect(destination, 302);
}
