import Link from "next/link";
import type { CampaignWithStats } from "@/lib/types";
import { shortLink } from "@/lib/utm";
import CopyButton from "./CopyButton";
import Sparkline from "./Sparkline";

type Props = { campaigns: CampaignWithStats[]; baseUrl: string };

export default function CampaignTable({ campaigns, baseUrl }: Props) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-100 bg-white p-12 text-center">
        <p className="text-base font-semibold text-ink-900">No campaigns yet</p>
        <p className="mt-1 text-sm text-ink-500">Create your first one to start tracking clicks.</p>
        <Link
          href="/campaigns/new"
          className="mt-4 inline-block rounded-md bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-700"
        >
          New campaign
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-ink-100 text-sm">
        <thead className="bg-ink-100/40">
          <tr>
            <Th>Campaign</Th>
            <Th>Source / Medium</Th>
            <Th>Short link</Th>
            <Th align="right">Clicks</Th>
            <Th>7-day</Th>
            <Th>Last click</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {campaigns.map((c) => {
            const link = shortLink(c, baseUrl);
            return (
              <tr key={c.id} className="hover:bg-ink-100/30">
                <td className="px-4 py-3">
                  <Link href={`/campaigns/${c.id}`} className="font-medium text-ink-900 hover:text-accent">
                    {c.name}
                  </Link>
                  <p className="font-mono text-xs text-ink-500">{c.utmCampaign}</p>
                </td>
                <td className="px-4 py-3 text-ink-700">
                  <p className="font-mono text-xs">{c.utmSource}</p>
                  <p className="font-mono text-xs text-ink-500">{c.utmMedium}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="rounded-md bg-ink-100/60 px-2 py-0.5 text-xs text-ink-700">/go/{c.slug}</code>
                    <CopyButton value={link} label="Copy" />
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-ink-900">{c.clickCount}</td>
                <td className="px-4 py-3">
                  <Sparkline values={c.weeklyClicks} />
                </td>
                <td className="px-4 py-3 text-xs text-ink-500">
                  {c.lastClickAt ? new Date(c.lastClickAt + "Z").toLocaleString() : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500 ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
