import Link from "next/link";
import { Icon } from "./Icon";
import { Intro } from "./home/Intro";
import { Marquee } from "./home/Marquee";
import { Odometer } from "./home/Odometer";
import { Split } from "./home/Split";

export const gears = [
  { n: 1, label: "Achat", href: "/achat" },
  { n: 2, label: "Vente", href: "/reprise" },
  { n: 3, label: "Inspection", href: "/inspection" },
  { n: 4, label: "Location", href: "/location" },
];

const btn = "press group inline-flex h-11 items-center sm:h-12 justify-center gap-2.5 rounded-md px-6 font-display text-[1rem] font-semibold tracking-[0.1em] uppercase transition-[background-color,border-color,color] duration-200";

/**
 * Premier écran plein écran (100dvh) : titre, description, actions, sélecteur des 4 services,
 * puis la fresque défilante en bas. Fond noir avec une lumière rouge très discrète qui respire lentement.
 */
export function HomeHero({ saleCount }: { saleCount: number }) {
  return (
    <section className="hero-x relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Intro />

      {/* Fond : deux lueurs rouges très faibles + une fine ligne qui glisse lentement */}
      <div aria-hidden className="hero-ambient pointer-events-none absolute inset-0">
        <span className="hero-glow hero-glow-a" />
        <span className="hero-glow hero-glow-b" />
        <span className="hero-trace" />
      </div>

      <span aria-hidden className="hero-06 pointer-events-none absolute -right-6 top-[14%] font-display text-[clamp(14rem,48vw,34rem)] leading-none font-extrabold text-transparent select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.06)]">
        06
      </span>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-[clamp(1rem,2.5dvh,3rem)] px-5 pt-[calc(4rem+clamp(0.75rem,3dvh,4.5rem))] pb-[clamp(0.9rem,2.4dvh,2.75rem)] sm:px-8 md:pt-[calc(4.5rem+clamp(2rem,7dvh,5rem))]">
        <div>
          <p className="hx-in eyebrow eyebrow-accent mb-[clamp(0.6rem,1.8dvh,1.25rem)] flex items-center gap-3" style={{ ["--d" as string]: "0s" }}>
            <span className="hx-rule inline-block h-px w-10 bg-accent" />Nice · Côte d&apos;Azur
          </p>
          <h1 aria-label="Achetez. Vendez. Roulez." className="text-[clamp(2.9rem,min(15vw,9.5dvh),10.5rem)] lg:text-[clamp(4rem,min(16vw,15dvh),10.5rem)] leading-[0.86] font-extrabold">
            <span className="block"><Split text="Achetez." from="left" delay={0.05} /></span>
            <span className="block"><Split text="Vendez." from="right" delay={0.16} /></span>
            <span className="block text-accent"><Split text="Roulez." from="mask" delay={0.3} step={0.035} /></span>
          </h1>
        </div>

        <div className="grid gap-[clamp(0.9rem,2.3dvh,2.25rem)] lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <p className="hx-in max-w-md text-[1rem] leading-[1.6] text-ink-2 sm:text-[1.0625rem]" style={{ ["--d" as string]: ".55s" }}>
              Achat, vente, inspection et location de véhicules à Nice. Un seul interlocuteur, du premier appel à la remise des clés.
            </p>
            <div className="hx-in mt-[clamp(0.85rem,2.2dvh,1.75rem)] grid gap-2 sm:flex sm:gap-2.5" style={{ ["--d" as string]: ".65s" }}>
              <Link href="/achat" className={`${btn} bg-ink text-paper hover:bg-white`}>
                Voir nos véhicules
                <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="#services" className={`${btn} border border-ink/20 bg-paper text-ink hover:border-ink/50`}>
                Découvrir nos prestations
                <Icon name="arrow" className="size-4 rotate-90 transition-transform duration-200 group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Sélecteur des 4 services */}
          <nav aria-label="Services IRONCAR" className="hx-in" style={{ ["--d" as string]: ".75s" }}>
            <p className="mb-2 flex items-center justify-between font-display text-xs font-semibold tracking-[0.22em] text-mute uppercase">
              <span>Nos services</span>
              <span className="flex items-center gap-1.5 text-ink"><Odometer value={saleCount} /> <span className="text-mute">à vendre</span></span>
            </p>
            <ol className="gearbox relative grid grid-cols-4 overflow-hidden rounded-md border border-line bg-coal">
              <span aria-hidden className="gear-indicator absolute inset-y-0 left-0 w-1/4 bg-accent" />
              {gears.map((g) => (
                <li key={g.n} className="relative border-l border-line first:border-l-0">
                  <Link href={g.href} className="gear press flex flex-col items-center gap-1 px-1.5 py-2.5 sm:px-5 sm:py-3.5">
                    <span className="font-display text-[1.55rem] leading-none font-extrabold tabular-nums sm:text-[2rem]">{g.n}</span>
                    <span className="font-display text-[0.78rem] font-semibold tracking-[0.12em] uppercase sm:text-sm">{g.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
