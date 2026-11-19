import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SellForm } from "@/components/SellForm";
import { MaskTitle } from "@/components/home/MaskTitle";

export const metadata: Metadata = {
  title: "Vendre mon véhicule",
  description: "Confiez la vente de votre véhicule à IRONCAR à Nice : estimation, reprise ou vente accompagnée.",
};

const steps = [
  ["Vous décrivez votre véhicule", "Quelques informations et des photos suffisent pour une première étude."],
  ["Nous l'examinons avec vous", "Nous fixons un rendez-vous pour voir le véhicule et en parler."],
  ["Nous vous proposons une solution", "Reprise ou vente accompagnée : vous choisissez, sans engagement."],
];
const points = ["Une étude de votre véhicule", "Un interlocuteur unique", "Reprise possible en échange d'un achat", "Démarches administratives prises en charge"];

export default function VendrePage() {
  return (
    <>
      <PageHero eyebrow="Vendre" title="Vendre mon véhicule"
        intro="Vous souhaitez vendre votre voiture ou votre moto ? Décrivez-la ci-dessous : nous l'étudions et vous recontactons pour vous proposer la solution la plus adaptée.">
        <div className="fade-up mt-7" style={{ ["--d" as string]: ".45s" }}>
          <Button href="#formulaire" arrow>Décrire mon véhicule</Button>
        </div>
      </PageHero>

      {/* Étapes : cartes éditoriales (carrousel au doigt sur mobile) */}
      <section className="pt-14 md:pt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <MaskTitle eyebrow="Comment ça marche" title="Trois étapes, c'est tout" className="mb-8 md:mb-12" />
        </div>
        <ol className="snap-row mx-auto flex max-w-7xl snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:px-8 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 110} className="w-[82%] shrink-0 snap-start md:w-auto">
              <div className="step-card relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-xl border border-line bg-coal p-6 md:min-h-[18rem] md:p-8">
                <span aria-hidden className="step-num pointer-events-none absolute -top-4 -right-2 font-display text-[9rem] leading-none font-extrabold select-none md:text-[11rem]">{i + 1}</span>
                <span className="font-display text-sm font-semibold tracking-[0.22em] text-accent uppercase">Étape 0{i + 1}</span>
                <div className="relative">
                  <h3 className="text-[2rem] leading-[0.95] md:text-[2.4rem]">{t}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-3 px-5 text-xs text-mute md:hidden">Faites glisser pour voir les étapes →</p>
      </section>

      {/* Formulaire */}
      <section id="formulaire" className="mx-auto mt-16 grid max-w-7xl scroll-mt-20 gap-8 px-5 sm:px-8 md:mt-24 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow eyebrow-accent mb-3">Demande de vente</p>
          <h2 className="text-[2.6rem] leading-[0.92] md:text-6xl">Parlez-nous de<br /><span className="text-accent">votre véhicule</span></h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-2">Plus vos informations et vos photos sont précises, plus notre premier retour le sera aussi.</p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[0.9375rem] text-ink-2">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent/60 text-accent"><svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M5 12l5 5L20 7" /></svg></span>{p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}><SellForm /></Reveal>
      </section>

      {/* Recherche personnalisée (conservée) */}
      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 md:mt-28">
        <Reveal className="grid gap-6 rounded-lg border border-line bg-coal p-7 md:grid-cols-[1.5fr_auto] md:items-center md:p-10">
          <div>
            <p className="eyebrow eyebrow-accent mb-2">Vous cherchez plutôt un véhicule ?</p>
            <h2 className="text-3xl md:text-4xl">Recherche personnalisée</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-2">Indiquez-nous le modèle, le budget et vos critères : nous le recherchons pour vous.</p>
          </div>
          <Button href="/contact?sujet=recherche" variant="secondary" arrow>Faire une demande</Button>
        </Reveal>
      </section>
    </>
  );
}
