import Nav from "./Nav";
import Footer from "./Footer";

/**
 * Frame for the marketing pages beyond the landing (About, Pricing, Blog, Contact):
 * the floating nav, a page header in the app's tonal headline style, the page, the footer.
 */
export default function PageShell({
  label,
  title,
  intro,
  aside,
  children,
}: {
  label: string;
  /** Mark the key words with <span className="text-accent">; the rest of the line dims. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Optional block under the intro, e.g. a call to action. */
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main>
        <header className="mx-auto max-w-page px-4 pb-12 pt-16 sm:px-6 md:px-10 md:pb-16 md:pt-24">
          <p className="label text-dim">{label}</p>
          <h1 className="headline mt-4 max-w-[900px] text-[clamp(32px,5.4vw,64px)] leading-[0.98]">{title}</h1>
          {intro && <div className="mt-6 max-w-[560px] text-[17px] leading-[1.55] text-muted md:text-lg">{intro}</div>}
          {aside && <div className="mt-8">{aside}</div>}
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** A section heading inside a page: a mono label over a tonal headline. */
export function SectionHead({ label, title, id, center }: { label?: string; title: React.ReactNode; id?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && <p className="label text-dim">{label}</p>}
      <h2 id={id} className="headline mt-3 text-[clamp(24px,3.4vw,40px)] leading-none">{title}</h2>
    </div>
  );
}
