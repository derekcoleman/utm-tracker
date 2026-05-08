"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugify, buildUtmUrl } from "@/lib/utm";
import type { CreateCampaignInput } from "@/lib/types";

const MEDIUM_OPTIONS = [
  "email",
  "social",
  "cpc",
  "display",
  "referral",
  "affiliate",
  "organic",
  "newsletter",
  "podcast",
];

export default function UtmForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateCampaignInput>({
    name: "",
    hypothesis: "",
    expectedOutcome: "",
    owner: "",
    targetUrl: "",
    utmSource: "",
    utmMedium: "email",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
  });

  const update = <K extends keyof CreateCampaignInput>(k: K, v: CreateCampaignInput[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const onName = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      utmCampaign: prev.utmCampaign || slugify(name),
    }));
  };

  const previewUrl = (() => {
    if (!form.targetUrl || !form.utmSource || !form.utmCampaign) return null;
    try {
      return buildUtmUrl(form);
    } catch {
      return null;
    }
  })();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || data.error || "Failed to create campaign");
        setSubmitting(false);
        return;
      }
      router.push(`/campaigns/${data.campaign.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-ink-900">Campaign details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => onName(e.target.value)}
              placeholder="Spring product launch — newsletter wave 1"
              required
              className={inputCls}
            />
          </Field>
          <Field label="Owner">
            <input
              type="text"
              value={form.owner ?? ""}
              onChange={(e) => update("owner", e.target.value)}
              placeholder="@you"
              className={inputCls}
            />
          </Field>
          <Field label="Hypothesis" hint="What do you believe and why?">
            <textarea
              value={form.hypothesis ?? ""}
              onChange={(e) => update("hypothesis", e.target.value)}
              rows={3}
              placeholder="Existing newsletter readers will convert at 2× warm-list rate because…"
              className={inputCls}
            />
          </Field>
          <Field label="Expected outcome" hint="A target you'll measure against.">
            <textarea
              value={form.expectedOutcome ?? ""}
              onChange={(e) => update("expectedOutcome", e.target.value)}
              rows={3}
              placeholder="≥ 8% CTR, ≥ 1.5% signup rate over 2 weeks"
              className={inputCls}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-ink-900">UTM parameters</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Target URL" required>
            <input
              type="text"
              value={form.targetUrl}
              onChange={(e) => update("targetUrl", e.target.value)}
              placeholder="https://example.com/landing"
              required
              className={inputCls}
            />
          </Field>
          <Field label="utm_source" required hint="Where the traffic comes from.">
            <input
              type="text"
              value={form.utmSource}
              onChange={(e) => update("utmSource", e.target.value)}
              placeholder="newsletter"
              required
              className={inputCls}
            />
          </Field>
          <Field label="utm_medium" required>
            <select
              value={form.utmMedium}
              onChange={(e) => update("utmMedium", e.target.value)}
              className={inputCls}
            >
              {MEDIUM_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="utm_campaign" required>
            <input
              type="text"
              value={form.utmCampaign}
              onChange={(e) => update("utmCampaign", e.target.value)}
              placeholder="spring-launch-2026"
              required
              className={inputCls}
            />
          </Field>
          <Field label="utm_term" hint="Optional. Paid keyword or audience.">
            <input
              type="text"
              value={form.utmTerm ?? ""}
              onChange={(e) => update("utmTerm", e.target.value)}
              placeholder="warm-list"
              className={inputCls}
            />
          </Field>
          <Field label="utm_content" hint="Optional. Creative or variant ID.">
            <input
              type="text"
              value={form.utmContent ?? ""}
              onChange={(e) => update("utmContent", e.target.value)}
              placeholder="hero-cta-a"
              className={inputCls}
            />
          </Field>
        </div>

        {previewUrl ? (
          <div className="mt-4 rounded-lg bg-ink-100/60 p-3 text-xs">
            <p className="font-semibold uppercase tracking-wide text-ink-500">Preview URL</p>
            <p className="mt-1 break-all font-mono text-ink-700">{previewUrl}</p>
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">{error}</div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-ink-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Creating…" : "Create campaign"}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
        {label}
        {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
      </span>
      <div className="mt-1">{children}</div>
      {hint ? <p className="mt-1 text-xs text-ink-500">{hint}</p> : null}
    </label>
  );
}
