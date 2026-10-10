# Problems (web)

Open blockers and risks. Dated.

- 2026-10-10 — **No production backend.** Web needs the API on a subdomain of the web
  domain (`api.zorr.app`) because auth cookies are SameSite=strict.
- 2026-10-10 — **Equipment filter is coarse** (`home_gym` = "not barbell"), so a
  dumbbells-only user can get cable/machine work. Contradicts landing copy until Phase 3.
- 2026-10-10 — **Fallback days can reach production plans** (`ai.service.ts:519`): an
  empty or missing day becomes a 0-exercise template day.
- 2026-10-10 — Starting weights ignore bodyweight; planks show reps (holdSeconds unread);
  disclaimerAckAt never written.
- 2026-10-10 — Hero says "iPhone app in review" but the app is not submitted yet.
- 2026-10-10 — Support email disagrees between site (zorrapp.in@gmail.com) and backend
  default (zorr.app@gmail.com).
- 2026-10-10 — `next` pins `postcss@8.4.31` internally (high advisory, build-time only,
  our own CSS). Clears when Next bumps it.
- 2026-10-10 — Legal drafts have open placeholders (lib/legal.ts) and need a lawyer.
  Gemini paid-tier status must be confirmed or the AI paragraph in /privacy is false.
- 2026-10-10 — /privacy and /support link to /account, which 404s until Phase 4.
