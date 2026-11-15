// The "ZORR" wordmark, set like the app's logo: Archivo Expanded, extra bold, caps.
export default function Logo({ className = "" }: { className?: string }) {
  return <span className={`headline tracking-[0.01em] ${className}`}>Zorr</span>;
}
