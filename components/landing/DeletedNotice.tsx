"use client";

import { useSearchParams } from "next/navigation";

// Shown on the home page right after an account deletion (/?deleted=1), so the
// person knows it worked rather than landing on the page with no word.
export default function DeletedNotice() {
  const params = useSearchParams();
  if (params.get("deleted") !== "1") return null;
  return (
    <div role="status" className="border-b border-line bg-surface">
      <p className="mx-auto max-w-page px-4 py-3 text-[15px] text-soft sm:px-6">
        Your account and everything in it has been deleted.
      </p>
    </div>
  );
}
