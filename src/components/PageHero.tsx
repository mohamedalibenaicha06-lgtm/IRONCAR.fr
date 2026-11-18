import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-10 sm:px-8 md:pt-36 md:pb-14">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.15] sm:text-4xl md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute md:text-lg">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
