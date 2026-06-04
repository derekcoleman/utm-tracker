# Social Media Scheduling — Skills & MCPs Market Research

**Prepared for:** OpusClip (requested by Parker Miller)
**Author:** Derek Coleman
**Date:** 2026-06-04
**Method:** Deep-research workflow — 5 parallel search agents (open-source, MCP servers, Skills, Post-bridge, Zernio + market leaders), followed by adversarial verification of every numeric claim against the authenticated GitHub API. All GitHub star/fork counts below were re-verified via the GitHub API on **2026-06-04**.

---

## TL;DR

- **There is no well-adopted, dedicated "social-scheduling Skill" yet.** The distributable Skill (SKILL.md) format only matured in late 2025, and the category is a green field. The few skills that actually *post* are thin wrappers (single-digit to ~270 stars), and there is **no official Anthropic** social-posting skill.
- **MCP for social posting is becoming table-stakes, not a moat.** Incumbents are shipping it: **Buffer** (official hosted MCP, Feb 2026 beta), **Postiz** (built-in MCP endpoint, open-source, 31k★), **post-bridge** (hosted MCP), **Zernio** (hosted MCP, 314 tools). Adoption of standalone community posting-MCPs is shallow — almost all sit at 0–20 stars; the best-verified registry signal was ~297 Smithery installs.
- **Open source is dominated by one project: Postiz** — 31,462★, ~10× the #2 (Mixpost, 3,307★), and it has the most aggressive AI-agent story (official MCP + official `postiz-agent` Claude/OpenClaw skill).
- **Closed-source AI-native challengers:** **Zernio** (zernio.com, formerly "Late," ~$1M ARR self-reported) and **Post-bridge** (post-bridge.com, **Stripe-verified ~$40k/30-days ≈ $450–500k ARR run-rate**). Both are bootstrapped, solo/small-team, API-first, and lead the field on agent integrations. Note this **corroborates the low end** of the prior Post-bridge estimate ($500k–$1M).
- **Market scale for context:** Sprout Social ~$406M revenue (audited), Hootsuite >$350M, Buffer $31M (2024), Later 7–8M users. The AI-agent wedge (Zernio/Post-bridge) is niche-but-fast-growing relative to these.

---

## 1. The "Skills" landscape (Claude / Agent Skills)

The distributable Skill (`SKILL.md`) format is new (late 2025). A real market of *social-scheduling* Skills does **not** yet exist. What's out there:

| Skill / Repo | What it does | Stars | Source / License |
|---|---|---|---|
| `gitroomhq/postiz-agent` | Official Postiz agent skill — schedule across 27+ platforms via Claude/OpenClaw | **270** | Postiz (open) |
| `Xquik-dev/tweetclaw` | X/Twitter only — post, search, DMs, giveaways (OpenClaw plugin) | **71** | MIT |
| `Upload-Post/upload-post-larry-marketing-skill` | TikTok/IG slideshow marketing skill (Upload-Post API) | **24** | open |
| `Upload-Post/upload-post-skill` | Post/schedule to 10+ platforms via Upload-Post API (the de-facto reference skill) | **20** | MIT |
| `guyaga/claude-code-social-media-skill` | ~11 platforms, Upload-Post API wrapper | **1** | MIT |
| `Upload-Post/upload-post-skills` | 5 bundled Anthropic Agent Skills, MCP companion | **0** | open |

