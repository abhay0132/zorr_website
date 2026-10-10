# Phase 3 plan: backend changes for the web

2026-10-10. Monorepo `Zorr_Final`, new branch **`feature/web-backend`** (cut from
`all-segments`).

> **Status: EXECUTED (2026-10-10).** Approved with the recommended option on A, B, C and
> D. The migration is applied to dev `zorr` and `zorr_test`, and all code is in
> (450/450 tests).
>
> - What was actually built, and every gap: `Zorr_Final/zorr-build-spec/reports/web-phase3-report.md`.
> - The cross-phase log: `Zorr_Final/docs/web/CHANGELOG.md`.
>
> The text below is the plan as approved, kept unedited.

---

## The migration

File: `zorr-backend/prisma/migrations/20261010120000_web_launch/migration.sql`.
It is purely additive:

| Change | Detail |
|---|---|
| 5 new enums | `PhonePlatform (IOS, ANDROID, OTHER)`, `SignupSource (WEB, IOS)`, `WorkoutFeel (EASY, RIGHT, HARD)`, `PlanFeedbackAnswer (YES, NOT_SURE, NO)`, `PlanRequestStatus (QUEUED, DONE, FAILED)` |
| `User` +4 columns | `phonePlatform?`, `signupSource?`, `aiConsentAt?`, `planGenerationCount Int default 0` |
| `WorkoutSession` +2 | `feel?`, `feelAt?` |
| `WorkoutPlan` +3 | `feedbackWouldFollow?`, `feedbackMissing?`, `feedbackAt?` |
| New table `AiSpendDay` | One row per IST day: `costMicros` (USD × 10⁶), `calls` |
| New table `PlanGenerationRequest` | The queue for when the spend cap is hit. Cascades with the user. |

Nothing is dropped, renamed or retyped. Every new column is nullable or defaulted.

**Dry run** (scratch DB `zorr_phase3_dryrun_test`, created and then dropped):

- All 22 migrations, including this one, applied cleanly to an empty database.
- `prisma migrate diff` between that database and the new schema found **no drift**
  (exit 0).
- The dev DB `zorr` is missing **only** `20261010120000_web_launch`.
- The dev DB → new schema diff is byte-identical to `migration.sql`.
- The dev DB has 0 users, 0 plans and 0 sessions, so no existing rows are affected.

Apply with: `npx prisma migrate deploy` (dev), and later the same on production.

---

## Changes, item by item

### 1. `phonePlatform`
Add `phonePlatform: z.enum(['IOS','ANDROID','OTHER']).optional()` to `updateProfileSchema`.
Web onboarding sends it with the rest of the profile via the existing `PUT /api/user/profile`.

### 2. `signupSource`
Derived **server-side** at signup, never taken from the client:

- A request whose `Origin` is in `ALLOWED_ORIGINS` → `WEB`.
- No `Origin` header (the native app) → `IOS`.

`resolveAllowedOrigins()` moves from `index.ts` into `config/` so signup can reuse it.

### 3. CORS / env
CORS code is already correct. `.env.example` gains these:

```
ALLOWED_ORIGINS=https://zorr.app,https://www.zorr.app
TURNSTILE_SECRET_KEY=            # required in production
AI_DAILY_SPEND_CAP_USD=          # required in production, e.g. 5
AI_PRICE_INPUT_PER_MTOK_USD=     # required in production, from the provider's price sheet
AI_PRICE_OUTPUT_PER_MTOK_USD=    # required in production (thinking tokens bill at this rate)
WEB_PLAN_GENERATION_LIMIT=2      # 1 generation + 1 regenerate
```

Like `ALLOWED_ORIGINS`, the new required ones **refuse to boot in production** when unset.

Found stale in `.env.example`: `JWT_ACCESS_SECRET`, `CLIENT_URL`, `SENDGRID_FROM_EMAIL`,
`ADMIN_EMAIL` and `ADMIN_PASSWORD` are read by nothing in `src/`. I'll mark them, not
delete them.

### 4. Abuse and cost protection (all server-side)

**Lifetime generation cap (web accounts).**

- `planGenerationCount` is reserved with one atomic
  `UPDATE … WHERE planGenerationCount < limit`.
- It is refunded if generation fails, so a timeout or error never burns a slot, and two
  parallel requests cannot both pass.
