import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Vente, reprise et recherche personnalisée" };

const blocks = [
  {
    title: "Vendre ou faire reprendre votre véhicule",
    text: "Décrivez-nous votre voiture. Après l'avoir vue, nous vous faisons une proposition de reprise ou nous nous occupons de la vente pour vous.",
    points: ["Estimation à partir des informations et photos transmises", "Rendez-vous pour examiner le véhicule", "Reprise possible en échange d'un achat", "Prise en charge des démarches administratives"],
  },
  {
    title: "Recherche personnalisée",
    text: "Vous cherchez un modèle précis, une finition ou une couleur particulière ? Nous le recherchons pour vous selon vos critères.",
    points: ["Définition de vos critères et de votre budget", "Recherche auprès de professionnels et de particuliers", "Vérification du véhicule avant de vous le proposer", "Accompagnement jusqu'à la livraison"],
  },
];

export default function ReprisePage() {
  return (
    <>
      <PageHero eyebrow="Vendre" title="Vente, reprise et recherche personnalisée"
        intro="Que vous souhaitiez vendre votre voiture ou trouver un modèle précis, nous gérons le projet avec vous du début à la fin." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 md:gap-16 md:py-20">
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 80}>
            <h2 className="text-xl font-semibold md:text-2xl">{b.title}</h2>
            <p className="mt-3 leading-relaxed text-mute">{b.text}</p>
            <ul className="mt-6 border-t border-line">
              {b.points.map((p) => <li key={p} className="border-b border-line py-3 text-[0.9375rem] text-ink-2">{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <h2 className="text-2xl font-semibold md:text-[2rem]">Parlez-nous de votre projet</h2>
          <p className="mt-3 leading-relaxed text-mute">Pour une estimation, précisez la marque, le modèle, l&apos;année, le kilométrage et l&apos;état général. Pour une recherche, indiquez vos critères et votre budget.</p>
        </Reveal>
        <Reveal delay={80}>
          <LeadForm defaultSubject="reprise" subjects={["reprise", "vente", "recherche"]} vehicleLabel="Véhicule (marque, modèle, année, km)" />
        </Reveal>
      </section>
    </>
  );
}
