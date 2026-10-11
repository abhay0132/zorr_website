import { Check } from "@/components/site/icons";

function Step({ when, title, children, caption }: { when: string; title: string; children: React.ReactNode; caption: string }) {
  return (
    <li className="flex flex-col gap-[22px]">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-3 w-3 rounded-[3px] bg-accent" />
        <span className="label text-soft">{when}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
      </div>
      <h3 className="headline m-0 text-[30px] leading-none">{title}</h3>
      <div aria-hidden="true" className="flex flex-col rounded-[18px] border border-line bg-surface p-5">
        {children}
      </div>
      <p className="m-0 text-[15px] leading-[1.6] text-muted">{caption}</p>
    </li>
  );
}

// Three-stop timeline: answer, get two weeks, train and tick.
export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:pt-[150px]">
      <p className="label text-accent">How it works</p>
      <h2 id="how-heading" className="headline mt-3.5 max-w-[760px] text-[clamp(42px,5.6vw,80px)] leading-[0.92]">
        Sign-up to first set in two minutes
      </h2>

      <ol className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-6 gap-y-10">
        <Step when="Minute 0" title="Answer honestly" caption="Goal, experience, equipment, how many days you can train, and anything that hurts.">
          <div className="flex flex-col gap-2.5">
            <div className="h-1 rounded-full bg-control-2">
              <div className="h-1 w-3/5 rounded-full bg-accent" />
            </div>
            <div className="mt-1.5 text-base font-medium">Anything that hurts right now?</div>
            <div className="rounded-[10px] bg-surface-2 px-3 py-2.5 text-[13px] text-soft">Nothing, I&rsquo;m good</div>
            <div className="rounded-[10px] bg-accent px-3 py-2.5 text-[13px] font-semibold text-on-accent">Lower back, a little</div>
            <div className="rounded-[10px] bg-surface-2 px-3 py-2.5 text-[13px] text-soft">Knee</div>
          </div>
        </Step>

        <Step when="Minute 2" title="Get two weeks" caption="A plan that fits your week and works around what hurts. Open it on any phone at the gym.">
          <div className="pb-2.5 font-mono text-[11px] tracking-label-tight text-muted">3 DAYS A WEEK · DUMBBELLS</div>
          {[
            ["Mon · Lower body A", "5 moves"],
            ["Wed · Upper body A", "5 moves"],
            ["Fri · Full body", "6 moves"],
          ].map(([day, moves]) => (
            <div key={day} className="flex justify-between border-t border-line-soft py-[11px] text-sm">
              <span>{day}</span>
              <span className="text-muted">{moves}</span>
            </div>
          ))}
          <div className="border-t border-line-soft pt-2.5 text-xs text-accent">Back-friendly picks applied</div>
        </Step>

        <Step when="Day 1 onward" title="Train, tick, repeat" caption="Mark each workout done and tell us how it felt. Two weeks, ticked off one day at a time.">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-on-accent">
                <Check size={18} strokeWidth={2.8} />
              </span>
              <div>
                <div className="text-base font-medium">Day 2 done</div>
                <div className="text-xs text-muted">2 of 6 this fortnight</div>
              </div>
            </div>
            <div className="mt-1 text-[13px] text-soft">How did that feel?</div>
            <div className="flex gap-1.5">
              {["Easy", "Right", "Hard"].map((f) => (
                <span key={f} className={`flex-1 rounded-lg bg-surface-2 py-[9px] text-center text-[13px] ${f === "Right" ? "outline outline-1 outline-accent" : ""}`}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Step>
      </ol>
    </section>
  );
}
