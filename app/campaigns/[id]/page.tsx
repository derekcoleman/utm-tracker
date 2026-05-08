import { notFound } from "next/navigation";
import Link from "next/link";
import { getCampaignById, getClicksForCampaign, listCampaignsWithStats } from "@/lib/db";
import { buildUtmUrl, shortLink } from "@/lib/utm";
import CopyButton from "@/components/CopyButton";
import Sparkline from "@/components/Sparkline";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default function CampaignDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) return notFound();
  const campaign = getCampaignById(id);
  if (!campaign) return notFound();

  const stats = listCampaignsWithStats().find((c) => c.id === id);
  const clicks = getClicksForCampaign(id, 50);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const link = shortLink(campaign, baseUrl);
  const utmUrl = buildUtmUrl(campaign);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-4">
        <Link href="/" className="text-xs text-ink-500 hover:text-accent">
          ← Dashboard
        </Link>
      </div>
      <header className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-ink-900">{campaign.name}</h1>
            <p className="mt-1 font-mono text-xs text-ink-500">
              {campaign.utmSource} / {campaign.utmMedium} / {campaign.utmCampaign}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-ink-500">Total clicks</p>
            <p className="text-3xl font-bold text-ink-900">{stats?.clickCount ?? 0}</p>
          </div>
        </div>

        {stats ? (
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-ink-100/40 p-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-500">Last 7 days</p>
              <p className="text-lg font-semibold text-ink-900">{stats.weeklyClicks.reduce((a, b) => a + b, 0)}</p>
            </div>
            <div className="ml-auto">
              <Sparkline values={stats.weeklyClicks} width={140} height={36} />
            </div>
          </div>
        ) : null}
      </header>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <Card title="Short link">
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-md bg-ink-100/60 px-3 py-2 font-mono text-xs">{link}</code>
            <CopyButton value={link} />
          </div>
          <p className="mt-2 text-xs text-ink-500">Share this. It records a click and 302s to the target URL with all UTMs attached.</p>
        </Card>

        <Card title="Direct UTM URL">
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-md bg-ink-100/60 px-3 py-2 font-mono text-xs" title={utmUrl}>
              {utmUrl}
            </code>
            <CopyButton value={utmUrl} />
          </div>
          <p className="mt-2 text-xs text-ink-500">Use this if you already have your own analytics on the destination.</p>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <Card title="Hypothesis">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
            {campaign.hypothesis || <span className="italic text-ink-300">No hypothesis recorded.</span>}
          </p>
        </Card>
        <Card title="Expected outcome">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">
            {campaign.expectedOutcome || <span className="italic text-ink-300">No expected outcome recorded.</span>}
          </p>
        </Card>
      </section>

      <section className="mt-6">
        <Card title={`Recent clicks (${clicks.length})`}>
          {clicks.length === 0 ? (
            <p className="text-sm italic text-ink-500">No clicks yet — share the short link to start tracking.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-ink-100">
              <table className="min-w-full divide-y divide-ink-100 text-sm">
                <thead className="bg-ink-100/40">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Time</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">Referer</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">User agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {clicks.map((c) => (
                    <tr key={c.id}>
                      <td className="px-3 py-2 text-xs text-ink-500">{new Date(c.occurredAt + "Z").toLocaleString()}</td>
                      <td className="px-3 py-2 text-xs">{c.referer || <span className="text-ink-300">—</span>}</td>
                      <td className="px-3 py-2 text-xs text-ink-500" title={c.userAgent ?? ""}>
                        {(c.userAgent || "").slice(0, 60)}
                        {c.userAgent && c.userAgent.length > 60 ? "…" : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
