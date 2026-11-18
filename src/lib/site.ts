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
 * Média principal de la page d'accueil — remplaçable sans toucher au code des pages.
 * `backdrop` : bande de 1 px de haut reprenant le haut du fond studio, étirée derrière le texte.
 * `video` (optionnel) : mp4 léger (< 3 Mo, muet) affiché à la place de l'image, `poster` = image.
 */
export const heroMedia: {
  src: string; srcSet: string; width: number; height: number; backdrop: string;
  /** Variante large (ordinateur) : studio prolongé à gauche pour laisser respirer le titre. */
  wide: { src: string; width: number; height: number };
  alt: string; caption: string; video?: string;
} = {
  src: "/media/hero/g63-1286.webp",
  srcSet: "/media/hero/g63-800.webp 800w, /media/hero/g63-1286.webp 1286w",
  width: 1286,
  height: 1052,
  backdrop: "/media/hero/g63-backdrop.png",
  wide: { src: "/media/hero/g63-wide-1456.webp", width: 1456, height: 1052 },
  alt: "Mercedes-AMG G 63 noir en studio, vue trois quarts avant",
  caption: "Mercedes-AMG G 63 · photo d'illustration",
};
