"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

/** The fields of GET /api/user/profile the web uses. */
export type Profile = {
  id: string;
  email: string;
  name: string;
  primaryGoal: string | null;
  daysPerWeek: number | null;
  phonePlatform: "IOS" | "ANDROID" | "OTHER" | null;
  signupSource: "WEB" | "IOS" | null;
  disclaimerAckAt: string | null;
  aiConsentAt: string | null;
  planGenerationCount: number;
};

/** True once the profile has what generation needs; the same test the app uses. */
export function profileComplete(p: Profile): boolean {
  return Boolean(p.primaryGoal && p.daysPerWeek);
}

/**
 * Loads the signed-in profile. Without a session it sends the visitor to /login and
 * remembers where they were going. Pages render nothing sensitive until `profile` is set.
 */
export function useSession() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api<{ user: Profile }>("/user/profile")
      .then((d) => !cancelled && setProfile(d.user))
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          const next = encodeURIComponent(window.location.pathname);
          router.replace(`/login?next=${next}`);
          return;
        }
        setError(err instanceof ApiError ? err.message : "Something went wrong.");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { profile, setProfile, error };
}
