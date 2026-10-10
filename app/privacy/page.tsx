import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Zorr collects, uses, and protects your data.",
};

const CONTACT = "zorrapp.in@gmail.com";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow mb-4 text-accent">Legal</p>
        <h1 className="font-display text-[clamp(2.25rem,7vw,4rem)] font-black leading-[0.98] tracking-[-0.02em]">
          Privacy Policy
        </h1>
        <p className="mt-4 font-sans text-sm text-muted">
          Effective August 1, 2026 · Last updated July 18, 2026
        </p>

        {/* DRAFT NOTICE — do not remove before a lawyer reviews this. */}
        <div className="mt-8 border-2 border-accent bg-accent/5 p-5">
          <p className="font-sans text-sm leading-relaxed text-fg">
            <strong className="font-semibold">Draft — needs legal review.</strong>{" "}
            This policy is a good-faith draft written to describe Zorr honestly.
            It has <em>not</em> been reviewed by a lawyer and is not a substitute
            for legal advice. Have it reviewed against Indian data-protection law
            (including the DPDP Act, 2023) and Apple App Store requirements
            before launch. Note: service providers are described by function
            rather than named — a lawyer should confirm whether the applicable
            law requires naming specific vendors explicitly.
          </p>
        </div>

        <div className="prose-zorr mt-4">
          <p>
            Zorr (&ldquo;Zorr,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a
            private AI fitness coaching app. This policy explains what we collect,
            why, and what control you have. We designed Zorr to keep your training
            private — there is no public feed, no leaderboard, and nothing you log
            is shown to other users.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Account information</strong> — such as your name and email
              address, used to create and secure your account.
            </li>
            <li>
              <strong>Workout and health data you enter</strong> — the details
              you give us so Zorr can coach you: sleep, stress, schedule,
              available equipment, injuries, activity outside the gym, and the
              training you log. You choose what to share.
            </li>
            <li>
              <strong>Device information</strong> — basic technical data such as
              device type, operating system version, and app version, used to run
              the app and diagnose problems.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <p>
            We use your information to build and adjust your training plan, to
            operate and secure the app, and to contact you about your account. We
            do not sell your personal data, and we do not use it to build a public
            profile of you.
          </p>

          <h2>How your data is processed and stored</h2>
          <p>
            Zorr relies on a small set of service providers to run. We share only
            the data each provider needs to do its job:
          </p>
          <ul>
            <li>
              <strong>AI plan generation</strong> — a third-party AI service
              provider processes your workout-related context (such as sleep,
              equipment, and injuries) to generate and adjust your training plan.
            </li>
            <li>
              <strong>Data storage</strong> — a third-party database provider
              stores your account and the data you enter.
            </li>
            <li>
              <strong>Payments</strong> — a third-party payment provider will
              process payments if and when paid features launch. Zorr is free at
              launch, so no payment data is processed until paid plans exist.
            </li>
            <li>
              <strong>Media storage</strong> — a third-party media provider stores
              and delivers media (such as images) associated with the app.
            </li>
            <li>
              <strong>Email</strong> — a third-party email provider sends
              transactional email, such as account and support messages.
            </li>
            <li>
              <strong>Infrastructure</strong> — third-party infrastructure
              providers support rate limiting and caching to keep the service fast
              and to prevent abuse.
            </li>
          </ul>
          <p>
            These providers process data on our behalf under their own security
            and privacy terms. Some may store or process data outside your
            country.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep your data for as long as your account is active, or as needed
            to provide the service. You can ask us to delete it at any time (see
            below).
          </p>

          <h2>Your rights and choices</h2>
          <ul>
            <li>
              <strong>Access and correction</strong> — you can ask what we hold
              about you and ask us to correct it.
            </li>
            <li>
              <strong>Deletion</strong> — you can ask us to delete your account and
              associated data. Email us and we&rsquo;ll take care of it.
            </li>
            <li>
              <strong>Contact for privacy requests</strong> — email{" "}
              <a href={`mailto:${CONTACT}`}>{CONTACT}</a> with
              &ldquo;Privacy&rdquo; in the subject line.
            </li>
          </ul>

          <h2>Children</h2>
          <p>
            Zorr is intended for users 18 and older. We do not knowingly collect
            data from children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as the app changes. We&rsquo;ll update the
            date at the top, and for significant changes we&rsquo;ll do our best to
            let you know in the app.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
