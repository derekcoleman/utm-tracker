# UTM Tracker

> Build properly-tagged UTM URLs, attach a hypothesis, share short `/go/<slug>` links, and watch click counts populate. SQLite-backed, zero external services.

A portfolio piece showing attribution thinking and shippable full-stack engineering.

## Why I built this

Every growth team I've worked on has the same problem: someone posts a campaign URL with `utm_source=Twitter` and someone else posts the same campaign with `utm_source=twitter`, and now you've got two rows in GA splitting the same campaign. UTM builders exist, but they don't track clicks, attach hypotheses, or live anywhere your team can actually see them.

This tool combines four jobs into one place:

1. **Build** UTM URLs without typos (dropdowns for `medium`, slug-cased `campaign` auto-generated from name).
2. **Attach intent** — every campaign has a hypothesis and an expected outcome, so you remember _why_ you ran it.
3. **Track** clicks via a `/go/<slug>` short link that records and 302s.
4. **Review** — the dashboard shows clicks per campaign with a 7-day sparkline.

## Features

- New-campaign form with live UTM URL preview
- 7-character short-link slugs (`/go/abc1234`) generated automatically
- 302 redirect with all UTM params appended to the destination
- Click logging: timestamp, referer, user agent
- Dashboard: total clicks, last-7-days, last click time, sparkline per campaign
- Campaign detail page: full click log + hypothesis/outcome side-by-side
- Copy-to-clipboard for short and direct UTM URLs
- SQLite (file-based) — clone and run, no migrations or external DB

## How it works

```
[ user types ] ──► UtmForm ──► POST /api/campaigns ──► SQLite (campaigns)
                                                          │
share short link  ─►  /go/<slug>  ─►  recordClick()  ─►  SQLite (clicks)
                                  └► 302 → target_url?utm_*
dashboard ◄── listCampaignsWithStats() ◄── SQLite
```

## Tech stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [`better-sqlite3`](https://www.npmjs.com/package/better-sqlite3) for storage (file at `data/utm-tracker.db`)
- [`nanoid`](https://www.npmjs.com/package/nanoid) for slug generation
- Pure-SVG sparklines (no chart library)

## Local setup

```bash
git clone https://github.com/derekcoleman/utm-tracker.git
cd utm-tracker
npm install
npm run seed       # optional: load 3 demo campaigns with click data
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The SQLite file lives at `./data/utm-tracker.db` and is gitignored.

## Configuration

| Env var                | Required | Default                     | Notes |
| ---------------------- | -------- | --------------------------- | ----- |
| `UTM_DB_PATH`          | no       | `./data/utm-tracker.db`     | Path to the SQLite file |
| `NEXT_PUBLIC_BASE_URL` | no       | `http://localhost:3000`     | Used when copying short links |

## Deployment notes

`better-sqlite3` needs persistent disk. That rules out Vercel for the DB layer. Three options:

- **Railway / Fly.io / Render:** Mount a volume, persist the file. Easiest for this repo.
- **Turso (libsql):** Swap `better-sqlite3` for `@libsql/client` to keep the same SQL with serverless edges.
- **Postgres:** Replace `lib/db.ts` with `pg` or `drizzle` — schema is small, ~30-line refactor.

For a portfolio demo, hosting on Railway with a 1GB volume is free and trivial.

## Roadmap

- Campaign archiving + status filtering on the dashboard
- CSV export of clicks per campaign
- Optional UTM template library (per-channel defaults)
- IP-hashed deduplication so a hot-reload spam doesn't inflate counts
- Auth (single shared password) for hosted deployments

## License

MIT.
