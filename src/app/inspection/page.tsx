import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon, type IconName } from "@/components/Icon";
import { eur } from "@/lib/site";

export const metadata: Metadata = { title: "Inspection avant achat" };

const checks: [IconName, string, string][] = [
  ["gear", "Mécanique", "Moteur, boîte, embrayage, freinage, trains roulants, fuites."],
  ["shield", "Carrosserie & châssis", "Épaisseur de peinture, traces de choc, corrosion, alignements."],
  ["bolt", "Électronique", "Lecture des codes défaut, équipements, batterie (électrique/hybride)."],
  ["search", "Historique", "Carnet d'entretien, factures, contrôle technique, cohérence kilométrique."],
  ["gauge", "Essai routier", "Comportement, bruits, vibrations, passage des rapports."],
  ["key", "Administratif", "Carte grise, situation administrative, gage, rappels constructeur."],
];
const plans = [
  { name: "Essentiel", price: 149, items: ["Inspection 100 points", "Rapport photo", "Avis d'expert"] },
  { name: "Premium", price: 249, items: ["Inspection 150 points", "Diagnostic électronique", "Essai routier", "Aide à la négociation"], best: true },
  { name: "Accompagnement", price: 390, items: ["Formule Premium", "Présence le jour de l'achat", "Vérification des documents", "Assistance administrative"] },
];

export default function InspectionPage() {
  return (
    <>
      <PageHero kicker="Inspection & Accompagnement" title="Achetez l'esprit serein" intro="Avant de signer, faites contrôler le véhicule par un expert indépendant. Partout dans les Alpes-Maritimes." />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading kicker="Ce que nous contrôlons" title="150 points, zéro surprise" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map(([icon, t, d], i) => (
            <Reveal key={t} delay={i * 60} className="rounded-3xl border border-line bg-coal p-7">
              <Icon name={icon} className="size-7 text-ember" />
              <h3 className="display mt-6 text-xl">{t}</h3>
              <p className="mt-2 text-sm text-mute">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="Formules" title="Tarifs indicatifs" intro="Tarifs de démonstration, à adapter." />
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className={`relative rounded-3xl border p-8 ${p.best ? "border-ember bg-ember/[0.06]" : "border-line bg-coal"}`}>
              {p.best && <span className="absolute -top-3 left-8 rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">Recommandé</span>}
              <h3 className="display text-xl">{p.name}</h3>
              <p className="display mt-4 text-5xl">{eur(p.price)}</p>
              <ul className="mt-6 space-y-2.5">
                {p.items.map((it) => <li key={it} className="flex gap-3 text-sm text-mute"><Icon name="check" className="size-4 shrink-0 text-ember" />{it}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
        <Reveal><h2 className="display mb-6 text-3xl">Réserver une inspection</h2></Reveal>
        <Reveal delay={100}>
          <LeadForm defaultSubject="inspection" subjects={["inspection"]} vehicleLabel="Véhicule à inspecter (lien annonce…)"
            messagePlaceholder="Lieu du véhicule, formule souhaitée, disponibilités…" />
        </Reveal>
      </section>
    </>
  );
}
