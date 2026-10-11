import Logo from "@/components/site/Logo";

// Onboarding gets the wordmark only: no nav to wander off through mid-answers.
export default function OnboardingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <header className="border-b border-line">
        <div className="mx-auto max-w-[560px] px-4 py-4 text-[24px] leading-none text-fg">
          <Logo />
        </div>
      </header>
      <main className="mx-auto w-full max-w-[560px] px-4 pb-10 pt-6">{children}</main>
    </div>
  );
}
