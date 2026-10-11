const PERSONAS = [
  { title: "Students", body: "A trainer costs ₹8,000+ a month. This costs nothing right now." },
  { title: "Training at home", body: "Thirty minutes between everything else, with whatever's in the house." },
  { title: "Always travelling", body: "Hotel gym this week, home dumbbells the next. Your plan follows." },
  { title: "Lifting for years", body: "Skip the spreadsheet. Get a structured block and get back to lifting." },
];

// Editorial rows between hairlines, one per kind of person.
export default function Personas() {
  return (
    <section aria-labelledby="personas-heading" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:pt-[150px]">
      <p className="label text-accent">One coach</p>
      <h2 id="personas-heading" className="headline mt-3.5 max-w-[760px] text-[clamp(42px,5.6vw,80px)] leading-[0.92]">
        Built for how you actually live
      </h2>
      <ul className="mt-12 border-t border-line-strong">
        {PERSONAS.map((p, i) => (
          <li key={p.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-line-strong py-7">
            <span aria-hidden="true" className="w-8 font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="headline m-0 flex-[1_1_360px] text-[clamp(32px,4vw,52px)] leading-none">{p.title}</h3>
            <p className="m-0 flex-[1_1_320px] text-base leading-[1.55] text-muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
