// The iPhone-only features, in future tense. Nothing here is live on the web.
export default function AppTeaser() {
  return (
    <section aria-labelledby="teaser-heading" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:pt-[150px]">
      <div className="flex flex-wrap items-center gap-12 rounded-[28px] bg-accent p-[clamp(24px,5vw,64px)] text-on-accent">
        <div className="min-w-0 flex-[1_1_420px]">
          <span className="inline-block rounded-lg bg-bg px-3 py-[7px] font-mono text-xs uppercase tracking-label text-fg">Coming to iPhone</span>
          <h2 id="teaser-heading" className="headline mt-[22px] text-[clamp(44px,6vw,88px)] font-black leading-[0.9]">
            A coach that talks back
          </h2>
          <p className="mt-[22px] max-w-[470px] text-[17px] leading-[1.55] text-on-accent-soft">
            Bench taken? Shoulder feels off? Twenty minutes left? Tell the app why an exercise isn&rsquo;t working, in your own words, and get a replacement on the spot.
          </p>
          <p className="mt-3 max-w-[470px] text-[17px] leading-[1.55] text-on-accent-soft">
            From week three, your plan will adjust to what you actually lifted.
          </p>
          <p className="mt-[26px] text-[15px] font-semibold">Build a plan on the web and you&rsquo;re on the list. Your account carries over.</p>
        </div>

        <div className="flex min-w-0 flex-[0_1_300px] justify-center">
          <div
            role="img"
            aria-label="Preview of the iPhone app: someone types that the bench is taken and they have 20 minutes, and gets two replacement exercises"
            className="w-[290px] max-w-full rotate-[3deg] rounded-[46px] bg-bg p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden="true" className="flex flex-col gap-3 rounded-[38px] bg-surface px-4 py-5 text-fg">
              <div className="h-[22px] w-[76px] self-center rounded-full bg-black" />
              <div className="border-b border-line-soft pb-2.5">
                <div className="font-mono text-[10px] tracking-label-tight text-muted">EXERCISE 2 OF 5</div>
                <div className="mt-1 text-[15px] font-medium">Barbell bench press</div>
              </div>
              <div className="max-w-[84%] self-end rounded-[14px_14px_4px_14px] bg-fg px-3 py-2.5 text-[13px] leading-[1.4] text-on-accent">
                Bench is taken and I&rsquo;ve got 20 minutes left
              </div>
              <div className="text-[11px] text-muted">Same muscles, two options:</div>
              <div className="rounded-xl border border-accent px-3 py-[11px]">
                <div className="text-sm font-medium">Dumbbell floor press</div>
                <div className="mt-[3px] text-[11px] text-muted">Any spot on the floor · 3 × 10</div>
              </div>
              <div className="rounded-xl bg-surface-2 px-3 py-[11px]">
                <div className="text-sm font-medium">Push-up, feet raised</div>
                <div className="mt-[3px] text-[11px] text-muted">No equipment · 3 × 12</div>
              </div>
              <div className="text-center text-[11px] text-muted">Today only. Your plan stays the same.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
