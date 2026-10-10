# Future features (web)

In priority order.

1. Phase 3 — Backend: phonePlatform, signupSource, lifetime generation cap (1 + 1 regen),
   Turnstile, daily spend cap with queue, disclaimerAckAt, 2-week scope, holdSeconds,
   weight guidance, fallback-day gate, equipment filter on Exercise.equipment[],
   idempotent complete + feel, waitlist export, and stop sending the user's first name
   to the AI (it changes nothing in the plan; data minimisation).
2. Phase 4 — Sign-up/login, onboarding (+ phone question, disclaimer), generating state,
   /plan with completion grid and feel prompt, feedback, /account with delete and export.
   Onboarding MUST ask explicit permission before answers go to the AI (Apple 5.1.2(i);
   the Privacy Policy already says we do).
3. Phase 5 — Emails, privacy-respecting analytics, Sentry, admin stats.
4. Phase 6 — Deploy to Vercel; DNS only with explicit go.
5. Form videos: populate Exercise.videoUrl; VideoSlot already accepts a URL.
