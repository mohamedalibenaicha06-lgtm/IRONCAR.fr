/** Ouverture : logo net, traînée rouge, puis visière qui s'ouvre. Ne bloque jamais les clics. */
export function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-half intro-top" />
      <div className="intro-half intro-bottom" />
      <div className="intro-logo font-display text-[clamp(2.6rem,11vw,5.5rem)] font-extrabold tracking-[0.08em]">
        {[..."IRONCAR"].map((c, i) => (
          <span key={i} className={i > 3 ? "text-accent" : ""} style={{ ["--t" as string]: `${0.05 + i * 0.035}s` }}>{c}</span>
        ))}
      </div>
      <div className="intro-streak" />
    </div>
  );
}
