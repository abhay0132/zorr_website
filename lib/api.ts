// The one way the web app talks to the backend.
//
// Auth is the backend's httpOnly cookies (SameSite=strict), so every call sends
// credentials and the page never sees a token. The API must therefore live on the
// same site as the web app (zorr.app + api.zorr.app; localhost in dev).

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api").replace(/\/$/, "");

/** A failed API call, carrying the backend's error code so screens can branch on it. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: Array<{ field?: string; message: string }>,
  ) {
    super(message);
  }
}

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Abort after this long. Plan generation can take ~80s server-side. */
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 20_000;

async function rawCall(path: string, { method = "GET", body, timeoutMs = DEFAULT_TIMEOUT_MS }: Options): Promise<Response> {
  return fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });
}

/** One shared refresh at a time, so five parallel 401s do not rotate the token five times. */
let refreshing: Promise<boolean> | null = null;
function refreshSession(): Promise<boolean> {
  refreshing ??= rawCall("/auth/refresh", { method: "POST" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

/**
 * Calls the API and returns `data` from `{ success, data }`. Throws ApiError on any
 * failure. A 401 on a non-auth route triggers one cookie refresh and one retry: the
 * access cookie lives 30 minutes, the refresh cookie 30 days.
 */
export async function api<T>(path: string, options: Options = {}): Promise<T> {
  let res: Response;
  try {
    res = await rawCall(path, options);
    if (res.status === 401 && !path.startsWith("/auth/") && (await refreshSession())) {
      res = await rawCall(path, options);
    }
  } catch (err) {
    const timedOut = (err as Error)?.name === "TimeoutError" || (err as Error)?.name === "AbortError";
    throw new ApiError(
      timedOut ? "This is taking longer than usual." : "We could not reach Zorr. Check your connection and try again.",
      0,
      timedOut ? "TIMEOUT" : "NETWORK",
    );
  }

  const json = (await res.json().catch(() => null)) as
    | { success?: boolean; data?: T; message?: string; error?: { code?: string; message?: string; details?: Array<{ field?: string; message: string }> } }
    | null;

  if (!res.ok || json?.success === false) {
    throw new ApiError(
      json?.error?.message ?? "Something went wrong. Please try again.",
      res.status,
      json?.error?.code,
      json?.error?.details,
    );
  }
  return (json?.data ?? (json as unknown)) as T;
}

/** The first field-level message if there is one, else the error's message. */
export function errorText(err: unknown): string {
  if (err instanceof ApiError) return err.details?.[0]?.message ?? err.message;
  return "Something went wrong. Please try again.";
}
