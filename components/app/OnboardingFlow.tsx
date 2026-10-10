"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { api, ApiError, errorText } from "@/lib/api";
import {
  ACTIVITY, ALLERGIES, CONFIDENCE, DAYS, DIETS, EQUIPMENT, EXPERIENCE, GOALS, INJURY_AREAS, INJURY_RECENCY, LENGTHS,
  LOCATIONS, NO_ISSUES, OUTSIDE, PHONES, RECENCY, SEX, SLEEP_DURATION, SLEEP_QUALITY, STRESS,
  emptyAnswers, hasInjury, localMidnightISO, toProfile, type Answers, type Option,
} from "@/lib/onboarding";
import { profileComplete, useSession } from "./useSession";
import { Button, Chip, ChoiceCard, Notice, SectionLabel, Spinner, TextField } from "./ui";

const DRAFT_KEY = "zorr.onboarding.v1";
/** Server-side generation can take ~80s (two model attempts); give it room before calling it a timeout. */
const GENERATE_TIMEOUT_MS = 100_000;

type Step = {
  id: string;
  title: React.ReactNode;
  helper?: string;
  valid: (a: Answers) => boolean;
  render: (a: Answers, set: (p: Partial<Answers>) => void) => React.ReactNode;
};

function Choices({ name, options, value, onChange, label }: { name: string; options: Option[]; value?: string; onChange: (id: string) => void; label?: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col gap-2.5">
      {options.map((o) => (
        <ChoiceCard key={o.id} name={name} title={o.title} description={o.description} selected={value === o.id} onSelect={() => onChange(o.id)} />
      ))}
    </div>
  );
}

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

const inRange = (v: string, min: number, max: number) => {
  const n = Number(v);
  return v.trim() !== "" && Number.isFinite(n) && n >= min && n <= max;
};

