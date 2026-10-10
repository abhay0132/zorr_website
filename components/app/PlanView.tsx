"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, errorText } from "@/lib/api";
import { localMidnightISO } from "@/lib/onboarding";
import VideoSlot from "@/components/VideoSlot";
import { Check } from "@/components/icons";
import { useSession } from "./useSession";
import { Button, Notice, Spinner } from "./ui";

// ─── The shape of GET /api/workouts/fortnight ─────────────────────────────────

type Feel = "EASY" | "RIGHT" | "HARD";
type Prescription = { display: string; weightKg: number | null; weightGuidance: string; perSide: boolean; holdSeconds: number | null };
type Exercise = { workoutExerciseId: string; name: string; cues: string[]; videoUrl: string | null; restSeconds: number; prescription: Prescription };
type Day = { workoutId: string; weekNumber: number; date: string; name: string; done: boolean; feel: Feel | null; exercises: Exercise[] };
type Week = { weekNumber: number; days: Day[] };
type Fortnight = {
  plan: { id: string; name: string; daysPerWeek: number; startDate: string; feedbackGiven: boolean } | null;
  today: string;
  currentWeek?: number;
  progress?: { done: number; total: number };
  weeks: Week[];
};

/** Plan web allowance (backend WEB_PLAN_GENERATION_LIMIT). Only used to word the rebuild link. */
const WEB_PLAN_LIMIT = 2;

