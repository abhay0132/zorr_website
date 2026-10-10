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
- 2026-10-10 — Hero says "iPhone app in review" but the app is not submitted yet.
- 2026-10-10 — Support email disagrees between site (zorrapp.in@gmail.com) and backend
  default (zorr.app@gmail.com).
- 2026-10-10 — `next` pins `postcss@8.4.31` internally (high advisory, build-time only,
  our own CSS). Clears when Next bumps it.
- 2026-10-10 — Legal drafts have open placeholders (lib/legal.ts) and need a lawyer.
  Gemini paid-tier status must be confirmed or the AI paragraph in /privacy is false.
- ~~/account 404~~ Built 2026-10-10.
- 2026-10-10 — Onboarding consent names "Google's Gemini" in-app (Apple 5.1.2(i) clarity);
  the copy rules ban vendor names in marketing copy. Founder to confirm.
- 2026-10-10 — Hero still says "iPhone app in review" (not submitted yet).
- 2026-10-10 — Password-reset / email-verify pages are backend-served, old cream style.
- 2026-10-10 — Turnstile only tested with Cloudflare's always-pass test key.
