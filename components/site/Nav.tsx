import Link from "next/link";
import Logo from "./Logo";
import { SIGNUP_PATH } from "@/lib/site";

// Full-width sticky bar with a hairline. Section links hide under 860px; the CTA never does.
export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/[0.86] backdrop-blur-[14px]">
      <nav aria-label="Main" className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="Zorr home" className="text-[26px] leading-none text-fg">
          <Logo />
        </Link>
        <div className="flex items-center justify-end gap-[26px]">
          <Link href="/#how" className="link label hidden tracking-label-tight min-[861px]:inline">
            How it works
          </Link>
          <Link href="/#faq" className="link label hidden tracking-label-tight min-[861px]:inline">
            FAQ
          </Link>
          <Link href={SIGNUP_PATH} className="btn-accent px-[18px] py-3 text-sm hover:text-on-accent">
            Build my plan
          </Link>
        </div>
      </nav>
    </header>
  );
}
