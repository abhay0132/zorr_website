import type { Metadata } from "next";
import { Suspense } from "react";
import AppShell from "@/components/app/AppShell";
import PlanView from "@/components/app/PlanView";

export const metadata: Metadata = { title: "Your plan", robots: { index: false, follow: false } };

export default function PlanPage() {
  return (
    <AppShell>
      <Suspense>
        <PlanView />
      </Suspense>
    </AppShell>
  );
}
