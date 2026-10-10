import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Zorr. Email us and a person will reply.",
};

const SUPPORT_EMAIL = "zorrapp.in@gmail.com";

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow mb-4 text-accent">Support</p>
        <h1 className="max-w-3xl font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[0.98] tracking-[-0.02em]">
          Stuck? Talk to a person.
        </h1>
        <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted">
          There&rsquo;s no ticket queue and no bot. Email us and a real person
          reads it — questions about your plan, your account, your data, or
          anything that&rsquo;s broken.
        </p>

        <div className="mt-12 border-t border-line-strong pt-10">
          <p className="eyebrow mb-3">Email</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-display text-[clamp(1.5rem,5vw,2.75rem)] font-bold tracking-[-0.02em] text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-6 max-w-lg font-sans text-base text-muted">
            For privacy or data-deletion requests, email the same address with
            &ldquo;Privacy&rdquo; in the subject and we&rsquo;ll handle it.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
