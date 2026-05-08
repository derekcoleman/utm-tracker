export type CampaignStatus = "active" | "paused" | "archived";

export type Campaign = {
  id: number;
  slug: string;
  name: string;
  hypothesis: string | null;
  expectedOutcome: string | null;
  owner: string | null;
  status: CampaignStatus;
  targetUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string | null;
  utmContent: string | null;
  createdAt: string;
};

export type CampaignWithStats = Campaign & {
  clickCount: number;
  lastClickAt: string | null;
  weeklyClicks: number[];
};

export type Click = {
  id: number;
  campaignId: number;
  occurredAt: string;
  referer: string | null;
  userAgent: string | null;
};

export type CreateCampaignInput = {
  name: string;
  hypothesis?: string;
  expectedOutcome?: string;
  owner?: string;
  targetUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  utmContent?: string;
};
