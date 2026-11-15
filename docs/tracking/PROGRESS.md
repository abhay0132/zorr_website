# Zorr Website — Progress Log

Append-only, dated entries. Newest at the bottom.

---

## 2026-07-18 — Initial build

Built the Zorr marketing site from scratch in this standalone repo (separate
from the main Zorr app).

**Design**
- Wrote and critiqued a design plan against the generic "AI fitness app landing
  page" default before building. Signature element: a static training-log plan
  sheet in the hero with coach's-margin annotations that show the life-context
  mechanic (barbell → dumbbell swap on "no barbell", trimmed volume on "short
  sleep", etc.) rather than describing it.
- Container language: hairline ink rules + whitespace, no soft-shadow cards.
- One full-bleed dark ink section ("Why private") so ink carries structural
  weight, not just body text.
- Tokens frozen per brief: cream #F3EEE5, tangerine #F0531C, ink #1C1A15,
  Bricolage Grotesque (display) + DM Sans (body), wired via next/font.

**Pages**
- `/` homepage: Nav, Hero (+ signature PlanDemo), Problem, HowItWorks,
  WhyPrivate, DownloadSection, Faq, Footer.
- `/privacy`, `/terms` — honest boilerplate with a visible "Draft — needs legal
  review" banner. NOT lawyer-reviewed.
- `/support` — mailto zorrapp.in@gmail.com.

**Launch mechanics**
- `config/launch.ts` — single LAUNCH_DATE + APP_STORE_URL switch. Empty URL =
  countdown + email capture; set URL = App Store button, countdown/email hidden.
- `/api/waitlist` — Supabase insert with dedupe (23505 → "already subscribed"),
  Upstash rate limiting (5/min/IP), graceful degradation when env vars absent.
- `supabase/waitlist.sql` — table + unique index + RLS.

**Copy discipline**
- No banned words. No social-feature implications. Adjustment described as
  user-initiated ("tell it what's changed"), NOT a daily/real-time loop that
  isn't built yet. Free at launch; no Pro pricing claimed. iOS only; Android not
  promised.

**Open items / to confirm**
- X/Twitter handle assumed `x.com/zorr_app` (Instagram @zorr.app confirmed).
  Update in `components/Footer.tsx` if wrong.
- Privacy/Terms need real legal review before launch.
- Real app icon to replace `public/icon.svg`.
- Supabase + Upstash env vars to be set in Vercel.

---

## 2026-07-18 — Copy audit: de-vendor + de-gatekeep

Revised public copy per updated brief:
- **No vendor/model names in public copy.** Removed "Gemini" from hero subhead
  and How-it-works step 2. Genericized Privacy provider list (AI, database,
  payments, media, email, infrastructure) and Terms to describe function, not
  vendor. Added a note in the Privacy draft banner flagging that a lawyer should
  confirm whether the law requires naming vendors explicitly.
- **Audience no longer gated to college.** FAQ "Who is this for?" → "Anyone
  training on their own... Built first with Indian gym-goers in mind." Metadata
  description + keywords de-collegized. Email placeholder you@college.edu →
  you@email.com. Founder origin story left intact (it's a why-this-exists beat,
  not an audience filter).
- Re-swept all copy: no banned words, no hedging. Vendor names remain only in
  code comments and lib/ (Supabase/Upstash), which is not public copy.
- Verified in served HTML via a clean production build (all 8 pages 200 OK).

Note: running `npm run build` while a `npm run dev` server is live corrupts the
shared `.next` cache (MODULE_NOT_FOUND). If that happens, stop the dev server,
`rm -rf .next`, and restart. Avoid running build + dev against the repo at once.

---

## 2026-10-10 — Phase 0 recon + Phase 1: new dark landing page

**Phase 0** (read-only against `Zorr_Final`): see `docs/phases/phase0-recon.md`. Backend
baseline 373/373 tests passing. Recommendation: Next.js for all web pages, API on
`api.zorr.app` with the existing httpOnly cookies. Expo web was tried in a scratch copy:
it bundles, but auth breaks (`expo-secure-store` has no web build).

**Old design retired.** On the user's instruction the cream/Bricolage site, `v2/`, and
the Supabase/Upstash waitlist were moved to `../Zorr_Website_old_design/` (plus a tarball
`../Zorr_Website_old_design_backup_2026-10-10.tar.gz`). Nothing was deleted.

**Phase 1 built** from `docs/design/zorr-landing-reference.html`:
- Tokens in `tailwind.config.ts`; Archivo (variable, wdth axis, `font-stretch: 72%`),
  Geist and Geist Mono via `next/font/google`.
- Components: Nav, Hero, SpecStrip, TemplateVsPlan, Ticker, FeatureBento (+ EquipmentDemo,
  VideoSlot), HowItWorks, AppTeaser, Personas, Faq, FinalCta, Footer.
- Equipment chips demo (aria-pressed, live note) and FAQ accordion (one open,
  aria-expanded/aria-controls). Ticker stops under prefers-reduced-motion.
- SEO: metadata, OG/Twitter image, `icon.svg`, `robots.txt`, `sitemap.xml`, styled 404.
- `/signup` placeholder (noindex) so CTAs never 404 before Phase 4.
- Upgraded next 15.1.6 → 15.5.27 and react 19.0.0 → 19.3.0 (critical advisory).
- Verified on a production build at 375 / 768 / 1280 / 1440: no horizontal scroll,
  floating chips inside the viewport, zero console errors.

**Copy changes vs the reference** (rule-driven): "Full exercise library unlocked" →
"the whole exercise library is in play" (banned word); "with videos on the most common
ones" → "Videos are coming to the most common ones" (0 of 250 exercises have a video).

Not run: Lighthouse.

---

## 2026-10-10 — Phase 2: Terms, Privacy, Support (drafts)

- Shared `components/legal/LegalPage.tsx`: label, title, "Last updated", draft banner, an
  HTML `<!-- DRAFT: needs review by a lawyer -->` comment in the served page, and a table
  of contents (sticky beside the text on desktop, a list above it on mobile).
- `/terms`: 13 sections per the brief, health disclaimer as a callout above the TOC and as
  its own section; 18+ only; plans generated by software; liability capped to fees paid.
- `/privacy`: DPDP Act 2023 framing (Data Fiduciary, Grievance Officer, rights incl.
  nomination, Data Protection Board), processors named with role/data/location, a
  dedicated "What we send to the AI" section built from the actual prompt fields in
  `ai.service.ts` (first name IS sent; email, password, sex, height are not).
- `/support`: contact + response time, FAQ (shared `lib/faq.ts`), reset password (rules
  match `passwordSchema`, link valid 1 hour), delete account (web + iPhone), health line.
- All placeholders centralised in `lib/legal.ts` and rendered highlighted via `<Ph>`.
- Checked: Apple 5.1.2(i) current text (explicit permission before sharing with
  third-party AI), Gemini API paid vs unpaid data use, DPDP Rules 2025 (90-day grievance
  outer limit, main obligations from May 2027).
- Verified on a production build at 1440 and 375: no overflow, no console errors besides
  the expected prefetch 404 of `/account` (Phase 4).

---

## 2026-10-10 — Phase 3 (backend) done in `Zorr_Final`

Backend work lives in the monorepo (branch `feature/web-backend`). The master record of all
phases, file by file, is `Zorr_Final/docs/web/CHANGELOG.md`; the Phase 3 report is
`Zorr_Final/zorr-build-spec/reports/web-phase3-report.md`.

Website change in this phase: `/privacy` no longer says the user's first name is sent to
the AI (the backend stopped sending it); it is now listed under "never sent".

API the web will use in Phase 4: `POST /api/auth/signup` (+ `turnstileToken`),
`POST /api/user/acknowledgements`, `PUT /api/user/profile` (+ `phonePlatform`),
`PATCH /api/workouts/plans/current/start-date` (send local midnight),
`POST /api/workouts/generate` (200/201 plan, 202 queued, 403 acknowledgement, 429 limit),
`GET /api/workouts/fortnight`, `POST /api/workouts/:id/complete`, `POST /api/workouts/:id/feel`,
`POST /api/workouts/plans/:id/feedback`.

---

## 2026-10-10 — Phase 4: the web app

Built `/signup`, `/login`, `/forgot-password`, `/onboarding`, `/plan`, `/account` (all
mobile first, dark tokens, noindex where private) on `lib/api.ts` (cookie session, one
shared refresh on 401) and `lib/onboarding.ts` (the app's questions and mapping, plus the
phone question). Full walkthrough at 375×812 against the local backend, signup to
deletion, passed; it found two backend bugs (ramp clock lagging the start date; repeated
start date rotating the week), both fixed in `Zorr_Final`. Landing "How it works" caption
no longer claims ratings improve the next plan.

Master record (file by file, walkthrough steps): `Zorr_Final/docs/web/CHANGELOG.md` →
Phase 4. Local run: `.claude/launch.json` → `zorr-api` (port 3000) + `zorr-web` (3002).

---

## 2026-10-11 — Restructured and pushed to GitHub

Folders reorganised with no URL change: route groups `app/(marketing|auth|app)`,
`components/{site,landing,legal,app}`, `docs/{brief,design,phases,tracking}`. `.claude/`
untracked (machine-specific), `lint` script replaced by `typecheck`, README rewritten with a
folder map, `docs/README.md` added. Same 17 static routes after the move. Pushed to
https://github.com/abhay0132/zorr_website (`main`).

---

## 2026-11-15 — Website matched to the app's Plates design

The founder wanted the website and the iPhone app to share one look. Source of truth:
`Zorr_Final/zorr_frontend/design-v2/theme/tokens.ts` (Plates, approved 2026-11-13). Layout ideas
came from a nuehealth.in study (floating pill nav, centred scroll ring, calm cards); colours, type
and buttons are the app's. Approved mockup: the "Landing page v2" artboard on the Zorr landing
redesign canvas (claude.ai artifact, private).

- **Tokens** (`tailwind.config.ts`): old names kept so every page restyled at once; values moved
  to Plates. `accent` is now chalk (buttons, selections, focus). New: `now` (orange, only for
  today/current/Kai), `danger` (errors, delete), `plate-*`, `chalk-band`, `ink`, `hub`.
- **Type** (`app/layout.tsx`, `globals.css`): Archivo for everything (Geist dropped), Geist Mono
  for labels. `.headline` is Archivo Expanded 125%, `.numeral` is Condensed 75%. A headline with
  a `text-accent` span dims the rest of the line: the app's tonal headline.
- **Shared**: `Knob.tsx` (the app's chalk pill with a dark disc), `IronPlate.tsx` (from the app's
  welcome screen), floating `Nav`, new `Footer`, `Logo` is now "ZORR", favicon and share card
  recoloured.
- **Landing**: new sections `Hero`, `FortnightRing` (sticky 3-step scroll story above 860px with
  motion allowed, static last step otherwise), `HowItWorks`, `ChalkBand`, `OnePlan`, `Barbell`,
  `Compare`, `Availability`, `Faq`. Removed SpecStrip, TemplateVsPlan, Ticker, FeatureBento,
  EquipmentDemo, AppTeaser, Personas, FinalCta.
- **App pages**: primary `Button` is the knob; errors use `danger`; plan grid and day cards use
  plate colours by session position (as the app does), orange rings today; Coming to iPhone card
  is no longer orange; generating label is orange (happening now); active tab gets an orange dot.
- **Legal and 404**: smaller expanded headlines, dim labels, chalk-outlined callout.

Checked: typecheck, production build (17 static routes), landing at 1440 and 375 (no horizontal
scroll, ring steps change on scroll, no console errors), /signup, /terms, 404, /plan shell.
Not checked: signed-in pages with a live backend and real plan data.

---

## 2026-11-15 — About, Pricing, Blog and Contact pages

Added on the founder's request, in the same Plates look.

- `components/site/PageShell.tsx`: shared frame (nav, tonal page header, footer) and `SectionHead`.
- `/about`: founder line (from the old site's footer), the three "why" lines (from the old
  site's Problem section), four build rules, and a web-now / iPhone-next timeline.
- `/pricing`: web ₹0 card (chalk outline, "Live now" in orange), iPhone card (1 month free, then
  `[PRICE]` placeholder, future tense), trainer vs template vs Zorr strip, pricing questions.
- `/contact`: four channels (email, grievance officer, Instagram, support) and a form that opens
  a pre-filled draft in the visitor's mail app. Nothing is sent or stored by the site.
- `/blog` and `/blog/[slug]`: posts as data in `lib/blog.ts`, static params, article metadata,
  drawn covers in `PostCover.tsx`, a Kai line block, a sign-up card and "Keep reading".
- Nav: Pricing and Blog on desktop; a `<details>` Menu on phones with all five pages. Footer:
  Product, Company, Help groups. Sitemap: every page and post.

Checked: typecheck, production build (23 routes, posts prerendered), every new page at 1440 and
375 (no horizontal scroll), the phone menu opening.
