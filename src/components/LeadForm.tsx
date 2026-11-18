"use client";
import { useState, type FormEvent } from "react";
import { leadSubjects, submitLead, type LeadSubject } from "@/lib/leads";
import { Icon } from "./Icon";

const field = "h-12 w-full rounded-xl border border-line bg-steel px-4 text-sm text-ivory outline-none transition placeholder:text-mute/60 focus:border-ember";

export function LeadForm({ defaultSubject = "autre", vehicle = "", subjects, messagePlaceholder = "Votre message…", vehicleLabel = "Véhicule concerné" }: {
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
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-line bg-coal p-5 sm:grid-cols-2 sm:p-8">
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-mute">Objet</span>
        <select name="subject" defaultValue={defaultSubject} className={field}>
          {keys.map((k) => <option key={k} value={k}>{leadSubjects[k]}</option>)}
        </select>
      </label>
      <input name="name" required placeholder="Nom et prénom *" autoComplete="name" className={field} />
      <input name="phone" required type="tel" placeholder="Téléphone *" autoComplete="tel" className={field} />
      <input name="email" type="email" placeholder="E-mail" autoComplete="email" className={field} />
      <input name="vehicle" defaultValue={vehicle} placeholder={vehicleLabel} className={field} />
      <textarea name="message" required rows={5} placeholder={messagePlaceholder} className={`${field} h-auto py-3 sm:col-span-2`} />
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" value="whatsapp" className="shine inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black transition active:scale-[.97]">
          <Icon name="whatsapp" className="size-4" /> Envoyer via WhatsApp
        </button>
        <button type="submit" value="email" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm transition hover:bg-white/5">
          <Icon name="mail" className="size-4" /> Envoyer par e-mail
        </button>
      </div>
      {sent && <p className="text-sm text-emerald-400 sm:col-span-2">Merci ! Votre demande a été préparée — finalisez l&apos;envoi dans l&apos;application ouverte.</p>}
      <p className="text-xs text-mute sm:col-span-2">Vos données servent uniquement à traiter votre demande.</p>
    </form>
  );
}
