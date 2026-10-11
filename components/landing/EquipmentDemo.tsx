"use client";

import { useState } from "react";

const OPTIONS = ["Full gym", "Dumbbells", "Resistance bands", "Pull-up bar", "Bench", "Just the floor"];

/** The line under the chips, so the demo answers the same way the onboarding does. */
function describe(on: string[]): string {
  if (on.length === 0) return 'Pick at least one. "Just the floor" counts.';
  if (on.includes("Full gym")) return "→ Full gym: the whole exercise library is in play";
  if (on.length === 1 && on[0] === "Just the floor") return "→ Bodyweight plan, no kit needed";
  return `→ Plan uses only: ${on.join(", ").toLowerCase()}`;
}

// "What do you have?" chip toggles. Purely illustrative: nothing is sent anywhere.
export default function EquipmentDemo() {
  const [on, setOn] = useState<string[]>(["Dumbbells", "Pull-up bar"]);
  const toggle = (opt: string) =>
    setOn((cur) => (cur.includes(opt) ? cur.filter((o) => o !== opt) : OPTIONS.filter((o) => o === opt || cur.includes(o))));

  return (
    <div
      className="flex min-h-[170px] flex-col gap-4 rounded-2xl bg-surface-3 p-[22px]"
      style={{
        backgroundImage: "linear-gradient(#1C1A18 1px, transparent 1px), linear-gradient(90deg, #1C1A18 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div id="equipment-demo-label" className="font-mono text-[11px] uppercase tracking-label-tight text-muted">
        What do you have? Tap to try
      </div>
      <div role="group" aria-labelledby="equipment-demo-label" className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const pressed = on.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={pressed}
              onClick={() => toggle(opt)}
              className={
                "min-h-[42px] cursor-pointer rounded-[10px] border px-4 text-sm transition-colors " +
                (pressed
                  ? "border-accent bg-accent font-semibold text-on-accent"
                  : "border-control bg-surface-3 text-soft hover:border-control-3")
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-auto font-mono text-xs text-soft">
        {describe(on)}
      </p>
    </div>
  );
}
