import type { Metadata } from "next";
import { Suspense } from "react";
import OnboardingFlow from "@/components/app/OnboardingFlow";
import OnboardingShell from "@/components/app/OnboardingShell";

export const metadata: Metadata = { title: "Your answers", robots: { index: false, follow: false } };

export default function OnboardingPage() {
  return (
    <OnboardingShell>
      <Suspense>
        <OnboardingFlow />
      </Suspense>
    </OnboardingShell>
  );
}
