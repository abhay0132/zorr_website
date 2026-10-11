"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/site/Logo";

const NAV = [
  { href: "/plan", label: "Plan" },
  { href: "/account", label: "Account" },
];

// Frame for the logged-in pages. Mobile first: one narrow column, nav in the header.
export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-dvh overflow-x-clip">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/[0.9] backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-[720px] items-center justify-between px-4 py-3">
          <Link href="/plan" aria-label="Your plan" className="text-[24px] leading-none text-fg">
            <Logo />
          </Link>
          <nav aria-label="App" className="flex gap-1">
            {NAV.map((n) => {
              const active = path?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-label-tight ${active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[720px] px-4 pb-24 pt-6">{children}</main>
      <footer className="mx-auto max-w-[720px] border-t border-line px-4 py-6 text-[13px] text-muted">
        Not medical advice. Stop if you feel pain, dizziness or chest discomfort.{" "}
        <Link href="/support" className="underline decoration-control-3 underline-offset-2 hover:text-fg">Support</Link>
      </footer>
    </div>
  );
}
