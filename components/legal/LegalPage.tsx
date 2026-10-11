import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export type LegalSection = { id: string; title: string; content: React.ReactNode };

type Props = {
  label: string;
  title: string;
  lastUpdated: string;
  /** Renders the lawyer-review marker (an HTML comment in the output) and a visible banner. */
  draft?: boolean;
  /** Shown above the table of contents, e.g. the health disclaimer on the Terms. */
  callout?: React.ReactNode;
  intro?: React.ReactNode;
  sections: LegalSection[];
};

/**
 * Shared shell for Terms, Privacy and Support: header, "Last updated", table of
 * contents (sticky beside the text on desktop, a list above it on mobile), sections.
 */
export default function LegalPage({ label, title, lastUpdated, draft, callout, intro, sections }: Props) {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main className="mx-auto max-w-page px-4 pb-24 pt-16 sm:px-6 md:pb-32 md:pt-24">
        {draft && (
          // A real HTML comment in the served page, so it survives into view-source.
          <div hidden dangerouslySetInnerHTML={{ __html: "<!-- DRAFT: needs review by a lawyer -->" }} />
        )}

        <p className="label text-accent">{label}</p>
        <h1 className="headline mt-4 text-[clamp(48px,8vw,112px)] font-black leading-[0.88]">{title}</h1>
        <p className="mt-5 font-mono text-xs uppercase tracking-label-tight text-muted">
          Last updated <time>{lastUpdated}</time>
        </p>

        {draft && (
          <div role="note" className="mt-8 max-w-[760px] rounded-xl border border-accent bg-accent/5 px-5 py-4 text-[15px] leading-[1.6] text-soft">
            <strong className="font-semibold text-fg">Draft.</strong> This text has not been reviewed by a lawyer yet. It will be
            before launch, and it may change when it is.
          </div>
        )}

        {callout && <div className="mt-6 max-w-[760px]">{callout}</div>}

        <div className="mt-14 grid gap-12 min-[961px]:grid-cols-[220px_minmax(0,1fr)] min-[961px]:gap-16">
          <nav aria-labelledby="toc-heading" className="min-[961px]:sticky min-[961px]:top-24 min-[961px]:self-start">
            <h2 id="toc-heading" className="label text-muted">
              On this page
            </h2>
            <ol className="mt-4 flex flex-col border-l border-line-strong text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-soft transition-colors hover:border-accent hover:text-white">
                    <span aria-hidden="true" className="font-mono text-xs text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="legal min-w-0 max-w-[680px]">
            {intro && <div className="mb-12">{intro}</div>}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="border-t border-line pb-4 pt-10 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-h`} className="headline flex gap-4 text-[clamp(28px,3.4vw,40px)] leading-[0.95]">
                  <span aria-hidden="true" className="pt-1.5 font-mono text-sm font-normal normal-case text-accent" style={{ fontStretch: "100%" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.title}</span>
                </h2>
                {s.content}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
