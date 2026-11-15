// Sticky statement on the left, three app-style cards on the right: setup, form cues, weights by feel.

function Card({ tag, title, children }: { tag: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="rounded-card border border-white/[0.08] bg-surface p-7 md:p-8">
      <p className="label text-dim">{tag}</p>
      <h3 className="headline mb-5 mt-3 text-[clamp(20px,2.2vw,26px)] leading-[1.02]">{title}</h3>
      {children}
    </li>
  );
}

export default function OnePlan() {
  return (
    <section aria-labelledby="oneplan-heading" className="mx-auto grid max-w-page items-start gap-12 px-4 py-24 sm:px-6 md:grid-cols-[5fr_7fr] md:gap-[72px] md:px-10 md:pb-[120px] md:pt-[140px]">
      <div className="md:sticky md:top-[120px]">
        <h2 id="oneplan-heading" className="headline text-[clamp(28px,4vw,48px)] leading-none">
          One plan. <span className="text-accent">Everything it needs.</span>
        </h2>
        <p className="mt-6 max-w-[400px] text-lg leading-[1.55] text-muted">
          Every exercise fits the kit you have, every day fits the time you have, and anything that hurts is worked around from the first session.
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        <Card tag="[01] Your real setup" title={<>Built from<br />what you have</>}>
          <div className="flex flex-wrap gap-2 text-sm" aria-label="Example equipment: dumbbells and a bench picked">
            <span className="rounded-full border-[1.5px] border-accent px-3.5 py-2 font-semibold">Dumbbells</span>
            <span className="rounded-full border-[1.5px] border-accent px-3.5 py-2 font-semibold">Bench</span>
            <span className="rounded-full bg-surface-2 px-3.5 py-2 text-muted">Barbell</span>
            <span className="rounded-full bg-surface-2 px-3.5 py-2 text-muted">Full gym</span>
            <span className="rounded-full bg-surface-2 px-3.5 py-2 text-muted">Just the floor</span>
          </div>
        </Card>

        <Card tag="[02] Form cues" title={<>A note under<br />every exercise</>}>
          <div className="flex items-center gap-3.5 rounded-2xl bg-surface-2 px-[18px] py-4">
            <div className="flex-grow">
              <p className="numeral text-[28px] uppercase leading-none">Goblet squat</p>
              <p className="mt-1.5 text-sm text-soft">Drive through your heels</p>
            </div>
            <span className="font-mono text-sm font-semibold">3×10</span>
          </div>
        </Card>

        <Card tag="[03] Weights by feel" title={<>No guessed<br />numbers</>}>
          <p className="flex items-center gap-3 rounded-2xl border border-white/[0.12] px-4 py-3.5">
            <span aria-hidden="true" className="headline flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-now text-xs text-on-now">K</span>
            <span className="text-[15px] text-fg">Pick a weight you could lift 2 more times.</span>
          </p>
        </Card>
      </ul>
    </section>
  );
}
