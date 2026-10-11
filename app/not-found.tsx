import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { ArrowRight } from "@/components/site/icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main className="mx-auto max-w-page px-4 pb-24 pt-20 sm:px-6 md:pb-32 md:pt-32">
        <p className="label text-accent">Error 404</p>
        <h1 className="headline mt-4 text-[clamp(56px,10vw,150px)] font-black leading-[0.86]">
          This page <span className="text-accent">skipped</span> leg day
        </h1>
        <p className="mt-7 max-w-[460px] text-lg leading-[1.55] text-muted">
          The link is broken or the page moved. Everything else is right where it was.
        </p>
        <Link href="/" className="btn-accent mt-9 min-h-[54px] px-[26px] text-base hover:text-on-accent">
          Back to the home page
          <ArrowRight />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
