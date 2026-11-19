import type { Vehicle } from "@/types/vehicle";
import { saleVehicles } from "./sale-vehicles";

/** Données FICTIVES de démonstration — remplacées par Supabase à terme. */

type Seed = Omit<Vehicle, "id" | "images" | "isDemo" | "createdAt" | "status" | "featured"> &
  Partial<Pick<Vehicle, "status" | "featured">>;

const seeds: Seed[] = [
  {
    slug: "demo-cabriolet-riviera", listingType: "rental", brand: "Riviera Auto", model: "Spider", version: "Cabriolet 2.0",
    year: 2024, mileageKm: 6000, fuel: "Essence", transmission: "Automatique", bodyType: "Cabriolet",
    powerHp: 300, seats: 2, doors: 2, color: "Bleu Azur", pricePerDay: 249, depositAmount: 3000, featured: true,
    features: ["Capote électrique", "250 km par jour inclus", "Dépôt de garantie demandé"],
    description: "Annonce fictive présentée à titre d'exemple. Cabriolet deux places.",
  },
  {
    slug: "demo-suv-location", listingType: "rental", brand: "Volt Concept", model: "E-Cross", version: "Dual Motor",
    year: 2024, mileageKm: 12000, fuel: "Électrique", transmission: "Automatique", bodyType: "SUV",
    powerHp: 420, seats: 7, doors: 5, color: "Gris Graphite", pricePerDay: 179, depositAmount: 2000,
    features: ["7 places", "Grand coffre", "Siège enfant sur demande"],
    description: "Annonce fictive présentée à titre d'exemple. SUV électrique sept places.",
  },
  {
    slug: "demo-coupe-location", listingType: "rental", brand: "Démo Motors", model: "GT Coupé", version: "Sport",
    year: 2023, mileageKm: 15000, fuel: "Essence", transmission: "Automatique", bodyType: "Coupé",
    powerHp: 450, seats: 4, doors: 2, color: "Noir Obsidienne", pricePerDay: 390, depositAmount: 5000,
    features: ["Conducteur de 25 ans minimum", "200 km par jour inclus", "Dépôt de garantie demandé"],
    description: "Annonce fictive présentée à titre d'exemple. Coupé sportif quatre places.",
  },
  {
    slug: "demo-citadine-location", listingType: "rental", brand: "Démo Motors", model: "City", version: "1.2 Hybride",
    year: 2024, mileageKm: 8000, fuel: "Hybride", transmission: "Automatique", bodyType: "Citadine",
    powerHp: 116, seats: 5, doors: 5, color: "Blanc Nacré", pricePerDay: 59, depositAmount: 800,
    features: ["Kilométrage illimité", "Format compact", "Faible consommation"],
    description: "Annonce fictive présentée à titre d'exemple. Citadine hybride automatique.",
  },
];

const rentalVehicles: Vehicle[] = seeds.map((s, i) => ({
  status: "available",
  featured: false,
  ...s,
  id: `demo-${i + 1}`,
  // Aucune photo : ajouter ici des URL de photos autorisées (ou via Supabase Storage).
  images: [],
  isDemo: true,
  createdAt: new Date(Date.UTC(2026, 9, 1 + i)).toISOString(),
}));

export const demoVehicles: Vehicle[] = [...saleVehicles, ...rentalVehicles];
