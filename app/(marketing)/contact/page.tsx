import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import ContactForm from "@/components/site/ContactForm";
import Ph from "@/components/legal/Ph";
import { Chevron } from "@/components/site/icons";
import { LEGAL } from "@/lib/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the people behind Zorr: help with your plan or account, feedback, privacy requests, press.",
  alternates: { canonical: "/contact" },
};

function Channel({ tag, title, children, href, external }: { tag: string; title: string; children: React.ReactNode; href?: string; external?: boolean }) {
  const inner = (
    <>
      <p className="label text-dim">{tag}</p>
      <p className="mt-2 text-lg font-semibold">{title}</p>
      <div className="mt-1.5 text-[15px] leading-[1.6] text-muted">{children}</div>
    </>
  );
  const box = "block rounded-[20px] border border-white/[0.08] bg-surface p-6";
  if (!href) return <li className={box}>{inner}</li>;
  return (
    <li>
      {external ? (
        <a href={href} rel="noopener noreferrer" className={`${box} group flex items-start justify-between gap-4 transition-colors hover:border-control-3`}>
          <span>{inner}</span>
          <Chevron size={16} className="mt-1 shrink-0 text-dim transition-colors group-hover:text-fg" />
        </a>
      ) : (
        <Link href={href} className={`${box} group flex items-start justify-between gap-4 transition-colors hover:border-control-3`}>
          <span>{inner}</span>
          <Chevron size={16} className="mt-1 shrink-0 text-dim transition-colors group-hover:text-fg" />
        </Link>
      )}
    </li>
  );
}

export default function ContactPage() {
  return (
    <PageShell
      label="Contact"
      title={<>Talk to <span className="text-accent">a real person.</span></>}
      intro={
        <p>
          A person reads every message and replies within <Ph>{LEGAL.supportResponse}</Ph>. For quick answers, the{" "}
          <Link href="/support" className="border-b border-control-3 text-fg hover:border-fg">support page</Link> covers the common ones.
        </p>
      }
    >
      <div className="mx-auto grid max-w-page items-start gap-5 px-4 sm:px-6 md:grid-cols-[5fr_7fr] md:px-10">
        <ul className="flex flex-col gap-4">
          <Channel tag="[01] Email" title={SUPPORT_EMAIL} href={`mailto:${SUPPORT_EMAIL}`} external>
            Help with your plan or account, feedback, press. Tell us the email on your account.
          </Channel>
          <Channel tag="[02] Privacy and data" title="Grievance Officer">
            <Ph>{LEGAL.grievanceOfficer}</Ph> at <Ph>{LEGAL.grievanceEmail}</Ph>. Put &ldquo;Privacy&rdquo; in the subject. More in the{" "}
            <Link href="/privacy" className="border-b border-control-3 text-fg hover:border-fg">Privacy Policy</Link>.
          </Channel>
          <Channel tag="[03] Instagram" title="@zorr.app" href="https://www.instagram.com/zorr.app/" external>
            Follow along as the iPhone app gets closer.
          </Channel>
          <Channel tag="[04] Help" title="Support and FAQ" href="/support">
            Resetting your password, deleting your account, and the questions we get most.
          </Channel>
        </ul>

        <section aria-labelledby="write-h" className="rounded-card border border-white/[0.08] bg-surface p-6 md:p-9">
          <p className="label text-dim">Write to us</p>
          <h2 id="write-h" className="headline mb-8 mt-3 text-[clamp(22px,2.6vw,30px)] leading-[1.02]">
            Say <span className="text-accent">what&rsquo;s on your mind.</span>
          </h2>
          <ContactForm email={SUPPORT_EMAIL} />
        </section>
      </div>
    </PageShell>
  );
}
