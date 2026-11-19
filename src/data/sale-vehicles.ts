import type { Vehicle } from "@/types/vehicle";

/**
 * VÉHICULES À VENDRE — fichier à modifier pour gérer les annonces.
 *
 * - Ajouter un véhicule : copier un bloc { ... } et changer ses valeurs (le `slug` doit être unique).
 * - Retirer un véhicule vendu : supprimer son bloc, ou passer `status: "sold"`.
 * - Modifier prix / kilométrage / description : changer `price`, `mileageKm`, `description`.
 * - Photos : déposer les fichiers dans /public/vehicles/ puis lister leurs chemins dans `images`
 *   (la première photo sert de couverture).
 *
 * Démonstration : les photos sont réelles, mais les caractéristiques et prix sont FICTIFS
 * (`isDemo: true` affiche « Annonce fictive »). À vérifier avant toute publication.
 */
export const saleVehicles: Vehicle[] = [
  {
    id: "v-001",
    slug: "renault-megane-4-tce-140-edc",
    listingType: "sale",
    brand: "Renault",
    model: "Mégane IV",
    version: "1.3 TCe 140 EDC Intens",
    year: 2019,
    mileageKm: 62400,
    price: 15490,
    fuel: "Essence",
    transmission: "Automatique",
    bodyType: "Berline",
    powerHp: 140,
    seats: 5,
    doors: 5,
    color: "Noir Étoilé",
    images: ["/vehicles/renault-megane-4.webp"],
    features: [
      "Navigation R-Link 2", "Caméra de recul", "Radars avant et arrière", "Feux LED Pure Vision",
      "Climatisation automatique bizone", "Régulateur et limiteur de vitesse", "Carte mains libres", "Jantes alliage 17\"",
    ],
    description:
      "Mégane IV en finition Intens avec boîte automatique EDC à double embrayage. Le moteur 1.3 TCe de 140 ch offre de bonnes reprises tout en restant sobre au quotidien. Intérieur soigné, équipement complet pour la ville comme pour les longs trajets.",
    status: "available",
    featured: true,
    isDemo: true,
    createdAt: "2026-11-18T09:00:00.000Z",
  },
  {
    id: "v-002",
    slug: "citroen-c4-picasso-bluehdi-120-eat6",
    listingType: "sale",
    brand: "Citroën",
    model: "C4 Picasso",
    version: "1.6 BlueHDi 120 EAT6 Exclusive",
    year: 2016,
    mileageKm: 98700,
    price: 11900,
    fuel: "Diesel",
    transmission: "Automatique",
    bodyType: "Monospace",
    powerHp: 120,
    seats: 5,
    doors: 5,
    color: "Gris Platinium",
    images: ["/vehicles/citroen-c4-picasso.webp"],
    features: [
      "Écran tactile 7\" et écran panoramique 12\"", "Navigation", "Aide au stationnement", "Sièges arrière indépendants",
      "Climatisation automatique", "Régulateur de vitesse", "Jantes alliage 17\"", "Vitres arrière surteintées",
    ],
    description:
      "Monospace familial spacieux et lumineux, avec boîte automatique EAT6. Le moteur BlueHDi 120 est réputé pour sa faible consommation. Trois sièges arrière indépendants et un grand coffre en font un véhicule idéal pour la famille.",
    status: "available",
    featured: true,
    isDemo: true,
    createdAt: "2026-11-17T09:00:00.000Z",
  },
  {
    id: "v-003",
    slug: "yamaha-tracer-9",
    listingType: "sale",
    brand: "Yamaha",
    model: "Tracer 9",
    version: "890 cm³ CP3",
    year: 2022,
    mileageKm: 18300,
    price: 10990,
    fuel: "Essence",
    transmission: "Manuelle",
    bodyType: "Moto",
    powerHp: 119,
    seats: 2,
    doors: 0,
    color: "Noir Tech Kamo",
    images: ["/vehicles/yamaha-tracer-9.webp"],
    features: [
      "Silencieux carbone", "Bulle haute", "Dosseret passager", "Protège-mains",
      "Béquille centrale", "Régulateur de vitesse", "Contrôle de traction", "Modes de conduite",
    ],
    description:
      "Routière sportive équipée pour le voyage : bulle haute, dosseret passager et protège-mains. Le trois-cylindres CP3 de 890 cm³ offre beaucoup de couple et un caractère joueur, avec l'électronique de série pour rouler en confiance.",
    status: "available",
    featured: true,
    isDemo: true,
    createdAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "v-004",
    slug: "renault-clio-3-dci-86",
    listingType: "sale",
    brand: "Renault",
    model: "Clio III",
    version: "1.5 dCi 86 Night & Day",
    year: 2010,
    mileageKm: 142500,
    price: 4990,
    fuel: "Diesel",
    transmission: "Manuelle",
    bodyType: "Citadine",
    powerHp: 86,
    seats: 5,
    doors: 5,
    color: "Gris Fumé",
    images: ["/vehicles/renault-clio-3.webp"],
    features: [
      "Navigation Carminat", "Climatisation", "Régulateur et limiteur de vitesse", "Jantes alliage 16\"",
      "Vitres électriques", "Fermeture centralisée", "Bluetooth", "Radio CD",
    ],
    description:
      "Citadine économique et fiable, parfaite pour un premier véhicule ou les trajets quotidiens. Le 1.5 dCi est connu pour sa sobriété. Entretien à jour, prête à rouler.",
    status: "reserved",
    featured: false,
    isDemo: true,
    createdAt: "2026-11-15T09:00:00.000Z",
  },
];
