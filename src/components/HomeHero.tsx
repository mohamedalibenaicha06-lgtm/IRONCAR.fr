import Link from "next/link";
import { Button } from "./Button";
import { Intro } from "./home/Intro";
import { Split } from "./home/Split";
import { Odometer } from "./home/Odometer";

export const gears = [
  { n: 1, label: "Achat", href: "/achat" },
  { n: 2, label: "Vente", href: "/reprise" },
  { n: 3, label: "Inspection", href: "/inspection" },
  { n: 4, label: "Location", href: "/location" },
];

/**
 * Premier écran « Boîte de vitesses » :
 * lignes de vitesse, titre en split text (gauche, droite, masque), sélecteur de rapports = les 4 services,
 * indicateur qui passe les rapports 1 → 4 de façon mécanique puis se pose sur « Achat ».
 */
export function HomeHero({ saleCount }: { saleCount: number }) {
  return (
    <section className="hero-x relative overflow-hidden">
      <Intro />

      {/* Lignes de vitesse : elles filent une fois à l'arrivée puis restent en filigrane */}
      <div aria-hidden className="speed-lines pointer-events-none absolute inset-0">
        {[14, 27, 41, 58, 71, 86].map((top, i) => (
          <span key={top} style={{ top: `${top}%`, ["--d" as string]: `${i * 0.07}s`, ["--w" as string]: `${30 + ((i * 17) % 45)}%` }} />
        ))}
      </div>

      {/* « 06 » : le département, en filigrane, avec parallaxe */}
      <span aria-hidden className="hero-06 pointer-events-none absolute -right-6 top-24 font-display text-[clamp(14rem,48vw,34rem)] leading-none font-extrabold text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]">
        06
      </span>

      <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-10 sm:px-8 md:pt-36 md:pb-14">
        <p className="hx-in eyebrow eyebrow-accent mb-5 flex items-center gap-3" style={{ ["--d" as string]: "0s" }}>
          <span className="hx-rule inline-block h-px w-10 bg-accent" />Nice · Côte d&apos;Azur
        </p>

        <h1 aria-label="Achetez. Vendez. Roulez." className="text-[clamp(3.6rem,16vw,10.5rem)] leading-[0.84] font-extrabold">
          <span className="block"><Split text="Achetez." from="left" delay={0.05} /></span>
          <span className="block"><Split text="Vendez." from="right" delay={0.22} /></span>
          <span className="block text-accent"><Split text="Roulez." from="mask" delay={0.42} step={0.04} /></span>
        </h1>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="hx-in max-w-md text-[1.0625rem] leading-relaxed text-ink-2" style={{ ["--d" as string]: ".75s" }}>
              Achat, vente, inspection et location de véhicules à Nice. Un seul interlocuteur, du premier appel à la remise des clés.
            </p>
            <div className="hx-in mt-7 flex flex-col gap-2.5 sm:flex-row" style={{ ["--d" as string]: ".85s" }}>
              <Button href="/achat" arrow>Explorer les véhicules</Button>
              <Button href="#services" variant="secondary">Nos services</Button>
            </div>
          </div>

          {/* Sélecteur de rapports : accès direct aux 4 services */}
          <nav aria-label="Services IRONCAR" className="hx-in" style={{ ["--d" as string]: ".95s" }}>
            <p className="mb-2 flex items-center justify-between font-display text-xs font-semibold tracking-[0.24em] text-mute uppercase">
              <span>Choisissez votre rapport</span>
              <span className="flex items-center gap-1.5 text-ink"><Odometer value={saleCount} /> <span className="text-mute">à vendre</span></span>
            </p>
            <ol className="gearbox relative grid grid-cols-4 overflow-hidden rounded-lg border border-line bg-coal/80 backdrop-blur">
              <span aria-hidden className="gear-indicator absolute inset-y-0 left-0 w-1/4 bg-accent" />
              {gears.map((g) => (
                <li key={g.n} className="relative border-l border-line first:border-l-0">
                  <Link href={g.href} className="gear group press flex flex-col items-center gap-1 px-2 py-3.5 sm:px-5">
                    <span className="font-display text-[2rem] leading-none font-extrabold tabular-nums">{g.n}</span>
                    <span className="font-display text-[0.8rem] font-semibold tracking-[0.14em] uppercase sm:text-sm">{g.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
