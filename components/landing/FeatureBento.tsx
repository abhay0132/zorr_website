import EquipmentDemo from "./EquipmentDemo";
import VideoSlot from "@/components/site/VideoSlot";

const CELL_BASE = "flex border-b border-r border-line p-6 sm:p-8";
const CELL = `${CELL_BASE} flex-col gap-7`;
const WIDE = "min-[861px]:col-span-2";

function CellHead({ title, n }: { title: string; n: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
      <span aria-hidden="true" className="font-mono text-xs text-dim">
        {n}
      </span>
    </div>
  );
}

const RAMP = [
  { h: "30%", c: "bg-accent" },
  { h: "45%", c: "bg-accent" },
  { h: "60%", c: "bg-control" },
  { h: "72%", c: "bg-control" },
  { h: "84%", c: "bg-control-2" },
  { h: "92%", c: "bg-control-2" },
];

const CUES = ["Weight at your chest", "Knees over your toes", "Drive through your heels"];

// 14 days: done, rest, today (outlined), next workout (dashed).
type Cell = "done" | "rest" | "today" | "next";
const FORTNIGHT: Cell[] = [
  "done", "rest", "done", "rest", "done", "rest", "rest",
  "done", "rest", "today", "rest", "next", "rest", "rest",
];
const CELL_STYLE: Record<Cell, string> = {
  done: "bg-accent",
  rest: "bg-cell",
  today: "border-[1.5px] border-fg",
  next: "border border-dashed border-control-3",
};

// Hairline bento: the outer grid draws top/left, every cell draws right/bottom.
export default function FeatureBento() {
  return (
    <section aria-labelledby="features-heading" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:pt-[150px]">
      <p className="label text-accent">On the web, today</p>
      <h2 id="features-heading" className="headline mt-3.5 max-w-[720px] text-[clamp(42px,5.6vw,80px)] leading-[0.92]">
        Everything you need to start
      </h2>

      <div className="mt-14 grid grid-cols-1 border-l border-t border-line min-[861px]:grid-cols-3">
        <div className={`${CELL} ${WIDE}`}>
          <CellHead title="Built from your real setup" n="01" />
          <EquipmentDemo />
          <p className="m-0 max-w-[520px] text-[15px] leading-[1.6] text-muted">
            Full gym, two dumbbells or just a floor. Every exercise in your plan is one you can actually do where you train.
          </p>
        </div>

        <div className={CELL}>
          <CellHead title="Starts where you are" n="02" />
          <div aria-hidden="true" className="grid h-[130px] grid-cols-6 items-end gap-2">
            {RAMP.map((b, i) => (
              <div key={i} className={`rounded ${b.c}`} style={{ height: b.h }} />
            ))}
          </div>
          <p className="m-0 text-[15px] leading-[1.6] text-muted">
            New to lifting? The first weeks ease you in, so day three doesn&rsquo;t hurt to walk.
          </p>
        </div>

        <div className={CELL}>
          <CellHead title="Know every move" n="03" />
          <div className="flex flex-col gap-3">
            <VideoSlot title="Goblet squat" />
            <ol className="flex flex-col gap-3">
              {CUES.map((cue, i) => (
                <li key={cue} className="flex gap-2.5 text-[13px] text-soft">
                  <span aria-hidden="true" className="font-mono text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {cue}
                </li>
              ))}
            </ol>
          </div>
          <p className="m-0 text-[15px] leading-[1.6] text-muted">
            Three form cues on every exercise. Videos are coming to the most common ones.
          </p>
        </div>

        <div className={`${CELL_BASE} ${WIDE} flex-wrap items-center gap-8`}>
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3.5">
            <CellHead title="Tick it off, watch the fortnight fill" n="04" />
            <p className="m-0 text-[15px] leading-[1.6] text-muted">
              One tap when you finish. No streaks to break. Miss a day and the plan simply carries on.
            </p>
          </div>
          <div role="img" aria-label="Two-week grid: 4 of 6 workouts done" className="grid min-w-0 flex-[1_1_320px] grid-cols-7 gap-1.5">
            {FORTNIGHT.map((c, i) => (
              <span key={i} className={`aspect-square rounded-lg ${CELL_STYLE[c]}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
