// Drawn covers for blog posts, so the blog needs no photography: the two-week ring
// from the landing page, or a barbell's plates loaded in competition order.

const R = 100;
const C = 2 * Math.PI * R;
const PER = C / 14;
const SEG = PER - 5;
const SESSIONS = [
  { day: 0, color: "#D8443A", o: 1 },
  { day: 2, color: "#3B7AD6", o: 1 },
  { day: 4, color: "#E8B43B", o: 1 },
  { day: 7, color: "#D8443A", o: 0.32 },
  { day: 9, color: "#3B7AD6", o: 0.32 },
  { day: 11, color: "#E8B43B", o: 0.32 },
];

function Ring() {
  return (
    <svg viewBox="0 0 260 260" className="h-[70%] max-h-[260px] w-auto">
      <circle cx="130" cy="130" r="122" fill="none" stroke="rgba(237,235,230,.16)" strokeWidth="7" strokeDasharray="1 5.4" />
      <g transform="rotate(-90 130 130)">
        <circle cx="130" cy="130" r={R} fill="none" stroke="#1F2023" strokeWidth="14" strokeDasharray={`${SEG} 5`} />
        {SESSIONS.map((s) => (
          <circle key={s.day} cx="130" cy="130" r={R} fill="none" stroke={s.color} strokeOpacity={s.o} strokeWidth="14" strokeDasharray={`${SEG} ${C - SEG}`} strokeDashoffset={-s.day * PER} />
        ))}
      </g>
    </svg>
  );
}

const PLATES = [
  { w: 14, h: 64, c: "bg-plate-green" },
  { w: 17, h: 92, c: "bg-plate-yellow" },
  { w: 20, h: 116, c: "bg-plate-blue" },
  { w: 23, h: 128, c: "bg-plate-red" },
];

function Plates() {
  return (
    <div className="flex items-center">
      <span className="h-2 w-12 rounded-sm bg-plate-steel" />
      <span className="h-7 w-2 rounded-sm bg-[#8A8C91]" />
      {PLATES.map((p) => (
        <span key={p.c} className={`mx-[1.5px] rounded ${p.c}`} style={{ width: p.w, height: p.h }} />
      ))}
      <span className="h-2.5 w-24 rounded-sm bg-gradient-to-b from-[#8A8C91] to-[#55575C]" />
    </div>
  );
}

export default function PostCover({ cover, className = "" }: { cover: "ring" | "plates"; className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center overflow-hidden bg-[radial-gradient(60%_70%_at_50%_55%,#1F2023_0%,#141517_75%)] ${className}`}>
      {cover === "ring" ? <Ring /> : <Plates />}
    </div>
  );
}
