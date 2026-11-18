import type { Vehicle } from "@/types/vehicle";

/** Données FICTIVES de démonstration — remplacées par Supabase à terme. */
const img = (slug: string) => [1, 2, 3, 4].map((n) => `/demo/${slug}-${n}.svg`);

type Seed = Omit<Vehicle, "id" | "images" | "isDemo" | "createdAt" | "status" | "featured"> &
  Partial<Pick<Vehicle, "status" | "featured">>;

const seeds: Seed[] = [
  {
    slug: "demo-coupe-gt-v8", listingType: "sale", brand: "Démo Motors", model: "GT Coupé", version: "V8 Biturbo",
    year: 2022, mileageKm: 18500, fuel: "Essence", transmission: "Automatique", bodyType: "Coupé",
    powerHp: 510, seats: 4, doors: 2, color: "Rouge Corsa", price: 129900, featured: true,
    features: ["Échappement sport", "Sièges sport", "Caméra 360°", "Système audio haut de gamme", "Régulateur adaptatif"],
    description: "Annonce fictive présentée à titre d'exemple. Coupé quatre places, boîte automatique, première main.",
  },
  {
    slug: "demo-suv-hybride-lux", listingType: "sale", brand: "Riviera Auto", model: "Horizon SUV", version: "Hybride rechargeable",
    year: 2023, mileageKm: 24000, fuel: "Hybride", transmission: "Automatique", bodyType: "SUV",
    powerHp: 394, seats: 5, doors: 5, color: "Gris Graphite", price: 74900, featured: true,
    features: ["Toit panoramique", "Suspension pneumatique", "Affichage tête haute", "Régulateur adaptatif", "Attelage"],
    description: "Annonce fictive présentée à titre d'exemple. SUV hybride rechargeable, pratique en ville comme sur route.",
  },
  {
    slug: "demo-berline-electrique", listingType: "sale", brand: "Volt Concept", model: "E-Sedan", version: "Grande Autonomie",
    year: 2024, mileageKm: 9800, fuel: "Électrique", transmission: "Automatique", bodyType: "Berline",
    powerHp: 450, seats: 5, doors: 4, color: "Blanc Nacré", price: 52900, featured: true,
    features: ["Pompe à chaleur", "Charge rapide", "Aide à la conduite", "Toit vitré"],
    description: "Annonce fictive présentée à titre d'exemple. Berline électrique, faible kilométrage.",
  },
  {
    slug: "demo-citadine-sport", listingType: "sale", brand: "Démo Motors", model: "City S", version: "1.6 Turbo",
    year: 2021, mileageKm: 41200, fuel: "Essence", transmission: "Manuelle", bodyType: "Citadine",
    powerHp: 204, seats: 4, doors: 3, color: "Bleu Azur", price: 21900, status: "reserved",
    features: ["Jantes 18\"", "Apple CarPlay", "Sièges baquets", "Feux LED"],
    description: "Annonce fictive présentée à titre d'exemple. Citadine sportive, boîte manuelle.",
  },
  {
    slug: "demo-break-diesel", listingType: "sale", brand: "Riviera Auto", model: "Touring", version: "2.0 TDI",
    year: 2020, mileageKm: 87500, fuel: "Diesel", transmission: "Automatique", bodyType: "Break",
    powerHp: 190, seats: 5, doors: 5, color: "Noir Obsidienne", price: 27500,
    features: ["Coffre 600 L", "GPS", "Sièges chauffants", "Hayon électrique"],
    description: "Annonce fictive présentée à titre d'exemple. Break familial avec grand coffre.",
  },
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

export const demoVehicles: Vehicle[] = seeds.map((s, i) => ({
  status: "available",
  featured: false,
  ...s,
  id: `demo-${i + 1}`,
  images: img(s.slug),
  isDemo: true,
  createdAt: new Date(Date.UTC(2026, 9, 1 + i)).toISOString(),
}));
