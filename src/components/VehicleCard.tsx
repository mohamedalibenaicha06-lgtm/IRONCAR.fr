import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { eur, km } from "@/lib/site";
import { DemoBadge } from "./DemoBadge";
import { Icon } from "./Icon";
import { MediaSlot } from "./MediaSlot";

export const vehicleHref = (v: Vehicle) => `/${v.listingType === "sale" ? "achat" : "location"}/${v.slug}`;
export const vehicleTitle = (v: Vehicle) => `${v.brand} ${v.model}`;
const statusLabel = { available: "", reserved: "Réservé", sold: "Vendu" } as const;

export function VehiclePrice({ v, className = "" }: { v: Vehicle; className?: string }) {
  return v.listingType === "sale" ? (
    <span className={className}>{eur(v.price ?? 0)}</span>
  ) : (
    <span className={className}>{eur(v.pricePerDay ?? 0)}<span className="text-[0.55em] font-normal text-mute"> / jour</span></span>
  );
}

/** Photo principale du véhicule, ou emplacement sobre si aucune photo n'est encore fournie. */
export function VehicleImage({ v, className = "", priority = false }: { v: Vehicle; className?: string; priority?: boolean }) {
  return <MediaSlot slot={{ src: v.images[0], alt: `${vehicleTitle(v)} ${v.version}` }} label={v.model} className={className} priority={priority} />;
}

export function VehicleCard({ v }: { v: Vehicle }) {
  const specs: [string, string][] = v.listingType === "sale"
    ? [["Année", String(v.year)], ["Kilométrage", km(v.mileageKm)], ["Énergie", v.fuel], ["Boîte", v.transmission]]
    : [["Places", String(v.seats)], ["Énergie", v.fuel], ["Boîte", v.transmission], ["Puissance", `${v.powerHp} ch`]];
  return (
    <Link href={vehicleHref(v)}
      className="svc group block overflow-hidden rounded-lg border border-line bg-coal transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      <div className="svc-media relative aspect-[3/2] overflow-hidden">
        <VehicleImage v={v} />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {v.isDemo && <DemoBadge />}
          {statusLabel[v.status] && <span className="rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-white">{statusLabel[v.status]}</span>}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-[0.18em] text-mute uppercase">{v.brand}</p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h3 className="min-w-0 truncate text-[1.75rem]">{v.model}</h3>
          <VehiclePrice v={v} className="shrink-0 font-display text-[1.75rem] leading-none font-bold text-ink" />
        </div>
        <p className="mt-1 truncate text-sm text-mute">{v.version}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
          {specs.map(([k, val]) => (
            <div key={k}><dt className="text-[11px] tracking-[0.12em] text-mute uppercase">{k}</dt><dd className="mt-0.5 text-ink-2">{val}</dd></div>
          ))}
        </dl>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent">
          Voir la fiche <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
