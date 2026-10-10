import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Zorr.",
};

const CONTACT = "zorrapp.in@gmail.com";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow mb-4 text-accent">Legal</p>
        <h1 className="font-display text-[clamp(2.25rem,7vw,4rem)] font-black leading-[0.98] tracking-[-0.02em]">
          Terms of Service
        </h1>
        <p className="mt-4 font-sans text-sm text-muted">
          Effective August 1, 2026 · Last updated July 18, 2026
        </p>

        {/* DRAFT NOTICE — do not remove before a lawyer reviews this. */}
        <div className="mt-8 border-2 border-accent bg-accent/5 p-5">
          <p className="font-sans text-sm leading-relaxed text-fg">
            <strong className="font-semibold">Draft — needs legal review.</strong>{" "}
            These terms are a good-faith draft. They have <em>not</em> been
            reviewed by a lawyer and are not legal advice. Have them reviewed
            against Indian law and Apple App Store requirements before launch.
          </p>
        </div>

        <div className="prose-zorr mt-4">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Zorr,
            an AI fitness coaching app. By using Zorr, you agree to these Terms. If
            you don&rsquo;t agree, don&rsquo;t use the app.
          </p>

          <h2>Who can use Zorr</h2>
          <p>
            You must be at least 18 years old to use Zorr. By using it, you confirm
            that you are.
          </p>

          <h2>Not medical advice</h2>
          <p>
            Zorr generates training plans from the information you give it. It is a
            fitness tool, not a doctor, physiotherapist, or licensed medical
            professional. Its plans are not medical advice. Talk to a qualified
            professional before starting a new training program, especially if you
            have an injury or health condition. You train at your own risk, and
            you&rsquo;re responsible for exercising within your limits.
          </p>

          <h2>Your account</h2>
          <p>
            You&rsquo;re responsible for keeping your account credentials secure and
            for activity under your account. Give us accurate information so your
            plan is built on real details.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>Don&rsquo;t misuse, disrupt, or try to break the service.</li>
            <li>Don&rsquo;t attempt to access other users&rsquo; data.</li>
            <li>
              Don&rsquo;t use Zorr for any unlawful purpose or in violation of these
              Terms.
            </li>
          </ul>

          <h2>AI-generated plans</h2>
          <p>
            Plans are produced with the help of AI based on the context you
            provide. AI can make mistakes. Use your judgment, and stop any
            exercise that causes pain beyond normal training effort.
          </p>

          <h2>Pricing</h2>
          <p>
            Zorr is free to start at launch. If we introduce paid features in the
            future, we&rsquo;ll show the price clearly before you&rsquo;re charged,
            and payments will be handled by our payment processor.
          </p>

          <h2>Your content and data</h2>
          <p>
            The data you enter stays yours. How we handle it is described in our{" "}
            <a href="/privacy">Privacy Policy</a>. You can ask us to delete your
            account and data at any time.
          </p>

          <h2>Availability and changes</h2>
          <p>
            We may update, change, or discontinue parts of the app. We may also
            update these Terms; if we do, we&rsquo;ll update the date above and,
            for significant changes, try to notify you in the app.
          </p>

          <h2>Disclaimers and liability</h2>
          <p>
            Zorr is provided &ldquo;as is&rdquo; without warranties of any kind. To
            the fullest extent allowed by law, we&rsquo;re not liable for injury,
            loss, or damages arising from your use of the app or reliance on its
            plans. Some jurisdictions don&rsquo;t allow certain limitations, so
            parts of this may not apply to you.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
