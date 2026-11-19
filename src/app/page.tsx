import { vehicles } from "@/lib/repositories";
import { Button } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { HomeHero } from "@/components/HomeHero";
import { Marquee } from "@/components/home/Marquee";
import { MaskTitle } from "@/components/home/MaskTitle";
import { ServiceShifter } from "@/components/home/ServiceShifter";
import { Reveal } from "@/components/Reveal";
import { SaleVehicleCard } from "@/components/SaleVehicleCard";

const steps = [
  ["Votre besoin", "Usage, budget, critères : nous faisons le point ensemble, par téléphone ou sur place."],
  ["La sélection", "Nous vous présentons les véhicules qui correspondent, avec leur historique."],
  ["L'essai", "Vous voyez le véhicule, vous l'essayez et vous posez toutes vos questions."],
  ["La remise des clés", "Nous nous chargeons des démarches administratives jusqu'à la livraison."],
];

export default async function Home() {
  const [featured, forSale] = await Promise.all([vehicles.featured(3), vehicles.list({ listingType: "sale" })]);
  return (
    <>
      {/* Trajectoire : ligne rouge qui suit la lecture de la page */}
      <div aria-hidden className="trajectory" />

      <HomeHero saleCount={forSale.length} />
      <Marquee />

      {/* Services : 4 rapports */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-20 sm:px-8 md:pt-28">
        <MaskTitle eyebrow="Quatre services" title="Un rapport pour chaque projet" className="mb-10 md:mb-14" />
        <ServiceShifter />
      </section>

      {/* Véhicules */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 md:pt-32">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <MaskTitle eyebrow="À vendre" title="En vitrine" />
          <Reveal><Button href="/achat" variant="link" arrow>Tous les véhicules</Button></Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => <Reveal key={v.id} delay={i * 90} className="h-full"><SaleVehicleCard v={v} /></Reveal>)}
        </div>
      </section>

      {/* Méthode */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-24 sm:px-8 md:pt-32 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <MaskTitle eyebrow="Achat accompagné" title="Quatre étapes, aucune surprise" />
          <Reveal><p className="mt-5 max-w-md leading-relaxed text-ink-2">Vous savez à chaque étape où en est votre projet, et avec qui vous parlez.</p></Reveal>
        </div>
        <ol>
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 80} className="step relative grid grid-cols-[3.5rem_1fr] gap-x-4 py-6">
              <span className="font-display text-3xl font-extrabold text-accent tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="text-2xl md:text-3xl">{t}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{d}</p>
              </div>
              <span aria-hidden className="draw-x absolute inset-x-0 bottom-0 h-px bg-line" />
              <span aria-hidden className="draw-x absolute bottom-0 left-0 h-px w-16 bg-accent" />
            </Reveal>
          ))}
        </ol>
      </section>

      <ContactBand />
    </>
  );
}
