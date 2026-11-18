/**
 * Modèle véhicule — calqué sur la future table Supabase `vehicles`
 * (colonnes en snake_case côté BDD, mappées en camelCase dans le repository).
 */
export type ListingType = "sale" | "rental";
export type Fuel = "Essence" | "Diesel" | "Hybride" | "Électrique";
export type Transmission = "Automatique" | "Manuelle";
export type BodyType = "Berline" | "SUV" | "Coupé" | "Cabriolet" | "Citadine" | "Break";
export type VehicleStatus = "available" | "reserved" | "sold";

export interface Vehicle {
  id: string;
  slug: string;
  listingType: ListingType;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileageKm: number;
  fuel: Fuel;
  transmission: Transmission;
  bodyType: BodyType;
  powerHp: number;
  seats: number;
  doors: number;
  color: string;
  /** Prix de vente TTC (achat) */
  price?: number;
  /** Tarif location / jour TTC */
  pricePerDay?: number;
  depositAmount?: number;
  images: string[];
  features: string[];
  description: string;
  status: VehicleStatus;
  featured: boolean;
  /** Véhicule fictif de démonstration */
  isDemo: boolean;
  createdAt: string;
}

export interface VehicleFilters {
  listingType?: ListingType;
  brand?: string;
  fuel?: Fuel;
  bodyType?: BodyType;
  transmission?: Transmission;
  maxPrice?: number;
  maxMileage?: number;
  query?: string;
  sort?: "recent" | "price-asc" | "price-desc" | "mileage-asc";
}
