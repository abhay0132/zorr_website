import type { Metadata } from "next";
import AuthShell from "@/components/app/AuthShell";
import ForgotPasswordForm from "@/components/app/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false, follow: true } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset your password" intro="Enter the email you signed up with and we will send you a link.">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
