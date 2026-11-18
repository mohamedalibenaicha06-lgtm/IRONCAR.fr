"use client";
import { useMemo, useState } from "react";
import type { Vehicle, VehicleFilters } from "@/types/vehicle";
import { applyFilters } from "@/lib/filters";
import { VehicleCard } from "./VehicleCard";
import { Icon } from "./Icon";

const FUELS = ["Essence", "Diesel", "Hybride", "Électrique"] as const;
const BODIES = ["Berline", "SUV", "Coupé", "Cabriolet", "Citadine", "Break"] as const;

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.18em] text-mute">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border border-line bg-steel px-3 text-sm text-ivory outline-none transition focus:border-ember">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export function CatalogView({ vehicles, brands, listingType }: { vehicles: Vehicle[]; brands: string[]; listingType: Vehicle["listingType"] }) {
  const [f, setF] = useState<VehicleFilters>({ sort: "recent" });
  const [open, setOpen] = useState(false);
  const set = (k: keyof VehicleFilters) => (v: string) =>
    setF((p) => ({ ...p, [k]: v === "" ? undefined : ["maxPrice", "maxMileage"].includes(k) ? Number(v) : v }));
  const results = useMemo(() => applyFilters(vehicles, f), [vehicles, f]);
  const sale = listingType === "sale";
  const any = (l: string) => [{ value: "", label: l }];
  const activeCount = Object.entries(f).filter(([k, v]) => k !== "sort" && v !== undefined && v !== "").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Icon name="search" className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mute" />
          <input value={f.query ?? ""} onChange={(e) => set("query")(e.target.value)} placeholder="Rechercher une marque, un modèle…"
            className="h-12 w-full rounded-full border border-line bg-coal pr-4 pl-11 text-sm outline-none transition focus:border-ember" />
        </div>
        <button onClick={() => setOpen((o) => !o)} className="flex h-12 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm md:hidden">
          <Icon name="filter" className="size-4" /> Filtres {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-ember text-[10px] font-bold text-black">{activeCount}</span>}
        </button>
      </div>

      <div className={`grid gap-3 overflow-hidden transition-all duration-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:!max-h-none md:!opacity-100 ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <Select label="Marque" value={f.brand ?? ""} onChange={set("brand")} options={[...any("Toutes"), ...brands.map((b) => ({ value: b, label: b }))]} />
        <Select label="Carrosserie" value={f.bodyType ?? ""} onChange={set("bodyType")} options={[...any("Toutes"), ...BODIES.map((b) => ({ value: b, label: b }))]} />
        <Select label="Énergie" value={f.fuel ?? ""} onChange={set("fuel")} options={[...any("Toutes"), ...FUELS.map((b) => ({ value: b, label: b }))]} />
        <Select label="Boîte" value={f.transmission ?? ""} onChange={set("transmission")} options={[...any("Toutes"), { value: "Automatique", label: "Automatique" }, { value: "Manuelle", label: "Manuelle" }]} />
        {sale ? (
          <Select label="Budget max" value={String(f.maxPrice ?? "")} onChange={set("maxPrice")}
            options={[...any("Illimité"), ...[25000, 50000, 75000, 100000, 150000].map((n) => ({ value: String(n), label: `${n / 1000} k€` }))]} />
        ) : (
          <Select label="Tarif / jour max" value={String(f.maxPrice ?? "")} onChange={set("maxPrice")}
            options={[...any("Illimité"), ...[80, 150, 250, 400].map((n) => ({ value: String(n), label: `${n} €` }))]} />
        )}
        <Select label="Trier" value={f.sort ?? "recent"} onChange={set("sort")} options={[
          { value: "recent", label: "Plus récents" }, { value: "price-asc", label: "Prix croissant" },
          { value: "price-desc", label: "Prix décroissant" }, ...(sale ? [{ value: "mileage-asc", label: "Kilométrage" }] : []),
        ]} />
      </div>

      <div className="mt-8 mb-6 flex items-center justify-between text-sm text-mute">
        <span><strong className="text-ivory">{results.length}</strong> véhicule{results.length > 1 ? "s" : ""}</span>
        {activeCount > 0 && <button onClick={() => setF({ sort: f.sort })} className="text-ember hover:underline">Réinitialiser</button>}
      </div>

      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((v, i) => (
            <div key={v.id} className="rise block min-w-0"  style={{ ["--d" as string]: `${Math.min(i, 6) * 60}ms` }}><VehicleCard v={v} /></div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-line p-12 text-center text-mute">
          Aucun véhicule ne correspond. Essayez d&apos;élargir vos critères — ou confiez-nous votre recherche.
        </div>
      )}
    </div>
  );
}
