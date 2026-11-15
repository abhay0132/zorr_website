import type { Metadata } from "next";
import PageShell, { SectionHead } from "@/components/site/PageShell";
import IronPlate from "@/components/site/IronPlate";
import { KnobLink } from "@/components/site/Knob";
import { SIGNUP_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why Zorr exists: training plans built around your equipment, your week and what hurts, without a trainer's price or a feed.",
  alternates: { canonical: "/about" },
};

// The three broken options the founder kept running into. Same lines as the original site.
const WHY = [
  { lead: "Personal trainers cost ₹8,000+ a month", kicker: "and coach everyone the same way." },
  { lead: "Chatbots forget who you are", kicker: "the moment you close the tab." },
  { lead: "Every other app turns your training", kicker: "into content for a feed." },
];

const BELIEFS = [
  { tag: "[01] Your kit", title: "Only moves you can do", body: "An exercise is in your plan only if everything it needs is on your equipment list. A full gym, two dumbbells or just the floor." },
  { tag: "[02] What hurts", title: "Worked around, not ignored", body: "Tell it what hurts and anything that could aggravate it is left out. Pain that sticks around is for a doctor, and we say so." },
  { tag: "[03] Safety", title: "Checked by the server", body: "Software drafts the plan; our server checks it. Every starting load is checked against safety limits before you see it." },
  { tag: "[04] Privacy", title: "Nobody watching", body: "No feed, no followers, nothing to post. Your training is yours." },
];

export default function AboutPage() {
  return (
    <PageShell
      label="About"
      title={<>Built by someone <span className="text-accent">tired of generic plans.</span></>}
      intro={
        <p>
          Zorr was started by a final-year computer science student who was tired of paying trainers for generic advice, and tired of AI tools
          with no memory of his actual life. So he built the coach he wanted: one that starts from your kit, your week and what hurts.
        </p>
      }
    >
      {/* Why it exists */}
      <section aria-labelledby="why-h" className="mx-auto max-w-page px-4 sm:px-6 md:px-10">
        <h2 id="why-h" className="sr-only">Why Zorr exists</h2>
        <ol className="border-t border-white/10">
          {WHY.map((w, i) => (
            <li key={w.lead} className="flex gap-5 border-b border-white/10 py-7 md:gap-8 md:py-9">
              <span className="pt-1.5 font-mono text-[11px] text-dim md:pt-3">{String(i + 1).padStart(2, "0")}</span>
              <p className="headline text-[clamp(20px,3vw,36px)] leading-[1.05]">
                {w.lead} <span className="text-dim">{w.kicker}</span>
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* What we believe */}
      <section aria-labelledby="believe-h" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:px-10 md:pt-[120px]">
        <SectionHead id="believe-h" label="How we build it" title={<>Four rules <span className="text-accent">we don&rsquo;t bend.</span></>} />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {BELIEFS.map((b) => (
            <li key={b.tag} className="rounded-card border border-white/[0.08] bg-surface p-7 md:p-8">
              <p className="label text-dim">{b.tag}</p>
              <h3 className="headline mt-3 text-[clamp(20px,2.2vw,26px)] leading-[1.02]">{b.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-muted">{b.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Where we are */}
      <section aria-labelledby="now-h" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:px-10 md:pt-[120px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-surface px-6 py-12 md:px-14 md:py-16">
          <IronPlate className="pointer-events-none absolute -right-40 -top-24 hidden h-[460px] w-[460px] opacity-50 md:block" />
          <div className="relative max-w-[560px]">
            <SectionHead id="now-h" label="Where we are" title={<>Web today. <span className="text-accent">iPhone next.</span></>} />
            <ol className="mt-10 flex flex-col gap-0">
              <li className="relative flex gap-5 pb-10">
                <span aria-hidden="true" className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px bg-line-strong" />
                <span aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-now" />
                <div>
                  <p className="label text-now">Live now</p>
                  <p className="mt-1.5 text-lg font-semibold">Zorr on the web</p>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-muted">A free two-week plan on any phone or laptop. Mark days done and tell us how they felt.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <span aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-line-strong" />
                <div>
                  <p className="label text-dim">Coming</p>
                  <p className="mt-1.5 text-lg font-semibold">Zorr for iPhone</p>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-muted">
                    Swapping an exercise when the bench is taken, and a plan that adjusts each week to what you lifted. Everyone who builds a plan on
                    the web gets an invite first, and the same account carries over.
                  </p>
                </div>
              </li>
            </ol>
            <KnobLink href={SIGNUP_PATH} className="mt-10">Build my free plan</KnobLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
