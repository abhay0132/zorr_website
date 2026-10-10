import Link from "next/link";
import { ArrowRight } from "./icons";
import { SIGNUP_PATH } from "@/lib/site";

export default function FinalCta() {
  return (
    <section id="start" aria-labelledby="start-heading" className="mx-auto max-w-page px-4 pb-24 pt-28 sm:px-6 md:pb-[120px] md:pt-[170px]">
      <h2 id="start-heading" className="headline m-0 text-[clamp(52px,10vw,160px)] font-black leading-[0.86]">
        Your first two weeks start <span className="text-accent">today</span>
      </h2>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link href={SIGNUP_PATH} className="btn-accent min-h-14 px-7 text-[17px] hover:text-on-accent">
          Build my free plan
          <ArrowRight />
        </Link>
        <span className="font-mono text-xs uppercase tracking-label-tight text-muted">Free · Any phone or laptop · iPhone app soon</span>
      </div>
    </section>
  );
}
