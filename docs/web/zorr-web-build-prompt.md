# Zorr Web: Build Prompt for Claude Code

Paste this whole file into Claude Code from the root of the `zorr` monorepo. Put `zorr-landing-reference.html` (and optionally `zorr-landing.svg`) in `docs/web/` first.

---

## 0. Context (read before doing anything)

Zorr is an AI fitness coaching app (React Native / Expo SDK 54 frontend, Node.js / TypeScript / Express / Prisma / PostgreSQL backend). The iOS app is waiting on Apple Developer enrollment and App Store review, which may take weeks.

While we wait, we are shipping a **free web version** at our domain:

- A public landing page (design is final, see `docs/web/zorr-landing-reference.html`).
- Real accounts on the **existing backend auth**, so a web user logs into the iOS app later with the same account and finds their plan and history there.
- Onboarding (same questions as the app) **plus one new question: which phone do you use (iPhone / Android / Other)**.
- Plan generation through the **existing plan generation service**. Web users get their **first two weeks**.
- A plan view with sets, reps, weight guidance, form cues, and video where available.
- A **"Mark day done"** button per workout and a one-tap **"How did that feel? Easy / Right / Hard"** prompt.
- Terms, Privacy, and Support pages (Apple also needs the privacy and support URLs).
- Everyone who signs up is on the **waitlist**, which becomes the TestFlight invite list.

**Not on web, by decision:** exercise swap, weekly progression, payments / pro plans, push notifications, social features of any kind.

### Non-negotiable rules

1. **AI proposes, server validates.** All safety clamps and caps live in server code. The web client never talks to the AI provider directly.
2. **Claim/ship gate.** Public copy uses present tense only for features live on the web. Swap and progression are described in future tense or as "Coming to iPhone".
3. **Copy rules** for anything a user reads:
   - Never name the AI vendor, model, or backend stack in marketing copy (the Privacy Policy is the exception, see Phase 2).
   - No em dashes.
   - Banned words: delve, seamless, leverage, holistic, transformative, journey, elevate, empower, unlock, cutting-edge, best-in-class, robust, tailored, personalized, game-changer, revolutionize.
   - For trainer cost, use "₹8,000+ a month". Never ₹3,000.
4. **Over-engineering is the enemy.** Reuse existing services. No new frameworks unless Phase 0 shows we must. If a task balloons, stop and report.
5. **Phase gates.** Each phase ends with a **HARD STOP**: summarize what you did, what you found, and what's next, then wait for my explicit "go". Never start the next phase on your own.
6. **Destructive operations** (migrations, deletes, DNS, env changes in hosted dashboards): show a dry run or the exact diff first and wait for approval.
7. Conventional commits. Never commit secrets. `.env` stays ignored.

---

## Phase 0: Recon (read-only, no code changes)

Investigate and write `docs/web/phase0-recon.md` covering:

1. **Existing website:** is there a Next.js site in the repo (we use Vercel)? Where, what version, and what's on it now?
2. **Auth:** which endpoints exist (signup, login, refresh, password reset, account deletion)? Token or cookie based? What a browser client needs (CORS, `ALLOWED_ORIGINS`, cookie `SameSite` / `Secure`, CSRF).
3. **Onboarding:** the full list of onboarding questions and the API that saves them. Can the web reuse that API as-is?
4. **Plan generation:** the endpoint and service, its inputs and outputs, cost per call (estimate tokens), timeouts, and failure modes. Note the ungated `buildFallbackWorkoutPlan` call site at `ai.service.ts:370` and whether it can put template exercises into web plans.
5. **Workout completion:** is there a model for a finished workout / session we can reuse for "Mark day done", or do we need a lightweight `WorkoutCompletion` record?
6. **Known gaps that affect the web** (confirm each is still open):
   - Starting weights ignore bodyweight.
   - Planks show reps instead of seconds (`holdSeconds` never read).
   - `disclaimerAckAt` is never written.
