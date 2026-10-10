import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/app/AuthShell";
import LoginForm from "@/components/app/LoginForm";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: true } };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back">
      {/* useSearchParams needs a Suspense boundary for static rendering. */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
