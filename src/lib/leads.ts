import { site, whatsappUrl } from "./site";

/** Demande de contact — future table Supabase `leads`. */
export interface Lead {
  subject: string;
  name: string;
  phone: string;
  email?: string;
  vehicle?: string;
  message: string;
}

export const leadSubjects = {
  achat: "Achat d'un véhicule",
  vente: "Vente de mon véhicule",
  location: "Location",
  reprise: "Reprise / estimation",
  recherche: "Recherche personnalisée",
  inspection: "Inspection avant achat",
  autre: "Autre demande",
} as const;
export type LeadSubject = keyof typeof leadSubjects;

export const formatLead = (l: Lead) =>
  [`Demande IRONCAR : ${l.subject}`, `Nom : ${l.name}`, `Tél : ${l.phone}`, l.email && `Email : ${l.email}`,
    l.vehicle && `Véhicule : ${l.vehicle}`, "", l.message].filter((x) => x !== undefined && x !== "").join("\n");

/** V1 : envoi via WhatsApp ou e-mail. Plus tard : insertion Supabase + notification. */
export function submitLead(lead: Lead, channel: "whatsapp" | "email") {
  const text = formatLead(lead);
  const url = channel === "whatsapp"
    ? whatsappUrl(text)
    : `mailto:${site.email}?subject=${encodeURIComponent(`IRONCAR : ${lead.subject}`)}&body=${encodeURIComponent(text)}`;
  window.open(url, channel === "whatsapp" ? "_blank" : "_self");
}

/* ===== Demande de vente d'un véhicule (rubrique Vendre) ===== */

/**
 * Adresse qui reçoit les demandes de vente (requête POST multipart, photos incluses).
 * Non configurée = aucun envoi en ligne : le formulaire le dit clairement et propose WhatsApp / e-mail.
 * À renseigner dans `.env.local` : NEXT_PUBLIC_SELL_FORM_ENDPOINT=https://…
 * (service de formulaires compatible fichiers, ou plus tard une fonction Supabase).
 */
export const SELL_FORM_ENDPOINT = process.env.NEXT_PUBLIC_SELL_FORM_ENDPOINT ?? "";

export interface SellRequest {
  vehicle: string; year: string; mileage: string; engine: string; transmission: string;
  askingPrice: string; condition: string; name: string; phone: string; comments: string;
}

export const formatSellRequest = (r: SellRequest, photoCount = 0) =>
  [
    "Demande IRONCAR : vente de mon véhicule",
    `Véhicule : ${r.vehicle}`, `Année : ${r.year}`, `Kilométrage : ${r.mileage} km`,
    `Motorisation : ${r.engine}`, `Boîte : ${r.transmission}`,
    r.askingPrice && `Prix souhaité : ${r.askingPrice} €`, `État général : ${r.condition}`,
    `Propriétaire : ${r.name} · ${r.phone}`,
    photoCount ? `Photos : ${photoCount} (jointes séparément)` : "",
    r.comments && `\n${r.comments}`,
  ].filter(Boolean).join("\n");

/** Envoie la demande à l'adresse configurée. Ne renvoie `true` que si le serveur a réellement accepté la demande. */
export async function sendSellRequest(form: FormData): Promise<boolean> {
  if (!SELL_FORM_ENDPOINT) throw new Error("not-configured");
  const res = await fetch(SELL_FORM_ENDPOINT, { method: "POST", body: form, headers: { Accept: "application/json" } });
  return res.ok;
}
