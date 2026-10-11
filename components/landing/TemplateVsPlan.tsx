const TEMPLATE = [
  { name: "Barbell back squat", dose: "5 × 5" },
  { name: "Barbell bench press", dose: "5 × 5" },
  { name: "Conventional deadlift", dose: "1 × 5" },
];

const PLAN = [
  { name: "Goblet squat", why: "easier on the back", dose: "3 × 10" },
  { name: "Dumbbell floor press", why: "no bench needed", dose: "3 × 10" },
  { name: "Glute bridge", why: "eases the hinge in", dose: "3 × 12" },
];

// The same three slots, crossed out on the left and rebuilt from answers on the right.
export default function TemplateVsPlan() {
  return (
    <section aria-labelledby="template-heading" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:pt-[150px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="template-heading" className="headline m-0 max-w-[680px] text-[clamp(42px,5.6vw,80px)] leading-[0.92]">
          A template gives everyone the same plan
        </h2>
        <p className="m-0 max-w-[340px] text-base leading-[1.6] text-muted">
          Same answers in, same plan out. Here&rsquo;s what changes when the plan starts from you instead.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
        <div className="rounded-[20px] border border-line p-6 sm:p-7">
          <h3 className="label m-0 font-normal text-dim">The template</h3>
          <ul className="mt-[18px] flex flex-col">
            {TEMPLATE.map((ex) => (
              <li key={ex.name} className="flex justify-between gap-3 border-b border-line py-3.5 text-base text-dim">
                <span className="line-through decoration-control-3">{ex.name}</span>
                <span className="font-mono">{ex.dose}</span>
              </li>
            ))}
          </ul>
          <p className="pt-4 text-sm text-dim">Assumes a barbell, a rack, and a back that never complains.</p>
        </div>

        <div className="rounded-[20px] border border-accent bg-accent/5 p-6 sm:p-7">
          <h3 className="label m-0 font-normal text-accent">Your plan · Dumbbells · Sore lower back</h3>
          <ul className="mt-[18px] flex flex-col">
            {PLAN.map((ex) => (
              <li key={ex.name} className="flex justify-between gap-3 border-b border-line-warm py-3.5 text-base">
                <span>
                  {ex.name} <span className="text-[13px] text-muted">· {ex.why}</span>
                </span>
                <span className="whitespace-nowrap font-mono text-accent">{ex.dose}</span>
              </li>
            ))}
          </ul>
          <p className="pt-4 text-sm text-soft">Built from your answers. Different answers, different plan.</p>
        </div>
      </div>
    </section>
  );
}
