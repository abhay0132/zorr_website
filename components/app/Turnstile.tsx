"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile widget for sign-up. The token it produces is verified by the
// backend (services/turnstile.service); on its own it proves nothing.
//
// The site key is public. Without one (local dev), nothing renders and no token is
// sent; the backend skips the check only when it has no secret either, which
// production does not allow.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) return new Promise((res) => existing.addEventListener("load", () => res(), { once: true }));
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error("turnstile script failed"));
    document.head.appendChild(s);
  });
}

export const turnstileEnabled = Boolean(SITE_KEY);

/** Renders the widget and reports the token (null when it expires or errors). */
export default function Turnstile({ onToken, resetKey }: { onToken: (token: string | null) => void; resetKey?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          callback: (t: string) => onToken(t),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      })
      .catch(() => onToken(null));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
    // onToken is stable for the life of the form; re-rendering the widget on every
    // parent render would reset the challenge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A failed sign-up spends the token; the form bumps resetKey to get a fresh one.
  useEffect(() => {
    if (resetKey && widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current);
      onToken(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="min-h-[65px]" />;
}
