import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import IronPlate from "@/components/site/IronPlate";
import { KnobLink } from "@/components/site/Knob";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main className="relative mx-auto max-w-page px-4 pb-8 pt-20 sm:px-6 md:px-10 md:pt-32">
        <IronPlate className="pointer-events-none absolute right-[-200px] top-10 hidden h-[520px] w-[520px] opacity-60 md:block" />
        <div className="relative">
          <p className="label text-dim">Error 404</p>
          <h1 className="headline mt-4 max-w-[760px] text-[clamp(34px,6vw,72px)] leading-[0.98]">
            This page <span className="text-accent">skipped leg day.</span>
          </h1>
          <p className="mt-7 max-w-[460px] text-lg leading-[1.55] text-muted">
            The link is broken or the page moved. Everything else is right where it was.
          </p>
          <KnobLink href="/" className="mt-9">Back to the home page</KnobLink>
        </div>
      </main>
      <Footer />
    </div>
  );
}
