import Link from "next/link";
import Logo from "./Logo";
import { KnobLink } from "./Knob";
import { SIGNUP_PATH } from "@/lib/site";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Floating glass pill: section links left, wordmark centred, the knob button right.
// Under 860px the links fold into a Menu disclosure (native <details>, no script) and
// the wordmark moves to the left.
export default function Nav() {
  return (
    <header className="pointer-events-none sticky top-4 z-30 px-4">
      <nav
        aria-label="Main"
        className="pointer-events-auto relative mx-auto flex h-14 max-w-[880px] items-center justify-between gap-2 rounded-full border border-white/10 bg-surface/60 pl-[22px] pr-[5px] backdrop-blur-[18px] min-[861px]:grid min-[861px]:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden gap-6 text-sm text-soft min-[861px]:flex">
          {LINKS.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="link">{l.label}</Link>
          ))}
        </div>
        <Link href="/" aria-label="Zorr home" className="text-[20px] leading-none text-fg hover:text-fg">
          <Logo />
        </Link>
        <div className="flex items-center justify-end gap-1.5">
          <details className="group min-[861px]:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center rounded-full px-3 font-mono text-[11px] uppercase tracking-label-tight text-soft hover:text-fg [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Menu</span>
              <span className="hidden group-open:inline">Close</span>
            </summary>
            <ul className="absolute left-0 right-0 top-[64px] flex flex-col rounded-[24px] border border-white/10 bg-surface p-2 shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-[48px] items-center rounded-2xl px-4 text-base text-fg hover:bg-surface-2">{l.label}</Link>
                </li>
              ))}
            </ul>
          </details>
          <KnobLink href={SIGNUP_PATH} size="sm">Build my plan</KnobLink>
        </div>
      </nav>
    </header>
  );
}
