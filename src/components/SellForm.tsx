"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { formatSellRequest, SELL_FORM_ENDPOINT, sendSellRequest, type SellRequest } from "@/lib/leads";
import { site, whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

const field = "h-14 w-full rounded-lg border border-line bg-paper/60 px-4 text-[17px] text-ink outline-none transition-[border-color,background-color] duration-200 placeholder:text-mute/60 hover:border-ink/30 focus:border-ink focus:bg-paper";
const lbl = "mb-2 block font-display text-[0.8rem] font-semibold tracking-[0.16em] text-mute uppercase";
const MAX_PHOTOS = 10;
const MAX_MB = 10;
const conditions = ["Excellent", "Très bon", "Bon", "Correct", "À prévoir (travaux)"];
const steps = [
  { title: "Votre véhicule", hint: "Les informations principales" },
  { title: "État et photos", hint: "Pour une première estimation" },
  { title: "Vos coordonnées", hint: "Pour vous recontacter" },
];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; text: string } | { kind: "offline"; text: string };

function Choice({ name, value, children }: { name: string; value: string; children: ReactNode }) {
  return (
    <label className="choice press relative cursor-pointer">
      <input type="radio" name={name} value={value} required className="peer sr-only" />
      <span className="flex h-14 items-center justify-center rounded-lg border border-line bg-paper/60 px-3 text-center text-[15px] transition-[border-color,background-color,color] duration-200 peer-checked:border-accent peer-checked:bg-accent/15 peer-checked:font-medium peer-checked:text-white peer-focus-visible:border-ink">
        {children}
      </span>
    </label>
  );
}

/**
 * Demande de vente en 3 étapes. Toutes les étapes restent dans le même <form> (masquées, jamais démontées),
 * donc les saisies sont conservées. N'affiche jamais un succès qui n'a pas eu lieu ; ne publie rien.
 */
