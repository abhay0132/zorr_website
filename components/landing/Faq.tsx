"use client";

import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { SUPPORT_EMAIL } from "@/lib/site";
import { PlusMinus } from "@/components/site/icons";

// Accordion: one answer open at a time, first one open by default. The open
// question's number turns orange, the app's "this one, now".
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-[820px] px-4 pt-24 sm:px-6 md:pt-[120px]">
      <h2 id="faq-heading" className="headline text-center text-[clamp(26px,4vw,48px)] leading-none">
        Questions
      </h2>
      <p className="mt-4 text-center text-[15px] text-muted">
        Something else?{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="border-b border-control-3 text-fg transition-colors hover:border-fg">
          Get in touch
        </a>
      </p>

      <div className="mt-12 border-t border-white/10">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <div key={item.q} className="border-b border-white/10">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-16 w-full cursor-pointer items-center gap-[18px] bg-transparent py-5 text-left text-[17px] font-semibold text-fg md:text-lg"
                >
                  <span aria-hidden="true" className={`font-mono text-[11px] font-medium ${isOpen ? "text-now" : "text-dim"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-grow">{item.q}</span>
                  <PlusMinus open={isOpen} />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                <p className="m-0 max-w-[620px] pb-6 pl-[38px] pr-8 text-[15px] leading-[1.65] text-muted md:text-base">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
