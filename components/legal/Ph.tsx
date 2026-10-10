// A visible, greppable placeholder in legal copy. Anything in [BRACKETS] still needs a real value.
export default function Ph({ children }: { children: string }) {
  if (!children.startsWith("[")) return <>{children}</>;
  return <mark className="rounded bg-accent/15 px-1 font-mono text-[0.88em] text-accent">{children}</mark>;
}
