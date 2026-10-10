// The "zorr." wordmark used in the nav and the 404 page.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-black tracking-[-0.02em] ${className}`} style={{ fontStretch: "80%" }}>
      zorr<span className="text-accent">.</span>
    </span>
  );
}
