"use client";

// Small form and layout primitives for the logged-in web app. Same tokens as the
// landing page; sized for thumbs at the gym (44px+ targets, 16px inputs so iOS
// Safari does not zoom on focus).

import { forwardRef, useId } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  full?: boolean;
};

export function Button({ variant = "primary", loading, full, className = "", children, disabled, ...rest }: ButtonProps) {
  const base = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold transition-[filter,background-color,border-color] disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary: "bg-accent text-on-accent hover:brightness-110",
    secondary: "border border-control bg-surface-2 text-fg hover:border-control-3",
    ghost: "text-soft underline decoration-control-3 underline-offset-4 hover:text-white",
  }[variant];
  return (
    <button {...rest} disabled={disabled || loading} aria-busy={loading || undefined} className={`${base} ${styles} ${full ? "w-full" : ""} ${className}`}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent ${className}`} />;
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; unit?: string };

export const TextField = forwardRef<HTMLInputElement, FieldProps>(function TextField({ label, error, hint, unit, id, className = "", ...rest }, ref) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = [error ? `${inputId}-err` : null, hint ? `${inputId}-hint` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">
        {label}
      </label>
      <div className={`flex items-center rounded-xl border bg-surface-3 ${error ? "border-accent" : "border-control focus-within:border-soft"}`}>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="min-h-[52px] w-full min-w-0 rounded-xl bg-transparent px-4 text-base text-fg placeholder:text-dim focus:outline-none"
          {...rest}
        />
        {unit && <span className="pr-4 font-mono text-sm text-muted">{unit}</span>}
      </div>
      {hint && !error && <p id={`${inputId}-hint`} className="mt-2 text-[13px] text-muted">{hint}</p>}
      {error && <p id={`${inputId}-err`} className="mt-2 text-[13px] text-accent">{error}</p>}
    </div>
  );
});

/** One option in a single-choice list. Rendered as a radio for screen readers. */
export function ChoiceCard({ selected, title, description, onSelect, name }: { selected: boolean; title: string; description?: string; onSelect: () => void; name: string }) {
  return (
    <label
      className={
        "flex min-h-[60px] cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors " +
        (selected ? "border-accent bg-accent/10" : "border-control bg-surface hover:border-control-3")
      }
    >
      <input type="radio" name={name} checked={selected} onChange={onSelect} aria-label={description ? `${title}. ${description}` : title} className="sr-only" />
      <span>
        <span className="block text-base font-medium text-fg">{title}</span>
        {description && <span className="mt-0.5 block text-[13px] text-muted">{description}</span>}
      </span>
      <span aria-hidden="true" className={`h-5 w-5 shrink-0 rounded-full border-2 ${selected ? "border-accent bg-accent shadow-[inset_0_0_0_3px_#0C0B0A]" : "border-control-3"}`} />
    </label>
  );
}

/** A multi-select toggle. */
export function Chip({ pressed, onToggle, children }: { pressed: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={
        "min-h-[44px] rounded-[10px] border px-4 text-[15px] transition-colors " +
        (pressed ? "border-accent bg-accent font-semibold text-on-accent" : "border-control bg-surface-3 text-soft hover:border-control-3")
      }
    >
      {children}
    </button>
  );
}

export function Notice({ tone = "error", children }: { tone?: "error" | "info"; children: React.ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-[15px] leading-[1.5] ${tone === "error" ? "border-accent bg-accent/10 text-fg" : "border-line-strong bg-surface text-soft"}`}>
      {children}
    </div>
  );
}

export function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="label text-muted">
      {children}
    </p>
  );
}
