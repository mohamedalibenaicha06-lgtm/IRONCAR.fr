import type { ReactNode } from "react";

export function PageHero({ kicker, title, intro, children }: { kicker: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="grain relative overflow-hidden border-b border-line pt-36 pb-14 md:pt-44 md:pb-20">
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-ember/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <p className="kicker mb-5 overflow-hidden"><span className="rise">{kicker}</span></p>
        <h1 className="display overflow-hidden pb-1 text-5xl sm:text-6xl md:text-8xl"><span className="rise" style={{ ["--d" as string]: "80ms" }}>{title}</span></h1>
        {intro && <p className="rise mt-6 max-w-2xl text-base text-mute md:text-lg" style={{ ["--d" as string]: "160ms" }}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