const ymd = (iso: string) => iso.slice(0, 10);
function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function formatDay(day: string): string {
  return new Date(`${day}T00:00:00.000Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

/** A plan built while the user was away (queued) starts mid-day; align it once to a midnight. */
function startsMidDay(startDate: string): boolean {
  const d = new Date(startDate);
  return d.getHours() !== 0 || d.getMinutes() !== 0;
}

export default function PlanView() {
  const params = useSearchParams();
  const { profile } = useSession();
  const [data, setData] = useState<Fortnight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [week, setWeek] = useState(1);
  const aligned = useRef(false);

  const load = useCallback(async () => {
    try {
      let f = await api<Fortnight>("/workouts/fortnight");
      if (f.plan && !aligned.current && f.progress?.done === 0 && f.currentWeek === 1 && startsMidDay(f.plan.startDate)) {
        aligned.current = true;
        await api("/workouts/plans/current/start-date", { method: "PATCH", body: { startDate: localMidnightISO() } });
        f = await api<Fortnight>("/workouts/fortnight");
      }
      setData(f);
      setWeek((w) => (f.currentWeek && f.currentWeek <= 2 ? f.currentWeek : w));
    } catch (err) {
      setError(errorText(err));
    }
  }, []);

  useEffect(() => {
    if (profile) void load();
  }, [profile, load]);

  /** Optimistically updates one day, so the tap feels instant on a slow gym connection. */
  const patchDay = (workoutId: string, weekNumber: number, patch: Partial<Day>) =>
    setData((d) =>
      d && {
        ...d,
        weeks: d.weeks.map((w) => ({ ...w, days: w.days.map((x) => (x.workoutId === workoutId && x.weekNumber === weekNumber ? { ...x, ...patch } : x)) })),
        progress: d.progress && patch.done ? { ...d.progress, done: d.progress.done + 1 } : d.progress,
      },
    );

  if (error) return <Notice>{error} <button className="underline" onClick={() => { setError(null); void load(); }}>Try again</button></Notice>;
  if (!profile || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        <Spinner className="mr-3" /> Loading your plan
      </div>
    );
  }

  if (!data.plan) {
    const waiting = profile.planGenerationCount > 0;
    return (
      <div className="pt-4">
        <h1 className="headline text-[clamp(36px,10vw,52px)] leading-[0.95]">
          {waiting ? <>Your plan is <span className="text-accent">on its way</span></> : <>No plan <span className="text-accent">yet</span></>}
        </h1>
        <p className="mt-4 text-[16px] leading-[1.6] text-muted">
          {waiting ? "We're at capacity today. We'll email you as soon as your plan is ready." : "Answer a few questions and your first two weeks are ready in about a minute."}
        </p>
        {!waiting && (
          <Link href="/onboarding" className="btn-accent mt-6 min-h-[52px] px-6 hover:text-on-accent">Build my plan</Link>
        )}
        <ComingToIphone />
      </div>
    );
  }

  const current = data.weeks.find((w) => w.weekNumber === week) ?? data.weeks[0];
  const rebuildsLeft = profile.signupSource === "WEB" ? Math.max(0, WEB_PLAN_LIMIT - profile.planGenerationCount) : 0;
  const nextUp = current.days.find((d) => !d.done && ymd(d.date) >= ymd(data.today));

  return (
    <div>
      {params.get("new") === "1" && (
        <div className="mb-6"><Notice tone="info">Your first two weeks are ready. Start with the day marked today, or the next one up.</Notice></div>
      )}

      <p className="label text-accent">Your two weeks</p>
      <h1 className="headline mt-2 text-[clamp(34px,9vw,52px)] leading-[0.95]">{data.plan.name}</h1>
      <p className="mt-3 text-[15px] text-muted">
        {data.progress?.done ?? 0} of {data.progress?.total ?? 0} workouts done. Miss a day and the plan simply carries on.
      </p>

      <FortnightGrid data={data} />

      <div role="tablist" aria-label="Week" className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-surface p-1">
        {data.weeks.map((w) => (
          <button
            key={w.weekNumber}
            role="tab"
            aria-selected={w.weekNumber === week}
            onClick={() => setWeek(w.weekNumber)}
            className={`min-h-[44px] rounded-lg font-mono text-xs uppercase tracking-label ${w.weekNumber === week ? "bg-surface-2 text-fg" : "text-muted"}`}
          >
            Week {w.weekNumber}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={`Week ${week}`} className="mt-4 flex flex-col gap-3">
        {current.days.map((day) => (
          <DayCard
            key={`${day.workoutId}-${day.weekNumber}`}
            day={day}
            today={ymd(data.today)}
            currentWeek={data.currentWeek ?? 1}
            defaultOpen={day === nextUp}
            onChange={(patch) => patchDay(day.workoutId, day.weekNumber, patch)}
          />
        ))}
      </div>

      {!data.plan.feedbackGiven && <PlanFeedback planId={data.plan.id} />}

      {rebuildsLeft > 0 && (
        <p className="mt-8 text-[15px] text-muted">
          Plan not right for you?{" "}
          <Link href="/onboarding?rebuild=1" className="text-fg underline decoration-control-3 underline-offset-4">Change your answers and rebuild it</Link>
          . You can do this {rebuildsLeft === 1 ? "once more" : `${rebuildsLeft} more times`} on the web.
        </p>
      )}

      <ComingToIphone />
    </div>
  );
}

/** 14 squares from the plan's first day: done, today, workout ahead, rest. */
function FortnightGrid({ data }: { data: Fortnight }) {
  const days = data.weeks.flatMap((w) => w.days);
  const start = ymd(data.weeks[0]?.days[0]?.date ?? data.today);
  const first = days.reduce((min, d) => (ymd(d.date) < min ? ymd(d.date) : min), start);
  const today = ymd(data.today);
  const cells = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(first, i);
    const day = days.find((d) => ymd(d.date) === date);
    return { date, day };
  });
  const label = `Two-week grid: ${data.progress?.done ?? 0} of ${data.progress?.total ?? 0} workouts done`;
  return (
    <div role="img" aria-label={label} className="mt-6 grid grid-cols-7 gap-1.5">
      {cells.map(({ date, day }) => {
        const isToday = date === today;
        const cls = day?.done
          ? "bg-accent"
          : isToday
            ? "border-[1.5px] border-fg"
            : day && date > today
              ? "border border-dashed border-control-3"
              : "bg-cell";
        return <span key={date} className={`aspect-square rounded-lg ${cls}`} />;
      })}
    </div>
  );
}

function DayCard({ day, today, currentWeek, defaultOpen, onChange }: { day: Day; today: string; currentWeek: number; defaultOpen: boolean; onChange: (p: Partial<Day>) => void }) {
  const [open, setOpen] = useState(defaultOpen);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const date = ymd(day.date);
  const isToday = date === today;
  // Completion is recorded against the CURRENT plan week, so only this week's days,
  // today or earlier, can be marked. A future day is "coming up"; a past week's is gone.
  const canMark = !day.done && day.weekNumber === currentWeek && date <= today;
  const status = day.done ? "Done" : isToday ? "Today" : date > today ? "Coming up" : day.weekNumber < currentWeek ? "Missed" : "Not done yet";
  const panelId = `day-${day.workoutId}-${day.weekNumber}`;

  async function markDone() {
    setBusy(true);
    setError(null);
    try {
      await api(`/workouts/${day.workoutId}/complete`, { method: "POST", body: {} });
      onChange({ done: true });
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  async function rate(feel: Feel) {
    const before = day.feel;
    onChange({ feel });
    try {
      await api(`/workouts/${day.workoutId}/feel`, { method: "POST", body: { feel } });
    } catch (err) {
      onChange({ feel: before });
      setError(errorText(err));
    }
  }

  return (
    <article className={`rounded-2xl border ${isToday ? "border-control-3" : "border-line"} bg-surface`}>
      <h2 className="m-0">
        <button type="button" aria-expanded={open} aria-controls={panelId} aria-label={`${day.name}, ${formatDay(date)}, ${status}`} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-4 text-left">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${day.done ? "bg-accent text-on-accent" : "border border-control text-muted"}`}>
              {day.done ? <Check /> : <span className="font-mono text-[11px]">{day.exercises.length}</span>}
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-label-tight text-muted">
                {formatDay(date)} · {status}
              </span>
              <span className="mt-0.5 block font-display text-[22px] font-extrabold uppercase leading-tight" style={{ fontStretch: "75%" }}>{day.name}</span>
            </span>
          </span>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </h2>

      <div id={panelId} hidden={!open} className="border-t border-line-soft px-4 pb-4">
        <ol className="flex flex-col">
          {day.exercises.map((ex) => (
            <ExerciseRow key={ex.workoutExerciseId} ex={ex} />
          ))}
        </ol>

        {error && <div className="mt-3"><Notice>{error}</Notice></div>}

        {canMark && (
          <div className="mt-4">
            <Button full loading={busy} onClick={markDone}>Mark day done</Button>
          </div>
        )}

        {day.done && (
          <div className="mt-4 rounded-xl bg-surface-2 p-4">
            <p id={`${panelId}-feel`} className="text-[15px] text-soft">How did that feel?</p>
            <div role="group" aria-labelledby={`${panelId}-feel`} className="mt-3 grid grid-cols-3 gap-2">
              {(["EASY", "RIGHT", "HARD"] as Feel[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={day.feel === f}
                  onClick={() => rate(f)}
                  className={`min-h-[44px] rounded-lg text-[15px] ${day.feel === f ? "bg-accent font-semibold text-on-accent" : "bg-surface-3 text-fg outline outline-1 outline-control"}`}
                >
                  {f === "EASY" ? "Easy" : f === "RIGHT" ? "Right" : "Hard"}
                </button>
              ))}
            </div>
            {day.feel && <p className="mt-3 text-[13px] text-muted" role="status">Thanks, saved.</p>}
          </div>
        )}
      </div>
    </article>
  );
}