**Important distinctions:**
- **No official Anthropic social-scheduling skill.** `anthropics/skills` (146,520★) ships document/design/dev skills only — none post or schedule. (`canvas-design` makes social *graphics* but doesn't publish.)
- The big star counts in this space belong to **lists and content-writing skills, not posting skills:**
  - `ComposioHQ/awesome-claude-skills` — **63,247★** (a curated list)
  - `coreyhaines31/marketingskills` — **31,919★** (CRO/copywriting/SEO; its `social` skill writes/plans copy, it does not post)
- The genuinely-posting subset is ~4–6 thin repos, most wrapping the **same Upload-Post API**. Highest is `postiz-agent` (270) — and that's a vendor's own skill, not a neutral community winner.
- **No platform currently exposes per-skill install counts** (skills.sh, etc.), so adoption can only be proxied by stars today.

**Adjacent — ChatGPT:** Real scheduling on ChatGPT lives in the new **Apps SDK / MCP** channel (app submissions opened 2025-12-17), via incumbents like **SocialPilot AI Scheduler** and **Glowtify** — not in GPT-Store "scheduler GPTs," which are content planners with no published usage numbers.

**Implication:** "Social scheduling as a Skill" is effectively unclaimed — a first-mover/branded opportunity, but also unproven demand this early.

---

## 2. The MCP-server landscape (social posting/scheduling)

Three tiers emerge.

### Tier 1 — Vendor / official MCP (the real distribution)
| Vendor | MCP offering | Open/Closed | Companion repo ★ |
|---|---|---|---|
| **Buffer** | Official hosted MCP (`mcp.buffer.com`), public beta ~Feb 2026; create posts, browse queue | Closed (hosted) | — |
| **Postiz** | Built-in MCP endpoint in the open-source app (`/api/mcp/{key}`) + hosted `postiz.com/mcp` | Open (AGPL/Apache) | app: **31,462** |
| **Post-bridge** | One-click hosted MCP (`post-bridge.com/mcp`), "11 tools," 9 platforms; on Starter $9/mo | Closed (hosted) | `agent-mode`: **12** |
| **Zernio** | Hosted MCP server (314 tools), 15+ platforms | Closed (hosted) | `zernio-claude-plugin`: 0 |
| **Ayrshare** | Official MCP is **docs-only** (not live posting); posting is via community wrappers | API closed | community: 0–2 |

### Tier 2 — Community MCPs with real traction (note: read vs. post)
- `stickerdaniel/linkedin-mcp-server` — **2,126★** — but **read/scrape only**, not publishing. (Most-starred single-platform social MCP.)
- `EnesCinr/twitter-mcp` — **397★** — **posts** tweets + search. The most-starred Twitter *posting* MCP.
- `@xonack/apex-mcp` (X management, hosted on Smithery) — **~297 Smithery installs** (the only registry usage number that could be verified).

### Tier 3 — The long tail
Dozens of single-author wrappers for each vendor (Buffer, Postiz, Typefully, Bluesky, post-bridge, Metricool, etc.) almost all at **0–3 stars**.

**Takeaways:** (1) Posting via MCP is becoming a checkbox feature for schedulers, not a differentiator. (2) Outside Postiz-the-app and the LinkedIn *scraper*, no social-*posting* MCP has breakout adoption — the space is fragmented and nascent. (3) `npm` download counts and most registry install counts could not be retrieved from this environment (network-blocked) — a follow-up pass from an unrestricted network is recommended to fill those in.

---

## 3. Open-source scheduling tools (adoption by GitHub stars)

| Tool | Repo | Stars | Forks | License | MCP/Skill? |
|---|---|---|---|---|---|
| **Postiz** | `gitroomhq/postiz-app` | **31,462** | 5,811 | AGPL-3.0 | ✅ Official MCP + official skill (`postiz-agent`, 270★) |
| **Mixpost** | `inovector/mixpost` | **3,307** | 494 | MIT | Community MCP only |
| **Socioboard 5.0** | `socioboard/Socioboard-5.0` | **1,457** | 407 | open | None |

- **Postiz** is the clear category leader on every metric (~10× Mixpost), actively developed (pushed 2026-06-04, 195 releases), 28–30+ platforms. README self-reports "~3M Docker downloads" (unverifiable — ghcr.io exposes no public counter). It is explicitly courting the Claude/agentic workflow — the most relevant OSS player for OpusClip's AI angle.
- **Mixpost** is the credible #2: MIT, self-host only, one-time licensing (free Lite / $299 Pro / $1,199 Enterprise). **200,424 verified Docker Hub pulls** (`inovector/mixpost`). Slower cadence (last push 2026-03-16); MCP is community-built only.
- **Socioboard** is legacy/fading (flagship since 2014; newest 6.0 repo has ~1 star). **Publer** and **Fedica** are proprietary, not OSS.

---

## 4. Closed-source AI-native challengers (the named competitors)

### Post-bridge (post-bridge.com)
- **What:** Low-cost, creator-focused cross-poster/scheduler, ~9 platforms. Founder **Jack Friks** (build-in-public indie hacker). Launched ~Oct 2024. Closed-source SaaS.
- **Adoption:** ~1,560 active users, ~1.1M posts published (both self-reported homepage stats).
- **Revenue:** **Stripe-verified ~$39.7k in trailing 30 days** via TrustMRR (data ts 2026-05-04) ⇒ **~$450–500k ARR run-rate** (high confidence; third-party, payment-verified). Self-reported MRR figures range $11k–$19k/mo across older build-in-public posts. → **Refines the prior $500k–$1M estimate down toward the low end (~$450–500k).**
- **AI-agent posture (strong for its size):** official API, official **hosted MCP** (`/mcp`), and an official agent skill **`post-bridge-hq/agent-mode` (12★)**.
- **Pricing:** Creator $29/mo, Pro $49/mo (legacy lower tiers existed); API is a paid add-on.

### Zernio (zernio.com) — *the "Zernio" in the brief; correct spelling confirmed*
- **What:** **API-first** social platform (formerly named **"Late"**), founder **Miquel Palet**. A single REST API to publish/schedule/inbox/analytics/ads across 14–15 platforms. Explicitly targets **developers, agencies, and AI agents**. Closest direct competitor: **Ayrshare** (Zernio even ships a drop-in Ayrshare-SDK replacement).
- **Revenue:** **~$1M ARR in <9–10 months** — self-reported by founder (LinkedIn / ARR Club / Indie Hackers), bootstrapped. Medium confidence (no audited figure). No hard public user/customer count.
- **AI-agent posture (the most aggressive in the whole set):** hosted **MCP server (314 tools)**, official **Claude Code skill** (`zernio-api`), **Claude Code plugin**, **Cursor plugin**, **n8n** community node, plus SDKs in 8+ languages.
- **GitHub (org `zernio-dev`, 22 repos, verified 2026-06-04):** `zernflow` 46★, `latewiz` 39★, `zernio-node` 25★, `zernio-cli` 15★, `crisp-mcp` 12★, `zernio-api` (Claude skill) 5★, `n8n-nodes-zernio` 5★. Real but early adoption.
- **Pricing:** per-connected-account tiers (~$6/$3/$1), first 2 accounts free. Product Hunt Ads-API launch: ~175 upvotes, #6 Product of the Day (Apr 2026).

---

## 5. Market scale (context — mainstream leaders)

| Company | Scale | API | Native MCP / agent | Confidence |
|---|---|---|---|---|
| **Sprout Social** (public) | ~30k customers; **$405.9M rev FY2024** (+22%) | ✅ | No (in-app AI; MCP via bridges) | High (SEC) |
| **Hootsuite** | "25M+" cumulative users (marketing); **>$350M rev 2024** | ✅ | No native | Low–Med |
| **Buffer** | ~70k paying customers / ~140k active; **$31.1M rev 2024** | ✅ | ✅ Official MCP | Med |
| **Later** | ~7–8M users; acquired Mavely $250M | ✅ (limited) | No native | Med |
| **SocialBee** | ~$5.5M rev 2025 | ✅ | No native | Med (Latka) |
| **Ayrshare** (API-first) | "thousands of businesses, millions of posts" | ✅ (core product) | API-first, agent-friendly | Low–Med |
| **Publer / Metricool / Typefully / Hypefury** | mostly proprietary; few hard numbers (Typefully "130k+ creators") | varies | No native | Low |

**Read:** Only **Buffer** among GUI incumbents ships a native MCP. Sprout/Hootsuite/Later are reachable only via third-party MCP bridges. That gap is exactly the whitespace the API-first challengers (Zernio, Post-bridge, Ayrshare) are targeting.

---

## 6. Adoption ranking (verified GitHub stars, 2026-06-04)

Across everything that actually relates to *posting/scheduling* via agents/code:

1. `gitroomhq/postiz-app` — **31,462** (full app; OSS leader)
2. `inovector/mixpost` — **3,307** (OSS #2; 200k+ Docker pulls)
3. `stickerdaniel/linkedin-mcp-server` — **2,126** (read/scrape, not posting)
4. `socioboard/Socioboard-5.0` — **1,457** (legacy)
5. `EnesCinr/twitter-mcp` — **397** (top Twitter posting MCP)
6. `gitroomhq/postiz-agent` — **270** (top posting *Skill*)
7. `Xquik-dev/tweetclaw` — **71** (X-only skill)
8. `zernio-dev/zernflow` — **46** (Zernio's most-starred repo)
9. `Upload-Post/upload-post-skill` — **20** (reference posting skill)
10. `post-bridge-hq/agent-mode` — **12** (Post-bridge official skill)

*(Context-only, not posting tools: `anthropics/skills` 146,520★, `awesome-claude-skills` 63,247★, `marketingskills` 31,919★.)*

---

## 7. What this means for OpusClip

1. **The Skill channel is wide open.** No dominant, official, or branded social-scheduling Skill exists. A polished, branded OpusClip "post my clips" Skill could plausibly become the category reference — but demand for *distributed Skills specifically* is unproven this early (best posting skill = 270★).
2. **MCP is quickly becoming table-stakes.** Buffer, Postiz, Post-bridge, and Zernio all already ship one. To be agent-native, OpusClip likely needs an MCP/Skill that lets an agent push a finished clip to the schedulers — or partner with the API-first players (Zernio/Ayrshare/Post-bridge) that already solve multi-platform posting.
3. **The most direct "AI-native scheduling" competitors are Zernio (~$1M ARR) and Post-bridge (~$450–500k ARR).** Both are small, bootstrapped, and winning on developer/agent ergonomics rather than scale. Their GitHub traction is real but early (tens of stars), meaning the agent-distribution race is genuinely up for grabs.

---

## Confidence & data-quality notes

- **High confidence (verified):** all GitHub star/fork counts (GitHub API, 2026-06-04); Mixpost Docker pulls (Docker Hub API, 200,424); Sprout Social revenue (SEC); Post-bridge 30-day Stripe revenue (TrustMRR, third-party payment-verified).
- **Medium / self-reported:** Zernio ARR (founder), Post-bridge user/post counts and self-reported MRR, vendor pricing, Hootsuite "25M users" (cumulative marketing claim), Buffer revenue (transparency report).
- **Not retrievable in this environment (network-blocked → "not found"):** npm weekly download counts; most Smithery/Glama/PulseMCP install counts; some official pricing pages (403). Recommend a follow-up pass from an unrestricted network to fill download/install figures.
- **Naming:** "Zernio" in the brief is correct (website zernio.com; formerly "Late"). It is not "Zenno/Zeno."

---

### Key sources
GitHub API (all star/fork counts, 2026-06-04) · Docker Hub API (Mixpost pulls) · trustmrr.com/startup/post-bridge · post-bridge.com/mcp · developers.buffer.com/guides/integrations/mcp.html · github.com/gitroomhq/postiz-app · github.com/zernio-dev · zernio.com · investors.sproutsocial.com (Q4 2024) · electroiq.com (Buffer/Hootsuite stats) · later.com/about · getlatka.com/companies/socialbee.com · ayrshare.com · techcrunch.com (ChatGPT app store, 2025-12-18) · github.com/anthropics/skills · github.com/Upload-Post/upload-post-skill
