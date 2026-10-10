import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/site";

// PLACEHOLDER until Phase 4 builds the real sign-up flow. Every CTA on the
// landing page points here, so it must exist rather than 404.
export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: true },
};

export default function SignupPlaceholder() {
  return (
    <div className="overflow-x-clip">
      <Nav />
      <main className="mx-auto max-w-page px-4 pb-24 pt-20 sm:px-6 md:pb-32 md:pt-32">
        <p className="label text-accent">Almost ready</p>
        <h1 className="headline mt-4 text-[clamp(52px,9vw,140px)] font-black leading-[0.86]">
          Sign-up opens <span className="text-accent">soon</span>
        </h1>
        <p className="mt-7 max-w-[480px] text-lg leading-[1.55] text-muted">
          We&rsquo;re putting the last pieces in place. Want a nudge when it&rsquo;s live? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="border-b border-control-3 text-fg hover:border-fg">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <Link href="/" className="mt-9 inline-block border-b border-control-3 pb-[3px] text-[15px] text-fg hover:border-fg">
          Back to the home page
        </Link>
      </main>
      <Footer />
    </div>
  );
}
