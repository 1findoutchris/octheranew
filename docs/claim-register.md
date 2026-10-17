# Octhera claim register

Baseline: `main` at `d3ddb861` (merge of PR #8), reviewed 17 October 2026. Keep this file up to date whenever public copy changes.

**Status values**
- **Source-backed:** traceable to a repository source such as the integration guide or pricing data. This is *not* independent proof that production works.
- **Owner-unverified:** published before this register existed, with no evidence in the repository. Needs owner confirmation; wording on this branch is softened or removed as noted.
- **Removed on branch:** taken out of public copy on `claude/zen-edison-bhobo6`.
- **Illustration:** concept graphic that is now visibly labelled.
- **Blocked:** must not be published until the owner supplies the facts.

## Company and legal

| Claim / field | Where | Status | Evidence / action |
|---|---|---|---|
| B2B supplier; no consumer gambling offered | About, footer | Owner-unverified (long-standing positioning) | Keep. Confirm with entity details. |
| Operators hold licences and own compliance | Product pages, About, footer | Owner-unverified (long-standing positioning) | Keep. The owner must confirm it is correct for Turnkey (see the responsibility matrix in owner decisions). |
| Legal or trading entity, registration, address | None | Blocked | Owner decision 1. No placeholders. |
| `/privacy`, `/terms` | 404 | Blocked | Owner decision 1 plus legal review. Prerequisite for enabling the inquiry form. |
| Client login | Not linked; `/login` returns 404 | Blocked | Owner decision 6. Don't create one. |

## Contact

| Claim | Where | Status | Evidence / action |
|---|---|---|---|
| `sales@octhera.org` | Contact, CTA, footer, schema | Source-backed (owner statement, 17 Oct) | MX points to Zoho per the audit. Delivery of a real message is **not verified**. |
| Telegram `t.me/Noah_Octhera` | Contact, docs | Source-backed (owner-configured) | Personal handle. Owner to confirm it is monitored. |
| "The fastest way to reach the Octhera team" | Contact | Removed on branch | No evidence. Now reads "Message our team on Telegram". |
| Response time | None | Blocked | Don't add one. |

## Catalog and providers

| Claim | Where | Status | Evidence / action |
|---|---|---|---|
| 200+ providers / 15,000+ games | Removed in PR #7 | Removed | `src/data/catalog.ts` stays `null` until confirmed. |
| "50 studios" | Providers page, homepage stat | Changed on branch | Now "50 directory entries" (47 distinct brand names; three entries are live-casino product lines of Evolution, Playtech and Pragmatic Play). Relationship and availability are owner-unverified. |
| "Studios we work with" | Aggregator FAQ and related links | Changed on branch | Now "studios listed in our directory". |
| Provider availability "Contact for Access" | All 50 entries | Source-backed (seed data) | Pages stay noindex. Unknown game counts are now hidden instead of shown as "—". |
| Studios added to the aggregation become available through the same integration | Aggregator, game-aggregation | Owner-unverified | Generic aggregation mechanism. Keep it phrased as how aggregation works, not a catalog promise. |

## API and integration (source: `src/components/docs/IntegrationGuide.tsx`)

| Claim | Status | Notes |
|---|---|---|
| `POST https://api.octhera.com/v1/games/launch`, Bearer API key | Source-backed (docs) | **Host not verified** by the owner (decision 6). Not changed to `.org`. |
| Launch fields `member_account`, `game_uid`, `balance`, `home_url` → `game_launch_url` | Source-backed (docs) | |
| Wallet callback with Bet/Win/Refund, `X-Signature` HMAC-SHA256 over the raw body | Source-backed (docs) | Sample code now validates input (branch). Production behaviour not tested. |
| Callback URL and IP whitelist set in a "settings tab" | Source-backed (docs) | The client portal URL is unknown. |
| Sandbox credentials issued by the team | Source-backed (docs CTA) | Process and environment URLs are unverified. |
| Error codes, retries, idempotency, rate limits | Blocked | Owner decision 6 or engineering. |

## Product capabilities

| Claim | Where | Status |
|---|---|---|
| Sportsbook pre-match and live, configurable odds and margins, risk and trading tooling | Sportsbook | Owner-unverified (long-standing product copy) |
| Sportsbook multi-currency and multi-language | Sportsbook | Owner-unverified. Which currencies and languages? |
| Sportsbook integration modes (iframe or API), trading responsibility | — | Blocked |
| Back office: player and KYC management, bonus configuration, reporting | Back office, Platform | Owner-unverified |
| Platform: CRM, analytics, API key and scope management, roles and permissions | Platform | Owner-unverified |
| Payments: multi-currency processing, configurable risk and limits | Payments | Owner-unverified. Payment providers are unnamed. |
| Affiliate: tracking, commission models | Affiliate | Owner-unverified. Whether it is a standalone product is unknown. |
| "Real-time reporting across all studios" | Aggregator features | Owner-unverified |
| "Real-Time Data", "Scalable Infrastructure", "Webhooks" (technology section) | Homepage | Removed on branch (homepage restructure); not covered by the docs. |

## Visuals and quasi-metrics

| Item | Status |
|---|---|
| Homepage "Live network", "Uptime: High", "Latency: Low", "Coverage: Global", floating provider tiles | Removed on branch. Replaced by a labelled architecture illustration with no metrics. |
| Platform dashboard with placeholder bars and a pulsing "Live" label | Changed to a visibly labelled illustration: "Illustration — not live product data"; "Live" marker removed. |
| Casino atmosphere (chips, roulette, glow) | Removed from the hero on branch. |
| Real product screenshots | Blocked (owner decision 4). |

## Commercial (source: `src/data/pricing.ts`, unchanged)

| Plan | List | Launch price | GGR | Status |
|---|---|---|---|---|
| Game Aggregation API | 1,500 | 999 | 18% | Numbers preserved. Cadence, minimums, taxes and offer deadline are blocked. |
| White Label | 4,000 | 2,499 | 14% | Same |
| Turnkey | 10,000 | 7,999 | Not published | **Never shown as 0%.** Blocked. |
| Enterprise | 35,000 | 29,999 | 12% | Same; "may incur further scoped costs" |
| Inclusions per plan (pricing features) | — | — | — | Source-backed by the pricing data only. White label vs turnkey inclusion of affiliates and sportsbook is **inconsistent across pages**; the About list is now split, and the full matrix is blocked. |
