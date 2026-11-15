"use client";

import { useEffect, useRef, useState } from "react";

// The two weeks as a ring of 14 day segments. Plate colours code the three session
// types (red, blue, yellow by position in the week, as in the app), orange rings
// today, and rest days stay dark. On wide screens with motion allowed it is a
// scroll story in three steps; otherwise it shows the last step.

const R = 250; // day ring radius in the 640 viewBox
const C = 2 * Math.PI * R; // 1570.8
const PER = C / 14; // one day of arc
const GAP = 10;
const SEG = PER - GAP;

const RED = "#D8443A";
const BLUE = "#3B7AD6";
const YELLOW = "#E8B43B";

// Day index in the fortnight → session colour. Three sessions a week: Mon, Wed, Fri.
const SESSIONS = [
  { day: 0, color: RED },
  { day: 2, color: BLUE },
  { day: 4, color: YELLOW },
  { day: 7, color: RED },
  { day: 9, color: BLUE },
  { day: 11, color: YELLOW },
];
const TODAY = 4;

// Today's orange arc, slightly outside the day ring.
const R2 = 276;
const C2 = 2 * Math.PI * R2;
const ARC = (C2 / 14) * (SEG / PER);

const TAGS = [
  { label: "Goal", value: "Build strength", pos: "left-[4%] top-[120px]" },
  { label: "Kit", value: "Dumbbells, a bench", pos: "left-[10%] top-[360px]" },
  { label: "Level", value: "Beginner", pos: "left-[2%] top-[590px]" },
  { label: "Days", value: "3 a week", pos: "right-[5%] top-[150px]" },
  { label: "Kai · Hurts", value: "Left knee, a little", pos: "right-[11%] top-[380px]", now: true },
  { label: "Time", value: "45 minutes", pos: "right-[3%] top-[600px]" },
];

const STEPS = [
  { kicker: "Your answers", title: "Tell it what you have and what hurts", meta: "12 questions · about 3 minutes" },
  { kicker: "Your plan", title: "Fourteen days, built from your answers", meta: "3 sessions a week · rest days between" },
  { kicker: "Today · session 3", title: "Full body B", meta: "5 exercises · 15 sets · ~45 min", now: true },
];

function opacityFor(day: number, step: number) {
  if (step === 0) return 0;
  if (step === 1) return 0.32;
  return day < 7 ? 1 : 0.32;
}

export default function FortnightRing() {
  const ref = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [step, setStep] = useState(2);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 861px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setAnimated(wide.matches && !calm.matches);
    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!animated) {
      setStep(2);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      setStep(p < 0.3 ? 0 : p < 0.62 ? 1 : 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [animated]);

  const ringLabel =
    "Fourteen days in a ring. Three session types coded red, blue and yellow, three a week. Two sessions done, today ringed in orange, week two still to come.";

  return (
    <section ref={ref} aria-label="Your two weeks" className={`border-t border-white/[0.06] ${animated ? "h-[260vh]" : ""}`}>
      <div className={`flex flex-col justify-center ${animated ? "sticky top-0 h-screen overflow-hidden pt-16" : "py-16 md:py-20"}`}>
        <div className="relative mx-auto flex w-full max-w-page items-center justify-center min-[861px]:h-[760px]">
          <svg viewBox="0 0 640 640" role="img" aria-label={ringLabel} className="h-[340px] w-[340px] min-[861px]:h-[640px] min-[861px]:w-[640px]">
            <circle cx="320" cy="320" r="306" fill="none" stroke="rgba(237,235,230,.18)" strokeWidth="14" strokeDasharray="1 9.68" />
            <g transform="rotate(-90 320 320)">
              <circle cx="320" cy="320" r={R} fill="none" stroke="#1F2023" strokeWidth="26" strokeDasharray={`${SEG} ${GAP}`} />
              {SESSIONS.map((s) => (
                <circle
                  key={s.day}
                  cx="320"
                  cy="320"
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="26"
                  strokeDasharray={`${SEG} ${C - SEG}`}
                  strokeDashoffset={-s.day * PER}
                  style={{ opacity: opacityFor(s.day, step), transition: "opacity 500ms ease" }}
                />
              ))}
              <circle
                cx="320"
                cy="320"
                r={R2}
                fill="none"
                stroke="#FF5B22"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${ARC} ${C2 - ARC}`}
                strokeDashoffset={-TODAY * (C2 / 14)}
                style={{ opacity: step === 2 ? 1 : 0, transition: "opacity 500ms ease" }}
              />
            </g>
            <circle cx="320" cy="320" r="212" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
            <text x="320" y="36" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="#85857F" letterSpacing="1.5">WEEK 1</text>
            <text x="320" y="614" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="#85857F" letterSpacing="1.5">WEEK 2</text>
          </svg>

          <div className="absolute left-1/2 top-1/2 h-[150px] w-[220px] -translate-x-1/2 -translate-y-1/2 min-[861px]:w-[340px]">
            {STEPS.map((s, i) => (
              <div
                key={s.kicker}
                aria-hidden={i !== step}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center transition-opacity duration-500 min-[861px]:gap-3.5"
                style={{ opacity: i === step ? 1 : 0 }}
              >
                <span className={`font-mono text-[10px] uppercase tracking-label min-[861px]:text-[11px] ${s.now ? "text-now" : "text-dim"}`}>{s.kicker}</span>
                <p className="headline text-[17px] leading-[1.05] min-[861px]:text-[30px]">{s.title}</p>
                <span className="font-mono text-[10px] uppercase tracking-label-tight text-muted min-[861px]:text-[11px]">{s.meta}</span>
              </div>
            ))}
          </div>

          {TAGS.map((t) => (
            <div key={t.label} className={`absolute hidden min-[861px]:block ${t.pos}`}>
              <div className={`mb-1.5 font-mono text-[11px] ${t.now ? "text-now" : "text-dim"}`}>[{t.label}]</div>
              <div className="corners px-3.5 py-2.5 text-sm">{t.value}</div>
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-2 flex max-w-page flex-wrap justify-center gap-2 px-4 min-[861px]:hidden" aria-label="Your answers">
          {TAGS.slice(0, 5).map((t) => (
            <li key={t.label} className="corners px-3 py-2 text-[13px]">{t.value}</li>
          ))}
        </ul>

        <div className="mx-auto mt-5 flex max-w-page flex-wrap justify-center gap-6 px-4 font-mono text-[11px] uppercase tracking-label-tight text-dim">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-plate-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-plate-blue" />
            <span className="h-2.5 w-2.5 rounded-full bg-plate-yellow" />
            Session types
          </span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-now" />Today</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border border-control bg-cell" />Rest</span>
        </div>
      </div>
    </section>
  );
}
