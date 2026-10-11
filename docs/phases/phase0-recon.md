# Phase 0 recon: Zorr web

2026-10-10. Read-only investigation of `Zorr_Final` (monorepo, branch `all-segments`) and
`Zorr_Website`. Nothing in `Zorr_Final` was changed.

Baseline: backend suite **373 tests / 23 suites, all passing** (`npx jest`).

---

## 1. Existing website

- `Zorr_Website/` is a **separate repo** from the monorepo. It has **no commits yet**:
  everything is untracked.
- Next.js 15.1.6 (App Router) + React 19.0.0 + Tailwind 3. It is set up for Vercel but not
  deployed.
- What was on it: the old cream/tangerine marketing site (Bricolage + DM Sans), a `v2/`
  copy of the same site, a Supabase + Upstash waitlist endpoint, and draft
  `/privacy` `/terms` `/support` pages.
- **Security:** `next@15.1.6` had **1 critical + 4 high** advisories. Upgraded to
  `next@15.5.27` / `react@19.3.0` in Phase 1.
- **Status now:** the old design was moved out to `../Zorr_Website_old_design/`, plus a
  tarball at `../Zorr_Website_old_design_backup_2026-10-10.tar.gz`. Nothing was deleted.

## 2. Auth

Endpoints under `/api/auth`:

| Endpoint | Notes |
|---|---|
| `POST /signup` | Needs `email, password, name, acceptedTerms: true, isAdult: true` (z.literal). **Returns no tokens**: the web client must call login straight after. |
| `POST /login` | Sets httpOnly cookies **and** returns tokens in the body. Does not require a verified email. |
| `POST /refresh` | Takes the refresh token from the cookie or the body. Rotates both tokens. |
| `POST /logout`, `POST /logout-all` | |
| `POST /forgot-password`, `POST /reset-password`, `GET /reset-password` | The GET serves a self-contained HTML form. It is styled in the old cream palette. |
| `POST /verify-email`, `GET /verify-email`, `POST /resend-verification` | |
| `GET /me`, `POST /change-password` | |
| `DELETE /api/user/account` | Body: `password` + `confirmation: "DELETE MY ACCOUNT"`. Hard delete with cascade. |
| Google OAuth | Exists, but redirects to the app deep link. **Not for web v1.** |

Mechanism: **JWT in httpOnly cookies** for web, Bearer for mobile. The `authenticate` middleware
reads the cookie first.

- Access cookie: 30 min, `path=/`.
- Refresh cookie: 30 days, `path=/api/auth/refresh`.
- Both are **`SameSite=strict`**, and `Secure` when `NODE_ENV=production`.

What a browser client needs:

- **The API must live on a subdomain of the web domain** (e.g. `zorr.app` + `api.zorr.app`).
  Strict cookies are sent on same-site requests. A backend on `*.up.railway.app` would be
  cross-site, and every cookie would be dropped.
- **Calls go from the browser directly to `api.zorr.app` with `credentials: 'include'`.**
  Do not proxy through Vercel rewrites. The server uses `trust proxy 1`, so behind
  Vercel → host proxy → app, `req.ip` becomes Vercel's egress IP. Every web user would then
  share one rate-limit bucket, and auth is 5 per 15 min per IP.
- CORS is already correct: an `ALLOWED_ORIGINS` allowlist, `credentials: true`, and the
  server refuses to boot in production without it. Add `https://zorr.app` and
  `https://www.zorr.app`.
- CSRF: strict cookies plus the CORS allowlist plus JSON bodies is adequate. No token is
  needed.
- Session reads happen client-side, because the cookies are host-only on `api.`. That is
  fine for the logged-in pages.

## 3. Onboarding

There are **12 data steps**, plus intro, summary and generating
(`zorr_frontend/design-v2/onboarding/OnboardingFlow.tsx`):

1. Basic info: name, age, sex, height cm, weight kg
2. Goal: lose fat / build muscle / recomp / endurance / general
3. Training background: experience (never/beginner/intermediate/advanced), training recency
   (5 options), movement confidence (3)
4. Day-to-day activity: sedentary / light / moderate / very
5. Location (home/gym/both) + equipment (Dumbbells, Barbell, Resistance bands, Pull-up
   bar, Kettlebell, Bench, Bodyweight only) + "joining a gym"
