import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/site/PageShell";
import PostCover from "@/components/site/PostCover";
import { Chevron } from "@/components/site/icons";
import { POSTS, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the Zorr team on training with what you have: how plans are built, picking weights, and training around what hurts.",
  alternates: { canonical: "/blog" },
};

function Meta({ tag, date, minutes }: { tag: string; date: string; minutes: number }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-label-tight text-dim">
      {tag} · <time dateTime={date}>{formatPostDate(date)}</time> · {minutes} min read
    </p>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell
      label="Blog"
      title={<>Notes from <span className="text-accent">the gym floor.</span></>}
      intro={<p>How your plan is built, how to pick a weight, and training around what hurts. Short, practical, no fluff.</p>}
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 md:px-10">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-card border border-white/[0.08] bg-surface transition-colors hover:border-control-3 md:grid-cols-2"
          >
            <PostCover cover={featured.cover} className="h-[260px] md:h-auto md:min-h-[380px]" />
            <div className="flex flex-col p-7 md:p-10">
              <p className="label text-now">Latest</p>
              <h2 className="headline mt-4 text-[clamp(24px,3vw,36px)] leading-[1.02]">{featured.title}</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-muted">{featured.excerpt}</p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <Meta tag={featured.tag} date={featured.date} minutes={featured.minutes} />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-transform group-hover:translate-x-0.5">
                  <Chevron size={16} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-surface transition-colors hover:border-control-3">
                  <PostCover cover={p.cover} className="h-[200px]" />
                  <div className="flex flex-grow flex-col p-7">
                    <h2 className="headline text-[20px] leading-[1.05]">{p.title}</h2>
                    <p className="mt-3 text-[15px] leading-[1.6] text-muted">{p.excerpt}</p>
                    <div className="mt-auto pt-6">
                      <Meta tag={p.tag} date={p.date} minutes={p.minutes} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