7. **Exercise data:** where the exercise catalog lives, and whether it has fields for form cues and video URLs.
8. **Recommendation: Expo web vs Next.js for the logged-in pages.** Spend at most **one hour** trying `npx expo export -p web` on onboarding and the plan screen. Report what breaks. Default recommendation unless Expo web works almost untouched: **Next.js for everything on the web** (landing + app pages) calling the existing API.

**HARD STOP.** Show me the recon doc and your recommendation.

---

## Phase 1: Landing page

Build the landing page in the chosen web project from `docs/web/zorr-landing-reference.html`. Match it closely; the design is approved.

- **Fonts:** Archivo (variable, condensed via `font-stretch: 72%`), Geist, Geist Mono. Load them with `next/font/google`, not a CSS `<link>`.
- **Design tokens** (CSS variables or a Tailwind theme, whichever the project uses):
  - Background `#0C0B0A`, surface `#151412`, hairline `#24211E` / `#33302C`
  - Text `#F4F1EC`, muted `#A39E96`, accent `#FF5C1F` (text on accent is `#0C0B0A`)
  - Headlines: Archivo, weight 850 to 900, uppercase, `font-stretch: 72%`, line-height around 0.9
  - Labels: Geist Mono, uppercase, letter-spacing 0.06 to 0.08em
  - Buttons: accent background, 10 to 12px radius, never pill-shaped
- **Split the page into components:** Nav, Hero, SpecStrip, TemplateVsPlan, Ticker, FeatureBento, HowItWorks, AppTeaser, Personas, Faq, FinalCta, Footer.
- **Interactive bits:** the equipment chips demo and the FAQ accordion (one open at a time, `aria-expanded`). The ticker animation must stop under `prefers-reduced-motion`.
- **Responsive:** test at 375, 768, 1280 and 1440 widths. No horizontal scroll. The hero stacks on mobile, and the floating chips must not overflow the screen.
- **Accessibility:** real `<button>` and `<a>` elements, visible focus states, 4.5:1 contrast for body text, `aria-label` on icon-only controls.
- **SEO:** title, description, Open Graph and Twitter cards, favicon, `robots.txt`, `sitemap.xml`, and a 404 page in the same style.
- **Placeholders:** wire every `[SIGNUP URL]` and CTA to `/signup`. Leave `[VIDEO]` slots as a component that takes an optional video URL.
- **Performance:** Lighthouse 90+ on mobile for Performance, Accessibility, Best Practices and SEO.

**HARD STOP.** Give me a preview URL or local run steps, plus mobile and desktop screenshots.

---

## Phase 2: Legal and support pages

Create `/terms`, `/privacy` and `/support` in the same visual style, with readable long-form typography, a "Last updated" date, and a table of contents.

**Draft these as a starting point only.** Put a visible `<!-- DRAFT: needs review by a lawyer -->` comment in each, and list every `[PLACEHOLDER]` you leave in your phase summary. I will get them reviewed before launch.

### Terms of Service: cover

1. Who we are: `[LEGAL NAME]`, operating Zorr, based in `[CITY], Uttar Pradesh, India`; contact `[SUPPORT EMAIL]`.
2. Acceptance of the terms, and that we can update them (with notice for material changes).
3. **Eligibility: users must be 18 or older.** This keeps us clear of parental-consent requirements under India's Digital Personal Data Protection Act.
4. **Health and safety disclaimer (prominent, near the top):**
   - Zorr is not medical advice and not a substitute for a doctor or physiotherapist.
   - Consult a doctor before starting, especially with injuries, conditions, pregnancy, or medication.
   - Stop if you feel pain, dizziness or chest discomfort.
   - The user trains at their own risk.
