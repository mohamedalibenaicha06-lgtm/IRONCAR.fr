import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SellForm } from "@/components/SellForm";

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

      {/* Étapes */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 90} className="relative pt-5">
              <span aria-hidden className="draw-x absolute inset-x-0 top-0 h-px bg-line" />
              <span aria-hidden className="draw-x absolute top-0 left-0 h-px w-12 bg-accent" />
              <span className="font-display text-3xl font-extrabold text-accent tabular-nums">0{i + 1}</span>
              <h2 className="mt-2 text-2xl md:text-[1.75rem]">{t}</h2>
              <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Formulaire */}
      <section id="formulaire" className="mx-auto grid max-w-7xl scroll-mt-20 gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow eyebrow-accent mb-3">Demande de vente</p>
          <h2 className="text-[2.4rem] md:text-5xl">Parlez-nous de votre véhicule</h2>
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
