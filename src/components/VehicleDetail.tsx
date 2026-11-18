import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { eur, km } from "@/lib/site";
import { DemoBadge } from "./DemoBadge";
import { Icon, type IconName } from "./Icon";
import { InquiryActions } from "./InquiryActions";
import { Reveal } from "./Reveal";
import { VehicleGallery } from "./VehicleGallery";
import { VehicleCard, VehiclePrice, vehicleTitle } from "./VehicleCard";

export function VehicleDetail({ v, related }: { v: Vehicle; related: Vehicle[] }) {
  const sale = v.listingType === "sale";
  const specs: [IconName, string, string][] = [
    ["calendar", "Année", String(v.year)],
    ["gauge", "Kilométrage", km(v.mileageKm)],
    ["fuel", "Énergie", v.fuel],
    ["gear", "Boîte", v.transmission],
    ["bolt", "Puissance", `${v.powerHp} ch`],
    ["key", "Carrosserie", v.bodyType],
    ["shield", "Places / portes", `${v.seats} / ${v.doors}`],
    ["pin", "Couleur", v.color],
  ];
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 md:pt-36">
        <nav className="mb-6 flex items-center gap-2 text-sm text-mute">
          <Link href={sale ? "/achat" : "/location"} className="hover:text-ivory">{sale ? "Achat & Vente" : "Location"}</Link>
          <span>/</span><span className="truncate text-ivory">{vehicleTitle(v)}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal><VehicleGallery images={v.images} title={vehicleTitle(v)} /></Reveal>
          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            {v.isDemo && <DemoBadge className="mb-4" />}
            <h1 className="display text-4xl md:text-5xl">{vehicleTitle(v)}</h1>
            <p className="mt-2 text-mute">{v.version}</p>
            <div className="my-6 border-y border-line py-6">
              <VehiclePrice v={v} className="display text-4xl text-ember" />
              {sale ? <p className="mt-1 text-sm text-mute">Prix TTC · Reprise possible · Financement sur demande</p>
                : <p className="mt-1 text-sm text-mute">Caution : {eur(v.depositAmount ?? 0)} · Tarifs dégressifs à la semaine</p>}
            </div>
            <InquiryActions v={v} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal><h2 className="kicker mb-6">Caractéristiques</h2></Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {specs.map(([icon, k, val], i) => (
                <Reveal key={k} delay={i * 50} className="rounded-2xl border border-line bg-coal p-4">
                  <Icon name={icon} className="size-5 text-ember" />
                  <p className="mt-3 text-xs uppercase tracking-widest text-mute">{k}</p>
                  <p className="mt-1 font-semibold">{val}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <h2 className="kicker mb-4">Description</h2>
              <p className="leading-relaxed text-mute">{v.description}</p>
            </Reveal>
          </div>
          <Reveal>
            <h2 className="kicker mb-6">Équipements & conditions</h2>
            <ul className="space-y-3">
              {v.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-line pb-3 text-sm">
                  <span className="grid size-6 place-items-center rounded-full bg-ember/15 text-ember"><Icon name="check" className="size-3.5" /></span>{f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
          <h2 className="display mb-8 text-3xl">Vous aimerez aussi</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => <Reveal key={r.id} delay={i * 80}><VehicleCard v={r} /></Reveal>)}
          </div>
        </section>
      )}
    </>
  );
}
