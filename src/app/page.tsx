import Link from "next/link";
import { vehicles } from "@/lib/repositories";
import { Button } from "@/components/Button";
import { ContactBand } from "@/components/ContactBand";
import { HomeHero } from "@/components/HomeHero";
import { Icon } from "@/components/Icon";
import { MediaSlot } from "@/components/MediaSlot";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SaleVehicleCard } from "@/components/SaleVehicleCard";
import { media } from "@/lib/site";

const services = [
  { n: "01", key: "achat", title: "Acheter", text: "Des véhicules d'occasion choisis avec soin, présentés avec toutes leurs caractéristiques.", href: "/achat", cta: "Voir les véhicules", span: "lg:col-span-7 lg:row-span-2", ratio: "aspect-[4/3] lg:aspect-auto lg:h-[440px]" },
  { n: "02", key: "vente", title: "Vendre", text: "Nous estimons votre voiture et vous proposons une reprise ou une vente accompagnée.", href: "/reprise", cta: "Faire estimer", span: "lg:col-span-5", ratio: "aspect-[16/10]" },
  { n: "03", key: "location", title: "Louer", text: "Location à la journée ou à la semaine, pour un séjour ou un besoin ponctuel.", href: "/location", cta: "Voir la location", span: "lg:col-span-5", ratio: "aspect-[16/10]" },
  { n: "04", key: "inspection", title: "Inspection", text: "Un contrôle du véhicule que vous envisagez d'acheter, avant de vous engager.", href: "/inspection", cta: "Réserver une inspection", span: "lg:col-span-12", ratio: "aspect-[16/10] lg:aspect-[21/7]" },
] as const;

const steps = [
  ["Votre besoin", "Usage, budget, critères : nous faisons le point ensemble, par téléphone ou sur place."],
  ["La sélection", "Nous vous présentons les véhicules qui correspondent, avec leur historique."],
  ["L'essai", "Vous voyez le véhicule, vous l'essayez et vous posez toutes vos questions."],
  ["La remise des clés", "Nous nous chargeons des démarches administratives jusqu'à la livraison."],
];

export default async function Home() {
  const featured = await vehicles.featured(3);
  return (
    <>
      <HomeHero />

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-20 sm:px-8 md:pt-28">
        <SectionHeading eyebrow="Nos services" title="Tout votre projet auto, au même endroit" />
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className={s.span}>
              <Link href={s.href} className="svc group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-coal transition-[transform,border-color] duration-300 hover:border-accent/40">
                <div className={`svc-media relative overflow-hidden ${s.ratio}`}>
                  <MediaSlot slot={media.services[s.key]} label={s.title} />
                  <span className="absolute top-4 left-4 font-display text-lg font-bold text-accent">{s.n}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-[2.25rem] md:text-[2.75rem]">{s.title}</h3>
                  <p className="mt-2 max-w-md flex-1 leading-relaxed text-ink-2">{s.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-ink/20 px-4 py-2.5 text-sm font-medium transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    {s.cta} <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Véhicules */}
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 md:pt-28">
        <SectionHeading eyebrow="À vendre" title="Véhicules disponibles"
          action={<Button href="/achat" variant="link" arrow>Tous les véhicules</Button>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => <Reveal key={v.id} delay={i * 70} className="h-full"><SaleVehicleCard v={v} /></Reveal>)}
        </div>
      </section>

      {/* Méthode */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-20 sm:px-8 md:pt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow eyebrow-accent mb-3">Achat accompagné</p>
          <h2 className="text-[2.5rem] md:text-6xl">Comment se passe un achat avec nous</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-2">Vous savez à chaque étape où en est votre projet, et avec qui vous parlez.</p>
        </Reveal>
        <ol className="border-t border-line">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-6">
              <span className="font-display text-2xl font-bold text-accent tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <ContactBand />
    </>
  );
}
