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
