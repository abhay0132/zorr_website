"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, ApiError, errorText } from "@/lib/api";
import { Button, Notice, TextField } from "./ui";
import Turnstile, { turnstileEnabled } from "./Turnstile";

// Sign-up → immediate sign-in → onboarding. The backend's signup returns no session,
// so the form signs in with the same details right after; email verification is
// asked for by email and is not required to start.
export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const ready = acceptedTerms && isAdult && (!turnstileEnabled || token) && !busy;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);
    try {
      await api("/auth/signup", {
        method: "POST",
        body: { name: name.trim(), email, password, acceptedTerms: true, isAdult: true, turnstileToken: token ?? undefined },
      });
      await api("/auth/login", { method: "POST", body: { email, password } });
      router.push("/onboarding");
    } catch (err) {
      if (err instanceof ApiError && err.details?.length) {
        setFieldErrors(Object.fromEntries(err.details.map((d) => [d.field ?? "", d.message])));
      }
      setError(errorText(err));
      setResetKey((k) => k + 1); // a used or rejected Turnstile token cannot be reused
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {error && <Notice>{error}</Notice>}
      <TextField label="First name" name="name" autoComplete="given-name" required value={name} onChange={(e) => setName(e.target.value)} error={fieldErrors.name} />
      <TextField label="Email" name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} error={fieldErrors.email} />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint="At least 8 characters, with a capital letter and a number."
        error={fieldErrors.password}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Agreements</legend>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-soft">
          <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#FF5C1F]" />
          <span>
            I agree to the{" "}
            <Link href="/terms" target="_blank" className="text-fg underline decoration-accent underline-offset-2">Terms</Link> and the{" "}
            <Link href="/privacy" target="_blank" className="text-fg underline decoration-accent underline-offset-2">Privacy Policy</Link>.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-soft">
          <input type="checkbox" checked={isAdult} onChange={(e) => setIsAdult(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#FF5C1F]" />
          <span>I am 18 or older.</span>
        </label>
      </fieldset>

      <Turnstile onToken={setToken} resetKey={resetKey} />

      <Button type="submit" full loading={busy} disabled={!ready}>
        Create my account
      </Button>
      <p className="text-center text-[15px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-fg underline decoration-control-3 underline-offset-4">Sign in</Link>
      </p>
    </form>
  );
}
