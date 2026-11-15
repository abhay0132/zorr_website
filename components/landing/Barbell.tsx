// A barbell loaded in competition plate order, the image the app's session ticket uses.

const PLATES = [
  { w: 18, h: 120, color: "bg-plate-green" },
  { w: 22, h: 170, color: "bg-plate-yellow" },
  { w: 26, h: 210, color: "bg-plate-blue" },
  { w: 30, h: 230, color: "bg-plate-red" },
];

function Side({ flip }: { flip?: boolean }) {
  // Outside in: sleeve, collar, then the plates smallest to largest. The right side is the mirror.
  const parts = [
    <span key="sleeve" className="h-2.5 w-[70px] rounded-[3px] bg-plate-steel" />,
    <span key="collar" className="h-11 w-2.5 rounded-[3px] bg-[#8A8C91]" />,
    ...PLATES.map((p) => <span key={p.color} className={`mx-[1.5px] rounded ${p.color}`} style={{ width: p.w, height: p.h }} />),
  ];
  return <>{flip ? parts.reverse() : parts}</>;
}

export default function Barbell() {
  return (
    <section aria-labelledby="barbell-heading" className="px-4 pb-24 md:pb-[120px]">
      <div className="mx-auto flex h-[420px] max-w-[1360px] flex-col items-center justify-center gap-10 overflow-hidden rounded-[32px] border border-white/[0.06] bg-[radial-gradient(60%_70%_at_50%_60%,#1F2023_0%,#141517_70%)] px-4 md:h-[560px] md:gap-14">
        <h2 id="barbell-heading" className="headline text-center text-[clamp(26px,4vw,48px)] leading-none">
          Train with <span className="text-accent">what you have.</span>
        </h2>
        <div aria-hidden="true" className="flex scale-50 items-center md:scale-100">
          <Side />
          <span className="h-3 w-[380px] rounded-[3px] bg-gradient-to-b from-[#8A8C91] to-[#55575C]" />
          <Side flip />
        </div>
        <p className="label text-center text-dim">A full gym · two dumbbells · just the floor</p>
      </div>
    </section>
  );
}
