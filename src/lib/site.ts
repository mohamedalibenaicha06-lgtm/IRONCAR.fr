/** Coordonnées FICTIVES — à remplacer par les vraies informations. */
export const site = {
  name: "IRONCAR",
  tagline: "Achat, vente, location et inspection automobile à Nice",
  city: "Nice",
  address: "Adresse à préciser, 06000 Nice",
  phone: "+33 4 00 00 00 00",
  whatsapp: "33600000000",
  email: "contact@ironcar.example",
  hours: "Sur rendez-vous",
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const nav = [
  { href: "/achat", label: "Acheter" },
  { href: "/reprise", label: "Vendre" },
  { href: "/location", label: "Louer" },
  { href: "/inspection", label: "Inspection" },
  { href: "/contact", label: "Contact" },
];

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const km = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} km`;

/**
 * Emplacements photo du site. Renseigner `src` avec une photo dont vous détenez les droits
 * (idéalement détourée ou sur fond sombre, ≥ 2400 px de large, WebP) pour remplacer l'emplacement.
 */
export type MediaSlot = { src?: string; alt: string };
export const media: { hero: MediaSlot; services: Record<"achat" | "vente" | "location" | "inspection", MediaSlot> } = {
  hero: { alt: "Véhicule vedette IRONCAR" },
  services: {
    achat: { src: "/vehicles/renault-megane-4.webp", alt: "Renault Mégane noire en ville" },
    vente: { src: "/vehicles/citroen-c4-picasso.webp", alt: "Citroën C4 Picasso sur un parking" },
    location: { src: "/vehicles/renault-clio-3.webp", alt: "Renault Clio grise" },
    inspection: { src: "/vehicles/yamaha-tracer-9.webp", alt: "Yamaha Tracer 9, roue avant et freinage" },
  },
};
