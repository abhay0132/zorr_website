import Link from "next/link";
import Logo from "@/components/site/Logo";

// Frame for sign-up, sign-in and password pages: just the wordmark and a narrow column.
export default function AuthShell({ title, intro, children }: { title: React.ReactNode; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-page items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Zorr home" className="text-[24px] leading-none text-fg">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[440px] px-4 pb-20 pt-10 sm:pt-16">
        <h1 className="headline text-[clamp(40px,11vw,60px)] leading-[0.92]">{title}</h1>
        {intro && <div className="mt-4 text-[16px] leading-[1.55] text-muted">{intro}</div>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
