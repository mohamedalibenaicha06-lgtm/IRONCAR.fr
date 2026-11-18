import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { eur, km } from "@/lib/site";
import { DemoBadge } from "./DemoBadge";
import { Icon } from "./Icon";

export const vehicleHref = (v: Vehicle) => `/${v.listingType === "sale" ? "achat" : "location"}/${v.slug}`;
export const vehicleTitle = (v: Vehicle) => `${v.brand} ${v.model}`;
const statusLabel = { available: "", reserved: "Réservé", sold: "Vendu" } as const;

export function VehiclePrice({ v, className = "" }: { v: Vehicle; className?: string }) {
  return v.listingType === "sale" ? (
    <span className={className}>{eur(v.price ?? 0)}</span>
  ) : (
    <span className={className}>{eur(v.pricePerDay ?? 0)}<span className="text-sm font-normal text-mute"> / jour</span></span>
  );
}

export function VehicleCard({ v }: { v: Vehicle }) {
  const specs = v.listingType === "sale"
    ? [v.year, km(v.mileageKm), v.fuel, v.transmission]
    : [`${v.seats} places`, v.fuel, v.transmission, `${v.powerHp} ch`];
  return (
    <Link href={vehicleHref(v)} className="group block overflow-hidden rounded-3xl border border-line bg-coal transition-all duration-500 hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_30px_60px_-30px_rgb(255_90_31/.35)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.images[0]} alt={vehicleTitle(v)} loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
        <div className="absolute inset-x-0 top-0 flex justify-between p-3">
          {v.isDemo && <DemoBadge />}
          {statusLabel[v.status] && <span className="rounded-full bg-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">{statusLabel[v.status]}</span>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="display truncate text-lg">{vehicleTitle(v)}</h3>
            <p className="truncate text-sm text-mute">{v.version}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ember group-hover:bg-ember group-hover:text-black">
            <Icon name="arrow" className="size-4" />
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {specs.map((s) => <li key={String(s)} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-mute">{s}</li>)}
        </ul>
        <VehiclePrice v={v} className="display mt-5 block text-2xl text-ivory" />
      </div>
    </Link>
  );
}