6. Schedule: days per week (2 to 6) + session length (30/45/60/90)
7. Injuries: 8 areas or "No issues", plus recency (recent / a while ago / recovered) and a
   note
8. Outside activities (10 options + Other)
9. Sleep duration + quality
10. Stress: low / medium / high
11. Diet + allergies
12. Summary

Save path: `PUT /api/user/profile` with the payload from `src/utils/transformOnboarding.ts`,
then `POST /api/workouts/generate`.

**The web can reuse this API as-is.** `transformOnboarding` is pure TypeScript, so it ports
directly. New fields needed: `phonePlatform`, `signupSource` (Phase 3).

## 4. Plan generation

`POST /api/workouts/generate` → `workoutService.createAIWorkoutPlan` → `ai.service.generateWorkoutPlan`.

- **Input:** the user's profile, plus a catalog filtered by equipment and difficulty
  (slug, name, muscle, difficulty, pattern). The model must answer with slugs.
- **Output:** a `WorkoutPlan` holding N `Workout` rows. This is a **weekly template**: one
  row per training day, with `dayOfWeek` and `scheduledDate`, and `WorkoutExercise` rows
  carrying sets, reps, minReps/maxReps, weight and rest. The response is display-ramped for
  week 1.
- **Cost per call** (measured in segment-2):
  - about 2.4k to 2.6k prompt tokens
  - about 1.6k to 1.8k output tokens
  - about 0.5k to 1k thinking tokens (`thinkingLevel: low`)
  - so about **2.5k input + 2.5k billed output per successful attempt**
  - implicit caching was observed at 0
- **Worst case per request:** 2 attempts × (up to 3 candidate models inside a 38 s budget).
  Price it against the current price sheet for the configured model; I have not invented a
  ₹ figure.
- **Timeouts:** 18 s per call, 38 s per attempt, so about **76 s worst case** for the HTTP
  request. Any proxy in front of the API must allow at least 90 s.
- **Failure modes:**
  - The model returns bad JSON or slugs → retried once.
  - Under `daysPerWeek × 3` resolved exercises → a 502 `PLAN_GEN_FAILED`.
  - Every model fails → a 502 (in production).
- **Existing protections:**
  - An idempotency window: an active plan created in the last 10 minutes is returned, not
    regenerated.
  - Rate limit: 1 per day for free users, keyed by user, `skipFailedRequests`, so failures
    don't burn the cap.
  - There is **no lifetime cap and no spend cap**. Both are Phase 3.

### The fallback call site

`ai.service.ts:370` has moved. There are now **two** call sites:

- `ai.service.ts:488` is the whole-plan fallback. It is **already gated** to
  `NODE_ENV === 'development'`.
- `ai.service.ts:519`, inside `normalizeWorkoutResponse`, is **ungated and runs in
  production on every generation.** It is used to:
  - (a) fill missing numbers (sets, reps, rest, weight). These are clamped and only matter
    if the model omits required fields.
  - (b) **replace a workout that has 0 exercises** with a template day.
  - (c) **pad** a plan that has fewer workouts than `daysPerWeek` with template days.

Can template *exercises* reach a saved plan? **No.** Template exercises have no slug, and
`resolvePlanSlugs` silently drops slug-less rows, so they never reach the DB.

**But template days can.** Two holes:

- A padded day keeps its template name (e.g. "Upper Strength") and ends up with **0
  exercises**.
- The `minExercises` gate counts the **plan total** (`daysPerWeek × 3`), not per day, so a
  plan with one empty day can still pass.

Phase 3 fix:

- Make (b) and (c) throw, so the existing retry runs.
- Gate on **at least 3 resolved exercises per day**.

## 5. Workout completion

**Reuse `POST /api/workouts/:id/complete`.** It writes an append-only `WorkoutSession` row:
`(userId, planId, workoutId, weekNumber, performedDate)`. It works with zero logged sets.

- It is **not idempotent**: a second call in the same plan-week returns
  400 `ALREADY_COMPLETED_THIS_WEEK`.
  - Web needs a 200 with the existing session instead.
  - Check whether the iOS app depends on the 400 before changing it, or add a web-only
    route.
- "How did that feel": no field exists. Add a nullable `feel` enum (`EASY|RIGHT|HARD`) on
  `WorkoutSession` and a `POST /api/workouts/:id/feel`.
- **Do not** add a `WorkoutCompletion` model. Do not read `Workout.completed`: it is sticky,
  per architecture invariant 1.
