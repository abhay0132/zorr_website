const SPECS = [
  { label: "Setup", value: "2 minutes" },
  { label: "Equipment", value: "Whatever you have" },
  { label: "Price", value: "₹0 on the web" },
  { label: "Audience", value: "Just you" },
];

// Four plain facts between hairlines.
export default function SpecStrip() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <dl className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] px-4 sm:px-6">
        {SPECS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 py-[22px]">
            <dt className="font-mono text-[11px] uppercase tracking-label text-muted">{s.label}</dt>
            <dd className="font-display text-[26px] font-extrabold uppercase" style={{ fontStretch: "75%" }}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