function ExerciseRow({ ex }: { ex: Exercise }) {
  const p = ex.prescription;
  return (
    <li className="border-b border-line-soft py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[16px] font-medium text-fg">{ex.name}</p>
          <p className="mt-1 text-[13px] text-muted">
            {p.weightGuidance}
            {p.perSide ? " · each side" : ""} · rest {ex.restSeconds}s
          </p>
        </div>
        <p className="whitespace-nowrap font-mono text-[15px] text-accent">{p.display}</p>
      </div>
      {ex.videoUrl && <VideoSlot title={ex.name} videoUrl={ex.videoUrl} className="mt-3" />}
      {ex.cues.length > 0 && (
        <ol className="mt-3 flex flex-col gap-1.5">
          {ex.cues.slice(0, 3).map((cue, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-[1.5] text-soft">
              <span aria-hidden="true" className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              {/* The library splits cues on ";", so all but the first start lower-case. */}
              {cue.charAt(0).toUpperCase() + cue.slice(1)}
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

/** Asked once per plan: would you follow it, and what is missing. */
function PlanFeedback({ planId }: { planId: string }) {
  const [answer, setAnswer] = useState<"YES" | "NOT_SURE" | "NO" | null>(null);
  const [missing, setMissing] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function send() {
    if (!answer) return;
    setState("sending");
    setError(null);
    try {
      await api(`/workouts/plans/${planId}/feedback`, { method: "POST", body: { wouldFollow: answer, missing: missing.trim() || undefined } });
      setState("sent");
    } catch (err) {
      setError(errorText(err));
      setState("idle");
    }
  }

  if (state === "sent") {
    return <div className="mt-8"><Notice tone="info">Thanks for telling us.</Notice></div>;
  }
  return (
    <section aria-labelledby="feedback-h" className="mt-8 rounded-2xl border border-line bg-surface p-5">
      <h2 id="feedback-h" className="text-[18px] font-semibold">Would you follow this plan?</h2>
      <div role="group" aria-labelledby="feedback-h" className="mt-4 grid grid-cols-3 gap-2">
        {([["YES", "Yes"], ["NOT_SURE", "Not sure"], ["NO", "No"]] as const).map(([id, label]) => (
          <button key={id} type="button" aria-pressed={answer === id} onClick={() => setAnswer(id)} className={`min-h-[44px] rounded-lg text-[15px] ${answer === id ? "bg-accent font-semibold text-on-accent" : "bg-surface-3 outline outline-1 outline-control"}`}>
            {label}
          </button>
        ))}
      </div>
      <label htmlFor="missing" className="mt-5 block font-mono text-[11px] uppercase tracking-label text-muted">What&rsquo;s missing? (optional)</label>
      <textarea id="missing" rows={3} maxLength={1000} value={missing} onChange={(e) => setMissing(e.target.value)} className="mt-2 w-full rounded-xl border border-control bg-surface-3 px-4 py-3 text-base text-fg focus:border-soft focus:outline-none" />
      {error && <div className="mt-3"><Notice>{error}</Notice></div>}
      <div className="mt-4">
        <Button full disabled={!answer} loading={state === "sending"} onClick={send}>Send</Button>
      </div>
    </section>
  );
}

/** Future tense only: none of this is on the web. */
export function ComingToIphone() {
  return (
    <section aria-labelledby="iphone-h" className="mt-10 rounded-2xl bg-accent p-5 text-on-accent">
      <span className="inline-block rounded-md bg-bg px-2.5 py-1 font-mono text-[11px] uppercase tracking-label text-fg">Coming to iPhone</span>
      <h2 id="iphone-h" className="headline mt-3 text-[30px] font-black leading-[0.95]">Your account carries over</h2>
      <p className="mt-3 text-[15px] leading-[1.55] text-on-accent-soft">
        We&rsquo;ll email your invite. On iPhone you will be able to swap an exercise when the bench is taken, and your plan will adjust to what you actually lifted.
      </p>
    </section>
  );
}