- The 10-minute idempotency return (an existing behaviour) costs nothing.
- Over the limit → 429 `GENERATION_LIMIT_REACHED`.

**Rate limits.** New limits go in `middleware/rateLimit.ts`, all with
`passOnStoreError: true` like the existing ones.

| Route | Existing | Added |
|---|---|---|
| signup | 5 / 15 min / IP | 3 / hour / email address |
| login | 5 / 15 min / IP | 10 / 15 min / email address (stops spread-out guessing on one account) |
| generate | 1 / day / user (free) | 10 / day / IP |

**Turnstile.**

- Signup takes a `turnstileToken`. It is verified server-side against Cloudflare's
  `siteverify` (Node 22's built-in `fetch`, no new dependency).
- It is required when `signupSource` is `WEB`. The native app is not challenged.
- Dev without a key: it is skipped, with a warning.
- Tests mock `fetch`. Cloudflare's published always-pass/always-fail test keys are
  documented for manual checks.

**Daily AI spend cap.**

- New `services/aiSpend.service.ts`:
  - `recordAiSpend(usageMetadata)` prices prompt tokens plus output and thinking tokens
    from the env prices, then adds them to today's `AiSpendDay` row with an atomic
    upsert/increment.
  - `isSpendCapReached()` reads that row.
- It is called from **all three** model call sites: generation, swap rationale and
  progression summary.
- When the cap is reached:
  - **Generation:** a `PlanGenerationRequest` (QUEUED) is created, the user's slot stays
    reserved, and the server returns **202** with *"We're at capacity today, you'll get
    an email when your plan is ready."*
  - **Swap and summary:** the model call is skipped and the **existing deterministic
    fallbacks** are used. No new behaviour, just an earlier exit.
- **Queue drain:** a new `scheduleJob('plan-queue', '*/30 * * * *', …)`.
  - It processes QUEUED requests oldest-first while under the cap.
  - Done → DONE, plus a plain plan-ready email via the existing `email.service`.
    Phase 5 polishes the template.
  - 3 failures → FAILED, the slot is refunded, and a short "please try again" email
    is sent.

### 5. Disclaimer and AI consent
- New `POST /api/user/acknowledgements` with `{ disclaimer: true, aiConsent: true }`,
  using `z.literal(true)` like signup consent.
  - It sets `disclaimerAckAt` and `aiConsentAt`, keeping the first timestamp, so it is
    idempotent.
  - Both fields stay absent from `updateProfileSchema`.
- `POST /workouts/generate` returns 403 `ACKNOWLEDGEMENT_REQUIRED` until both are set.
  See decision A for which accounts that applies to.

### 6. Two-week web plan
- New `GET /api/workouts/fortnight` returns the active plan as **weeks 1 and 2 only**:
  - each day dated in the user's timezone (via `trainingDay.ts`);
  - exercises display-ramped **for that week's date** (`applyDisplayRamp`, read time
    only);
  - `done` = a `WorkoutSession` exists for `(workoutId, weekNumber)`, never
    `Workout.completed`;
  - `feel` comes from that session.
- No progression for web-only users. Progression only runs lazily from
  `GET /workouts/progression`, which the web never calls. A test pins that the
  fortnight read does not trigger it.

### 7. Fixes visible on the web
- **Holds.** A small presenter `presentPrescription(workoutExercise, exercise)` returns
  `{ sets, reps|null, holdSeconds|null, display, weightKg, weightGuidance }`.
  - For `loadType = time_hold` it reads `Exercise.holdSeconds`, so a plank shows
    "3 × 30s".
  - It is used by the fortnight endpoint. Existing iPhone responses are unchanged.
- **Weight guidance.** The response carries both the number and the text:
  - "Pick a weight you could lift 2 more times" for loaded exercises;
  - "Bodyweight" for bodyweight exercises;
  - "Hold with good form" for holds.

  The client decides which to show.
- **Fallback gate.** In `normalizeWorkoutResponse` (`ai.service.ts:519`):
  - a day with 0 exercises, or a plan with fewer days than asked for, **throws** instead
    of being padded with template days, so the existing retry runs;
  - `createAIWorkoutPlan`'s acceptance check becomes **at least 3 resolved exercises on
    every day**, not just a plan-wide total;
  - the numeric field defaults stay. They are clamped, and they only fill fields the
    response schema already requires.
