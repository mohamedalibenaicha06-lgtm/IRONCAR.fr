/** Coordonnées FICTIVES — à remplacer par les vraies informations. */
export const site = {
  name: "IRONCAR",
  tagline: "Automobiles d'exception à Nice",
  city: "Nice",
  address: "00 Promenade des Anglais, 06000 Nice (adresse fictive)",
  phone: "+33 4 00 00 00 00",
  whatsapp: "33600000000",
  email: "contact@ironcar.example",
  hours: "Lun–Sam · 9h–19h",
};

export const nav = [
  { href: "/achat", label: "Achat & Vente" },
  { href: "/location", label: "Location" },
  { href: "/reprise", label: "Reprise & Recherche" },
  { href: "/inspection", label: "Inspection" },
  { href: "/contact", label: "Contact" },
];

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const km = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} km`;