5. **Automatically generated plans:** plans are generated by software from the user's answers and may contain mistakes; the user is responsible for choosing safe weights and form.
6. Accounts: accurate information, keeping the password safe, one person per account.
7. Acceptable use: no abuse, scraping, reverse engineering, automated signups, or attempts to get around usage limits.
8. Free service: the web version is free and may change, be limited, or end; no guarantee of availability.
9. Intellectual property: ours stays ours; users own the data they enter and give us a licence to process it to run the service.
10. Disclaimer of warranties, and limitation of liability to the maximum extent the law allows.
11. Termination: the user can delete their account any time; we can suspend accounts that break the terms.
12. Governing law: India, courts at `[CITY]`.
13. Contact and grievance details.

### Privacy Policy: cover (written for India's DPDP Act 2023 and Apple's requirements)

1. Who the data fiduciary is, plus contact and grievance officer details: `[NAME]`, `[EMAIL]`.
2. **What we collect:**
   - Account: email, password hash.
   - Profile: age, sex, height, weight, goal, experience, equipment, training days.
   - **Pain or injury answers.** Treat these as sensitive and explain why we ask (to keep the plan safe).
   - Phone platform answer.
   - Workout completions and "how did it feel" ratings.
   - Technical data: device, browser, IP, error logs.
   - Cookies (only the essential auth cookie unless analytics is added).
3. **Why:** to create and run the account, generate and adjust plans, keep training safe, prevent abuse, improve the product, and send service emails (including the iOS invite).
4. **Who processes it:** list each processor by category **and name** (hosting, database, cache, email, error monitoring, analytics, and the **AI provider that generates plans**). Unlike marketing copy, the privacy policy must name the AI provider. Say exactly what is sent to it (profile and training answers, never the email or password) and whether the provider can use it for training. Apple's App Review Guidelines require disclosing when personal data is shared with third-party AI; check the current guideline 5.1.2 and match it.
5. Consent and withdrawal: how to withdraw and what happens when you do.
6. Retention: how long we keep data, and deletion within `[X] days` of an account deletion request.
7. User rights: access, correction, erasure, grievance redressal, nominating someone.
8. **Account deletion:** in-app and on the web (Apple requires in-app deletion for apps with accounts). Link to the deletion flow.
9. Security measures, in plain words.
10. International transfers, if any processor stores data outside India.
11. Children: not for anyone under 18; we delete any such account we find.
12. Changes to the policy, and contact.

### Support page

FAQ (reuse the landing FAQ), how to reset your password, how to delete your account, a contact email, expected response time, and the medical disclaimer in one line.

**HARD STOP.** I review all three drafts.

---

## Phase 3: Backend changes

Plan everything first, show the Prisma migration diff and a dry run, then wait for approval before applying anything.

1. **`phonePlatform`** on the user profile: enum `IOS | ANDROID | OTHER`, nullable for existing users, set during web onboarding.
2. **`signupSource`:** `WEB | IOS`, so we can tell the cohorts apart later.
3. **CORS:** add the web origin(s) to `ALLOWED_ORIGINS`, and update `.env.example`. The server refuses to start without this in production.
4. **Abuse and cost protection**, all server-side:
   - Plan generation limited to **1 generation + 1 regenerate per account** on web.
   - Rate limits per IP and per account on signup, login and generation.
   - **Cloudflare Turnstile** verification on signup (server-side token check).
   - A **daily AI spend cap**, configurable by env var: when it's hit, generation returns a friendly "We're at capacity today, you'll get an email when your plan is ready" and queues the request.
5. **Disclaimer acknowledgement:** actually write `disclaimerAckAt` when the user accepts. Block plan generation until it's set.
6. **Web plan scope:** generate or return the **first two weeks** only. No progression runs for web-only users.
7. **Fixes that show up on web:**
   - Read `holdSeconds` so planks show "3 × 30s".
   - Show starting weights as guidance ("pick a weight you could lift 2 more times") until the bodyweight-aware fix lands. Return both the number and the guidance, and let the client decide what to show.
   - Gate the fallback-plan call site from Phase 0 so template exercises can't leak into real plans.