- **Data minimisation.** Stop sending the user's first name to the model. It changes
  nothing in the plan. The Privacy Policy draft already lists it; I'll update that line.

### 8. Workout completion
- `POST /api/workouts/:id/complete` (existing route) becomes **idempotent**. A second
  call in the same plan-week returns 200 with the existing session and
  `alreadyCompleted: true` instead of a 400.
  - Checked: the iPhone app does not branch on the old 400 code.
- New `POST /api/workouts/:id/feel` with `{ feel: 'EASY'|'RIGHT'|'HARD' }`.
  - It sets `feel` on **this week's** session for that workout.
  - Re-rating overwrites, so it is idempotent.
  - With no session yet → 404 `NOT_COMPLETED`.
  - It is scoped by `userId`.
- New `POST /api/workouts/plans/:id/feedback` with
  `{ wouldFollow: 'YES'|'NOT_SURE'|'NO', missing?: string ≤ 1000 }`. This is the
  Phase 4 one-time feedback; the columns ride on this migration.

### 9. Waitlist export
`npm run export:waitlist` (a script, not an endpoint, to keep the attack surface small)
prints CSV with the columns `email, phonePlatform, signupSource, createdAt, workoutsDone`,
where `workoutsDone` is the count of `WorkoutSession` rows.

### 10. Tests
New tests for every endpoint and limit, using the unit project (mocked Prisma) unless noted:

- signupSource derivation (WEB from an allowed Origin, IOS without one, never from the body)
- Turnstile: required for web, success, failure, Cloudflare unreachable, skipped for iOS
- per-email signup and login limiters
- generation cap: reserve, refund on failure, parallel requests (db project), 429 at the limit
- acknowledgements: literal-true validation, first timestamp kept, 403 gate on generate
- spend: cost arithmetic from usage metadata, cap reached → 202 + queued, swap and summary
  skip the model under the cap
- queue drain: DONE + email, retries, FAILED + refund
- fallback gate: empty day throws, short plan throws, one empty day rejected
- presenter: plank → "3 × 30s", loaded → guidance, bodyweight → "Bodyweight"
- fortnight: two weeks only, done/feel from sessions, never `Workout.completed`, no
  progression run (db project)
- complete is idempotent; feel 404 before completion, overwrite after
- plan feedback; waitlist CSV escaping
- prompt test: the user's name is no longer in the prompt

All 373 existing tests must stay green.

---

## Decisions needed before I write the code

**A. Who must accept the disclaimer and AI consent before generating?**
The iPhone app has no disclaimer screen yet, so enforcing for everyone would break iPhone
plan generation today.

- *Recommended:* enforce for `signupSource = WEB` now, and list the iPhone screen as a
  follow-up (Apple 5.1.2(i) needs it there too).
- *Alternative:* enforce for every account, and accept that the iPhone build is blocked
  until it gets the screen.

**B. The equipment filter.**
`home_gym` means "anything but barbell", so a dumbbells-only user can get cable or machine
work. That contradicts the landing copy. `03-architecture.md` calls the real fix
"not in launch scope — do not widen it further".

- *Recommended:* fix it now. The catalog filter keeps an exercise only if **every** item it
  needs is in the user's list. Household items (floor, mat, chair, wall, towel, backpack,
  step, table) always count as available. Gym users stay unfiltered. This is a
  filter-the-pool change, in line with invariant 6.
  - Risk: a smaller catalog for minimal-kit users, so more generation retries. Covered
    by tests with the real seed counts.
- *Alternative:* leave the backend as it is and soften the landing copy.

**C. Same-day regenerate on web.**
The existing free limit is 1 generation per day, so a web user who wants to regenerate
right after their first plan is blocked until tomorrow.

- *Recommended:* web accounts use the lifetime cap (2) plus the per-IP limit instead of
  the per-day one. iPhone accounts are unchanged.
- *Alternative:* keep both limits.

**D. Currency for the spend cap.**

- *Recommended:* USD, because provider price sheets and invoices are in USD.
- *Alternative:* INR, with an exchange rate in env.

**Spec conflicts, flagged.** `01-working-agreement.md` §8 lists auth as "do not touch".
Your brief explicitly asks for Turnstile, signupSource and login limits on signup and
login, so I'm treating the brief as overriding that, for those additions only. Token,
session and refresh logic stay untouched.
