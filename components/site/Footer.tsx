import Link from "next/link";

// Hairline footer with the oversized wordmark bleeding off the bottom.
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-[18px] px-4 pt-8 sm:px-6">
        <p className="text-[13px] text-muted">© 2026 Zorr. Not medical advice. Check with a doctor before starting.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-label-tight">
          <Link href="/support" className="link">Support</Link>
          <Link href="/terms" className="link">Terms</Link>
          <Link href="/privacy" className="link">Privacy</Link>
        </nav>
      </div>
      <div
        aria-hidden="true"
        className="headline mx-auto max-w-page overflow-hidden px-4 pt-6 text-[clamp(120px,26vw,380px)] font-black normal-case leading-[0.78] tracking-tightest text-cell sm:px-6"
      >
        zorr<span className="text-accent">.</span>
      </div>
    </footer>
  );
}
