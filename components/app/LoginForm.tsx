"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api, errorText } from "@/lib/api";
import { profileComplete, type Profile } from "./useSession";
import { Button, Notice, TextField } from "./ui";

/** Only same-site relative paths, so ?next= cannot bounce someone to another site. */
function safeNext(next: string | null): string | null {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await api("/auth/login", { method: "POST", body: { email, password } });
      const { user } = await api<{ user: Profile }>("/user/profile");
      router.push(safeNext(params.get("next")) ?? (profileComplete(user) ? "/plan" : "/onboarding"));
    } catch (err) {
      setError(errorText(err));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {error && <Notice>{error}</Notice>}
      <TextField label="Email" name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="-mt-2 text-right">
        <Link href="/forgot-password" className="text-[14px] text-soft underline decoration-control-3 underline-offset-4 hover:text-white">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" full loading={busy} disabled={!email || !password}>
        Sign in
      </Button>
      <p className="text-center text-[15px] text-muted">
        New here?{" "}
        <Link href="/signup" className="text-fg underline decoration-control-3 underline-offset-4">Build my free plan</Link>
      </p>
    </form>
  );
}