8. **Workout completion:** `POST /workouts/:dayId/complete` and `POST /workouts/:dayId/feel` (`EASY | RIGHT | HARD`). Reuse an existing model if Phase 0 found one. Make both idempotent.
9. **Waitlist export:** an admin-only script or endpoint that exports `email, phonePlatform, signupSource, createdAt, workoutsDone`.
10. **Tests** for every new endpoint and every limit. All existing tests (373+) must still pass.

**HARD STOP.** Show test results, the migration, and the env var changes.

---

## Phase 4: Web app flow

1. **`/signup` and `/login`:** email and password (no social login for now), Turnstile on signup, password reset, links to Terms and Privacy at signup with an explicit checkbox.
2. **`/onboarding`:**
   - The same questions as the app, one per screen, with a progress bar (see the "Minute 0" card in the design).
   - Add the phone question.
   - End with the disclaimer screen; acceptance is saved.
3. **Generating state:** an honest loading screen. Handle timeout and failure with a retry that doesn't burn the generation cap.
4. **`/plan`:**
   - Two-week view with day cards.
   - Each exercise shows sets × reps (or seconds), weight guidance, three form cues, and video if a URL exists.
   - "Mark day done" plus the feel prompt.
   - A two-week completion grid (see the bento card in the design).
5. **After the first plan:** one-time feedback, "Would you follow this plan?" (Yes / Not sure / No) and "What's missing?" (optional text). Store both.
6. **"Coming to iPhone" panel** in the logged-in area, in future tense: "Your account carries over. We'll email your invite."
7. **`/account`:** email, phone platform, export my data, **delete my account** (with confirmation).
8. **Mobile first.** People open this at the gym on their phone.

**HARD STOP.** Walk me through the flow end to end on a phone-sized viewport.

---

## Phase 5: Emails, analytics, monitoring

1. **Emails** (using the existing email provider):
   - Welcome email with a link back to the plan.
   - Plan-ready email (for queued generations).
   - Later: the TestFlight invite template. Plain, short, follows the copy rules.
2. **Analytics events**, privacy-respecting, no ad trackers:
   - `signup_started`, `signup_completed`, `onboarding_completed`, `plan_generated`, `workout_completed`, `feel_rated`, `feedback_submitted`
   - Also a daily "returned" event, so we can see day 2, week 1 and week 3 return rates.
   - If analytics sets non-essential cookies, add a consent banner, declined by default.
3. **Monitoring:** Sentry for the web project, tagged `web`. Alerts on generation failures and when the spend cap is hit.
4. **Simple admin view or script:** signups per day, iPhone vs Android vs Other split, plans generated, workouts completed, the share of users who completed at least 1 / 3 / 6 workouts, and feedback answers.

**HARD STOP.**

---

## Phase 6: Deploy

1. **Checklist first**, and show it to me before doing anything:
   - Env vars for the web project and backend (`NODE_ENV=production` explicitly, `ALLOWED_ORIGINS`, Turnstile keys, spend cap).
   - Backend URL.
   - DNS records for the domain.
2. **Deploy the web project to Vercel** on a preview URL first. Run the full flow there against the production backend.
3. **DNS and the custom domain: do not change these without my explicit go.**
4. **After launch, verify:**
   - `/privacy` and `/support` resolve publicly. These are the URLs for App Store Connect.
   - The signup → plan → done flow works on a real phone.
   - Emails arrive.
   - Sentry receives a test error.

**HARD STOP.**

---

## Every session

Update the four root tracking files together:

- `PROGRESS.md`: append-only dated log.
- `Features.md`: current features, dated.
- `Future_Features.md`: planned features in priority order.
- `Problems.md`: open blockers and risks, dated.

Commit the docs under `docs/web/`.

## Definition of done

- The landing page matches the reference on mobile and desktop.
- A new user can sign up, onboard (including the phone question), accept the disclaimer, get a two-week plan, mark a workout done and rate it, all on a phone.
- Limits, Turnstile and the spend cap are enforced server-side and covered by tests.
- Terms, Privacy and Support are live (drafts flagged for legal review).
- Analytics shows signups split by phone platform, and return rates.
- All tests pass; nothing in public copy breaks the copy rules.
