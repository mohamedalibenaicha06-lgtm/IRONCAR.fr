import { demoVehicles } from "@/data/demo-vehicles";
import { applyFilters } from "@/lib/filters";
import type { VehicleRepository } from "./types";

export const localVehicleRepository: VehicleRepository = {
  async list(filters) {
    return applyFilters(demoVehicles, filters);
  },
  async getBySlug(slug) {
    return demoVehicles.find((v) => v.slug === slug) ?? null;
  },
  async featured(limit = 4) {
    return demoVehicles.filter((v) => v.featured).slice(0, limit);
  },
  async brands(listingType) {
    const list = listingType ? demoVehicles.filter((v) => v.listingType === listingType) : demoVehicles;
    return [...new Set(list.map((v) => v.brand))].sort();
  },
};
