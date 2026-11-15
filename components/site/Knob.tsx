import Link from "next/link";
import { Chevron } from "./icons";

type Tone = "chalk" | "ink";
type Size = "lg" | "md" | "sm";

const SIZES: Record<Size, { pill: string; disc: string; icon: number }> = {
  lg: { pill: "h-[58px] gap-7 pl-[26px] pr-1.5 text-[17px]", disc: "h-[46px] w-[46px]", icon: 16 },
  md: { pill: "h-[50px] gap-6 pl-5 pr-[5px] text-[15px]", disc: "h-10 w-10", icon: 14 },
  sm: { pill: "h-[46px] gap-3.5 pl-[18px] pr-[5px] text-sm", disc: "h-9 w-9", icon: 14 },
};

const TONES: Record<Tone, { pill: string; disc: string }> = {
  // On graphite: chalk pill, dark disc.
  chalk: { pill: "bg-accent text-on-accent hover:text-on-accent", disc: "bg-surface text-fg" },
  // On the chalk band: ink pill, chalk disc.
  ink: { pill: "bg-ink text-fg hover:text-fg", disc: "bg-accent text-ink" },
};

/** Classes for the app's "knob" button: a pill whose right end is a small dark plate holding the icon. */
export function knobClasses(tone: Tone = "chalk", size: Size = "lg") {
  return {
    pill: `inline-flex items-center justify-between rounded-full font-semibold transition-[filter] hover:brightness-95 ${SIZES[size].pill} ${TONES[tone].pill}`,
    disc: `inline-flex shrink-0 items-center justify-center rounded-full ${SIZES[size].disc} ${TONES[tone].disc}`,
    icon: SIZES[size].icon,
  };
}

/** A link styled as the app's primary button. */
export function KnobLink({
  href,
  children,
  tone = "chalk",
  size = "lg",
  className = "",
  icon,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
}) {
  const k = knobClasses(tone, size);
  return (
    <Link href={href} className={`${k.pill} ${className}`}>
      <span>{children}</span>
      <span className={k.disc}>{icon ?? <Chevron size={k.icon} />}</span>
    </Link>
  );
}
