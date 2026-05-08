import { listCampaignsWithStats } from "@/lib/db";
import CampaignTable from "@/components/CampaignTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const campaigns = listCampaignsWithStats();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const totalClicks = campaigns.reduce((sum, c) => sum + c.clickCount, 0);
  const active = campaigns.filter((c) => c.status === "active").length;
  const last7Total = campaigns.reduce((sum, c) => sum + c.weeklyClicks.reduce((a, b) => a + b, 0), 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="gradient-mesh -mx-4 mb-10 rounded-3xl px-4 py-10 sm:-mx-6 sm:px-8 sm:py-12">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-dark">Campaign tracker</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-4xl">Your active campaigns</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-700">
          Build properly-tagged UTM URLs, attach a hypothesis, share a short <code className="font-mono text-xs">/go/&lt;slug&gt;</code> link,
          and watch click counts populate as the world clicks through.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-lg">
          <Stat label="Active" value={String(active)} />
          <Stat label="Total clicks" value={totalClicks.toLocaleString()} />
          <Stat label="Last 7 days" value={last7Total.toLocaleString()} />
        </div>
      </section>

      <CampaignTable campaigns={campaigns} baseUrl={baseUrl} />

      <p className="mt-6 text-xs text-ink-500">
        Click data is recorded server-side when a visitor hits <code className="font-mono">/go/&lt;slug&gt;</code> — they're then 302'd to
        the target URL with all UTM params appended.
      </p>

      <div className="mt-10 flex justify-end">
        <Link
          href="/campaigns/new"
          className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-700"
        >
          New campaign
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-ink-900">{value}</p>
    </div>
  );
}
