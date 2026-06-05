# Social Media Scheduling — Skills & MCPs Market Research

**Prepared for:** OpusClip (requested by Parker Miller)
**Author:** Derek Coleman
**Date:** 2026-06-05
**Method:** Deep-research workflow — parallel search agents (open-source, MCP servers, Skills, Post-bridge, Zernio, market leaders, + a second pass on directory presence, documentation depth, and star drivers), with adversarial verification of every numeric claim against the authenticated **GitHub API (2026-06-04/05)**.

---

## TL;DR

- **No well-adopted, dedicated "social-scheduling Skill" exists yet.** The SKILL.md format only matured in late 2025; the category is a green field. Skills that actually *post* are thin wrappers (single-digit to ~270★), and there is **no official Anthropic** social-posting skill.
- **MCP for posting is becoming table-stakes, not a moat.** [Buffer](https://developers.buffer.com) (official hosted MCP), [Postiz](https://github.com/gitroomhq/postiz-app) (built-in MCP, 31k★), [Post-bridge](https://post-bridge.com/mcp), and [Zernio](https://zernio.com) all ship one. Standalone community posting-MCPs are shallow (mostly 0–20★).
- **Open source = Postiz dominates** — 31,462★, ~10× #2 [Mixpost](https://github.com/inovector/mixpost) (3,307★) — but that lead is a *distribution* outcome (see §3.1), not a feature gap.
- **Closed-source AI-native challengers:** **Zernio** (~$1M ARR self-reported) and **Post-bridge** (**Stripe-verified ~$40k/30-days ≈ $450–500k ARR**, corroborating the *low end* of the prior $500k–$1M estimate). Both bootstrapped, API-first, leading on agent integrations.
- **Market scale for context:** Sprout Social ~$406M revenue (audited), Hootsuite >$350M, Buffer $31M, Later 7–8M users.

---

## 1. The "Skills" landscape (Claude / Agent Skills)

A real market of *social-scheduling* Skills does **not** yet exist. What's out there:

| Skill / Repo | What it does | Stars | License |
|---|---|---|---|
| [gitroomhq/postiz-agent](https://github.com/gitroomhq/postiz-agent) | Schedule across 27+ platforms via Claude/OpenClaw | **270** | open |
| [Xquik-dev/tweetclaw](https://github.com/Xquik-dev/tweetclaw) | X only — post, search, DMs, giveaways | **71** | MIT |
| [Upload-Post/…-larry-marketing-skill](https://github.com/Upload-Post/upload-post-larry-marketing-skill) | TikTok/IG slideshow marketing (Upload-Post API) | **24** | open |
| [Upload-Post/upload-post-skill](https://github.com/Upload-Post/upload-post-skill) | Post/schedule to 10+ platforms (reference skill) | **20** | MIT |
| [guyaga/claude-code-social-media-skill](https://github.com/guyaga/claude-code-social-media-skill) | ~11 platforms, Upload-Post wrapper | **1** | MIT |
| [Upload-Post/upload-post-skills](https://github.com/Upload-Post/upload-post-skills) | 5 bundled Agent Skills, MCP companion | **0** | open |

- **No official Anthropic social-scheduling skill.** [anthropics/skills](https://github.com/anthropics/skills) (146,520★) ships document/design/dev skills only — none post (`canvas-design` makes *graphics*, doesn't publish).
- **The big star counts here are lists/copywriting, not posters:** [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) (**63,247★**, a list); [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (**31,919★**, its `social` skill writes copy, doesn't post).
- The genuinely-posting subset is ~4–6 thin repos, most wrapping the **same Upload-Post API**. Highest (`postiz-agent`, 270) is a vendor's own skill.
- **No platform exposes per-skill install counts** (skills.sh etc.), so stars are the only adoption proxy today.

### 1.1 Where these Skills are listed (skills directories — distinct from the MCP registries above)

The Skills-directory ecosystem is young and **GitHub-centric**, splitting into (a) **auto-scrapers** that index every public `SKILL.md` (so "listed" ≈ "exists on GitHub") — [SkillsMP](https://skillsmp.com) (~1.5M scraped), [agent-skills.cc](https://agent-skills.cc) (63k+), [SkillHub](https://skillhub.club), [Claude Marketplaces](https://claudemarketplaces.com), [AgentSkill.sh](https://agentskill.sh); (b) **curated/editorial** lists — [ClaudeSkills.info](https://claudeskills.info) (~650), the security-vetted [Skills Directory](https://skillsdirectory.com), [Agensi](https://agensi.io), and the GitHub **awesome-lists** that are the real discovery layer. [skills.sh](https://skills.sh) is the common installer (`npx skills add owner/repo`); [Smithery](https://smithery.ai/skills) and [Glama](https://glama.ai) are MCP-first with only thin skills sections. There is **no authoritative skills registry and no install/usage counts** — these skills compete on GitHub discoverability + a few curated lists.

✓ = listed · ✗ = confirmed absent · ~✓ = auto-scraped (listed by existing on GitHub) · ? = unconfirmed (403). Obs. 2026-06-05.

| Skill (repo) | [GitHub](https://github.com) | [skills.sh](https://skills.sh) | [Composio](https://github.com/ComposioHQ/awesome-claude-skills) | [BehiSecc](https://github.com/BehiSecc/awesome-claude-skills) | [VoltAgent](https://github.com/VoltAgent/awesome-agent-skills) | [SkillsMP](https://skillsmp.com) | [mcpmarket](https://mcpmarket.com/tools/skills) |
|---|---|---|---|---|---|---|---|
| [postiz-agent](https://github.com/gitroomhq/postiz-agent) | ✓ | ✓ | ✗ | ✗ | ✓ | ~✓ | ? |
| [tweetclaw](https://github.com/Xquik-dev/tweetclaw) | ✓ | ✓ | ✗ | ✓ | ✓ | ~✓ | ✓* |
| [upload-post-skill](https://github.com/Upload-Post/upload-post-skill) | ✓ | ✓ | ✗ | ✓ | ? | ~✓ | ? |
| […larry-marketing-skill](https://github.com/Upload-Post/upload-post-larry-marketing-skill) | ✓ | ✓ | ✗ | ✗ | ? | ~✓ | ? |
| [guyaga/…social-media-skill](https://github.com/guyaga/claude-code-social-media-skill) | ✓ | ✓ | ✗ | ✗ | ? | ~✓ | ? |
| [zernio-api](https://github.com/zernio-dev/zernio-api) | ✓ | ✓ | ✗ | ✗ | ✓ | ~✓ | ? |
| [post-bridge-hq/agent-mode](https://github.com/post-bridge-hq/agent-mode) | ✓ | ✓ | ✗ | ✗ | ? | ~✓ | ? |

\* mcpmarket carries Xquik's sibling `x-twitter-scraper` skill. **Composio's list** (63k★) only has *generic* "Automation" category entries — none of these six named repos. **BehiSecc's list** explicitly names only **tweetclaw** and **upload-post**. Net: even the curated lists barely cover this category.

**Adjacent — ChatGPT:** real scheduling lives in the new Apps SDK/MCP channel (submissions opened 2025-12-17) via incumbents (SocialPilot AI Scheduler, Glowtify) — not GPT-Store "scheduler GPTs," which are content planners. **Implication:** social scheduling *as a Skill* is unclaimed — first-mover opportunity, but unproven demand this early.

---

## 2. The MCP-server landscape (social posting/scheduling)

### Tier 1 — Vendor / official MCP
| Vendor | MCP offering | Open/Closed | Companion repo ★ |
|---|---|---|---|
| **Buffer** | Official hosted MCP ([developers.buffer.com](https://developers.buffer.com)), beta ~Feb 2026 | Closed (hosted) | community wrappers only |
| **Postiz** | Built-in MCP endpoint (`/api/mcp/{key}`) + hosted `postiz.com/mcp` | Open (AGPL) | [postiz-app](https://github.com/gitroomhq/postiz-app): **31,462** |
| **Post-bridge** | One-click hosted MCP, "11 tools," 9 platforms | Closed (hosted) | [agent-mode](https://github.com/post-bridge-hq/agent-mode): **12** |
| **Zernio** | Hosted MCP (~300 tools, auto-gen from OpenAPI), 15 platforms | Closed (hosted) | [zernio-dev/*](https://github.com/zernio-dev) |
| **Ayrshare** | Official MCP is **docs-only** (not live posting) | API closed | community: 0–2 |

### Tier 2 — Community MCPs with traction (note read vs. post)
- [stickerdaniel/linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server) — **2,126★** — **read/scrape only**, not publishing (most-starred single-platform social MCP).
- [EnesCinr/twitter-mcp](https://github.com/EnesCinr/twitter-mcp) — **397★** — **posts** tweets + search (top Twitter posting MCP).
- `@xonack/apex-mcp` (X mgmt, Smithery) — **~297 Smithery installs** (only registry usage number verified).
- Tier 3: dozens of single-author vendor wrappers, almost all **0–3★**.

### 2.1 Where these MCPs are actually listed (directory & connector presence)
✓ = listing confirmed via search; ✗ = confirmed **not** a native marketplace connector; – = not found in any third-party directory; ? = unconfirmed (page 403). The last two columns count **native, browsable marketplace connectors only** — self-add custom MCP URLs = ✗. Obs. 2026-06-05.

| Tool | [mcp.so](https://mcp.so) | [Glama](https://glama.ai/mcp) | [Smithery](https://smithery.ai) | [PulseMCP](https://pulsemcp.com) | [Cursor](https://cursor.directory) | [Docker MCP](https://hub.docker.com/mcp) | [Claude conn.](https://claude.com/connectors) | [ChatGPT apps](https://chatgpt.com/apps) |
|---|---|---|---|---|---|---|---|---|
| Postiz | ✓ | ✓ | ? | ✓ | ✓ | ? | ✗ | ✗ |
| Zernio | ? | ✓ | ? | ? | ? | ? | ✗ | ✗ |
| Post-bridge | – | – | – | – | – | – | ✗ | ✗ |
| Buffer | ? | ? | ? | ✓ (community) | ? | ? | ✗ | ✗ |
| Ayrshare | ? | ✓ (unofficial) | ? | ? | ? | ? | ✗ | ✗ |
| twitter-mcp (EnesCinr) | ? | ✓ | ✓ | ✓ | ? | ✓ | ✗ | ✗ |
| linkedin-mcp (stickerdaniel) | ? | ✓ | ✓ | ? | ? | ✓ | ✗ | ✗ |
| Typefully (community) | ? | ? | ? | ? | ✓ | ? | ✗ | ✗ |
| Upload-Post | ? | ? | ? | ? | ? | ? | ✗ | ✗ |

**Key directory findings:**
- **Nothing was confirmed in the Official MCP Registry (registry.modelcontextprotocol.io) or GitHub's MCP catalog/Copilot list** — searches returned only the registry homepages, no social-tool hits.
- **0 of 9 are native connectors in either curated marketplace.** Anthropic's Connectors Directory (~418 vetted connectors as of 2026-05-28; only Slack is social-adjacent) and OpenAI's ChatGPT Apps Directory (launch partners Spotify/Canva/Figma/Booking/Zillow…) contain none of these schedulers. What vendors call "works with Claude/ChatGPT" is a *self-add custom MCP connector*, not a marketplace listing — Buffer's ChatGPT app is explicitly "on the roadmap." Both marketplaces are <6 months old.
- **Only the two utility/scraper servers (LinkedIn, Twitter) are in the Docker MCP Catalog** — the SaaS schedulers are not.
- **"Buffer official MCP" is a near-misnomer in directories:** Buffer's *own* hosted MCP lives at developers.buffer.com, but the directory-listed Buffer MCPs are community-built (e.g. `ahernan2` on PulseMCP/LobeHub).
- **Postiz is the only scheduler with broad third-party directory presence** (mcp.so, Glama, PulseMCP, Cursor) — again a distribution, not capability, signal.

---

## 3. Open-source scheduling tools (adoption by GitHub stars)

| Tool | Repo | Stars | Forks | License | MCP/Skill? |
|---|---|---|---|---|---|
| **Postiz** | [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) | **31,462** | 5,811 | AGPL-3.0 | ✅ Official MCP + skill ([postiz-agent](https://github.com/gitroomhq/postiz-agent), 270★) |
| **Mixpost** | [inovector/mixpost](https://github.com/inovector/mixpost) | **3,307** | 494 | MIT | Community MCP only |
| **Socioboard 5.0** | [socioboard/Socioboard-5.0](https://github.com/socioboard/Socioboard-5.0) | **1,457** | 407 | open | None |

- **Mixpost** (credible #2): MIT, self-host only, one-time licensing (free Lite / $299 Pro / $1,199 Enterprise), **200,424 verified Docker Hub pulls**, slower cadence, community-only MCP. **Socioboard** is legacy/fading (since 2014). Publer and Fedica are proprietary.

### 3.1 Why Postiz has 31k stars (the question behind the question)
The lead is **a distribution outcome, not a product-quality signal** — a feature-comparable competitor (Mixpost) sits ~10× lower. Strongest verified causes first:

1. **The founder is a professional open-source-growth marketer.** Nevo David (runs [Gitroom](https://github.com/nevo-david), formerly "GitHub20k") previously grew **Novu from 2k → 20k+ stars in ~1 year** using DEV/Reddit/HN to hit GitHub Trending. Postiz is the flagship demo of that playbook — its competitors are built by engineers, not distribution experts.
2. **Built-in-public launch that hit GitHub Trending** (open-sourced 2024-09-01, on Trending by 09-02), amplified by viral "I open-sourced a scheduler and it blew up" dev.to posts; a second Trending spike ~Dec 2024.
3. **Serial #1 Product Hunt launches** — launched 3×, each finishing #1 of day/week/month (v2 alone: 698 upvotes); every relaunch (MCP, auto-posters) drives a fresh star wave.
4. **Aggregator inclusion** — listed in [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) (Buffer/Hootsuite alternative) and submitted by the founder to [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — capturing both the self-hosting and the AI-agent discovery waves.
5. **Dual-hype positioning** — "the ultimate *agentic* social media scheduling tool," self-hosted Buffer alternative **+** MCP/agent angle, AGPL open-core (free self-host parity converts viewers into stargazers). Bootstrapped, **not** VC/YC-backed; public MRR milestones ($14k→$60k→$88k) double as marketing.

---

## 4. Closed-source AI-native challengers (the named competitors)

### Post-bridge ([post-bridge.com](https://post-bridge.com))
- **What:** low-cost, creator-focused cross-poster, ~9 platforms. Founder **Jack Friks** (build-in-public). Launched ~Oct 2024.
- **Adoption:** ~1,560 active users, ~1.1M posts (self-reported). **Revenue: Stripe-verified ~$39.7k/30-days** (TrustMRR, ts 2026-05-04) ⇒ **~$450–500k ARR** (high confidence). → refines prior $500k–$1M estimate toward the low end.
- **AI-agent posture (strong for its size):** official API, hosted MCP, official skill ([agent-mode](https://github.com/post-bridge-hq/agent-mode), 12★), Claude Code plugin, Cursor rules.
- **Docs: Extensive** — Scalar interactive API reference + help center. **Pricing:** Creator $29 / Pro $49; API a paid add-on (+$5/mo).

### Zernio ([zernio.com](https://zernio.com)) — *the "Zernio" in the brief; spelling confirmed (formerly "Late")*
- **What:** **API-first** social platform, founder **Miquel Palet**. One REST API for publish/schedule/inbox/analytics/ads across 14–15 platforms; targets developers, agencies, and AI agents. Closest competitor **Ayrshare** (Zernio ships a drop-in Ayrshare-SDK replacement).
- **Revenue: ~$1M ARR in <10 months** — self-reported (founder/ARR Club/Indie Hackers), bootstrapped. Medium confidence; no hard user count.
- **AI-agent posture (most aggressive in the set):** hosted MCP (~300 tools), Claude Code skill ([zernio-api](https://github.com/zernio-dev/zernio-api), 5★), Claude plugin, Cursor plugin, n8n node, **SDKs in 8 languages** (Node/Py/Go/Ruby/Java/PHP/.NET/Rust).
- **Docs: Extensive** — OpenAPI-driven docs site, broadest SDK breadth in the field. **GitHub** ([zernio-dev](https://github.com/zernio-dev), 22 repos): [zernflow](https://github.com/zernio-dev/zernflow) 46★, [latewiz](https://github.com/zernio-dev/latewiz) 39★, zernio-node 25★, zernio-cli 15★, crisp-mcp 12★. Real but early.
- **Pricing:** per-account tiers (~$6/$3/$1), first 2 free. Product Hunt Ads-API launch: ~175 upvotes, #6 of day (Apr 2026).

### Documentation depth across the field
| Tool | Depth | Signal |
|---|---|---|
| Post-bridge / Zernio | Extensive | Interactive ref (Scalar) / OpenAPI + 8 SDKs; both strongest on explicit agent/MCP setup docs |
| [Ayrshare](https://www.ayrshare.com/docs/introduction) | Extensive | Mature REST + Postman; Node/Python SDKs; 13 networks |
| Postiz | Extensive | Mintlify docs + NodeJS SDK; Public API flagged **Beta** |
| Buffer | Extensive | **GraphQL** API, **no SDK**; maintained changelog/migrations |
| Upload-Post | Extensive | Quickstart + Python/JS SDKs; 10–11 platforms |
| Mixpost / Typefully | Moderate | Self-host/REST docs, **no first-party SDK or MCP** (Typefully: 5 platforms, has playground) |

---

## 5. Market scale (context — mainstream leaders)

| Company | Scale | API | Native MCP/agent | Confidence |
|---|---|---|---|---|
| **Sprout Social** (public) | ~30k customers; **$405.9M rev FY24** (+22%) | ✅ | No (MCP via bridges) | High (SEC) |
| **Hootsuite** | "25M+" cumulative (marketing); **>$350M rev** | ✅ | No native | Low–Med |
| **Buffer** | ~70k paying / ~140k active; **$31.1M rev 24** | ✅ | ✅ Official MCP | Med |
| **Later** | ~7–8M users; acquired Mavely $250M | ✅ (ltd) | No native | Med |
| **SocialBee** | ~$5.5M rev 2025 | ✅ | No native | Med (Latka) |
| **Ayrshare** (API-first) | "thousands of businesses, millions of posts" | ✅ (core) | API-first | Low–Med |
| **Publer / Metricool / Typefully / Hypefury** | mostly proprietary; few hard numbers (Typefully "130k+ creators") | varies | No native | Low |

**Read:** only **Buffer** among GUI incumbents ships a native MCP; Sprout/Hootsuite/Later are reachable only via third-party bridges. That gap is the whitespace the API-first challengers (Zernio, Post-bridge, Ayrshare) target.

---

## 6. Adoption ranking (verified GitHub stars, 2026-06-04)

1. [postiz-app](https://github.com/gitroomhq/postiz-app) — **31,462** (OSS leader)
2. [mixpost](https://github.com/inovector/mixpost) — **3,307** (OSS #2; 200k+ Docker pulls)
3. [linkedin-mcp-server](https://github.com/stickerdaniel/linkedin-mcp-server) — **2,126** (read/scrape, not posting)
4. [Socioboard-5.0](https://github.com/socioboard/Socioboard-5.0) — **1,457** (legacy)
5. [twitter-mcp](https://github.com/EnesCinr/twitter-mcp) — **397** (top Twitter posting MCP)
6. [postiz-agent](https://github.com/gitroomhq/postiz-agent) — **270** (top posting *Skill*)
7. [tweetclaw](https://github.com/Xquik-dev/tweetclaw) — **71** (X-only skill)
8. [zernio-dev/zernflow](https://github.com/zernio-dev/zernflow) — **46** (Zernio's most-starred repo)
9. [upload-post-skill](https://github.com/Upload-Post/upload-post-skill) — **20**
10. [post-bridge-hq/agent-mode](https://github.com/post-bridge-hq/agent-mode) — **12**

*(Context-only, not posters: [anthropics/skills](https://github.com/anthropics/skills) 146,520★, [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) 63,247★, [marketingskills](https://github.com/coreyhaines31/marketingskills) 31,919★ — and **none of the six social-posting skills appear in any of these three**: anthropics/skills is a first-party sample repo, marketingskills is Corey Haines's own copy/SEO skill set, and Composio's list carries only generic "Automation" category entries.)*

---

## 7. What this means for OpusClip

1. **The Skill channel is wide open** — no dominant/official/branded social-scheduling Skill exists (best poster = 270★), and no skill registry yet exposes installs. First-mover/branded opportunity, but distributed-Skill demand is unproven.
2. **MCP is fast becoming table-stakes** — Buffer, Postiz, Post-bridge, Zernio all ship one. To be agent-native, OpusClip likely needs an MCP/Skill that pushes a finished clip to schedulers, or partners with the API-first players (Zernio/Ayrshare/Post-bridge) that already solve multi-platform posting.
3. **Distribution beats features in this category.** Postiz's 31k stars came from a deliberate growth playbook (founder reach + Trending + Product Hunt + awesome-lists), not superior product — a directly replicable lesson for however OpusClip launches its own skill/MCP.
4. **The direct AI-native competitors are Zernio (~$1M ARR) and Post-bridge (~$450–500k ARR)** — small, bootstrapped, winning on developer/agent ergonomics; GitHub traction still early (tens of stars), so the agent-distribution race is genuinely open.

---

## Confidence & data-quality notes

- **High (verified):** all GitHub star/fork counts (GitHub API); Mixpost Docker pulls (200,424); Sprout revenue (SEC); Post-bridge 30-day Stripe revenue (TrustMRR).
- **Medium / self-reported:** Zernio ARR, Post-bridge user/post counts & self-reported MRR, vendor pricing, Hootsuite "25M" (cumulative), Buffer revenue (transparency report), Postiz star-driver dates (star-history.com 403'd; trajectory inferred from documented Trending/PH spikes).
- **Not machine-retrievable (network-blocked → ?):** npm download counts; Smithery/Glama/PulseMCP install/usage counts; some vendor docs/pricing pages (403). Directory **presence** confirmed via search; directory **counts** need a browser/API pass.
- **Naming:** "Zernio" in the brief is correct (zernio.com; formerly "Late"), not "Zenno/Zeno."

### Key sources
GitHub API & Docker Hub API (counts) · trustmrr.com/startup/post-bridge · developers.buffer.com · docs.postiz.com · docs.zernio.com · api.post-bridge.com/reference · ayrshare.com/docs · dev.to/crowddotdev (Nevo David / 20k-stars playbook) · github.com/awesome-selfhosted · github.com/punkpeye/awesome-mcp-servers · mcp.so · glama.ai/mcp · pulsemcp.com · cursor.directory · investors.sproutsocial.com (Q4 2024) · techcrunch.com (ChatGPT app store, 2025-12-18)
