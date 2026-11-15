import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PostCover from "@/components/site/PostCover";
import { KnobLink } from "@/components/site/Knob";
import { Chevron } from "@/components/site/icons";
import { POSTS, formatPostDate, getPost, type Block } from "@/lib/blog";
import { SIGNUP_PATH } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i} className="headline !mt-12 text-[clamp(20px,2.4vw,26px)] leading-[1.05] text-fg">{b.text}</h2>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
          case "kai":
            return (
              <p key={i} className="!mt-8 flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-surface px-4 py-3.5 text-fg">
                <span aria-hidden="true" className="headline flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-now text-xs text-on-now">K</span>
                <span><span className="sr-only">Kai says: </span>{b.text}</span>
              </p>
            );
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </>
  );
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="overflow-x-clip">
      <Nav />
      <main>
        <article className="mx-auto max-w-page px-4 pt-14 sm:px-6 md:px-10 md:pt-20">
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label-tight text-dim transition-colors hover:text-fg">
            <Chevron size={12} className="rotate-180" /> All posts
          </Link>
          <header className="mt-8 max-w-[820px]">
            <p className="font-mono text-[11px] uppercase tracking-label-tight text-dim">
              {post.tag} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.minutes} min read
            </p>
            <h1 className="headline mt-4 text-[clamp(30px,4.6vw,56px)] leading-[1]">{post.title}</h1>
          </header>

          <PostCover cover={post.cover} className="mt-10 h-[240px] rounded-card border border-white/[0.06] md:h-[380px]" />

          <div className="legal mx-auto mt-12 max-w-[680px]">
            <Body blocks={post.body} />
          </div>

          <aside className="mx-auto mt-16 max-w-[680px] rounded-card border-[1.5px] border-accent bg-surface p-7 md:p-8">
            <p className="label text-dim">Try it</p>
            <p className="headline mt-3 text-[clamp(20px,2.4vw,26px)] leading-[1.05]">
              Your two weeks, <span className="text-accent">built from your answers.</span>
            </p>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted">Free on the web. No card. About three minutes of questions.</p>
            <KnobLink href={SIGNUP_PATH} className="mt-6">Build my free plan</KnobLink>
          </aside>
        </article>

        {others.length > 0 && (
          <section aria-labelledby="more-h" className="mx-auto max-w-page px-4 pt-24 sm:px-6 md:px-10">
            <h2 id="more-h" className="label text-dim">Keep reading</h2>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-center gap-5 rounded-[20px] border border-white/[0.08] bg-surface p-4 transition-colors hover:border-control-3">
                    <PostCover cover={p.cover} className="h-20 w-28 shrink-0 rounded-xl [&_svg]:h-16" />
                    <span className="flex-grow">
                      <span className="block font-mono text-[10.5px] uppercase tracking-label-tight text-dim">{p.tag} · {p.minutes} min</span>
                      <span className="mt-1 block text-[16px] font-semibold leading-snug">{p.title}</span>
                    </span>
                    <Chevron size={16} className="shrink-0 text-dim group-hover:text-fg" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