- `weekNumber` is derived from `plan.startDate` and today. A user can only complete the
  current week's instance of a day. That matches "mark day done", but the two-week grid
  must reflect it.
- Progression runs **lazily**, only from `GET /api/workouts/progression`. If the web client
  never calls it, web-only users never progress, which covers Phase 3.6 with no code. When
  they move to iOS, the app will call it, and the day-14 window will run on their web
  sessions.

## 6. Known gaps (all three still open)

| Gap | Status | Evidence |
|---|---|---|
| Starting weights ignore bodyweight | **Open** | The prompt's "base starting weights" come from `getAdjustedWeights(fitnessLevel)` only. Bodyweight feeds only the isolation *ceiling*. |
| Planks show reps, not seconds | **Open** | `Exercise.holdSeconds` (36 of 250 exercises) is read nowhere in `src/` or the frontend. The fallback plank is `reps: 45`. |
| `disclaimerAckAt` never written | **Open** | It is only `select`ed in `user.controller.ts`. `requiresDisclaimerAck()` exists in `safety.service.ts` but is never called. |

New gap found, and it affects landing-page copy:

- **The equipment filter is coarse.** `catalogEquipmentWhere`:
  - `bodyweight_only` → bodyweight rows only
  - `home_gym` → **anything but barbell**, so cable and machine work are allowed
  - `full_gym` → everything

  A home user with only dumbbells can be given a cable row. The picked items are only text
  in the prompt. The landing page says "Every exercise in your plan is one you can actually
  do where you train". Fix in Phase 3: filter on `Exercise.equipment[]` against the user's
  items. This needs a label map, e.g. "Pull-up bar" → `pull_up_bar`.

## 7. Exercise data

- Catalog: `Exercise` table, seeded from `prisma/exercise-data/exercise-library-v1.md`.
  There are 250 entries.
- **Form cues:** `cues: String[]`. **All 250 have exactly 3.** The web can show them as-is.
- **Video:**
  - `videoUrl` exists, but **0 of 250 are set**.
  - `youtubeSearch` (a search query string) exists on every row, but no client uses it.
  - So the landing's "videos on the most common ones" is **not true today**. The copy was
    changed to future tense.
- Also on every row: `holdSeconds`, `execution` prose, `commonErrors[]`, `setupNotes`.

## 8. Expo web vs Next.js

Tried in a **scratch copy** of `zorr_frontend` (about 15 minutes; the repo is untouched):

1. `npx expo export -p web` fails at once: `react-dom` and `react-native-web` are not
   installed.
2. With them added, it **bundles** (1.92 MB JS) and the Login screen renders.
3. **Auth is dead on web.** `expo-secure-store` has no web implementation
   (`getValueWithKeyAsync is not a function`), and `api.ts` / `AuthContext` keep tokens
   there. Shimming that to localStorage would put tokens in JS-readable storage on the web,
   which is worse than the cookies the backend already supports.
4. Other friction:
   - `expo-notifications` warns.
   - The API base URL is a hardcoded LAN IP fallback.
   - The layout stretches to full desktop width.
   - The bundle is 1.9 MB of JS for a page people open at the gym on mobile data.
   - The app uses the **old** cream/Bricolage design. The approved web design is
     dark/Archivo, so Expo web would look like a different product from its own landing
     page.

**Recommendation: Next.js for everything on the web** (landing + app pages) in
`Zorr_Website`, calling the existing API at `api.zorr.app` with cookies. Port
`transformOnboarding` and the onboarding option lists as plain TypeScript.

---

## Decisions needed

1. **Domain topology:** web at `zorr.app`, API at `api.zorr.app`. This is required for the
   strict cookies. The backend is not deployed anywhere yet; that is still a launch blocker
   from `CLAUDE.md`.
2. **Support email:**
   - The old site used `zorrapp.in@gmail.com`.
   - The backend `SUPPORT_EMAIL` defaults to `zorr.app@gmail.com`.
   - `env.ts` defaults `FROM_EMAIL` to `noreply@zorr.app`.

   Pick one. It lives in `lib/site.ts`.
3. **The hero says "iPhone app in review".** Per the brief, the app is waiting on Apple
   Developer enrollment, so it is not in review yet. This should say "coming soon" until it
   is submitted.
4. **First commit of `Zorr_Website`.** The repo has no commits. Say the word and I'll branch
   and commit.
