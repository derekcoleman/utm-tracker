import { NextResponse } from "next/server";
import { createCampaign, listCampaignsWithStats } from "@/lib/db";
import type { CreateCampaignInput } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const campaigns = listCampaignsWithStats();
  return NextResponse.json({ campaigns });
}

export async function POST(req: Request) {
  let body: Partial<CreateCampaignInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required: (keyof CreateCampaignInput)[] = [
    "name",
    "targetUrl",
    "utmSource",
    "utmMedium",
    "utmCampaign",
  ];
  for (const key of required) {
    if (!body[key] || typeof body[key] !== "string") {
      return NextResponse.json({ error: `Missing or invalid: ${key}` }, { status: 400 });
    }
  }

  try {
    const campaign = createCampaign(body as CreateCampaignInput);
    return NextResponse.json({ campaign }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Failed to create campaign", detail: message }, { status: 500 });
  }
}
