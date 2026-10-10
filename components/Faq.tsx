"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { SUPPORT_EMAIL } from "@/lib/site";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border transition-colors " +
        (open ? "border-accent bg-accent text-on-accent" : "border-control text-soft")
      }
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        {!open && <path d="M12 5v14" />}
        <path d="M5 12h14" />
      </svg>
    </span>
  );
}

// Accordion: one answer open at a time, first one open by default.
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto flex max-w-page flex-wrap gap-12 px-4 pt-24 sm:px-6 md:pt-[150px]">
      <div className="min-w-0 flex-[1_1_300px]">
        <h2 id="faq-heading" className="headline m-0 text-[clamp(42px,5.6vw,80px)] leading-[0.92]">
          Questions
        </h2>
        <p className="mt-5 text-[15px] leading-[1.6] text-muted">
          Something else?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="border-b border-control-3 text-fg transition-colors hover:border-fg">
            Get in touch
          </a>
        </p>
      </div>

      <div className="min-w-0 flex-[2_1_520px] border-t border-line-strong">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <div key={item.q} className="border-b border-line-strong">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-5 text-left text-[17px] font-medium text-fg"
                >
                  <span>{item.q}</span>
                  <PlusMinus open={isOpen} />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                <p className="m-0 pb-6 pr-12 text-[15px] leading-[1.65] text-muted">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
