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

