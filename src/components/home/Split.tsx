/** Découpe un mot en lettres animées (mouvement de type split text). */
export function Split({ text, from = "left", delay = 0, step = 0.028, className = "" }: {
  text: string; from?: "left" | "right" | "mask"; delay?: number; step?: number; className?: string;
}) {
  return (
    <span className={`split split-${from} ${className}`} aria-hidden>
      {[...text].map((c, i) => (
        <span key={i} className="ch" style={{ ["--t" as string]: `${delay + (from === "right" ? text.length - 1 - i : i) * step}s` }}>{c}</span>
      ))}
    </span>
  );
}
