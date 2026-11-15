import Link from "next/link";
import { KnobLink } from "./Knob";
import { SIGNUP_PATH } from "@/lib/site";

const GROUPS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "https://www.instagram.com/zorr.app/", label: "Instagram", external: true },
    ],
  },
];

// Raised graphite footer: a last call to action, the link groups, and a quiet oversized
// wordmark in the plate-hub grey.
export default function Footer() {
  return (
    <footer className="mt-24 rounded-t-[32px] border-t border-white/[0.06] bg-surface md:mt-32">
      <div className="mx-auto max-w-page px-4 pb-10 pt-16 sm:px-6 md:px-10 md:pt-[72px]">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <p className="headline max-w-[560px] text-[clamp(22px,3vw,30px)] leading-[1.02]">
              Training that fits <span className="text-accent">your actual life.</span>
            </p>
            <KnobLink href={SIGNUP_PATH} className="mt-6">Build my free plan</KnobLink>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <p className="label text-dim">{g.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      {l.external ? (
                        <a href={l.href} rel="noopener noreferrer" className="link">{l.label}</a>
                      ) : (
                        <Link href={l.href} className="link">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 md:mt-24 md:flex-row md:items-end">
          <div className="flex flex-col gap-3 text-[13px] text-dim">
            <p className="max-w-[420px] leading-[1.5]">Not medical advice. Check with a doctor before starting.</p>
            <p className="font-mono text-[11px] uppercase tracking-label-tight">© 2026 Zorr · any phone or laptop</p>
          </div>
          <div aria-hidden="true" className="headline select-none text-[clamp(96px,17vw,220px)] leading-[0.8] tracking-[-0.02em] text-hub">
            Zorr
          </div>
        </div>
      </div>
    </footer>
  );
}
