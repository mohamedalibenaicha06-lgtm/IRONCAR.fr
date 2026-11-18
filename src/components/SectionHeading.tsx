import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode }) {
  return (
    <Reveal className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-[1.75rem] font-semibold leading-tight md:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-base leading-relaxed text-mute md:text-lg">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}
