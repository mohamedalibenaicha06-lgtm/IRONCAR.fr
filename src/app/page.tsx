import Link from "next/link";
import { vehicles } from "@/lib/repositories";
import { Button } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { VehicleCard } from "@/components/VehicleCard";
import { DemoBadge } from "@/components/DemoBadge";

const services = [
  { title: "Acheter", text: "Des véhicules d'occasion choisis avec soin, présentés avec toutes leurs caractéristiques.", href: "/achat", cta: "Voir les véhicules" },
  { title: "Vendre", text: "Nous estimons votre voiture et vous proposons une reprise ou une vente accompagnée.", href: "/reprise", cta: "Faire estimer" },
  { title: "Louer", text: "Location à la journée ou à la semaine, pour un séjour ou un besoin ponctuel.", href: "/location", cta: "Voir la location" },
  { title: "Faire inspecter", text: "Un contrôle du véhicule que vous envisagez d'acheter, avant de vous engager.", href: "/inspection", cta: "En savoir plus" },
];
const steps = [
  ["Votre besoin", "Usage, budget, critères : nous faisons le point ensemble, par téléphone ou sur place."],
  ["La sélection", "Nous vous présentons les véhicules qui correspondent, avec leur historique."],
  ["L'essai", "Vous voyez le véhicule, vous l'essayez et vous posez toutes vos questions."],
  ["La remise des clés", "Nous nous chargeons des démarches administratives jusqu'à la livraison."],
];

export default async function Home() {
  const [featured, rentals] = await Promise.all([vehicles.featured(3), vehicles.list({ listingType: "rental" })]);
  const hero = featured[0];
  const rental = rentals[0];
  return (
    <>
      {/* Introduction */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-28 pb-14 sm:px-8 md:pt-36 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:pb-20">
          <div>
            <p className="eyebrow mb-4">Nice et Alpes-Maritimes</p>
            <h1 className="text-[2.25rem] font-semibold leading-[1.1] sm:text-5xl lg:text-[3.5rem]">Acheter, vendre ou louer une voiture à Nice</h1>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-mute md:text-lg">
              IRONCAR vous accompagne à chaque étape : choix du véhicule, vérifications, démarches et remise des clés. Un seul interlocuteur, joignable par téléphone ou WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button href="/achat" arrow>Voir les véhicules</Button>
              <Button href="/contact" variant="secondary">Nous contacter</Button>
            </div>
          </div>
          {hero && (
            <Link href={`/achat/${hero.slug}`} className="group relative block overflow-hidden rounded-md bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.images[0]} alt={`${hero.brand} ${hero.model}`} width={1600} height={1000} fetchPriority="high" decoding="async"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/45 to-transparent p-4 pt-12 text-white">
                <div>
                  <p className="text-sm font-medium">{hero.brand} {hero.model}</p>
                  <p className="text-xs text-white/80">{hero.version}</p>
                </div>
                <DemoBadge />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60} className="bg-white">
              <Link href={s.href} className="group flex h-full flex-col px-5 py-8 transition-colors hover:bg-paper sm:px-8 lg:px-7 md:py-10">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-mute">{s.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  {s.cta} <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Véhicules */}
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
        <SectionHeading eyebrow="À vendre" title="Véhicules disponibles"
          action={<Button href="/achat" variant="link" arrow>Tous les véhicules</Button>} />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => <Reveal key={v.id} delay={i * 70}><VehicleCard v={v} /></Reveal>)}
        </div>
      </section>

      {/* Méthode */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-20 sm:px-8 md:pt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">Achat accompagné</p>
          <h2 className="text-[1.75rem] font-semibold leading-tight md:text-4xl">Comment se passe un achat avec nous</h2>
          <p className="mt-4 max-w-md leading-relaxed text-mute">Vous savez à chaque étape où en est votre projet, et avec qui vous parlez.</p>
        </Reveal>
        <ol className="border-t border-line">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 60} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6">
              <span className="text-[0.9375rem] font-medium text-mute tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-mute">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Location & inspection */}
      <section className="mx-auto mt-20 grid max-w-7xl gap-6 px-5 sm:px-8 md:mt-28 md:grid-cols-2">
        {[
          { img: rental?.images[1], eyebrow: "Location", title: "Une voiture pour quelques jours", text: "Citadine, SUV familial ou cabriolet : choisissez le véhicule adapté à votre séjour sur la Côte d'Azur.", href: "/location", cta: "Voir les véhicules en location" },
          { img: featured[1]?.images[2], eyebrow: "Inspection", title: "Faire vérifier avant d'acheter", text: "Vous avez repéré une voiture chez un particulier ou un professionnel ? Nous l'examinons avec vous avant votre décision.", href: "/inspection", cta: "Découvrir l'inspection" },
        ].map((b, i) => (
          <Reveal key={b.href} delay={i * 80}>
            <Link href={b.href} className="group block">
              <div className="overflow-hidden rounded-md bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {b.img && <img src={b.img} alt="" width={1600} height={1000} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />}
              </div>
              <p className="eyebrow mt-5">{b.eyebrow}</p>
              <h2 className="mt-1.5 text-xl font-semibold md:text-2xl">{b.title}</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-mute">{b.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">{b.cta} <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></span>
            </Link>
          </Reveal>
        ))}
      </section>

      <ContactBand />
    </>
  );
}
