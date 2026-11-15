"use client";

import { useId, useState } from "react";
import { knobClasses } from "./Knob";
import { ArrowRight } from "./icons";

const TOPICS = ["Help with my plan", "My account", "Feedback or an idea", "Press or partnership", "Something else"] as const;

/**
 * There is no contact endpoint on the backend, so this composes the message and opens
 * it in the person's own email app. Nothing is sent or stored by the site.
 */
export default function ContactForm({ email }: { email: string }) {
  const id = useId();
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");

  const subject = `${topic}${name.trim() ? ` from ${name.trim()}` : ""}`;
  const body = message.trim() + (account.trim() ? `\n\nAccount email: ${account.trim()}` : "");
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const k = knobClasses("chalk", "lg");
  const field = "min-h-[52px] w-full rounded-xl border border-control bg-surface-3 px-4 text-base text-fg placeholder:text-dim focus:border-soft focus:outline-none";

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <fieldset>
        <legend className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">What is it about?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={`min-h-[44px] rounded-full border px-4 text-[14px] transition-colors ${topic === t ? "border-accent bg-accent font-semibold text-ink" : "border-control bg-surface-3 text-soft hover:border-control-3"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">Your name</label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-acct`} className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">Account email (if you have one)</label>
          <input id={`${id}-acct`} type="email" value={account} onChange={(e) => setAccount(e.target.value)} autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-msg`} className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">Message</label>
        <textarea
          id={`${id}-msg`}
          rows={6}
          required
          maxLength={4000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What happened, or what's on your mind?"
          className={`${field} py-3 leading-[1.5]`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" disabled={!message.trim()} className={`${k.pill} shrink-0 self-start whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50`}>
          <span>Open in my email app</span>
          <span className={k.disc}><ArrowRight size={k.icon} /></span>
        </button>
        <p className="text-[13px] leading-[1.5] text-dim">This opens a draft to {email}. Nothing is sent until you press send.</p>
      </div>
    </form>
  );
}
