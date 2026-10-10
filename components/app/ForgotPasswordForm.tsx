"use client";

import Link from "next/link";
import { useState } from "react";
import { api, errorText } from "@/lib/api";
import { Button, Notice, TextField } from "./ui";

// The backend always answers 200 here (it never reveals whether an address has an
// account), so the confirmation is the same whatever was typed.
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await api("/auth/forgot-password", { method: "POST", body: { email } });
      setSent(true);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-5">
        <Notice tone="info">
          If that email has a Zorr account, a reset link is on its way. It works for one hour. Check spam if it does not arrive.
        </Notice>
        <Link href="/login" className="text-[15px] text-fg underline decoration-control-3 underline-offset-4">Back to sign in</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {error && <Notice>{error}</Notice>}
      <TextField label="Email" name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button type="submit" full loading={busy} disabled={!email}>
        Send reset link
      </Button>
      <Link href="/login" className="text-center text-[15px] text-muted underline decoration-control-3 underline-offset-4">Back to sign in</Link>
    </form>
  );
}
