import Link from "next/link";
import { vehicles } from "@/lib/repositories";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { VehicleCard } from "@/components/VehicleCard";
import { DemoBadge } from "@/components/DemoBadge";
import { whatsappUrl } from "@/lib/site";

const services: { n: string; icon: IconName; title: string; text: string; href: string }[] = [
  { n: "01", icon: "key", title: "Achat & Vente", text: "Une sélection de véhicules contrôlés, et la vente de votre voiture sans contrainte.", href: "/achat" },
  { n: "02", icon: "calendar", title: "Location", text: "Du cabriolet pour la Corniche au SUV familial, livré à Nice ou à l'aéroport.", href: "/location" },
  { n: "03", icon: "swap", title: "Reprise & Recherche", text: "Estimation de votre véhicule et chasse personnalisée du modèle idéal.", href: "/reprise" },
  { n: "04", icon: "shield", title: "Inspection", text: "Contrôle expert avant achat : mécanique, carrosserie, historique, essai.", href: "/inspection" },
];
const steps = [
  ["Échange", "Vous nous décrivez votre besoin, par téléphone ou WhatsApp."],
  ["Sélection", "Nous sourçons, contrôlons et vous présentons les meilleures options."],
  ["Essai", "Essai sur route et inspection détaillée, en toute transparence."],
  ["Livraison", "Démarches administratives prises en charge, remise des clés."],
];

export default async function Home() {
  const featured = await vehicles.featured(3);
  const hero = featured[0];
  return (
    <>
      {/* HERO */}
      <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden pt-28">
        <div className="pointer-events-none absolute top-1/3 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]" />
        <div className="relative mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
          <p className="kicker overflow-hidden"><span className="rise">Nice · Côte d&apos;Azur</span></p>
          <h1 className="display mt-5 text-[15vw] leading-[0.85] sm:text-[12vw] lg:text-[9.5rem]">
            <span className="block overflow-hidden"><span className="rise" style={{ ["--d" as string]: "60ms" }}>Conduire</span></span>
            <span className="block overflow-hidden"><span className="rise text-outline" style={{ ["--d" as string]: "140ms" }}>l&apos;exception</span></span>
          </h1>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="rise max-w-md text-base text-mute md:text-lg" style={{ ["--d" as string]: "260ms" }}>
              Achat, vente, location et inspection de véhicules premium. Un accompagnement sur-mesure, de la recherche à la remise des clés.
            </p>
            <div className="rise flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "340ms" }}>
              <Button href="/achat">Voir le catalogue</Button>
              <Button href={whatsappUrl("Bonjour IRONCAR !")} external variant="ghost" icon="whatsapp">WhatsApp</Button>
            </div>
          </div>
        </div>
        {hero && (
          <Link href={`/achat/${hero.slug}`} className="drive relative mx-auto mt-6 block w-full max-w-6xl px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.images[2]} alt={`${hero.brand} ${hero.model}`} className="aspect-[16/7] w-full rounded-t-[2rem] object-cover object-center [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
            <DemoBadge className="absolute top-4 left-8" />
          </Link>
        )}
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-line bg-coal py-5">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Achat", "Vente", "Location", "Reprise", "Recherche personnalisée", "Inspection", "Livraison Côte d'Azur"].map((t) => (
              <span key={`${k}-${t}`} className="display flex items-center gap-12 text-2xl text-ivory/80 md:text-3xl">{t}<span className="text-ember">✦</span></span>
            )))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeading kicker="Nos services" title="Tout votre parcours auto, un seul partenaire" />
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <Link href={s.href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-coal p-7 transition-colors duration-500 hover:border-ember/50 md:p-10">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-ember/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                <div className="relative flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ember/10 text-ember"><Icon name={s.icon} className="size-6" /></span>
                  <span className="display text-5xl text-white/10">{s.n}</span>
                </div>
                <h3 className="display relative mt-10 text-2xl md:text-3xl">{s.title}</h3>
                <p className="relative mt-3 text-mute">{s.text}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm text-ember">Découvrir <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SÉLECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading kicker="Sélection du moment" title="En vitrine" intro="Véhicules fictifs présentés à titre de démonstration." />
          <Reveal className="mb-10 md:mb-14"><Button href="/achat" variant="ghost">Tout le catalogue</Button></Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => <Reveal key={v.id} delay={i * 100}><VehicleCard v={v} /></Reveal>)}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeading kicker="Méthode" title="Simple. Transparent. Rapide." />
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 90} className="bg-ink p-7">
              <span className="display text-6xl text-ember">{i + 1}</span>
              <h3 className="display mt-6 text-xl">{t}</h3>
              <p className="mt-2 text-sm text-mute">{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CHIFFRES */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4">
        {[["150+", "points d'inspection"], ["48 h", "pour une estimation"], ["7j/7", "réponse WhatsApp"], ["06", "Nice & Côte d'Azur"]].map(([n, l], i) => (
          <Reveal key={l} delay={i * 80} className="border-l border-ember pl-5">
            <p className="display text-4xl md:text-5xl">{n}</p>
            <p className="mt-2 text-sm text-mute">{l}</p>
          </Reveal>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
