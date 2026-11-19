const items = ["Achat", "Vente", "Inspection", "Location"];

/** Bandeau de rythme : défilement continu, discret, mis en pause au survol. */
export function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee-band relative overflow-hidden border-t border-line bg-paper/60 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]" aria-label="Achat, vente, inspection, location">
      <div className="marquee-track flex w-max" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center font-display text-[1.15rem] font-bold tracking-[0.16em] uppercase sm:text-[1.3rem]">
                <span className="text-ink/80">{t}</span>
                <span className="mx-6 inline-block h-px w-6 bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
