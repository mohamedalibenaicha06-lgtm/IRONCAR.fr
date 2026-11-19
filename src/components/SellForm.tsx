"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatSellRequest, SELL_FORM_ENDPOINT, sendSellRequest, type SellRequest } from "@/lib/leads";
import { site, whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

const field = "h-12 w-full rounded-md border border-line bg-coal px-3.5 text-base text-ink outline-none transition-colors placeholder:text-mute/70 hover:border-ink/30 focus:border-ink";
const lbl = "mb-1.5 block text-[0.8125rem] text-mute";
const MAX_PHOTOS = 10;
const MAX_MB = 10;
const conditions = ["Excellent", "Très bon", "Bon", "Correct", "À prévoir (travaux)"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; text: string } | { kind: "offline"; text: string };

/** Formulaire de demande de vente. N'affiche jamais un succès qui n'a pas eu lieu. Aucune publication dans le catalogue. */
export function SellForm() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const urls = photos.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [photos]);

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const incoming = [...list].filter((f) => f.type.startsWith("image/"));
    const tooBig = incoming.filter((f) => f.size > MAX_MB * 1024 * 1024);
    const ok = incoming.filter((f) => f.size <= MAX_MB * 1024 * 1024);
    const next = [...photos, ...ok].slice(0, MAX_PHOTOS);
    setPhotos(next);
    setPhotoError(tooBig.length ? `${tooBig.length} photo(s) ignorée(s) : ${MAX_MB} Mo maximum par photo.` : photos.length + ok.length > MAX_PHOTOS ? `${MAX_PHOTOS} photos maximum.` : "");
  }

  function read(fd: FormData): SellRequest {
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    return { vehicle: g("vehicle"), year: g("year"), mileage: g("mileage"), engine: g("engine"), transmission: g("transmission"),
      askingPrice: g("askingPrice"), condition: g("condition"), name: g("name"), phone: g("phone"), comments: g("comments") };
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.delete("photos");
    photos.forEach((p) => fd.append("photos", p, p.name));
    fd.set("_subject", "IRONCAR : demande de vente d'un véhicule");
    if (!SELL_FORM_ENDPOINT) {
      setStatus({ kind: "offline", text: formatSellRequest(read(fd), photos.length) });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const ok = await sendSellRequest(fd);
      if (ok) { document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth" }); setStatus({ kind: "sent" }); setPhotos([]); }
      else setStatus({ kind: "error", text: "La demande n'a pas pu être envoyée. Réessayez, ou contactez-nous sur WhatsApp." });
    } catch {
      setStatus({ kind: "error", text: "Connexion impossible. Vérifiez votre réseau, ou contactez-nous sur WhatsApp." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="fade-up rounded-lg border border-line bg-coal p-7 md:p-10" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-white"><Icon name="check" className="size-6" /></span>
        <h3 className="mt-5 text-3xl">Demande envoyée</h3>
        <p className="mt-2 max-w-md leading-relaxed text-ink-2">Merci. Nous étudions les informations de votre véhicule et revenons vers vous par téléphone.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-x-4 gap-y-5 rounded-lg border border-line bg-coal p-5 sm:grid-cols-2 sm:p-8">
      <fieldset className="contents">
        <legend className="mb-1 font-display text-xl font-bold tracking-[0.04em] uppercase sm:col-span-2">Votre véhicule</legend>
        <label className="sm:col-span-2"><span className={lbl}>Marque et modèle *</span>
          <input name="vehicle" required placeholder="Ex. : Peugeot 3008" autoComplete="off" className={field} /></label>
        <label><span className={lbl}>Année *</span>
          <input name="year" required inputMode="numeric" pattern="(19|20)[0-9]{2}" maxLength={4} placeholder="2019" className={field} /></label>
        <label><span className={lbl}>Kilométrage (km) *</span>
          <input name="mileage" required inputMode="numeric" pattern="[0-9 ]{1,9}" placeholder="85 000" className={field} /></label>
        <label><span className={lbl}>Motorisation *</span>
          <input name="engine" required placeholder="Ex. : 1.5 BlueHDi 130 diesel" className={field} /></label>
        <label><span className={lbl}>Boîte de vitesses *</span>
          <select name="transmission" required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>Choisir</option><option>Manuelle</option><option>Automatique</option>
          </select></label>
        <label><span className={lbl}>Prix souhaité (€)</span>
          <input name="askingPrice" inputMode="numeric" pattern="[0-9 ]{1,9}" placeholder="Facultatif" className={field} /></label>
        <label><span className={lbl}>État général *</span>
          <select name="condition" required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>Choisir</option>{conditions.map((c) => <option key={c}>{c}</option>)}
          </select></label>
      </fieldset>

      {/* Photos */}
      <div className="sm:col-span-2">
        <span className={lbl}>Photos du véhicule ({photos.length}/{MAX_PHOTOS})</span>
        <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-ink/25 px-4 py-7 text-center transition-colors hover:border-accent focus-within:border-accent">
          <span className="grid size-11 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent"><Icon name="arrow" className="size-4 -rotate-90" /></span>
          <span className="text-[0.9375rem]">Ajouter des photos</span>
          <span className="text-xs text-mute">Extérieur, intérieur, compteur · {MAX_MB} Mo max. par photo</span>
          <input type="file" name="photos" accept="image/*" multiple className="sr-only" onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
        </label>
        {photoError && <p className="mt-2 text-sm text-accent">{photoError}</p>}
        {previews.length > 0 && (
          <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {previews.map((src, i) => (
              <li key={src} className="fade-up relative aspect-square overflow-hidden rounded-md border border-line" style={{ ["--d" as string]: `${i * 0.04}s` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Photo ${i + 1}`} className="size-full object-cover" />
                <button type="button" onClick={() => setPhotos(photos.filter((_, k) => k !== i))} aria-label={`Retirer la photo ${i + 1}`}
                  className="absolute top-1 right-1 grid size-7 place-items-center rounded-full bg-black/70 text-white"><Icon name="close" className="size-3.5" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <fieldset className="contents">
        <legend className="mt-2 mb-1 font-display text-xl font-bold tracking-[0.04em] uppercase sm:col-span-2">Vos coordonnées</legend>
        <label><span className={lbl}>Nom et prénom *</span><input name="name" required autoComplete="name" className={field} /></label>
        <label><span className={lbl}>Téléphone *</span><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+ .()-]{8,20}" className={field} /></label>
        <label className="sm:col-span-2"><span className={lbl}>Commentaires</span>
          <textarea name="comments" rows={4} placeholder="Entretien, options, défauts connus, disponibilité pour un rendez-vous…" className={`${field} h-auto py-3`} /></label>
        <label className="flex items-start gap-3 text-sm text-ink-2 sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]" />
          J&apos;accepte que mes informations soient utilisées par IRONCAR pour étudier ma demande et me recontacter.
        </label>
      </fieldset>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status.kind === "sending"}
          className="press group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-md bg-ink px-6 font-display text-[1.0625rem] font-semibold tracking-[0.1em] text-paper uppercase transition-colors hover:bg-white disabled:opacity-60 sm:w-auto">
          {status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
        <p className="mt-3 text-xs text-mute">Votre véhicule n&apos;est jamais publié automatiquement : nous vous recontactons d&apos;abord.</p>
      </div>

      {status.kind === "error" && <p role="alert" className="rounded-md border border-accent/50 bg-accent/10 px-4 py-3 text-sm sm:col-span-2">{status.text}</p>}

      {status.kind === "offline" && (
        <div role="alert" className="fade-up rounded-md border border-line bg-sand p-4 text-sm sm:col-span-2">
          <p className="font-medium text-ink">L&apos;envoi en ligne n&apos;est pas encore activé : votre demande n&apos;a pas été transmise.</p>
          <p className="mt-1 text-ink-2">Envoyez-la en un clic par WhatsApp ou par e-mail. Le message est déjà rédigé, il vous restera à joindre vos photos.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a href={whatsappUrl(status.text)} target="_blank" rel="noopener noreferrer" className="press inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1fa855] font-medium text-white"><Icon name="whatsapp" className="size-4" /> Envoyer par WhatsApp</a>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("IRONCAR : vente de mon véhicule")}&body=${encodeURIComponent(status.text)}`} className="press inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink/25 font-medium"><Icon name="mail" className="size-4" /> Envoyer par e-mail</a>
          </div>
        </div>
      )}
    </form>
  );
}
