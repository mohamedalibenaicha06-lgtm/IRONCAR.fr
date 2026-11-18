import type { Vehicle, VehicleFilters } from "@/types/vehicle";

/** Contrat d'accès aux données — implémenté en local aujourd'hui, par Supabase demain. */
export interface VehicleRepository {
  list(filters?: VehicleFilters): Promise<Vehicle[]>;
  getBySlug(slug: string): Promise<Vehicle | null>;
  featured(limit?: number): Promise<Vehicle[]>;
  brands(listingType?: Vehicle["listingType"]): Promise<string[]>;
  // À venir (espace admin) : create, update, remove
}
