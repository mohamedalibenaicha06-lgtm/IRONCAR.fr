"use client";
import { useMemo, useState } from "react";
import type { Vehicle, VehicleFilters } from "@/types/vehicle";
import { applyFilters } from "@/lib/filters";
import { VehicleCard } from "./VehicleCard";
import { SaleVehicleCard } from "./SaleVehicleCard";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

const nf = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
const euro = (n: number) => `${nf(n)} €`;

const FUELS = ["Essence", "Diesel", "Hybride", "Électrique"] as const;
const BODIES = ["Berline", "SUV", "Coupé", "Cabriolet", "Citadine", "Break", "Monospace", "Moto"] as const;

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.8125rem] text-mute">{label}</span>
      <span className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none truncate rounded-md border border-line bg-coal pr-8 pl-3 text-base text-ink outline-none transition-colors hover:border-ink/30 focus:border-ink md:text-[0.9375rem]">
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="arrow" className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 rotate-90 text-mute" />
      </span>
    </label>
  );
}

export function CatalogView({ vehicles, brands, listingType }: { vehicles: Vehicle[]; brands: string[]; listingType: Vehicle["listingType"] }) {
  const [f, setF] = useState<VehicleFilters>({ sort: "recent" });
  const [open, setOpen] = useState(false);
  const set = (k: keyof VehicleFilters) => (v: string) =>
    setF((p) => ({ ...p, [k]: v === "" ? undefined : ["minPrice", "maxPrice", "maxMileage", "minYear"].includes(k) ? Number(v) : v }));
  const results = useMemo(() => applyFilters(vehicles, f), [vehicles, f]);
  const sale = listingType === "sale";
  const any = (l: string) => [{ value: "", label: l }];
  const activeCount = Object.entries(f).filter(([k, v]) => k !== "sort" && k !== "query" && v !== undefined && v !== "").length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-10">
      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <Icon name="search" className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-mute" />
          <input value={f.query ?? ""} onChange={(e) => set("query")(e.target.value)} placeholder="Marque ou modèle" aria-label="Rechercher"
            className="h-11 w-full rounded-md border border-line bg-coal pr-4 pl-10 text-base outline-none transition-colors placeholder:text-mute hover:border-ink/30 focus:border-ink md:text-[0.9375rem]" />
        </div>
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
          className="flex h-11 items-center gap-2 rounded-md border border-line bg-coal px-4 text-[0.9375rem] md:hidden">
          <Icon name="filter" className="size-4" /> Filtres{activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <div className={`grid grid-cols-2 gap-x-3 gap-y-3.5 md:mt-5 md:!grid md:grid-cols-3 ${sale ? "lg:grid-cols-4" : "lg:grid-cols-5"} ${open ? "mt-4 grid" : "hidden"}`}>
        <Select label="Marque" value={f.brand ?? ""} onChange={set("brand")} options={[...any("Toutes"), ...brands.map((b) => ({ value: b, label: b }))]} />
        <Select label="Carrosserie" value={f.bodyType ?? ""} onChange={set("bodyType")} options={[...any("Toutes"), ...BODIES.map((b) => ({ value: b, label: b }))]} />
        <Select label="Énergie" value={f.fuel ?? ""} onChange={set("fuel")} options={[...any("Toutes"), ...FUELS.map((b) => ({ value: b, label: b }))]} />
        <Select label="Boîte" value={f.transmission ?? ""} onChange={set("transmission")} options={[...any("Toutes"), { value: "Automatique", label: "Automatique" }, { value: "Manuelle", label: "Manuelle" }]} />
        {sale ? (
          <>
            <Select label="Prix minimum" value={String(f.minPrice ?? "")} onChange={set("minPrice")}
              options={[...any("Sans minimum"), ...[5000, 10000, 15000, 20000, 30000].map((n) => ({ value: String(n), label: euro(n) }))]} />
            <Select label="Prix maximum" value={String(f.maxPrice ?? "")} onChange={set("maxPrice")}
              options={[...any("Sans limite"), ...[10000, 15000, 20000, 30000, 50000].map((n) => ({ value: String(n), label: euro(n) }))]} />
            <Select label="Kilométrage maximum" value={String(f.maxMileage ?? "")} onChange={set("maxMileage")}
              options={[...any("Sans limite"), ...[20000, 50000, 100000, 150000].map((n) => ({ value: String(n), label: `${nf(n)} km` }))]} />
            <Select label="Année minimum" value={String(f.minYear ?? "")} onChange={set("minYear")}
              options={[...any("Toutes"), ...[2010, 2015, 2018, 2020, 2022].map((n) => ({ value: String(n), label: `${n} et plus` }))]} />
          </>
        ) : (
          <Select label="Tarif par jour maximum" value={String(f.maxPrice ?? "")} onChange={set("maxPrice")}
            options={[...any("Sans limite"), ...[80, 150, 250, 400].map((n) => ({ value: String(n), label: `${n} €` }))]} />
        )}
      </div>

      <div className="mt-8 mb-6 flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="text-[0.9375rem] text-mute">
          {results.length} véhicule{results.length > 1 ? "s" : ""}
          {activeCount > 0 && <button onClick={() => setF({ sort: f.sort, query: f.query })} className="ml-3 text-ink underline underline-offset-4">Effacer les filtres</button>}
        </p>
        <label className="flex items-center gap-2 text-[0.9375rem] text-mute">
          <span className="hidden sm:inline">Trier par</span>
          <select value={f.sort ?? "recent"} onChange={(e) => set("sort")(e.target.value)} aria-label="Trier"
            className="bg-transparent text-base font-medium text-ink outline-none md:text-[0.9375rem]">
            <option value="recent">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            {sale && <option value="year-desc">Année (plus récente)</option>}
            {sale && <option value="mileage-asc">Kilométrage croissant</option>}
          </select>
        </label>
      </div>

      {results.length ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((v, i) => sale
            ? <Reveal key={v.id} delay={(i % 3) * 90} className="h-full"><SaleVehicleCard v={v} /></Reveal>
            : <VehicleCard key={v.id} v={v} />)}
        </div>
      ) : (
        <div className="rounded-md bg-sand px-6 py-14 text-center">
          <p className="font-medium">Aucun véhicule ne correspond à ces critères.</p>
          <p className="mt-1 text-[0.9375rem] text-mute">Élargissez votre recherche ou indiquez-nous le véhicule que vous cherchez.</p>
        </div>
      )}
    </div>
  );
}
