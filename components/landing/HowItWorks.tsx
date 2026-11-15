import { Check } from "@/components/site/icons";

// Three steps, each shown with a piece of the real web app drawn in the app's style.

const KIT = [
  { name: "Dumbbells", on: true },
  { name: "Barbell", on: false },
  { name: "Kettlebell", on: false },
  { name: "Bands", on: false },
  { name: "Pull-up bar", on: false },
  { name: "Bench", on: true },
];

const ROWS = [
  { n: "01", name: "Dumbbell bench press", muscle: "Chest", rx: "3×10" },
  { n: "02", name: "One-arm row", muscle: "Back", rx: "3×12" },
  { n: "03", name: "Plank", muscle: "Core", rx: "3×30s" },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="flex h-[380px] flex-col justify-center rounded-card border border-white/[0.08] bg-surface p-7">
      {children}
    </div>
  );
}

function Step({ n, title, body, children }: { n: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <li>
      <Card>{children}</Card>
      <p className="mt-6 font-mono text-[11px] tracking-label-tight text-dim">{n}</p>
      <h3 className="mt-2 text-xl font-bold tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 text-[15px] leading-[1.55] text-muted">{body}</p>
    </li>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="mx-auto max-w-page px-4 py-24 sm:px-6 md:px-10 md:py-[140px]">
      <p className="label text-center text-dim">How it works · 3 steps</p>
      <h2 id="how-heading" className="headline mt-3.5 text-center text-[clamp(28px,4vw,48px)] leading-none">
        Three steps. <span className="text-accent">Five minutes.</span>
      </h2>

      <ol className="mt-14 grid gap-5 md:grid-cols-3">
        <Step n="01" title="Answer a few questions" body="Goal, experience, equipment, how many days you can train, and anything that hurts.">
          <p className="label text-dim">How you train</p>
          <p className="headline mb-[18px] mt-2 text-[22px] leading-none text-dim">
            What&rsquo;s in <span className="text-fg">your kit?</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {KIT.map((k) => (
              <span
                key={k.name}
                className={`relative flex h-[72px] items-end rounded-[14px] p-2.5 text-xs ${k.on ? "border-[1.5px] border-accent bg-surface-2 font-semibold" : "border border-white/[0.08] bg-surface-2 text-muted"}`}
              >
                {k.name}
                {k.on && (
                  <span className="absolute right-[7px] top-[7px] flex h-4 w-4 items-center justify-center rounded-full bg-accent text-ink">
                    <Check size={10} strokeWidth={3.5} />
                  </span>
                )}
              </span>
            ))}
          </div>
        </Step>

        <Step n="02" title="Get your two weeks" body="A plan that fits your week and works around what hurts. Open it on any phone at the gym.">
          <div className="mb-4 flex items-center gap-3.5">
            <span className="h-11 w-11 shrink-0 rounded-full" style={{ background: "radial-gradient(circle, #0F1011 0 22%, #2a1210 23% 30%, #D8443A 31% 100%)" }} />
            <div>
              <p className="label text-now">Today · session 1</p>
              <p className="headline mt-1 text-[22px] leading-[1.05]">Upper A</p>
            </div>
          </div>
          {ROWS.map((r) => (
            <div key={r.n} className="flex items-center gap-3 border-t border-white/[0.08] py-3">
              <span className="font-mono text-[11px] text-dim">{r.n}</span>
              <span className="flex-grow">
                <span className="block text-[15px] font-semibold">{r.name}</span>
                <span className="block text-xs text-dim">{r.muscle}</span>
              </span>
              <span className="font-mono text-[13px] font-semibold">{r.rx}</span>
            </div>
          ))}
        </Step>

        <Step n="03" title="Tick it off" body="Mark each workout done and tell us how it felt. Two weeks, ticked off one day at a time.">
          <div className="flex flex-col gap-4">
            <span className="flex h-[50px] items-center justify-between rounded-full bg-accent pl-5 pr-[5px] text-[15px] font-semibold text-ink">
              Day 1 done
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-fg"><Check size={14} /></span>
            </span>
            <p className="label text-center text-dim">How did that feel?</p>
            <span className="grid grid-cols-3 gap-1 rounded-full bg-surface-2 p-1 text-center text-sm">
              <span className="rounded-full py-2.5 text-muted">Easy</span>
              <span className="rounded-full bg-accent py-2.5 font-semibold text-ink">Right</span>
              <span className="rounded-full py-2.5 text-muted">Hard</span>
            </span>
            <span className="mt-1 flex items-center justify-between px-1.5">
              <span className="h-[22px] w-[22px] rounded-full bg-plate-red" />
              <span className="h-1 w-1 rounded-full bg-control-3" />
              <span className="h-[22px] w-[22px] rounded-full border-2 border-now" />
              <span className="h-1 w-1 rounded-full bg-control-3" />
              <span className="h-[22px] w-[22px] rounded-full border-2 border-line-strong" />
              <span className="h-1 w-1 rounded-full bg-control-3" />
              <span className="h-1 w-1 rounded-full bg-control-3" />
            </span>
          </div>
        </Step>
      </ol>
    </section>
  );
}
