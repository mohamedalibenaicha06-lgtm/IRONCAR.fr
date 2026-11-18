import type { Vehicle, VehicleFilters } from "@/types/vehicle";

export const priceOf = (v: Vehicle) => (v.listingType === "sale" ? v.price ?? 0 : v.pricePerDay ?? 0);

export function applyFilters(list: Vehicle[], f: VehicleFilters = {}): Vehicle[] {
  const q = f.query?.trim().toLowerCase();
  const out = list.filter(
    (v) =>
      (!f.listingType || v.listingType === f.listingType) &&
      (!f.brand || v.brand === f.brand) &&
      (!f.fuel || v.fuel === f.fuel) &&
      (!f.bodyType || v.bodyType === f.bodyType) &&
      (!f.transmission || v.transmission === f.transmission) &&
      (!f.maxPrice || priceOf(v) <= f.maxPrice) &&
      (!f.maxMileage || v.mileageKm <= f.maxMileage) &&
      (!q || `${v.brand} ${v.model} ${v.version}`.toLowerCase().includes(q)),
  );
  const sorters: Record<NonNullable<VehicleFilters["sort"]>, (a: Vehicle, b: Vehicle) => number> = {
    recent: (a, b) => b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => priceOf(a) - priceOf(b),
    "price-desc": (a, b) => priceOf(b) - priceOf(a),
    "mileage-asc": (a, b) => a.mileageKm - b.mileageKm,
  };
  return out.sort(sorters[f.sort ?? "recent"]);
}