/** Every onboarding screen, in order. Same questions as the iPhone app, plus the phone question. */
const STEPS: Step[] = [
  {
    id: "basics",
    title: <>First, the <span className="text-accent">basics</span></>,
    helper: "Just enough to size your plan.",
    valid: (a) => inRange(a.age, 18, 100) && !!a.sex && inRange(a.heightCm, 100, 250) && inRange(a.weightKg, 20, 300),
    render: (a, set) => (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Age" inputMode="numeric" unit="yrs" maxLength={3} value={a.age} onChange={(e) => set({ age: e.target.value.replace(/\D/g, "") })} error={a.age && !inRange(a.age, 18, 100) ? "18 to 100" : undefined} />
          <TextField label="Height" inputMode="numeric" unit="cm" maxLength={3} value={a.heightCm} onChange={(e) => set({ heightCm: e.target.value.replace(/\D/g, "") })} error={a.heightCm && !inRange(a.heightCm, 100, 250) ? "100 to 250" : undefined} />
        </div>
        <TextField label="Weight" inputMode="decimal" unit="kg" maxLength={5} value={a.weightKg} onChange={(e) => set({ weightKg: e.target.value.replace(/[^\d.]/g, "") })} error={a.weightKg && !inRange(a.weightKg, 20, 300) ? "20 to 300" : undefined} />
        <div>
          <SectionLabel>Sex</SectionLabel>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {SEX.map((s) => (
              <Chip key={s.id} pressed={a.sex === s.id} onToggle={() => set({ sex: s.id })}>{s.title}</Chip>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "goal",
    title: <>What are you <span className="text-accent">training for?</span></>,
    helper: "Pick the one that matters most right now.",
    valid: (a) => !!a.goal,
    render: (a, set) => <Choices name="goal" label="Goal" options={GOALS} value={a.goal} onChange={(goal) => set({ goal })} />,
  },
  {
    id: "experience",
    title: <>How long have you been <span className="text-accent">training?</span></>,
    helper: "This sets how hard week one starts. No wrong answers.",
    valid: (a) => !!a.experience,
    render: (a, set) => <Choices name="experience" label="Experience" options={EXPERIENCE} value={a.experience} onChange={(experience) => set({ experience })} />,
  },
  {
    id: "recency",
    title: <>When did you last train <span className="text-accent">consistently?</span></>,
    helper: "Coming back after a break? The first weeks ease you in.",
    valid: (a) => !!a.trainingRecency,
    render: (a, set) => <Choices name="recency" label="Last trained" options={RECENCY} value={a.trainingRecency} onChange={(trainingRecency) => set({ trainingRecency })} />,
  },
  {
    id: "confidence",
    title: <>How confident are you with the <span className="text-accent">movements?</span></>,
    valid: (a) => !!a.movementConfidence,
    render: (a, set) => <Choices name="confidence" label="Confidence" options={CONFIDENCE} value={a.movementConfidence} onChange={(movementConfidence) => set({ movementConfidence })} />,
  },
  {
    id: "activity",
    title: <>How active are you <span className="text-accent">day to day?</span></>,
    helper: "Outside training: your job and how much you move.",
    valid: (a) => !!a.activity,
    render: (a, set) => <Choices name="activity" label="Activity" options={ACTIVITY} value={a.activity} onChange={(activity) => set({ activity })} />,
  },
  {
    id: "equipment",
    title: <>Where will you <span className="text-accent">train?</span></>,
    helper: "Every exercise in your plan will fit what you have.",
    valid: (a) => !!a.location && (a.location === "gym" || a.equipment.length > 0) && (a.location !== "home" || a.joiningGym !== undefined),
    render: (a, set) => (
      <div className="flex flex-col gap-7">
        <Choices name="location" label="Where you train" options={LOCATIONS} value={a.location} onChange={(location) => set({ location })} />
        {(a.location === "home" || a.location === "both") && (
          <div>
            <SectionLabel id="kit-label">What do you have at home?</SectionLabel>
            <div role="group" aria-labelledby="kit-label" className="mt-2.5 flex flex-wrap gap-2">
              {EQUIPMENT.map((e) => (
                <Chip
                  key={e}
                  pressed={a.equipment.includes(e)}
                  onToggle={() =>
                    set({
                      equipment:
                        e === "Bodyweight only"
                          ? a.equipment.includes(e) ? [] : [e]
                          : toggle(a.equipment.filter((x) => x !== "Bodyweight only"), e),
                    })
                  }
                >
                  {e}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {a.location === "home" && (
          <div>
            <SectionLabel id="join-label">Planning to join a gym soon?</SectionLabel>
            <div role="group" aria-labelledby="join-label" className="mt-2.5 grid grid-cols-2 gap-2">
              <Chip pressed={a.joiningGym === true} onToggle={() => set({ joiningGym: true })}>Yes, soon</Chip>
              <Chip pressed={a.joiningGym === false} onToggle={() => set({ joiningGym: false })}>Not for now</Chip>
            </div>
          </div>
        )}
      </div>
    ),
  },
  {
    id: "schedule",
    title: <>How often can you <span className="text-accent">train?</span></>,
    helper: "Be realistic. Three days you keep beat six you skip.",
    valid: (a) => !!a.daysPerWeek && !!a.sessionLength,
    render: (a, set) => (
      <div className="flex flex-col gap-7">
        <div>
          <SectionLabel id="days-label">Days per week</SectionLabel>
          <div role="group" aria-labelledby="days-label" className="mt-2.5 grid grid-cols-5 gap-2">
            {DAYS.map((d) => (
              <Chip key={d} pressed={a.daysPerWeek === d} onToggle={() => set({ daysPerWeek: d })}>{d}</Chip>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel id="len-label">Time per session</SectionLabel>
          <div role="group" aria-labelledby="len-label" className="mt-2.5 grid grid-cols-4 gap-2">
            {LENGTHS.map((m) => (
              <Chip key={m} pressed={a.sessionLength === m} onToggle={() => set({ sessionLength: m })}>{m} min</Chip>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "injuries",
    title: <>Anything that <span className="text-accent">hurts?</span></>,
    helper: "Be honest. Anything that could aggravate it is left out of your plan, not just made lighter.",
    valid: (a) => a.injuries.length > 0 && (!hasInjury(a) || !!a.injuryRecency),
    render: (a, set) => (
      <div className="flex flex-col gap-6">
        <Chip pressed={a.injuries.includes(NO_ISSUES)} onToggle={() => set({ injuries: a.injuries.includes(NO_ISSUES) ? [] : [NO_ISSUES], injuryRecency: undefined })}>
          Nothing, I&rsquo;m good
        </Chip>
        <div>
          <SectionLabel id="areas-label">Or pick what to protect</SectionLabel>
          <div role="group" aria-labelledby="areas-label" className="mt-2.5 flex flex-wrap gap-2">
            {INJURY_AREAS.map((area) => (
              <Chip key={area} pressed={a.injuries.includes(area)} onToggle={() => set({ injuries: toggle(a.injuries.filter((i) => i !== NO_ISSUES), area) })}>
                {area}
              </Chip>
            ))}
          </div>
        </div>
        {hasInjury(a) && (
          <>
            <div>
              <SectionLabel>When did it happen?</SectionLabel>
              <div className="mt-2.5">
                <Choices name="injuryRecency" label="When it happened" options={INJURY_RECENCY} value={a.injuryRecency} onChange={(injuryRecency) => set({ injuryRecency })} />
              </div>
            </div>
            <div>
              <label htmlFor="injury-note" className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">Anything else? (optional)</label>
              <textarea
                id="injury-note"
                maxLength={1000}
                rows={3}
                value={a.injuryNote}
                onChange={(e) => set({ injuryNote: e.target.value })}
                placeholder="For example: aches after heavy deadlifts"
                className="w-full rounded-xl border border-control bg-surface-3 px-4 py-3 text-base text-fg placeholder:text-dim focus:border-soft focus:outline-none"
              />
            </div>
          </>
        )}
      </div>
    ),
  },
  {
    id: "outside",
    title: <>Any activity <span className="text-accent">outside</span> training?</>,
    helper: "Optional. Your plan leaves room to recover from it.",
    valid: () => true,
    render: (a, set) => (
      <div role="group" aria-label="Outside activities" className="flex flex-wrap gap-2">
        {OUTSIDE.map((o) => (
          <Chip key={o} pressed={a.outsideActivities.includes(o)} onToggle={() => set({ outsideActivities: toggle(a.outsideActivities, o) })}>{o}</Chip>
        ))}
      </div>
    ),
  },
  {
    id: "sleep",
    title: <>How do you usually <span className="text-accent">sleep?</span></>,
    valid: (a) => !!a.sleepDuration && !!a.sleepQuality,
    render: (a, set) => (
      <div className="flex flex-col gap-7">
        <div>
          <SectionLabel id="sleep-label">Hours a night</SectionLabel>
          <div role="group" aria-labelledby="sleep-label" className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {SLEEP_DURATION.map((d) => (
              <Chip key={d} pressed={a.sleepDuration === d} onToggle={() => set({ sleepDuration: d })}>{d}</Chip>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel id="quality-label">How it usually feels</SectionLabel>
          <div role="group" aria-labelledby="quality-label" className="mt-2.5 grid grid-cols-3 gap-2">
            {SLEEP_QUALITY.map((q) => (
              <Chip key={q.id} pressed={a.sleepQuality === q.id} onToggle={() => set({ sleepQuality: q.id })}>{q.title}</Chip>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "stress",
    title: <>How&rsquo;s your <span className="text-accent">stress</span> lately?</>,
    helper: "Stress affects recovery as much as training does.",
    valid: (a) => !!a.stress,
    render: (a, set) => <Choices name="stress" label="Stress" options={STRESS} value={a.stress} onChange={(stress) => set({ stress })} />,
  },
  {
    id: "diet",
    title: <>How do you <span className="text-accent">eat?</span></>,
    valid: (a) => !!a.diet,
    render: (a, set) => (
      <div className="flex flex-col gap-7">
        <Choices name="diet" label="Diet" options={DIETS} value={a.diet} onChange={(diet) => set({ diet })} />
        <div>
          <SectionLabel id="allergy-label">Anything to avoid? (optional)</SectionLabel>
          <div role="group" aria-labelledby="allergy-label" className="mt-2.5 flex flex-wrap gap-2">
            {ALLERGIES.map((x) => (
              <Chip key={x} pressed={a.allergies.includes(x)} onToggle={() => set({ allergies: toggle(a.allergies, x) })}>{x}</Chip>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "phone",
    title: <>Which phone do you <span className="text-accent">use?</span></>,
    helper: "The iPhone app comes first. Your answer tells us what to build next.",
    valid: (a) => !!a.phonePlatform,
    render: (a, set) => <Choices name="phone" label="Phone" options={PHONES} value={a.phonePlatform} onChange={(phonePlatform) => set({ phonePlatform })} />,
  },
];

/** What the user is agreeing to send. Mirrors the Privacy Policy's "What we send to the AI". */
const SENT_TO_AI = "your age, weight, goal, experience, equipment, schedule, daily activity, sleep, stress, diet, allergies, what hurts and your note about it, and activities outside training";

type Phase = { kind: "questions" } | { kind: "consent" } | { kind: "generating"; startedAt: number } | { kind: "queued"; message: string } | { kind: "failed"; message: string; retryable: boolean };

export default function OnboardingFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const rebuild = params.get("rebuild") === "1";
  const { profile } = useSession();
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>({ kind: "questions" });
  const [disclaimer, setDisclaimer] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // A finished profile with a plan does not belong here unless it is a deliberate rebuild.
  useEffect(() => {
    if (profile && profileComplete(profile) && !rebuild && profile.planGenerationCount > 0) router.replace("/plan");
  }, [profile, rebuild, router]);

  // Answers survive a refresh within the tab; nothing is kept after the tab closes.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { answers: Answers; index: number };
        setAnswers({ ...emptyAnswers, ...saved.answers });
        setIndex(Math.min(saved.index, STEPS.length - 1));
      }
    } catch {
      /* storage unavailable: start fresh */
    }
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, index }));
    } catch {
      /* ignore */
    }
  }, [answers, index]);

  // Move focus to each new screen's heading so screen readers announce it.
  useEffect(() => {
    headingRef.current?.focus();
  }, [index, phase.kind]);

  const set = (p: Partial<Answers>) => setAnswers((a) => ({ ...a, ...p }));
  const step = STEPS[index];
  const total = STEPS.length + 1; // + the consent screen
  const position = phase.kind === "questions" ? index + 1 : total;
  const progress = useMemo(() => Math.round((position / total) * 100), [position, total]);

  function next() {
    setError(null);
    if (index < STEPS.length - 1) setIndex(index + 1);
    else setPhase({ kind: "consent" });
  }
  function back() {
    setError(null);
    if (phase.kind === "consent") setPhase({ kind: "questions" });
    else if (index > 0) setIndex(index - 1);
  }

  /** Saves answers, records both acknowledgements, then asks for the plan. */
  async function build() {
    setError(null);
    setPhase({ kind: "generating", startedAt: Date.now() });
    try {
      await api("/user/profile", { method: "PUT", body: toProfile(answers) });
      await api("/user/acknowledgements", { method: "POST", body: { disclaimer: true, aiConsent: true } });
      await generate();
    } catch (err) {
      fail(err);
    }
  }

  /** The generation call alone, so a retry does not re-save anything. */
  async function generate() {
    setPhase({ kind: "generating", startedAt: Date.now() });
    try {
      const res = await api<{ plan?: unknown; queued?: boolean; message?: string }>("/workouts/generate", {
        method: "POST",
        body: { daysPerWeek: answers.daysPerWeek, ...(rebuild ? { regenerate: true } : {}) },
        timeoutMs: GENERATE_TIMEOUT_MS,
      });
      if (res.queued) {
        setPhase({ kind: "queued", message: res.message ?? "We're at capacity today, you'll get an email when your plan is ready." });
        return;
      }
      // Start the plan at today's local midnight so its weeks line up with calendar days.
      await api("/workouts/plans/current/start-date", { method: "PATCH", body: { startDate: localMidnightISO() } });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      router.replace("/plan?new=1");
    } catch (err) {
      fail(err);
    }
  }

  function fail(err: unknown) {
    if (err instanceof ApiError && err.code === "ACKNOWLEDGEMENT_REQUIRED") {
      setPhase({ kind: "consent" });
      setError(err.message);
      return;
    }
    if (err instanceof ApiError && err.code === "GENERATION_LIMIT_REACHED") {
      setPhase({ kind: "failed", message: err.message, retryable: false });
      return;
    }
    const message =
      err instanceof ApiError && err.code === "TIMEOUT"
        ? "This is taking longer than usual. Your plan may still be on its way. Try again and we will pick it up if it is ready."
        : errorText(err);
    setPhase({ kind: "failed", message, retryable: true });
  }

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        <Spinner className="mr-3" /> Loading
      </div>
    );
  }

  if (phase.kind === "generating") return <Generating startedAt={phase.startedAt} />;

  if (phase.kind === "queued") {
    return (
      <Centered title={<>You&rsquo;re in the <span className="text-accent">queue</span></>}>
        <p>{phase.message}</p>
        <p>Your answers are saved. Nothing else to do.</p>
        <Link href="/plan" className="text-fg underline decoration-accent underline-offset-4">Go to my plan page</Link>
      </Centered>
    );
  }

  if (phase.kind === "failed") {
    return (
      <Centered title="That didn't work">
        <Notice>{phase.message}</Notice>
        {phase.retryable ? (
          <>
            <p className="text-[15px]">Trying again does not use up one of your plans.</p>
            <Button full onClick={generate}>Try again</Button>
          </>
        ) : (
          <Link href="/plan" className="text-fg underline decoration-accent underline-offset-4">Go to my plan</Link>
        )}
      </Centered>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={back} disabled={phase.kind === "questions" && index === 0} aria-label="Back" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-control text-soft disabled:invisible">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
        <div className="flex-1">
          <div role="progressbar" aria-label="Onboarding progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-1 rounded-full bg-control-2">
            <div className="h-1 rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-label text-muted">
            {position} of {total}
          </p>
        </div>
      </div>

      {phase.kind === "questions" ? (
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (step.valid(answers)) next();
          }}
        >
          <h1 ref={headingRef} tabIndex={-1} className="headline text-[clamp(36px,10vw,52px)] leading-[0.95] focus:outline-none">
            {step.title}
          </h1>
          {step.helper && <p className="mt-3 text-[16px] leading-[1.55] text-muted">{step.helper}</p>}
          <div className="mt-7">{step.render(answers, set)}</div>
          <div className="sticky bottom-0 -mx-4 mt-8 border-t border-line bg-bg/[0.95] px-4 pb-4 pt-4 backdrop-blur">
            <Button type="submit" full disabled={!step.valid(answers)}>
              {step.id === "outside" && answers.outsideActivities.length === 0 ? "Skip" : "Continue"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-8">
          <h1 ref={headingRef} tabIndex={-1} className="headline text-[clamp(36px,10vw,52px)] leading-[0.95] focus:outline-none">
            Before we <span className="text-accent">build it</span>
          </h1>
          {error && <div className="mt-5"><Notice>{error}</Notice></div>}
          <div className="mt-6 rounded-2xl border border-accent bg-accent/5 p-5 text-[15px] leading-[1.6] text-soft">
            <p className="label text-accent">Health and safety</p>
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
              <li>Zorr is not medical advice and does not replace a doctor or physiotherapist.</li>
              <li>Check with a doctor before you start, especially with an injury, a condition, pregnancy or medication.</li>
              <li>Stop if you feel pain, dizziness or chest discomfort.</li>
              <li>Plans are made by software and can be wrong. Choose weights you can lift safely.</li>
            </ul>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-soft">
              <input type="checkbox" checked={disclaimer} onChange={(e) => setDisclaimer(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#FF5C1F]" />
              <span>I understand this, and I train at my own risk.</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-soft">
              <input type="checkbox" checked={aiConsent} onChange={(e) => setAiConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#FF5C1F]" />
              <span>
                I agree to my answers ({SENT_TO_AI}) being sent to a third-party AI model, Google&rsquo;s Gemini, to write my plan. My name, email
                and password are never sent.{" "}
                <Link href="/privacy#ai" target="_blank" className="text-fg underline decoration-accent underline-offset-2">Details</Link>
              </span>
            </label>
          </div>
          <div className="mt-8">
            <Button full disabled={!disclaimer || !aiConsent} onClick={build}>
              Build my plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Centered({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className="pt-6">
      <h1 ref={ref} tabIndex={-1} className="headline text-[clamp(36px,10vw,52px)] leading-[0.95] focus:outline-none">{title}</h1>
      <div className="mt-6 flex flex-col gap-5 text-[16px] leading-[1.6] text-muted">{children}</div>
    </div>
  );
}

/**
 * The honest wait: what is actually happening and how long it usually takes, with a
 * real elapsed timer. No fake progress bar or checklist ticking along on a timer.
 */
function Generating({ startedAt }: { startedAt: number }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startedAt]);
  return (
    <div className="pt-6" aria-busy="true">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-label text-accent">
        <Spinner /> Building your plan
      </div>
      <h1 className="headline mt-5 text-[clamp(36px,10vw,52px)] leading-[0.95]">This takes up to a minute</h1>
      <p className="mt-4 text-[16px] leading-[1.6] text-muted">Keep this page open. Here is what happens in that time:</p>
      <div className="legal !text-[16px]">
        <ul>
          <li>Exercises are picked only from ones your equipment allows.</li>
          <li>Anything that could aggravate what hurts is left out.</li>
          <li>Every starting load is checked against our safety limits.</li>
        </ul>
      </div>
      <p className="mt-6 font-mono text-sm text-muted" aria-live="off">
        {seconds}s
      </p>
    </div>
  );
}
