import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import Ph from "@/components/legal/Ph";
import { LEGAL, LEGAL_LAST_UPDATED } from "@/lib/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

// DRAFT: needs review by a lawyer. Placeholders live in lib/legal.ts.
// Written for India's DPDP Act 2023 and Apple App Review Guideline 5.1.2(i), which
// requires disclosing personal data shared with third-party AI. The AI provider is
// named here on purpose; this is the one public page where vendors are named.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Zorr collects, why, who processes it, and how to see, change or delete it.",
  alternates: { canonical: "/privacy" },
};

type Processor = { name: string; role: string; data: React.ReactNode; where: string };

const PROCESSORS: Processor[] = [
  {
    name: "Google LLC (Gemini API)",
    role: "AI that generates plans",
    data: (
      <>
        Your plan answers (see <a href="#ai">what we send to the AI</a>). Never your email address or password.
      </>
    ),
    where: "United States and other countries where Google operates",
  },
  {
    name: "Vercel Inc.",
    role: "Website hosting",
    data: "Requests to zorr.app: IP address, browser and device details, pages requested.",
    where: "Global network; company based in the United States",
  },
  {
    name: LEGAL.backendHost,
    role: "App server hosting",
    data: "Everything the app server processes, including your account and training data.",
    where: "[REGION]",
  },
  {
    name: LEGAL.databaseHost,
    role: "Database",
    data: "Your account, profile, plan and workout records.",
    where: "[REGION]",
  },
  {
    name: LEGAL.cacheHost,
    role: "Cache and rate limiting",
    data: "Short-lived counters keyed to your IP address or account ID, and signed-out session IDs.",
    where: "[REGION]",
  },
  {
    name: "Twilio Inc. (SendGrid)",
    role: "Email",
    data: "Your email address, your name, and the content of service emails (verification, password reset, plan ready, the iPhone invite).",
    where: "United States",
  },
  {
    name: "Functional Software, Inc. (Sentry)",
    role: "Error monitoring",
    data: "Error reports, which can include your account ID, IP address, browser details and the request that failed.",
    where: "United States",
  },
  {
    name: "Cloudflare, Inc. (Turnstile)",
    role: "Bot protection on sign-up",
    data: "Signals from your browser and your IP address, used to tell people from bots.",
    where: "Global network; company based in the United States",
  },
  {
    name: "Cloudinary",
    role: "Image storage (iPhone app)",
    data: "A profile photo or progress photos, only if you upload them.",
    where: "United States",
  },
  {
    name: "650 Industries, Inc. (Expo) and Apple",
    role: "Push notifications (iPhone app)",
    data: "Your device push token and the text of the notification.",
    where: "United States",
  },
];

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          <Ph>{LEGAL.name}</Ph>, based in <Ph>{LEGAL.city}</Ph>, Uttar Pradesh, India, runs Zorr. Under India&rsquo;s Digital
          Personal Data Protection Act, 2023 (DPDP Act), we are the <strong>Data Fiduciary</strong> for your personal data: we
          decide why and how it is used.
        </p>
        <p>
          This policy covers the Zorr website at zorr.app, the web app, and the Zorr iPhone app.
        </p>
        <p>
          <strong>Grievance Officer:</strong> <Ph>{LEGAL.grievanceOfficer}</Ph>, <Ph>{LEGAL.grievanceEmail}</Ph>.
          <br />
          <strong>General questions:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    content: (
      <>
        <h3>Your account</h3>
        <ul>
          <li>Email address and name.</li>
          <li>
            Your password, stored only as a one-way hash. We cannot see your password, and nobody at Zorr can read it.
          </li>
          <li>When you agreed to these terms and confirmed you are 18 or older.</li>
          <li>If you sign in with Google on iPhone: your name, email address and Google account ID.</li>
        </ul>

        <h3>Your profile and plan answers</h3>
        <ul>
          <li>Age, sex, height and weight.</li>
          <li>Goal, training experience, how recently you trained, and how confident you are with the movements.</li>
          <li>Where you train, the equipment you have, how many days a week, and how long a session can be.</li>
          <li>How active your day is, sleep, stress, diet, allergies and activities you do outside your plan.</li>
          <li>Which phone you use (iPhone, Android or other).</li>
        </ul>

        <h3>Pain and injury answers</h3>
        <p>
          We ask which areas hurt or were injured, how recently, and an optional note in your own words. In the iPhone app you
          can also report discomfort on a specific exercise. <strong>We treat these answers as sensitive.</strong> We ask for
          them for one reason: to keep exercises that could aggravate an injury out of your plan. You can leave the note blank,
          and you can answer &ldquo;no issues&rdquo;.
        </p>

        <h3>Your training</h3>
        <ul>
          <li>Your generated plans.</li>
          <li>Workouts you mark as done, and how each one felt (easy, right or hard).</li>
          <li>Your answers to short feedback questions, such as whether you would follow your plan.</li>
          <li>
            In the iPhone app: sets, reps and weights you log; exercise swaps and the reason you type; body weight entries; and a
            profile photo or progress photos if you choose to add them.
          </li>
        </ul>

        <h3>Technical data</h3>
        <ul>
          <li>IP address, browser or device type, and app version.</li>
          <li>Which devices are signed in to your account, so you can see and end those sessions.</li>
          <li>Server logs and error reports when something goes wrong.</li>
          <li>In the iPhone app, a push notification token if you allow notifications.</li>
        </ul>

        <h3 id="cookies">Cookies</h3>
        <p>
          We use only <strong>essential cookies</strong>: two sign-in cookies (<code className="font-mono text-[0.9em]">accessToken</code>,{" "}
          <code className="font-mono text-[0.9em]">refreshToken</code>) that keep you logged in. They cannot be read by
          scripts on the page and are only sent to our own servers. We do not use advertising or tracking cookies. If we
          add analytics that need non-essential cookies, we will ask first, and the answer will be &ldquo;no&rdquo; until you
          change it.
        </p>
      </>
    ),
  },
  {
    id: "why",
    title: "Why we use it",
    content: (
      <ul>
        <li>
          <strong>To create and run your account:</strong> sign-in, password resets, keeping you signed in.
        </li>
        <li>
          <strong>To generate your plan and adjust it:</strong> your profile and plan answers decide which exercises, how many
          sets and reps, and what weights you see.
        </li>
        <li>
          <strong>To keep training safe:</strong> pain and injury answers, experience and recency set how cautious the plan is.
        </li>
        <li>
          <strong>To prevent abuse:</strong> rate limits, bot checks on sign-up, and limits on how many plans an account can
          generate.
        </li>
        <li>
          <strong>To improve the product:</strong> completed workouts, how they felt, feedback answers and which phone people
          use tell us what works and what to build next.
        </li>
        <li>
          <strong>To send service emails:</strong> verification, password resets, a notice when a plan is ready, important
          changes, and the invite to the iPhone app when it is ready. We do not send marketing emails without asking.
        </li>
      </ul>
    ),
  },
  {
    id: "processors",
    title: "Who processes it",
    content: (
      <>
        <p>
          We do not sell your personal data, and we do not share it for advertising. We use the companies below to run the
          service. Each one gets only what it needs for its job and processes it on our behalf.
        </p>
        <dl className="mt-6 flex flex-col border-t border-line">
          {PROCESSORS.map((p) => (
            <div key={p.role} className="border-b border-line py-5">
              <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold text-fg">
                  <Ph>{p.name}</Ph>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label-tight text-accent">{p.role}</span>
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.6] text-muted">{p.data}</dd>
              <dd className="mt-1 text-[13px] text-dim">
                Location: <Ph>{p.where}</Ph>
              </dd>
            </div>
          ))}
        </dl>
        <p>We will update this list before we add a new processor.</p>
      </>
    ),
  },
  {
    id: "ai",
    title: "What we send to the AI",
    content: (
      <>
        <p>
          Plans are generated by a third-party AI model, <strong>Google&rsquo;s Gemini API</strong>. Our server sends it the
          request; your browser or phone never talks to it directly. Before your first plan, we ask for your explicit
          permission to send these answers.
        </p>
        <h3>Sent to generate your plan</h3>
        <ul>
          <li>Your first name, age and weight.</li>
          <li>Your goal and training experience.</li>
          <li>Your equipment, days per week and session length.</li>
          <li>How active your day is, sleep, stress, diet, and allergies.</li>
          <li>Pain and injury areas, how recent they are, and your note about them, if you wrote one.</li>
          <li>Activities you do outside your plan.</li>
        </ul>
        <h3>Sent in the iPhone app</h3>
        <ul>
          <li>When you swap an exercise: the reason you type and the name of the exercise.</li>
          <li>When your plan updates: the list of exercise changes, to write a short summary.</li>
        </ul>
        <h3>Never sent</h3>
        <ul>
          <li>Your email address, password, phone platform, sex, height, photos or IP address.</li>
        </ul>
        <h3>What Google may do with it</h3>
        <p>
          <Ph>
            [CONFIRM BEFORE LAUNCH: Zorr uses the Gemini API through a billed Google Cloud project. Under Google&rsquo;s terms for
            paid services, Google does not use these prompts or responses to improve its products and processes them under its
            data processing terms. If the project is on the unpaid tier, this paragraph is false and must change.]
          </Ph>
        </p>
        <p>
          The AI proposes; our own server checks every plan against safety limits before you see it. It never sets a weight
          above our limits.
        </p>
      </>
    ),
  },
  {
    id: "consent",
    title: "Consent and withdrawing it",
    content: (
      <>
        <p>
          We rely on your consent, given when you sign up and when you agree to send your answers to the AI. You can withdraw it
          at any time by deleting your account, or by emailing <Ph>{LEGAL.grievanceEmail}</Ph>. Withdrawing is as easy as giving
          it.
        </p>
        <p>
          When you withdraw, we stop processing your data and delete it as described below. We cannot generate a plan without
          it, so withdrawing consent ends your use of the service. It does not affect processing that already happened.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <ul>
        <li>
          <strong>While your account is open:</strong> we keep your account, profile and training data so the service works.
        </li>
        <li>
          <strong>When you delete your account:</strong> your account and everything linked to it is removed from our live
          database straight away. Copies in backups are removed within <Ph>{LEGAL.deletionDays}</Ph> days.
        </li>
        <li>
          <strong>Logs and error reports:</strong> kept for <Ph>{LEGAL.logDays}</Ph> days, unless the law requires longer.
        </li>
        <li>
          <strong>Records the law requires:</strong> where Indian law requires us to keep a record (for example, logs of
          processing), we keep only that record, only for as long as required, and then delete it.
        </li>
      </ul>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    content: (
      <>
        <p>Under the DPDP Act, you have the right to:</p>
        <ul>
          <li>
            <strong>Access:</strong> a summary of the personal data we hold about you and who we have shared it with. On the web,
            the export on your account page gives you a copy.
          </li>
          <li>
            <strong>Correction:</strong> fix or complete your data. You can change your profile answers yourself, or ask us.
          </li>
          <li>
            <strong>Erasure:</strong> have your data deleted. Deleting your account does this.
          </li>
          <li>
            <strong>Grievance redressal:</strong> complain to our Grievance Officer. We will reply within{" "}
            <Ph>{LEGAL.grievanceDays}</Ph> days.
          </li>
          <li>
            <strong>Nomination:</strong> name someone to exercise these rights for you if you die or cannot act yourself.
          </li>
        </ul>
        <p>
          To use any of these, email <Ph>{LEGAL.grievanceEmail}</Ph> from the address on your account. If you are not satisfied
          with our answer, you can complain to the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    id: "deletion",
    title: "Deleting your account",
    content: (
      <>
        <p>You can delete your account yourself, at any time, without asking us:</p>
        <ul>
          <li>
            <strong>On the web:</strong> sign in, open your <Link href="/account">account page</Link> and choose Delete my
            account.
          </li>
          <li>
            <strong>On iPhone:</strong> open Settings in the app and choose Delete account.
          </li>
        </ul>
        <p>
          You will be asked for your password and to type DELETE MY ACCOUNT to confirm. Deletion is permanent. Step-by-step
          instructions are on the <Link href="/support#delete-account">support page</Link>. If you cannot sign in, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from your account&rsquo;s email address and we will delete it
          for you.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    content: (
      <ul>
        <li>Everything between you and Zorr travels over an encrypted connection (HTTPS).</li>
        <li>Passwords are stored as one-way hashes, never as text.</li>
        <li>Sign-in cookies cannot be read by scripts on the page, and sign-in sessions expire.</li>
        <li>Sign-in, sign-up and plan generation are rate limited to stop people guessing passwords or abusing the service.</li>
        <li>Only the people who run Zorr can reach the database, and only when they need to.</li>
        <li>
          <Ph>[CONFIRM: the database host encrypts data at rest]</Ph>
        </li>
        <li>If a breach affects your data, we will tell you and the Data Protection Board of India as the law requires.</li>
      </ul>
    ),
  },
  {
    id: "transfers",
    title: "Data stored outside India",
    content: (
      <p>
        Several of the companies in <a href="#processors">Who processes it</a> store or process data outside India, mainly in
        the United States. The DPDP Act allows this, except to countries the Government of India restricts. We only use
        providers bound to protect the data, and we will move away from any country that becomes restricted.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Zorr is not for anyone under 18, and you must confirm you are 18 or older to sign up. We do not knowingly collect data
        from children. If we find an account that belongs to someone under 18, we delete it and its data. If you think a child
        has signed up, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes and contact",
    content: (
      <>
        <p>
          If we change this policy in a way that matters, we will tell you by email or in the service before the change takes
          effect, and update the date at the top. If a change needs fresh consent, we will ask for it.
        </p>
        <p>
          Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Grievances: <Ph>{LEGAL.grievanceOfficer}</Ph>,{" "}
          <Ph>{LEGAL.grievanceEmail}</Ph>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      draft
      label="Legal"
      title="Privacy Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro={
        <p className="text-lg leading-[1.6] text-fg">
          The short version: we collect what we need to build your plan and keep it safe. We never sell your data and there are
          no ads. Your plan answers are sent to an AI model to write the plan, but never your email or password. You can delete
          everything yourself, any time.
        </p>
      }
      sections={sections}
    />
  );
}