export function SellForm() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [recap, setRecap] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);

  useEffect(() => {
    const urls = photos.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [photos]);

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const incoming = [...list].filter((f) => f.type.startsWith("image/"));
    const ok = incoming.filter((f) => f.size <= MAX_MB * 1024 * 1024);
    const tooBig = incoming.length - ok.length;
    setPhotos([...photos, ...ok].slice(0, MAX_PHOTOS));
    setPhotoError(tooBig ? `${tooBig} photo(s) ignorée(s) : ${MAX_MB} Mo maximum par photo.` : photos.length + ok.length > MAX_PHOTOS ? `${MAX_PHOTOS} photos maximum.` : "");
  }

  function read(fd: FormData): SellRequest {
    const g = (k: string) => String(fd.get(k) ?? "").trim();
    return { vehicle: g("vehicle"), year: g("year"), mileage: g("mileage"), engine: g("engine"), transmission: g("transmission"),
      askingPrice: g("askingPrice"), condition: g("condition"), name: g("name"), phone: g("phone"), comments: g("comments") };
  }

  function go(to: number) {
    const current = stepRefs.current[step];
    if (to > step && current) {
      const invalid = [...current.querySelectorAll<HTMLInputElement>("input, select, textarea")].find((el) => !el.checkValidity());
      if (invalid) { invalid.reportValidity(); invalid.focus({ preventScroll: false }); return; }
    }
    if (to === 2 && formRef.current) {
      const r = read(new FormData(formRef.current));
      setRecap(`${r.vehicle} · ${r.year} · ${r.mileage} km · ${r.transmission} · ${r.condition} · ${photos.length} photo${photos.length > 1 ? "s" : ""}`);
    }
    setStep(to);
    requestAnimationFrame(() => {
      const el = stepRefs.current[to];
      if (!el) return;
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.animate([{ opacity: 0, transform: `translateX(${to > step ? 28 : -28}px)` }, { opacity: 1, transform: "none" }],
          { duration: 360, easing: "cubic-bezier(.12,.9,.2,1)" });
      }
      el.querySelector<HTMLElement>("input:not([type=radio]):not([type=file]), textarea")?.focus({ preventScroll: true });
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) { go(step + 1); return; }
    const invalid = [...(stepRefs.current[2]?.querySelectorAll<HTMLInputElement>("input") ?? [])].find((el) => !el.checkValidity());
    if (invalid) { invalid.reportValidity(); return; }
    const fd = new FormData(e.currentTarget);
    fd.delete("photos");
    photos.forEach((p) => fd.append("photos", p, p.name));
    fd.set("_subject", "IRONCAR : demande de vente d'un véhicule");
    if (!SELL_FORM_ENDPOINT) { setStatus({ kind: "offline", text: formatSellRequest(read(fd), photos.length) }); return; }
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
      <div className="fade-up rounded-xl border border-line bg-coal p-7 md:p-10" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-white"><Icon name="check" className="size-7" /></span>
        <h3 className="mt-6 text-4xl">Demande envoyée</h3>
        <p className="mt-2 max-w-md leading-relaxed text-ink-2">Merci. Nous étudions votre véhicule et revenons vers vous par téléphone.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="sell-form scroll-mt-20 overflow-hidden rounded-xl border border-line bg-coal">
      {/* Progression */}
      <div className="border-b border-line px-5 pt-5 pb-4 sm:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-[0.8rem] font-semibold tracking-[0.2em] text-accent uppercase">Étape {step + 1} / 3</p>
          <p className="text-xs text-mute">{steps[step].hint}</p>
        </div>
        <p className="mt-1 font-display text-[1.9rem] leading-none font-bold uppercase">{steps[step].title}</p>
        <ol className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <li key={s.title} className="h-1 overflow-hidden rounded-full bg-line">
              <span className="block h-full origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(.12,.9,.2,1)]" style={{ transform: `scaleX(${i <= step ? 1 : 0})` }} />
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-8">
        {/* Étape 1 */}
        <fieldset ref={(el) => { stepRefs.current[0] = el; }} data-step="0" hidden={step !== 0} className="grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">Votre véhicule</legend>
          <label className="sm:col-span-2"><span className={lbl}>Marque et modèle *</span>
            <input name="vehicle" required placeholder="Ex. : Peugeot 3008" autoComplete="off" autoCapitalize="words" enterKeyHint="next" className={field} /></label>
          <label><span className={lbl}>Année *</span>
            <input name="year" required inputMode="numeric" pattern="(19|20)[0-9]{2}" maxLength={4} placeholder="2019" enterKeyHint="next" className={field} /></label>
          <label><span className={lbl}>Kilométrage *</span>
            <span className="relative block"><input name="mileage" required inputMode="numeric" pattern="[0-9 ]{1,9}" placeholder="85 000" enterKeyHint="next" className={`${field} pr-14`} />
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mute">km</span></span></label>
          <label className="sm:col-span-2"><span className={lbl}>Motorisation *</span>
            <input name="engine" required placeholder="Ex. : 1.5 BlueHDi 130 diesel" enterKeyHint="next" className={field} /></label>
          <div className="sm:col-span-2"><span className={lbl}>Boîte de vitesses *</span>
            <div className="grid grid-cols-2 gap-2.5"><Choice name="transmission" value="Manuelle">Manuelle</Choice><Choice name="transmission" value="Automatique">Automatique</Choice></div></div>
          <label className="sm:col-span-2"><span className={lbl}>Prix souhaité <span className="normal-case tracking-normal">(facultatif)</span></span>
            <span className="relative block"><input name="askingPrice" inputMode="numeric" pattern="[0-9 ]{1,9}" placeholder="18 500" enterKeyHint="next" className={`${field} pr-12`} />
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mute">€</span></span></label>
        </fieldset>

        {/* Étape 2 */}
        <fieldset ref={(el) => { stepRefs.current[1] = el; }} data-step="1" hidden={step !== 1} className="grid gap-6">
          <legend className="sr-only">État et photos</legend>
          <div><span className={lbl}>État général *</span>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {conditions.map((c) => <Choice key={c} name="condition" value={c}>{c}</Choice>)}
            </div></div>
          <div>
            <span className={lbl}>Photos ({photos.length}/{MAX_PHOTOS})</span>
            <label className="group press flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-ink/25 px-4 py-5 transition-colors hover:border-accent focus-within:border-accent">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:-translate-y-0.5"><Icon name="arrow" className="size-5 -rotate-90" /></span>
              <span><span className="block font-medium">Ajouter des photos</span><span className="block text-xs text-mute">Extérieur, intérieur, compteur · {MAX_MB} Mo max.</span></span>
              <input type="file" name="photos" accept="image/*" multiple className="sr-only" onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
            </label>
            {photoError && <p className="mt-2 text-sm text-accent">{photoError}</p>}
            {previews.length > 0 && (
              <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {previews.map((src, i) => (
                  <li key={src} className="pop-in relative aspect-square overflow-hidden rounded-md border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Photo ${i + 1}`} className="size-full object-cover" />
                    <button type="button" onClick={() => setPhotos(photos.filter((_, k) => k !== i))} aria-label={`Retirer la photo ${i + 1}`}
                      className="absolute top-1 right-1 grid size-7 place-items-center rounded-full bg-black/70 text-white"><Icon name="close" className="size-3.5" /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <label><span className={lbl}>Commentaires</span>
            <textarea name="comments" rows={4} placeholder="Entretien, options, défauts connus, disponibilités…" className={`${field} h-auto py-3.5`} /></label>
        </fieldset>

        {/* Étape 3 */}
        <fieldset ref={(el) => { stepRefs.current[2] = el; }} data-step="2" hidden={step !== 2} className="grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">Vos coordonnées</legend>
          {recap && <p className="rounded-lg border border-line bg-paper/60 px-4 py-3 text-sm text-ink-2 sm:col-span-2"><span className="mr-2 font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">Récap</span>{recap}</p>}
          <label><span className={lbl}>Nom et prénom *</span><input name="name" required autoComplete="name" enterKeyHint="next" className={field} /></label>
          <label><span className={lbl}>Téléphone *</span><input name="phone" required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+ .()-]{8,20}" enterKeyHint="done" className={field} /></label>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-2 sm:col-span-2">
            <input type="checkbox" name="consent" required className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]" />
            J&apos;accepte que mes informations soient utilisées par IRONCAR pour étudier ma demande et me recontacter.
          </label>
        </fieldset>

        {/* Navigation */}
        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} data-prev className="press grid size-14 shrink-0 place-items-center rounded-lg border border-line transition-colors hover:border-ink/40" aria-label="Étape précédente">
              <Icon name="arrow" className="size-5 rotate-180" />
            </button>
          )}
          <button type="submit" disabled={status.kind === "sending"} data-next
            className="press group inline-flex h-14 min-w-0 flex-1 items-center justify-center gap-2.5 rounded-lg bg-ink px-4 font-display text-[1.05rem] font-semibold tracking-[0.06em] whitespace-nowrap text-paper uppercase sm:px-6 sm:tracking-[0.1em] transition-colors hover:bg-white disabled:opacity-60">
            {step < 2 ? "Continuer" : status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
            <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-mute">Votre véhicule n&apos;est jamais publié automatiquement : nous vous recontactons d&apos;abord.</p>

        {status.kind === "error" && <p role="alert" className="mt-5 rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-sm">{status.text}</p>}
        {status.kind === "offline" && (
          <div role="alert" className="fade-up mt-5 rounded-lg border border-line bg-sand p-4 text-sm">
            <p className="font-medium text-ink">L&apos;envoi en ligne n&apos;est pas encore activé : votre demande n&apos;a pas été transmise.</p>
            <p className="mt-1 text-ink-2">Envoyez-la en un clic par WhatsApp ou par e-mail. Le message est déjà rédigé, il vous restera à joindre vos photos.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a href={whatsappUrl(status.text)} target="_blank" rel="noopener noreferrer" className="press inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1fa855] font-medium text-white"><Icon name="whatsapp" className="size-4" /> Envoyer par WhatsApp</a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("IRONCAR : vente de mon véhicule")}&body=${encodeURIComponent(status.text)}`} className="press inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ink/25 font-medium"><Icon name="mail" className="size-4" /> Envoyer par e-mail</a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
