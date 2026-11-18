"use client";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { leadSubjects, submitLead, type LeadSubject } from "@/lib/leads";
import { Icon } from "./Icon";

const field = "h-12 w-full rounded-md border border-line bg-white px-3.5 text-base text-ink outline-none transition-colors placeholder:text-mute/80 hover:border-ink/30 focus:border-ink";
const lbl = "mb-1.5 block text-[0.8125rem] text-mute";

export function LeadForm({ defaultSubject = "autre", vehicle = "", subjects, messagePlaceholder = "", vehicleLabel = "Véhicule concerné" }: {
  defaultSubject?: LeadSubject; vehicle?: string; subjects?: LeadSubject[]; messagePlaceholder?: string; vehicleLabel?: string;
}) {
  const [sent, setSent] = useState(false);
  const keys = subjects ?? (Object.keys(leadSubjects) as LeadSubject[]);


  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const channel = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp";
    const s = String(fd.get("subject")) as LeadSubject;
    submitLead({
      subject: leadSubjects[s] ?? s,
      name: String(fd.get("name")), phone: String(fd.get("phone")),
      email: String(fd.get("email") || "") || undefined,
      vehicle: String(fd.get("vehicle") || "") || undefined,
      message: String(fd.get("message")),
    }, channel);
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-md border border-line bg-white p-5 sm:grid-cols-2 sm:p-8">
      <label className="sm:col-span-2">
        <span className={lbl}>Objet de votre demande</span>
        <select key={defaultSubject} name="subject" defaultValue={defaultSubject} className={field}>
          {keys.map((k) => <option key={k} value={k}>{leadSubjects[k]}</option>)}
        </select>
      </label>
      <label><span className={lbl}>Nom et prénom *</span><input name="name" required autoComplete="name" className={field} /></label>
      <label><span className={lbl}>Téléphone *</span><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={field} /></label>
      <label><span className={lbl}>E-mail</span><input name="email" type="email" autoComplete="email" className={field} /></label>
      <label><span className={lbl}>{vehicleLabel}</span><input key={vehicle} name="vehicle" defaultValue={vehicle} className={field} /></label>
      <label className="sm:col-span-2"><span className={lbl}>Message *</span><textarea name="message" required rows={5} placeholder={messagePlaceholder} className={`${field} h-auto py-3`} /></label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" value="whatsapp" className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-2">
          <Icon name="whatsapp" className="size-4" /> Envoyer via WhatsApp
        </button>
        <button type="submit" value="email" className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-ink/15 px-5 text-[0.9375rem] font-medium transition-colors hover:border-ink/40">
          <Icon name="mail" className="size-4" /> Envoyer par e-mail
        </button>
      </div>
      {sent && <p className="rounded bg-sand px-3 py-2 text-sm text-ink-2 sm:col-span-2" role="status">Votre message est prêt. Il ne reste qu&apos;à confirmer l&apos;envoi dans l&apos;application qui vient de s&apos;ouvrir.</p>}
      <p className="text-xs text-mute sm:col-span-2">Les informations transmises servent uniquement à répondre à votre demande.</p>
    </form>
  );
}

/** Variante préremplie depuis l'URL (?sujet=…&vehicule=…) — à envelopper dans <Suspense>. */
export function LeadFormFromUrl() {
  const params = useSearchParams();
  const s = params.get("sujet");
  return <LeadForm defaultSubject={s && s in leadSubjects ? (s as LeadSubject) : "autre"} vehicle={params.get("vehicule") ?? ""} />;
}
