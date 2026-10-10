import type { Metadata } from "next";
import AuthShell from "@/components/app/AuthShell";
import SignupForm from "@/components/app/SignupForm";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Build your free two-week training plan.",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return (
    <AuthShell title={<>Build my <span className="text-accent">free plan</span></>} intro="Two minutes of questions, then your first two weeks. Free on the web.">
      <SignupForm />
    </AuthShell>
  );
}
