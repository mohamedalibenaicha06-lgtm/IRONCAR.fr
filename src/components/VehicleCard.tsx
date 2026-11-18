import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { eur, km } from "@/lib/site";
import { DemoBadge } from "./DemoBadge";

export const vehicleHref = (v: Vehicle) => `/${v.listingType === "sale" ? "achat" : "location"}/${v.slug}`;
export const vehicleTitle = (v: Vehicle) => `${v.brand} ${v.model}`;
const statusLabel = { available: "", reserved: "Réservé", sold: "Vendu" } as const;

export function VehiclePrice({ v, className = "" }: { v: Vehicle; className?: string }) {
  return v.listingType === "sale" ? (
    <span className={className}>{eur(v.price ?? 0)}</span>
  ) : (
    <span className={className}>{eur(v.pricePerDay ?? 0)}<span className="text-[0.8em] font-normal text-mute"> / jour</span></span>
  );
}

export function VehicleCard({ v }: { v: Vehicle }) {
  const specs = v.listingType === "sale"
    ? [v.year, km(v.mileageKm), v.fuel, v.transmission]
    : [`${v.seats} places`, v.fuel, v.transmission];
  return (
    <Link href={vehicleHref(v)} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.images[0]} alt={vehicleTitle(v)} width={1600} height={1000} loading="lazy" decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {v.isDemo && <DemoBadge />}
          {statusLabel[v.status] && <span className="rounded bg-ink px-2 py-0.5 text-[11px] font-medium text-white">{statusLabel[v.status]}</span>}
        </div>
      </div>
      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="truncate text-[1.0625rem] font-semibold group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4">{vehicleTitle(v)}</h3>
          <VehiclePrice v={v} className="shrink-0 text-[1.0625rem] font-semibold" />
        </div>
        <p className="mt-0.5 truncate text-sm text-mute">{v.version}</p>
        <p className="mt-2 text-sm text-ink-2">{specs.join(" · ")}</p>
      </div>
    </Link>
  );
}
