# Problems (web)

Open blockers and risks. Dated.

- 2026-10-10 — **No production backend.** Web needs the API on a subdomain of the web
  domain (`api.zorr.app`) because auth cookies are SameSite=strict.
- ~~2026-10-10 — Equipment filter is coarse~~ Fixed 2026-10-10 in the backend (shared
  equipment gate).
- ~~2026-10-10 — Fallback days can reach production plans~~ Fixed 2026-10-10 (rejected and
  retried instead).
- 2026-10-10 — Starting weights still ignore bodyweight (the API returns guidance instead).
  Planks and disclaimerAckAt fixed in the backend 2026-10-10.
- 2026-10-10 — Phase 4 must call the start-date endpoint with local midnight (see the
  monorepo `Problems.md`).
- Full backend list: `Zorr_Final/Problems.md`.
- ~~2026-10-10 — Hero says "iPhone app in review"~~ Fixed 2026-11-15: the new hero says "iPhone app soon".
- 2026-10-10 — Support email disagrees between site (zorrapp.in@gmail.com) and backend
  default (zorr.app@gmail.com).
- 2026-10-10 — `next` pins `postcss@8.4.31` internally (high advisory, build-time only,
  our own CSS). Clears when Next bumps it.
- 2026-10-10 — Legal drafts have open placeholders (lib/legal.ts) and need a lawyer.
  Gemini paid-tier status must be confirmed or the AI paragraph in /privacy is false.
- ~~/account 404~~ Built 2026-10-10.
- 2026-10-10 — Onboarding consent names "Google's Gemini" in-app (Apple 5.1.2(i) clarity);
  the copy rules ban vendor names in marketing copy. Founder to confirm.
- 2026-10-10 — Password-reset / email-verify pages are backend-served, old cream style.
- 2026-10-10 — Turnstile only tested with Cloudflare's always-pass test key.
- 2026-11-15 — The Plates restyle of /plan, /onboarding and /account was checked for build and
  layout only, not with a live backend and a real plan. Walk through signup to plan once before deploy.
- 2026-11-15 — The landing comparison table scrolls sideways inside its card on phones (4 columns
  do not fit 375px). Deliberate for now; revisit if it reads badly on a real phone.
- 2026-11-15 — /pricing shows the iPhone price as a highlighted `[PRICE]` placeholder: the model
  (1 month free with caps, then a subscription through Apple) is decided, the price and what it
  unlocks are not (`Zorr_Final/zorr-build-spec/08-open-items.md`).
- 2026-11-15 — The two blog posts in `lib/blog.ts` were drafted from product behaviour and need the
  founder's review. /about uses the founder line from the old site ("final-year CS student").
- 2026-11-15 — /contact inherits the support-email disagreement and the grievance-officer and
  response-time placeholders from `lib/legal.ts`.
