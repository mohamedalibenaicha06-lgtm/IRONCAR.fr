import { Button } from "./Button";
import { heroMedia as m } from "@/lib/site";

/**
 * En-tête cinématique de l'accueil.
 * Séquence (première visite de la session, cf. script dans layout) :
 * rideau + logo → révélation du véhicule (léger travelling arrière) → titre → textes et boutons → navigation.
 * Mobile : titre → véhicule → texte. Ordinateur : véhicule plein écran, textes posés sur le studio.
 */
export function HomeHero() {
  return (
    <section className="hero relative flex flex-col overflow-hidden xl:min-h-[100svh]">
      <div className="intro-curtain fixed inset-0 z-[70] place-items-center bg-paper" aria-hidden>
        <span className="intro-logo text-xl font-bold tracking-[0.3em] text-ink">IRONCAR</span>
      </div>

      {/* Titre (sur mobile, posé sur le prolongement du fond studio) */}
      <div className="studio-bg relative z-10" style={{ ["--studio" as string]: `url(${m.backdrop})` }}>
        <div className="hero-content mx-auto flex max-w-7xl items-start justify-between px-5 pt-24 pb-2 sm:px-8 md:pt-32 xl:pb-0">
          <div>
            <p className="hero-in eyebrow mb-3 !text-ink-2 md:mb-4" style={{ ["--d" as string]: ".55s" }}>Nice et Alpes-Maritimes</p>
            <h1 className="text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.25rem]">
              <span className="line-mask"><span className="hero-line" style={{ ["--d" as string]: ".6s" }}>Acheter, vendre</span></span>
              <span className="line-mask"><span className="hero-line" style={{ ["--d" as string]: ".72s" }}>ou louer une voiture</span></span>
              <span className="line-mask"><span className="hero-line" style={{ ["--d" as string]: ".84s" }}>à Nice.</span></span>
            </h1>
          </div>
          <p className="hero-in hidden pt-0.5 text-[0.8125rem] text-ink-2 xl:block" style={{ ["--d" as string]: "1.3s" }}>{m.caption}</p>
        </div>
      </div>

      {/* Véhicule */}
      <div className="hero-parallax relative xl:absolute xl:inset-0">
        {m.video ? (
          <video className="hero-media block aspect-[16/10] w-full object-cover object-bottom xl:aspect-auto xl:h-full xl:object-cover xl:object-[50%_100%]" src={m.video} poster={m.src}
            autoPlay muted loop playsInline preload="metadata" aria-label={m.alt} />
        ) : (
          <picture>
            <source media="(min-width: 1280px)" srcSet={m.wide.src} width={m.wide.width} height={m.wide.height} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-media block aspect-[16/10] w-full object-cover object-bottom xl:aspect-auto xl:h-full xl:object-cover xl:object-[50%_100%]" src={m.src} srcSet={m.srcSet}
              sizes="100vw" width={m.width} height={m.height} alt={m.alt} fetchPriority="high" decoding="async" />
          </picture>
        )}
        <p className="hero-in absolute right-4 bottom-3 text-[0.75rem] text-mute xl:hidden" style={{ ["--d" as string]: "1.3s" }}>{m.caption}</p>
      </div>

      {/* Texte et actions (sur mobile, sous le véhicule ; sur ordinateur, posés sur le sol du studio) */}
      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5 pt-6 pb-10 sm:px-8 xl:mt-auto xl:flex xl:items-end xl:justify-between xl:gap-10 xl:pt-0">
        <p className="hero-in max-w-md text-[1.0625rem] leading-relaxed text-ink-2 xl:max-w-[17rem] xl:text-[0.9375rem]" style={{ ["--d" as string]: "1.05s" }}>
          Un seul interlocuteur pour choisir, vérifier et obtenir votre véhicule, de la première visite à la remise des clés.
        </p>
        <div className="hero-in mt-6 flex flex-col gap-2.5 sm:flex-row xl:mt-0" style={{ ["--d" as string]: "1.15s" }}>
          <Button href="/achat" arrow>Voir les véhicules</Button>
          <Button href="/contact" variant="secondary" className="xl:!bg-white/80 xl:backdrop-blur">Nous contacter</Button>
        </div>
      </div>
    </section>
  );
}
