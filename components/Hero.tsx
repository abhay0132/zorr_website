import Link from "next/link";
import { ArrowRight, Check } from "./icons";
import { SIGNUP_PATH } from "@/lib/site";

const DAY = [
  { name: "Dumbbell bench press", note: "Stop 2 reps short of failing", dose: "3 × 10" },
  { name: "One-arm row", note: "Each side", dose: "3 × 12" },
  { name: "Incline push-up", note: "Hands on a bench or bed", dose: "3 × 8" },
  { name: "Plank", note: "Hold", dose: "3 × 30s" },
];

// Split hero: headline left, tilted phone with two floating chips right. Stacks on mobile.
export default function Hero() {
  return (
    <section id="top" className="mx-auto flex max-w-page flex-wrap items-center gap-14 px-4 pb-[72px] pt-16 sm:px-6 sm:pt-24">
      <div className="min-w-0 flex-[1_1_520px]">
        <p className="label text-muted">
          [ Free on the web <span className="text-accent">·</span> iPhone app in review ]
        </p>
        <h1 className="headline mt-6 text-[clamp(56px,8.4vw,124px)] leading-[0.9] tracking-[-0.015em]">
          A coach built around your <span className="text-accent">actual life</span>
        </h1>
        <p className="mt-7 max-w-[500px] text-lg leading-[1.55] text-muted">
          Tell it your equipment, your schedule and what hurts. Get a training plan you can start today. Not a template.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-[22px]">
          <Link href={SIGNUP_PATH} className="btn-accent min-h-[54px] px-[26px] text-base hover:text-on-accent">
            Build my free plan
            <ArrowRight />
          </Link>
          <a href="#how" className="border-b border-control-3 pb-[3px] text-[15px] text-fg transition-colors hover:border-fg">
            See how it works
          </a>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_380px] justify-center">
        <div className="relative w-[300px] max-w-[80vw] py-10">
          <div
            role="img"
            aria-label="A workout in the plan: Upper body A, week 1 day 2, four exercises and a Mark day done button"
            className="rotate-[-4deg] rounded-[46px] border border-line-strong bg-phone p-[9px] shadow-[0_50px_90px_rgba(0,0,0,0.55)]"
          >
            <div aria-hidden="true" className="flex flex-col gap-3 rounded-[38px] bg-screen px-4 pb-[18px] pt-[22px]">
              <div className="h-[22px] w-20 self-center rounded-full bg-black" />
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-label-tight text-muted">WEEK 1 · DAY 2</div>
                  <div className="mt-1 font-display text-2xl font-extrabold uppercase" style={{ fontStretch: "75%" }}>
                    Upper body A
                  </div>
                </div>
                <div className="font-mono text-[11px] text-muted">~40 MIN</div>
              </div>
              <div className="flex flex-col border-t border-line-soft">
                {DAY.map((ex) => (
                  <div key={ex.name} className="flex items-center justify-between gap-2.5 border-b border-line-soft px-0.5 py-[11px]">
                    <div>
                      <div className="text-sm font-medium">{ex.name}</div>
                      <div className="mt-0.5 text-[11px] text-muted">{ex.note}</div>
                    </div>
                    <div className="whitespace-nowrap font-mono text-[13px] text-accent">{ex.dose}</div>
                  </div>
                ))}
              </div>
              <div className="flex min-h-[46px] items-center justify-center rounded-xl bg-accent text-sm font-semibold text-on-accent">
                Mark day done
              </div>
            </div>
          </div>

          {/* Offsets shrink on small screens so the chips never leave the viewport. */}
          <div
            aria-hidden="true"
            className="absolute left-[-8px] top-1.5 rotate-[3deg] rounded-xl bg-fg px-3.5 py-2.5 text-on-accent shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:left-[-54px]"
          >
            <div className="font-mono text-[10px] tracking-label-tight text-on-light-dim">BUILT FOR</div>
            <div className="mt-[3px] text-[13px] font-semibold">Dumbbells · 3 days · sore lower back</div>
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-2.5 right-[-6px] flex rotate-[-2deg] items-center gap-2.5 rounded-xl border border-line-strong bg-phone px-3.5 py-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:right-[-40px]"
          >
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-accent text-on-accent">
              <Check />
            </span>
            <div className="text-[13px] font-medium">Day 1 done</div>
          </div>
        </div>
      </div>
    </section>
  );
}
