// Zorr against a template and a trainer. The swap row is future tense: it is an iPhone feature.

type Cell = "yes" | "no" | string;

const ROWS: { label: string; zorr: Cell; template: Cell; trainer: Cell }[] = [
  { label: "Fits the equipment you have", zorr: "yes", template: "no", trainer: "yes" },
  { label: "Works around what hurts", zorr: "yes", template: "no", trainer: "yes" },
  { label: "Ready to start today", zorr: "yes", template: "yes", trainer: "Book first" },
  { label: "Swaps when the bench is taken", zorr: "Coming to iPhone", template: "no", trainer: "yes" },
  { label: "Cost", zorr: "Free", template: "Free", trainer: "₹8,000+ a month" },
];

function Value({ v, strong }: { v: Cell; strong?: boolean }) {
  if (v === "yes") {
    return strong ? (
      <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="Yes" className="mx-auto">
        <circle cx="12" cy="12" r="11" fill="#EDEBE6" />
        <path d="M7 12.5l3.2 3.2 6.3-7" fill="none" stroke="#121212" strokeWidth="2.4" />
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="Yes" className="mx-auto">
        <circle cx="12" cy="12" r="10.3" fill="none" stroke="#9C9C97" strokeWidth="1.4" />
        <path d="M7 12.5l3.2 3.2 6.3-7" fill="none" stroke="#9C9C97" strokeWidth="2" />
      </svg>
    );
  }
  if (v === "no") return <span className="font-mono text-xs uppercase tracking-label-tight text-dim">No</span>;
  if (v === "Coming to iPhone") {
    return <span className="inline-block whitespace-nowrap rounded-full border border-white/[0.12] bg-surface-2 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-label-tight text-soft">Coming to iPhone</span>;
  }
  return <span className={strong ? "font-mono text-sm font-semibold uppercase" : "text-sm text-muted"}>{v}</span>;
}

export default function Compare() {
  return (
    <section aria-labelledby="compare-heading" className="mx-auto max-w-page px-4 pb-24 sm:px-6 md:px-10 md:pb-[120px]">
      <h2 id="compare-heading" className="headline text-center text-[clamp(26px,4vw,48px)] leading-none">
        A plan, <span className="text-accent">not a printout.</span>
      </h2>
      <div className="mx-auto mt-12 max-w-[820px] overflow-x-auto rounded-card border border-white/[0.08] bg-surface px-5 pb-5 pt-3 md:px-7">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          <thead>
            <tr>
              <th scope="col" className="w-[44%] py-4"><span className="sr-only">Feature</span></th>
              <th scope="col" className="headline py-4 text-center text-base">Zorr</th>
              <th scope="col" className="py-4 text-center font-mono text-[11px] font-normal uppercase tracking-label-tight text-muted">Template</th>
              <th scope="col" className="py-4 text-center font-mono text-[11px] font-normal uppercase tracking-label-tight text-muted">Trainer</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-t border-white/[0.08]">
                <th scope="row" className="py-4 pr-3 font-normal">{r.label}</th>
                <td className="py-4 text-center"><Value v={r.zorr} strong /></td>
                <td className="py-4 text-center"><Value v={r.template} /></td>
                <td className="py-4 text-center"><Value v={r.trainer} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
