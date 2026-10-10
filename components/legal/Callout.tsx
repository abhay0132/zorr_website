// A boxed notice for the parts a reader must not miss (the health disclaimer).
export default function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-2xl border border-accent bg-accent/5 p-5 sm:p-6">
      <p className="label text-accent">{title}</p>
      <div className="mt-3 text-[16px] leading-[1.65] text-soft [&_li]:mt-1.5 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
    </aside>
  );
}
