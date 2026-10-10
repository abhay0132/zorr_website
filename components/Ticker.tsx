import { Fragment } from "react";

const PHRASES = [
  "Bench is taken",
  "Knee feels off",
  "Only 20 minutes",
  "Gym is packed",
  "Training at home today",
  "Shoulder twinge",
  "Hotel gym this week",
];

function Run() {
  return (
    <div className="headline flex gap-10 whitespace-nowrap pr-10 text-[28px] sm:text-4xl">
      {PHRASES.map((p) => (
        <Fragment key={p}>
          <span>{p}</span>
          <span>✦</span>
        </Fragment>
      ))}
    </div>
  );
}

// Two identical runs scrolled by exactly half their width, so the loop has no visible jump.
// The animation is removed under prefers-reduced-motion (see globals.css).
export default function Ticker() {
  return (
    <section aria-label="Things people tell their coach" className="relative mt-24 overflow-hidden bg-accent py-5 text-on-accent md:mt-[150px]">
      <div aria-hidden="true" className="flex w-max animate-ticker">
        <Run />
        <Run />
      </div>
      <p className="sr-only">Real life gets in the way of training: a taken bench, a sore knee, twenty minutes, a hotel gym.</p>
    </section>
  );
}
