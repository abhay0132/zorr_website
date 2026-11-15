// The iron plate from the app's welcome screen: a dark bumper with chalk lettering
// round the rim and a thin orange collar ring. No plate colour, because plate
// colours mean session types. Geometry copied from WelcomeScreen.tsx in the app.
export default function IronPlate({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="iron" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#3A3C40" />
          <stop offset="0.6" stopColor="#232427" />
          <stop offset="1" stopColor="#18191B" />
        </radialGradient>
        <path id="rim" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#iron)" />
      <circle cx="50" cy="50" r="49.3" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" />
      <path d="M5 38A46 46 0 0 1 38 5" stroke="rgba(237,235,230,0.4)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="50" r="45.5" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="32" fill="rgba(0,0,0,0.22)" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
      <path d="M16 38A36 36 0 0 1 37 14" stroke="rgba(255,255,255,0.16)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <text fontFamily="var(--font-geist-mono), monospace" fontSize="3.6" letterSpacing="1.2" fill="rgba(237,235,230,0.42)">
        <textPath href="#rim">BUILT AROUND YOU · FREE ON THE WEB · ZORR · BUILT AROUND YOU ·</textPath>
      </text>
      <circle cx="50" cy="50" r="15" fill="#2E3034" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="10.5" fill="none" stroke="#FF5B22" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="6.5" fill="#0B0B0C" />
    </svg>
  );
}
