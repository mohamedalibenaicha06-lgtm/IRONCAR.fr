import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Inspection avant achat" };

const checks: [string, string][] = [
  ["Mécanique", "Moteur, boîte de vitesses, embrayage, freinage, suspensions, recherche de fuites."],
  ["Carrosserie et châssis", "Traces de réparation, mesure de l'épaisseur de peinture, corrosion, alignement des éléments."],
  ["Électronique", "Lecture des codes défaut, fonctionnement des équipements, état de la batterie."],
  ["Historique", "Carnet d'entretien, factures, contrôle technique, cohérence du kilométrage."],
  ["Essai sur route", "Comportement, bruits, vibrations, passage des rapports."],
  ["Documents", "Certificat d'immatriculation, situation administrative, rappels constructeur."],
];
const offers = [
  { name: "Inspection", text: "Nous examinons le véhicule et vous remettons un compte rendu détaillé avec photos et notre avis.", items: ["Contrôle complet du véhicule", "Essai sur route", "Compte rendu écrit et photos"] },
  { name: "Accompagnement à l'achat", text: "En plus de l'inspection, nous restons à vos côtés jusqu'à la signature.", items: ["Inspection complète", "Aide à la négociation", "Vérification des documents", "Présence le jour de l'achat"] },
];

export default function InspectionPage() {
  return (
    <>
      <PageHero eyebrow="Inspection" title="Faire inspecter un véhicule avant de l'acheter"
        intro="Vous avez trouvé une voiture d'occasion ? Avant de vous engager, nous l'examinons pour vous et vous donnons un avis clair sur son état." />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <h2 className="text-2xl font-semibold md:text-[2rem]">Ce que nous vérifions</h2>
          <p className="mt-3 leading-relaxed text-mute">Le contrôle est adapté au type de véhicule. Voici les principaux points examinés.</p>
        </Reveal>
        <dl className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
          {checks.map(([t, d], i) => (
            <Reveal key={t} delay={i * 40} className="border-b border-line py-5">
              <dt className="font-semibold">{t}</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-mute">{d}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="bg-coal py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-2xl font-semibold md:text-[2rem]">Deux formules</h2>
          <p className="mt-3 text-mute">Tarif communiqué sur devis, selon le véhicule et le lieu de l&apos;inspection.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {offers.map((o, i) => (
              <Reveal key={o.name} delay={i * 80} className="rounded-md border border-line p-6 md:p-8">
                <h3 className="text-lg font-semibold">{o.name}</h3>
                <p className="mt-2 leading-relaxed text-mute">{o.text}</p>
                <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-2">
                  {o.items.map((it) => <li key={it} className="flex gap-2.5"><span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-8 px-5 sm:px-8 md:mt-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <h2 className="text-2xl font-semibold md:text-[2rem]">Demander une inspection</h2>
          <p className="mt-3 leading-relaxed text-mute">Indiquez le véhicule (un lien vers l&apos;annonce suffit), l&apos;endroit où il se trouve et vos disponibilités.</p>
        </Reveal>
        <Reveal delay={80}>
          <LeadForm defaultSubject="inspection" subjects={["inspection"]} vehicleLabel="Véhicule ou lien de l'annonce" />
        </Reveal>
      </section>
    </>
  );
}
