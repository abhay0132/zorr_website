import type { Metadata } from "next";
import PageShell, { SectionHead } from "@/components/site/PageShell";
import { KnobLink } from "@/components/site/Knob";
import Ph from "@/components/legal/Ph";
import { Check } from "@/components/site/icons";
import { SIGNUP_PATH, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Zorr is free on the web, with no card needed. The iPhone app will start with a free first month.",
  alternates: { canonical: "/pricing" },
};

// TODO(launch): the iPhone price is not decided (Zorr_Final/zorr-build-spec/08-open-items.md:
// "1 month free with caps, then a paywall"; what the paid tier unlocks is open). The
// placeholder renders highlighted until a real number replaces it.
const IPHONE_PRICE = "[PRICE]";

const WEB = [
  "A two-week plan built from your answers",
  "Every exercise fits the equipment you have",
  "Works around what hurts",
  "Form cues and weight guidance on every exercise",
  "Mark days done and rate how they felt",
  "Change your answers and rebuild it once",
];

const IPHONE = [
  "Swap an exercise on the spot when the bench is taken",
  "A plan that adjusts each week to what you lifted",
  "More than two weeks",
  "Your web account and history carry over",
];

const QUESTIONS = [
  { q: "Do I need a card to start?", a: "No. The web version asks for no card and has no paid plans." },
  {
    q: "Why can I only rebuild my plan once?",
    a: "Every plan is built fresh from your answers, and that costs us money to run. One rebuild covers the usual reasons: a wrong answer, or a change in your kit or schedule.",
  },
  { q: "How will I pay on iPhone?", a: "Through your Apple account, like any other app subscription. You will be able to cancel from your iPhone's settings." },
  { q: "Do web users get anything for being early?", a: "Everyone who builds a plan on the web gets an invite to the iPhone app first." },
];

function Tick() {
  return (
    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
      <Check size={11} strokeWidth={3.5} />
    </span>
  );
}

export default function PricingPage() {
  return (
    <PageShell
      label="Pricing"
      title={<>Free on the web. <span className="text-accent">No card.</span></>}
      intro={<p>A trainer costs ₹8,000+ a month. Your first two weeks with Zorr cost nothing, on any phone or laptop.</p>}
    >
      <section aria-label="Plans" className="mx-auto grid max-w-page gap-5 px-4 sm:px-6 md:grid-cols-2 md:px-10">
        {/* Web: the selected option, outlined in chalk */}
        <article className="flex flex-col rounded-card border-[1.5px] border-accent bg-surface p-7 md:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="label text-muted">Zorr on the web</p>
            <span className="label flex items-center gap-2 text-now"><span className="h-1.5 w-1.5 rounded-full bg-now" />Live now</span>
          </div>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="numeral text-[72px] leading-[0.85] md:text-[104px]">₹0</span>
            <span className="font-mono text-[11px] uppercase tracking-label-tight text-muted">No card needed</span>
          </p>
          <ul className="mt-8 flex flex-col gap-3.5 border-t border-white/[0.08] pt-7 text-[15px]">
            {WEB.map((f) => (
              <li key={f} className="flex gap-3"><Tick />{f}</li>
            ))}
          </ul>
          <KnobLink href={SIGNUP_PATH} className="mt-10 self-start">Build my free plan</KnobLink>
        </article>

        {/* iPhone: coming */}
        <article className="flex flex-col rounded-card border border-white/[0.08] bg-surface p-7 md:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="label text-muted">Zorr for iPhone</p>
            <span className="label text-dim">Coming soon</span>
          </div>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="numeral whitespace-nowrap text-[64px] uppercase leading-[0.85] md:text-[104px]">1 month</span>
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-label-tight text-muted">
            Free to start, then <Ph>{IPHONE_PRICE}</Ph> a month
          </p>
          <ul className="mt-8 flex flex-col gap-3.5 border-t border-white/[0.08] pt-7 text-[15px] text-soft">
            {IPHONE.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-[1.5px] border-control-3" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[14px] leading-[1.6] text-dim">Paid through your Apple account. Build a plan on the web to get your invite first.</p>
        </article>
      </section>

      {/* Trainer comparison strip */}
      <section aria-label="Compared with a trainer" className="mx-auto max-w-page px-4 pt-5 sm:px-6 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          {[
            ["A personal trainer", "₹8,000+", "a month"],
            ["A template from the internet", "₹0", "built for nobody"],
            ["Zorr on the web", "₹0", "built from your answers"],
          ].map(([who, price, note], i) => (
            <div key={who} className="bg-surface px-7 py-6">
              <p className={`label ${i === 2 ? "text-fg" : "text-dim"}`}>{who}</p>
              <p className={`numeral mt-2 text-[44px] leading-none ${i === 2 ? "text-fg" : "text-muted"}`}>{price}</p>
              <p className="mt-1 text-sm text-dim">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing questions */}
      <section aria-labelledby="pq-h" className="mx-auto max-w-[820px] px-4 pt-24 sm:px-6 md:pt-[120px]">
        <SectionHead id="pq-h" center title={<>Pricing <span className="text-accent">questions</span></>} />
        <dl className="mt-10 border-t border-white/10">
          {QUESTIONS.map((x, i) => (
            <div key={x.q} className="flex gap-[18px] border-b border-white/10 py-6">
              <span aria-hidden="true" className="pt-1 font-mono text-[11px] text-dim">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <dt className="text-[17px] font-semibold">{x.q}</dt>
                <dd className="mt-2 text-[15px] leading-[1.65] text-muted">{x.a}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-center text-[15px] text-muted">
          Another question? <a href={`mailto:${SUPPORT_EMAIL}`} className="border-b border-control-3 text-fg hover:border-fg">Email us</a>
        </p>
      </section>
    </PageShell>
  );
}
