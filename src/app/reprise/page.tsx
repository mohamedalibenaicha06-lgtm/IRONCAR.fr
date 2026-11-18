import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/Icon";

export const metadata: Metadata = { title: "Reprise & Recherche personnalisée" };

const offers: { icon: IconName; title: string; points: string[] }[] = [
  { icon: "swap", title: "Reprise de votre véhicule", points: ["Estimation gratuite sous 48 h", "Rachat immédiat ou dépôt-vente", "Reprise déduite de votre achat", "Démarches administratives incluses"] },
  { icon: "search", title: "Recherche personnalisée", points: ["Cahier des charges défini ensemble", "Sourcing France & Europe", "Inspection systématique avant proposition", "Import, homologation, livraison à Nice"] },
];

export default function ReprisePage() {
  return (
    <>
      <PageHero kicker="Reprise & Recherche" title="Sur-mesure" intro="Vous vendez, vous cherchez la perle rare ? Nous nous occupons de tout, du chiffrage à la livraison." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2">
        {offers.map((o, i) => (
          <Reveal key={o.title} delay={i * 100} className="rounded-3xl border border-line bg-coal p-7 md:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-ember/10 text-ember"><Icon name={o.icon} className="size-6" /></span>
            <h2 className="display mt-8 text-2xl md:text-3xl">{o.title}</h2>
            <ul className="mt-6 space-y-3">
              {o.points.map((p) => <li key={p} className="flex gap-3 text-mute"><Icon name="check" className="mt-0.5 size-4 shrink-0 text-ember" />{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal><h2 className="display mb-6 text-3xl">Votre demande</h2></Reveal>
        <Reveal delay={100}>
          <LeadForm defaultSubject="reprise" subjects={["reprise", "vente", "recherche"]} vehicleLabel="Marque, modèle, année, km"
            messagePlaceholder="Décrivez votre véhicule (état, options, historique) ou le modèle recherché (budget, critères)…" />
        </Reveal>
      </section>
    </>
  );
}
