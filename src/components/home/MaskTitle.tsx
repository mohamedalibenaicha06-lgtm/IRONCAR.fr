import { Reveal } from "../Reveal";

/** Titre de section : mots révélés derrière un masque, ligne rouge qui se dessine. */
export function MaskTitle({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <Reveal className={`mask-title ${className}`}>
      <p className="eyebrow eyebrow-accent mb-4 flex items-center gap-3"><span className="draw-x inline-block h-px w-10 bg-accent" />{eyebrow}</p>
      <h2 className="text-[2.7rem] sm:text-6xl lg:text-7xl" aria-label={title}>
        {title.split(" ").map((w, i) => (
          <span key={i} className="mword" aria-hidden><span style={{ ["--i" as string]: i }}>{w}</span></span>
        ))}
      </h2>
    </Reveal>
  );
}
