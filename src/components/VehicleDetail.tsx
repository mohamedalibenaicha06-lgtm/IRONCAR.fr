import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { eur, km, site, whatsappUrl } from "@/lib/site";
import { DemoBadge, StatusBadge } from "./DemoBadge";
import { Icon } from "./Icon";
import { InquiryActions } from "./InquiryActions";
import { Reveal } from "./Reveal";
import { VehicleGallery } from "./VehicleGallery";
import { VehicleCard, VehiclePrice, vehicleTitle } from "./VehicleCard";

export function VehicleDetail({ v, related }: { v: Vehicle; related: Vehicle[] }) {
  const sale = v.listingType === "sale";
  const keyFacts = [String(v.year), km(v.mileageKm), v.fuel, v.transmission];
  const specs: [string, string][] = [
    ["Année", String(v.year)],
    ["Kilométrage", km(v.mileageKm)],
    ["Énergie", v.fuel],
    ["Boîte de vitesses", v.transmission],
    ["Puissance", `${v.powerHp} ch`],
    ["Carrosserie", v.bodyType],
    ["Places", String(v.seats)],
    ["Portes", String(v.doors)],
    ["Couleur", v.color],
    ["Référence", v.id],
  ];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Car", name: `${vehicleTitle(v)} ${v.version}`, brand: v.brand, model: v.model,
    vehicleModelDate: String(v.year), fuelType: v.fuel, vehicleTransmission: v.transmission, color: v.color, bodyType: v.bodyType,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileageKm, unitCode: "KMT" }, description: v.description,
    offers: { "@type": "Offer", priceCurrency: "EUR", price: sale ? v.price : v.pricePerDay,
      availability: v.status === "available" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
      seller: { "@type": "AutoDealer", name: site.name } },
  };
  return (
    <>
      <style>{"@media (max-width:1023px){body{padding-bottom:5.5rem}}"}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Barre d'action fixe (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 border-t border-line bg-paper/85 px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-mute">{vehicleTitle(v)}</p>
          <VehiclePrice v={v} className="block text-base font-semibold" />
        </div>
        <a href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label="Appeler" className="grid size-11 place-items-center rounded-md border border-ink/15"><Icon name="phone" className="size-[18px]" /></a>
        <a href={whatsappUrl(`Bonjour, je suis intéressé(e) par ${vehicleTitle(v)} ${v.version} (réf. ${v.id}).`)} target="_blank" rel="noopener noreferrer"
          className="flex h-11 items-center gap-2 rounded-md bg-[#1fa855] px-4 text-sm font-medium text-white"><Icon name="whatsapp" className="size-4" /> WhatsApp</a>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
        <nav className="mb-5 flex items-center gap-2 text-sm text-mute" aria-label="Fil d'Ariane">
          <Link href={sale ? "/achat" : "/location"} className="hover:text-ink">{sale ? "Véhicules à vendre" : "Location"}</Link>
          <span aria-hidden>/</span><span className="truncate text-ink">{vehicleTitle(v)}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <VehicleGallery images={v.images} title={vehicleTitle(v)} />
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex gap-1.5">{v.isDemo && <DemoBadge />}{sale && <StatusBadge status={v.status} />}</div>
            <h1 className="text-[1.75rem] font-semibold leading-tight md:text-[2rem]">{vehicleTitle(v)}</h1>
            <p className="mt-1 text-mute">{v.version}</p>
            <p className="mt-4 text-sm text-ink-2">{keyFacts.join(" · ")}</p>
            <div className="my-6 border-y border-line py-5">
              <VehiclePrice v={v} className="block text-[1.75rem] font-semibold tabular-nums" />
              <p className="mt-1 text-sm text-mute">
                {sale ? "Prix TTC. Reprise de votre véhicule possible." : `Dépôt de garantie : ${eur(v.depositAmount ?? 0)}.`}
              </p>
            </div>
            <InquiryActions v={v} />
            {v.status !== "available" && <p className="mt-4 text-sm text-mute">Ce véhicule est actuellement {v.status === "reserved" ? "réservé" : "vendu"}. Nous pouvons vous proposer un modèle équivalent.</p>}
          </aside>
        </div>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div>
            <h2 className="text-xl font-semibold">Caractéristiques</h2>
            <dl className="mt-5 grid sm:grid-cols-2 sm:gap-x-10">
              {specs.map(([k, val]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3 text-[0.9375rem]">
                  <dt className="text-mute">{k}</dt><dd className="text-right font-medium">{val}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-12 text-xl font-semibold">Description</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{v.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{sale ? "Équipements" : "Équipements et conditions"}</h2>
            <ul className="mt-5 space-y-3">
              {v.features.map((f) => (
                <li key={f} className="flex gap-3 text-[0.9375rem] text-ink-2"><Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
          <h2 className="mb-6 text-xl font-semibold">{sale ? "Autres véhicules disponibles" : "Autres véhicules en location"}</h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => <Reveal key={r.id} delay={i * 60}><VehicleCard v={r} /></Reveal>)}
          </div>
        </section>
      )}
    </>
  );
}
