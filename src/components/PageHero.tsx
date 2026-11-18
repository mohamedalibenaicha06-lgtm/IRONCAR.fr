import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#141414,#090909)]">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(229_57_53/0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-10 sm:px-8 md:pt-40 md:pb-16">
        <p className="fade-up eyebrow eyebrow-accent mb-4">{eyebrow}</p>
        <h1 className="max-w-4xl text-[2.9rem] sm:text-6xl md:text-7xl">
          {title.split(" ").map((w, i) => (
            <span key={i} className="word mr-[0.22em]"><span style={{ ["--d" as string]: `${0.08 + i * 0.07}s` }}>{w}</span></span>
          ))}
        </h1>
        {intro && <p className="fade-up mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg" style={{ ["--d" as string]: ".35s" }}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
