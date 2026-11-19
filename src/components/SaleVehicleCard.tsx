import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { km } from "@/lib/site";
import { DemoBadge } from "./DemoBadge";
import { Icon, type IconName } from "./Icon";
import { VehicleImage, VehiclePrice, vehicleHref, vehicleTitle } from "./VehicleCard";

/** Carte d'annonce « Véhicules à vendre » : grande photo, prix, infos clés avec icônes, deux actions. */
export function SaleVehicleCard({ v }: { v: Vehicle }) {
  const href = vehicleHref(v);
  const facts: [IconName, string][] = [["calendar", String(v.year)], ["gauge", km(v.mileageKm)], ["fuel", v.fuel], ["gear", v.transmission]];
  const contact = `/contact?sujet=achat&vehicule=${encodeURIComponent(`${vehicleTitle(v)} ${v.version} (${v.year}), réf. ${v.id}`)}`;
  return (
    <article className="svc group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-coal transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgb(229_57_53/0.45)]">
      <Link href={href} className="svc-media relative block aspect-[4/5] overflow-hidden" aria-label={`Voir ${vehicleTitle(v)}`}>
        <VehicleImage v={v} className="object-[50%_78%]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {v.isDemo && <DemoBadge />}
          {v.status !== "available" && <span className="rounded bg-accent px-2 py-0.5 text-[11px] font-medium text-white">{v.status === "sold" ? "Vendu" : "Réservé"}</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.2em] text-ink-2 uppercase">{v.brand}</p>
            <h3 className="truncate text-[2rem] text-white">{v.model}</h3>
          </div>
          <VehiclePrice v={v} className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-display text-[1.5rem] leading-none font-bold text-white" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="truncate text-sm text-mute">{v.version} · {v.powerHp} ch</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-ink-2">
          {facts.map(([icon, val]) => (
            <li key={icon} className="flex items-center gap-2"><Icon name={icon} className="size-4 shrink-0 text-accent" />{val}</li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2.5 pt-1">
          <Link href={href} className="press inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-ink font-display text-[0.95rem] font-semibold tracking-[0.08em] text-paper uppercase transition-colors hover:bg-accent hover:text-white">
            Voir le véhicule
          </Link>
          <Link href={contact} className="press inline-flex h-11 items-center justify-center rounded-md border border-ink/25 font-display text-[0.95rem] font-semibold tracking-[0.08em] uppercase transition-colors hover:border-accent hover:text-white">
            Nous contacter
          </Link>
        </div>
      </div>
    </article>
  );
}
