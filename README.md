# Zorr Website

The Zorr web app: the public landing page now, with sign-up, onboarding and the
two-week plan to follow (see `docs/web/zorr-web-build-prompt.md`). Next.js (App Router)
+ Tailwind, deployed on Vercel, intended domain **zorr.app**.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are needed for the landing page.

Production check: `npm run build && npm run start`. Don't run `build` while `dev` is
running; they share `.next`.

## Layout

- `app/` — routes: `/`, `/signup` (placeholder), `/privacy`, `/terms`, `/support`, 404,
  `robots.txt`, `sitemap.xml`, OG image, `icon.svg`.
- `components/` — one file per landing section.
- `lib/site.ts` — URLs, support email, signup path. `lib/faq.ts` — FAQ shared with /support.
- `tailwind.config.ts` — every colour token; the default palette is replaced.
- `docs/web/` — the build brief, the approved design reference, Phase 0 recon.

## Tracking

`PROGRESS.md` (log), `Features.md`, `Future_Features.md`, `Problems.md`.
