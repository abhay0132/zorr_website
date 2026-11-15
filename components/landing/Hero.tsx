import IronPlate from "@/components/site/IronPlate";
import { KnobLink } from "@/components/site/Knob";
import { Calendar, Dumbbell, Heart } from "@/components/site/icons";
import { SIGNUP_PATH } from "@/lib/site";

const FEATURES = [
  { icon: <Dumbbell />, label: "Fits your equipment" },
  { icon: <Heart />, label: "Works around what hurts" },
  { icon: <Calendar />, label: "Two weeks, free" },
];

// The app's welcome screen at desktop size: the iron plate cropped off the right
// edge, Kai's line beside it, and the tonal expanded headline.
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative -mt-[72px] flex min-h-[780px] overflow-hidden md:min-h-[900px]">
      <IronPlate className="absolute right-[-170px] top-[96px] h-[420px] w-[420px] opacity-70 md:right-[-250px] md:top-[110px] md:h-[760px] md:w-[760px] md:opacity-100" />

      <div className="relative mx-auto flex w-full max-w-page flex-col justify-end px-4 pb-16 pt-40 sm:px-6 md:px-10 md:pb-20">
        <div className="mb-16 flex flex-col gap-1.5 self-start md:mb-28">
          <span className="font-mono text-[11px] text-dim">[Kai]</span>
          <p className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-surface/70 py-2.5 pl-2.5 pr-4 text-[15px] backdrop-blur-[14px]">
            <span aria-hidden="true" className="headline flex h-7 w-7 items-center justify-center rounded-full bg-now text-xs text-on-now">K</span>
            I&rsquo;ll plan around that knee.
          </p>
        </div>

        <p className="label text-soft">Free on the web · iPhone app soon</p>
        <h1 id="hero-heading" className="headline mt-5 max-w-[820px] text-[clamp(36px,5.6vw,68px)] leading-[0.98]">
          A coach built <span className="text-accent">around your actual life.</span>
        </h1>
        <p className="mt-6 max-w-[500px] text-[17px] leading-[1.5] text-muted md:text-[19px]">
          Tell it your equipment, your schedule and what hurts. Get a training plan you can start today. Not a template.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-7">
          <KnobLink href={SIGNUP_PATH}>Build my free plan</KnobLink>
          <a href="#how" className="border-b border-white/25 pb-0.5 text-base text-soft transition-colors hover:border-fg hover:text-fg">
            See how it works
          </a>
        </div>

        <ul className="mt-14 flex flex-col gap-3 font-mono text-[11px] uppercase tracking-label-tight text-soft min-[861px]:flex-row min-[861px]:items-center min-[861px]:gap-0">
          {FEATURES.map((f, i) => (
            <li key={f.label} className={`flex items-center gap-2.5 min-[861px]:px-5 ${i === 0 ? "min-[861px]:pl-0" : "min-[861px]:border-l min-[861px]:border-white/[0.18]"}`}>
              {f.icon}
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
