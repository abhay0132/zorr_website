import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import Ph from "@/components/legal/Ph";
import { FAQS } from "@/lib/faq";
import { LEGAL, LEGAL_LAST_UPDATED } from "@/lib/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

// DRAFT: needs review by a lawyer (the account-deletion and data wording).
// This is the Support URL for App Store Connect.

export const metadata: Metadata = {
  title: "Support",
  description: "Help with Zorr: common questions, resetting your password, deleting your account, and how to reach us.",
  alternates: { canonical: "/support" },
};

const sections: LegalSection[] = [
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. A person reads every message, and we reply within{" "}
          <Ph>{LEGAL.supportResponse}</Ph>.
        </p>
        <p>
          Tell us the email address on your account and what you were trying to do. For a privacy or data request, put
          &ldquo;Privacy&rdquo; in the subject.
        </p>
      </>
    ),
  },
  {
    id: "faq",
    title: "Common questions",
    content: (
      <dl>
        {FAQS.map((f) => (
          <div key={f.q} className="border-b border-line py-5 first:pt-0 last:border-b-0">
            <dt className="text-lg font-semibold text-fg">{f.q}</dt>
            <dd className="mt-2">{f.a}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "reset-password",
    title: "Reset your password",
    content: (
      <>
        <ol>
          <li>On the sign-in page, choose <strong>Forgot password</strong>.</li>
          <li>Enter the email address on your account and send.</li>
          <li>Open the email from Zorr and follow the link. It works for one hour.</li>
          <li>Choose a new password: at least 8 characters, with one capital letter and one number.</li>
          <li>Sign in with the new password, on the web or on iPhone.</li>
        </ol>
        <p>
          No email after a few minutes? Check spam, and make sure you used the address you signed up with. Still nothing? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: "delete-account",
    title: "Delete your account",
    content: (
      <>
        <h3>On the web</h3>
        <ol>
          <li>
            Sign in and open your <Link href="/account">account page</Link>.
          </li>
          <li>Choose <strong>Delete my account</strong>.</li>
          <li>Enter your password and type DELETE MY ACCOUNT to confirm.</li>
        </ol>
        <h3>On iPhone</h3>
        <ol>
          <li>Open <strong>Settings</strong> in the Zorr app.</li>
          <li>Choose <strong>Delete Account</strong>.</li>
          <li>Enter your password and confirm.</li>
        </ol>
        <p>
          Deletion is permanent and cannot be undone. Your account, plans and workout history are removed straight away, and
          backup copies within <Ph>{LEGAL.deletionDays}</Ph> days. See the <Link href="/privacy#retention">Privacy Policy</Link>{" "}
          for details.
        </p>
        <p>
          Can&rsquo;t sign in? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address on your account
          and we will delete it for you.
        </p>
      </>
    ),
  },
  {
    id: "health",
    title: "A note on health",
    content: (
      <p>
        Zorr is not medical advice: check with a doctor before you start, and stop if you feel pain, dizziness or chest
        discomfort. <Link href="/terms#health">More in the Terms</Link>.
      </p>
    ),
  },
];

export default function SupportPage() {
  return (
    <LegalPage
      draft
      label="Support"
      title="How can we help?"
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={sections}
    />
  );
}
