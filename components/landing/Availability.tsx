// Web today, iPhone next. The web card is outlined in chalk, like a selected option in the app.

const RED = "#D8443A";
const BLUE = "#3B7AD6";
const YELLOW = "#E8B43B";

// 14 days: done, done, today, then week two ahead. null = rest.
const GRID: ({ fill?: string; ring?: string } | null)[] = [
  { fill: RED }, null, { fill: BLUE }, null, { ring: "#FF5B22" }, null, null,
  { ring: `${RED}99` }, null, { ring: `${BLUE}99` }, null, { ring: `${YELLOW}99` }, null, null,
];

export default function Availability() {
  return (
    <section aria-labelledby="availability-heading" className="mx-auto max-w-[940px] px-4 sm:px-6">
      <h2 id="availability-heading" className="headline text-center text-[clamp(26px,4vw,48px)] leading-none">
        Free on the web. <span className="text-accent">iPhone next.</span>
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="flex min-h-[380px] flex-col rounded-card border-[1.5px] border-accent bg-surface p-7">
          <p className="label text-muted">Zorr on the web · today</p>
          <h3 className="mt-1.5 text-xl font-bold">Your two-week plan</h3>
          <div aria-hidden="true" className="flex flex-grow items-center justify-center py-8">
            <div className="grid grid-cols-7 gap-2">
              {GRID.map((c, i) => (
                <span
                  key={i}
                  className={`h-6 w-6 rounded-full ${c ? "" : "bg-cell"}`}
                  style={c ? { background: c.fill, boxShadow: c.ring ? `inset 0 0 0 2px ${c.ring}` : undefined } : undefined}
                />
              ))}
            </div>
          </div>
          <p className="flex items-baseline gap-2.5">
            <span className="numeral text-[64px] leading-[0.9]">₹0</span>
            <span className="font-mono text-[11px] uppercase tracking-label-tight text-muted">No card needed</span>
          </p>
        </article>

        <article className="flex min-h-[380px] flex-col rounded-card border border-white/[0.08] bg-surface p-7">
          <p className="label text-muted">Zorr for iPhone · soon</p>
          <h3 className="mt-1.5 text-xl font-bold">Swaps on the spot, more weeks</h3>
          <div aria-hidden="true" className="flex flex-grow items-center justify-center py-8">
            <div className="h-[180px] w-24 rounded-3xl border border-line-strong bg-phone p-[7px]">
              <div className="h-full rounded-[18px]" style={{ background: "radial-gradient(circle at 50% 45%, #0F1011 0 10%, #2E3034 11% 22%, #FF5B22 23% 25%, #232427 26% 60%, #0F1011 61%)" }} />
            </div>
          </div>
          <p className="flex items-baseline gap-2.5">
            <span className="numeral text-[64px] uppercase leading-[0.9]">Soon</span>
            <span className="font-mono text-[11px] uppercase tracking-label-tight text-muted">Your account carries over</span>
          </p>
        </article>
      </div>
    </section>
  );
}
