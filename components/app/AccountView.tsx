"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, errorText } from "@/lib/api";
import { PHONES } from "@/lib/onboarding";
import { useSession } from "./useSession";
import { Button, ChoiceCard, Notice, Spinner, TextField } from "./ui";

const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

export default function AccountView() {
  const router = useRouter();
  const { profile, setProfile } = useSession();
  const [phone, setPhone] = useState<string | null>(null);
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneMsg, setPhoneMsg] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [phrase, setPhrase] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        <Spinner className="mr-3" /> Loading
      </div>
    );
  }
  const currentPhone = phone ?? profile.phonePlatform ?? undefined;

  async function savePhone() {
    if (!currentPhone) return;
    setSavingPhone(true);
    setPhoneMsg(null);
    try {
      await api("/user/profile", { method: "PUT", body: { phonePlatform: currentPhone } });
      setProfile({ ...profile!, phonePlatform: currentPhone as "IOS" | "ANDROID" | "OTHER" });
      setPhone(null);
      setPhoneMsg("Saved.");
    } catch (err) {
      setPhoneMsg(errorText(err));
    } finally {
      setSavingPhone(false);
    }
  }

  /** Downloads GET /api/user/export as a JSON file. */
  async function exportData() {
    setExporting(true);
    setError(null);
    try {
      const data = await api<unknown>("/user/export");
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `zorr-my-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setExporting(false);
    }
  }

  async function signOut() {
    try {
      await api("/auth/logout", { method: "POST" });
    } finally {
      router.replace("/");
    }
  }

  async function deleteAccount(e: React.FormEvent) {
    e.preventDefault();
    setDeleting(true);
    setDeleteError(null);
    try {
      await api("/user/account", { method: "DELETE", body: { password, confirmation: phrase } });
      router.replace("/?deleted=1");
    } catch (err) {
      setDeleteError(errorText(err));
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="label text-accent">Account</p>
        <h1 className="headline mt-2 text-[clamp(34px,9vw,52px)] leading-[0.95]">{profile.name}</h1>
        <p className="mt-2 text-[15px] text-muted">{profile.email}</p>
      </div>

      {error && <Notice>{error}</Notice>}

      <section aria-labelledby="phone-h">
        <h2 id="phone-h" className="text-[18px] font-semibold">Your phone</h2>
        <p className="mt-1 text-[14px] text-muted">iPhone users get the app invite first.</p>
        <div role="radiogroup" aria-labelledby="phone-h" className="mt-4 flex flex-col gap-2.5">
          {PHONES.map((p) => (
            <ChoiceCard key={p.id} name="phone" title={p.title} selected={currentPhone === p.id} onSelect={() => setPhone(p.id)} />
          ))}
        </div>
        {phone && phone !== profile.phonePlatform && (
          <div className="mt-4"><Button loading={savingPhone} onClick={savePhone}>Save</Button></div>
        )}
        {phoneMsg && <p role="status" className="mt-3 text-[14px] text-muted">{phoneMsg}</p>}
      </section>

      <section aria-labelledby="data-h" className="border-t border-line pt-8">
        <h2 id="data-h" className="text-[18px] font-semibold">Your data</h2>
        <p className="mt-1 text-[14px] leading-[1.55] text-muted">
          Download everything we hold about you as a file. See the <Link href="/privacy" className="text-fg underline decoration-control-3 underline-offset-2">Privacy Policy</Link> for what we keep and why.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" loading={exporting} onClick={exportData}>Export my data</Button>
          <Button variant="secondary" onClick={signOut}>Sign out</Button>
        </div>
      </section>

      <section aria-labelledby="delete-h" className="border-t border-line pt-8">
        <h2 id="delete-h" className="text-[18px] font-semibold">Delete my account</h2>
        <p className="mt-1 text-[14px] leading-[1.55] text-muted">
          This permanently deletes your account, your plans and your workout history. It cannot be undone.
        </p>
        {!confirmOpen ? (
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setConfirmOpen(true)} className="!border-accent !text-accent">Delete my account</Button>
          </div>
        ) : (
          <form onSubmit={deleteAccount} className="mt-5 flex flex-col gap-4 rounded-2xl border border-accent bg-accent/5 p-5">
            {deleteError && <Notice>{deleteError}</Notice>}
            <TextField label="Your password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField label={`Type ${CONFIRM_PHRASE} to confirm`} autoComplete="off" autoCapitalize="characters" value={phrase} onChange={(e) => setPhrase(e.target.value)} required />
            <div className="flex flex-wrap gap-3">
              <Button type="submit" loading={deleting} disabled={!password || phrase !== CONFIRM_PHRASE}>Delete permanently</Button>
              <Button type="button" variant="ghost" onClick={() => { setConfirmOpen(false); setPassword(""); setPhrase(""); }}>Cancel</Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
