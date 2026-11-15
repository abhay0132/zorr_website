import { KnobLink } from "@/components/site/Knob";
import { Chevron } from "@/components/site/icons";
import { SIGNUP_PATH } from "@/lib/site";

// The one light section, in the chalk of the app's concept boards: three numbers
// and three phones showing the web app in the app's style.

const STATS = [
  { n: "2", label: "Weeks, day by day" },
  { n: "250", label: "Exercises in play" },
  { n: "₹0", label: "To start, no card" },
];

function Phone({ side, children }: { side?: "left" | "right"; children: React.ReactNode }) {
  const tilt = side === "left" ? "rotate-[-6deg] translate-x-9 translate-y-3" : side === "right" ? "rotate-[6deg] -translate-x-9 translate-y-3" : "";
  const size = side ? "h-[520px] w-[250px] rounded-[42px] p-2" : "relative z-10 h-[600px] w-[290px] rounded-[46px] p-[9px]";
  return (
    <div className={`${side ? "hidden min-[861px]:block" : ""} ${size} ${tilt} shrink-0 bg-phone shadow-[0_34px_70px_rgba(18,18,18,0.3)]`}>
      <div className={`flex h-full flex-col bg-screen text-left text-fg ${side ? "gap-2.5 rounded-[35px] px-4 pb-4 pt-10" : "rounded-[38px] px-[18px] pb-[18px] pt-[46px]"}`}>{children}</div>
    </div>
  );
}

const RestDot = () => <span className="h-1 w-1 rounded-full bg-control-3" />;

export default function ChalkBand() {
  return (
    <section aria-labelledby="numbers-heading" className="mx-4 rounded-[32px] bg-chalk-band py-24 text-ink md:py-[120px]">
      <h2 id="numbers-heading" className="sr-only">Zorr in numbers</h2>
      <div className="mx-auto max-w-page px-4 text-center sm:px-6">
        <dl className="mx-auto grid max-w-[900px] gap-10 sm:grid-cols-3 sm:gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2.5 font-mono text-[11px] uppercase tracking-label text-on-light-dim">{s.label}</dt>
              <dd className="numeral text-[96px] leading-[0.9] md:text-[120px]">{s.n}</dd>
            </div>
          ))}
        </dl>

        <div aria-hidden="true" className="mt-20 flex items-end justify-center">
          {/* Left: the equipment question */}
          <Phone side="left">
            <div className="flex items-center gap-[3px]">
              <span className="h-3 w-[3px] rounded-sm bg-plate-red" />
              <span className="h-3 w-[3px] rounded-sm bg-plate-blue" />
              <span className="h-3 w-[3px] rounded-sm bg-plate-yellow" />
              <span className="h-3 w-[3px] rounded-sm bg-plate-green" />
              <span className="h-3 w-[3px] rounded-sm bg-now" />
              <span className="ml-1 h-px flex-grow bg-line-strong" />
              <span className="ml-1.5 font-mono text-[9px] text-muted">05/12</span>
            </div>
            <p className="mt-2.5 font-mono text-[8.5px] uppercase tracking-label text-dim">How you train</p>
            <p className="headline text-[20px] leading-none text-dim">What&rsquo;s in<br /><span className="text-fg">your kit?</span></p>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="flex h-[52px] items-end rounded-xl border-[1.5px] border-accent p-2 font-semibold">Dumbbells</span>
              <span className="flex h-[52px] items-end rounded-xl bg-surface-2 p-2 text-muted">Barbell</span>
              <span className="flex h-[52px] items-end rounded-xl border-[1.5px] border-accent p-2 font-semibold">Bench</span>
              <span className="flex h-[52px] items-end rounded-xl bg-surface-2 p-2 text-muted">Bands</span>
            </div>
            <span className="mt-auto flex h-[42px] items-center justify-between rounded-full bg-accent pl-4 pr-1 text-xs font-semibold text-ink">
              Continue<span className="h-[34px] w-[34px] rounded-full bg-surface" />
            </span>
          </Phone>

          {/* Centre: today */}
          <Phone>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-label-tight text-soft">Thu · 12 Nov</span>
              <span className="headline text-[13px]">Zorr</span>
            </div>
            <p className="mt-[18px] font-mono text-[9px] uppercase tracking-label text-dim">This week · 1 of 3 done</p>
            <div className="mb-[18px] mt-2.5 flex items-center justify-between">
              <span className="h-[26px] w-[26px] rounded-full" style={{ background: "radial-gradient(circle, #0F1011 0 22%, #D8443A 23% 100%)" }} />
              <RestDot />
              <span className="h-[26px] w-[26px] rounded-full border-2 border-now" style={{ background: "radial-gradient(circle, #0F1011 0 22%, rgba(59,122,214,.85) 23% 100%)" }} />
              <RestDot />
              <span className="h-[26px] w-[26px] rounded-full border-2 border-line-strong" />
              <RestDot />
              <RestDot />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-label text-now">Today · session 2</p>
            <p className="headline mt-1 text-[26px] leading-none">Lower A</p>
            <p className="mb-2.5 mt-1 font-mono text-[9px] uppercase tracking-label-tight text-muted">4 exercises · ~40 min</p>
            {[
              ["01", "Goblet squat", "Drive through your heels", "3×10"],
              ["02", "Dumbbell RDL", "Flat back, slow down", "3×8"],
              ["03", "Glute bridge", "Bodyweight", "3×12"],
            ].map(([n, name, cue, rx]) => (
              <div key={n} className="flex gap-2.5 border-t border-white/[0.08] py-2.5 text-xs">
                <span className="font-mono text-[10px] text-dim">{n}</span>
                <span className="flex-grow">
                  {name}
                  <span className="block text-[10px] text-dim">{cue}</span>
                </span>
                <span className="font-mono font-semibold">{rx}</span>
              </div>
            ))}
            <span className="mt-auto flex h-12 items-center justify-between rounded-full bg-accent pl-[18px] pr-[5px] text-[13px] font-semibold text-ink">
              Start Lower A
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-surface text-fg"><Chevron size={12} strokeWidth={3} /></span>
            </span>
          </Phone>

          {/* Right: done, and how it felt */}
          <Phone side="right">
            <p className="mt-5 font-mono text-[8.5px] uppercase tracking-label text-dim">Session 2 · Lower A · done</p>
            <p className="numeral text-[64px] leading-[0.9]">2<span className="text-dim">/6</span></p>
            <p className="font-mono text-[8.5px] uppercase tracking-label text-muted">Workouts this fortnight</p>
            <p className="mt-2.5 text-[13px] text-soft">How did that feel?</p>
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="rounded-xl bg-surface-2 px-3 py-2.5 text-muted">Easy</span>
              <span className="rounded-xl border-[1.5px] border-accent px-3 py-2.5 font-semibold">Right</span>
              <span className="rounded-xl bg-surface-2 px-3 py-2.5 text-muted">Hard</span>
            </div>
            <span className="mt-auto flex h-[42px] items-center justify-between rounded-full bg-accent pl-4 pr-1 text-xs font-semibold text-ink">
              Done<span className="h-[34px] w-[34px] rounded-full bg-surface" />
            </span>
          </Phone>
        </div>

        <div className="mt-16 flex justify-center">
          <KnobLink href={SIGNUP_PATH} tone="ink">Build my free plan</KnobLink>
        </div>
      </div>
    </section>
  );
}
