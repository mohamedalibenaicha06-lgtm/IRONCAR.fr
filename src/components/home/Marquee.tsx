const items = ["Achat", "Vente", "Inspection", "Location"];

/** Bandeau de rythme : défilement continu, discret, mis en pause au survol. */
export function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee-band relative overflow-hidden border-y border-line bg-coal py-3" aria-label="Achat, vente, inspection, location">
      <div className="marquee-track flex w-max" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center font-display text-[1.35rem] font-bold tracking-[0.12em] uppercase">
                <span className={i % 4 === 0 ? "text-ink" : "text-ink/70"}>{t}</span>
                <span className="mx-6 inline-block h-3 w-6 -skew-x-[24deg] bg-accent/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
