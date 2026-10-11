# Zorr Website

The free web version of Zorr: the public landing page, the legal and support pages, and
the web app (sign-up, onboarding, a two-week training plan, account). Next.js (App Router)
and Tailwind, deployed on Vercel, intended domain **zorr.app**.

It talks to the Zorr backend (`zorr-backend` in the
[abhay0132/zorr](https://github.com/abhay0132/zorr) monorepo) for accounts, plans and
workout history. The landing and legal pages work without it; everything under the app
routes needs it.

## Run locally

```bash
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_API_URL to your local backend
npm run dev -- -p 3002         # http://localhost:3002
```

The backend runs on port 3000 and must allow this origin:

```bash
# in zorr-backend
ALLOWED_ORIGINS=http://localhost:3002 npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (every route is static) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

Don't run `build` while `dev` is running: they share `.next`.

## Environment

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | the web app | Backend base URL including `/api`. Must be on the same site as the web app (the session cookies are `SameSite=strict`), e.g. `https://api.zorr.app/api`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | sign-up | Cloudflare Turnstile **site** key (public). Empty locally skips the widget. |

## Folder structure

```
app/                      routes (App Router); the (groups) do not appear in URLs
├── (marketing)/          /  /terms  /privacy  /support
├── (auth)/               /signup  /login  /forgot-password
├── (app)/                /onboarding  /plan  /account   (signed in, noindex)
├── layout.tsx            fonts, metadata, theme colour
├── globals.css           base styles, .headline/.label/.btn-accent, long-form .legal
├── not-found.tsx         404
├── opengraph-image.tsx   share card
├── icon.svg              favicon
├── robots.ts, sitemap.ts
components/
├── site/                 shared chrome: Nav, Footer, Logo, icons, VideoSlot
├── landing/              one file per landing section, plus its interactive bits
├── legal/                LegalPage layout, Callout, Ph (visible placeholders)
└── app/                  web app: shells, forms, OnboardingFlow, PlanView, AccountView,
                          ui primitives, useSession, Turnstile
lib/
├── api.ts                the only way to call the backend (cookies, refresh, ApiError)
├── onboarding.ts         questions, options and the answers → profile mapping
├── site.ts               URLs, support email, sign-up path
├── faq.ts                FAQ shared by the landing page and /support
└── legal.ts              every legal placeholder in one place
docs/                     see docs/README.md
tailwind.config.ts        the whole colour palette (stock Tailwind colours removed)
```

## Copy rules

Anything a user reads follows the rules in `docs/brief/zorr-web-build-prompt.md`:

- no em dashes;
- no banned words;
- no vendor names outside `/privacy` (and the AI-consent line in onboarding);
- present tense only for what is live on the web;
- trainer cost written as "₹8,000+ a month".

## Status

Work is tracked in `docs/tracking/`. The cross-repo, file-by-file record lives in the
monorepo at `docs/web/CHANGELOG.md`.

- **Legal pages:** drafts awaiting lawyer review. Placeholders are in `lib/legal.ts`.
