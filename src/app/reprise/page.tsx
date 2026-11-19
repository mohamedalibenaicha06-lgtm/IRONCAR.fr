import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vendre mon véhicule",
  description: "Vous souhaitez vendre votre voiture à Nice ? Appelez IRONCAR, écrivez-nous sur WhatsApp ou par e-mail.",
};

const contacts: { n: string; icon: IconName; title: string; sub: string; value: string; href: string; external?: boolean }[] = [
  { n: "01", icon: "phone", title: "Appelez-nous", sub: "Un échange direct et rapide", value: site.phone,
    href: `tel:${site.phoneHref}` },
  { n: "02", icon: "whatsapp", title: "Contactez-nous sur WhatsApp", sub: "Présentez votre véhicule en quelques mots", value: "Ouvrir la conversation",
    href: `https://wa.me/${site.whatsapp}`, external: true },
  { n: "03", icon: "mail", title: "Envoyez-nous un e\u2011mail", sub: "Pour toute demande détaillée", value: site.email,
    href: `mailto:${site.email}` },
];

const words = ["Vendez", "votre", "véhicule."];

export default function VendrePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 pt-28 pb-6 sm:px-8 md:pt-40">
        <p className="fade-up eyebrow eyebrow-accent mb-5 flex items-center gap-3"><span className="hx-rule inline-block h-px w-10 bg-accent" />Vendre</p>
        <h1 className="text-[clamp(3.1rem,14vw,7.5rem)] leading-[0.88] font-extrabold" aria-label="Vendez votre véhicule.">
          {words.map((w, i) => (
            <span key={w} aria-hidden className="word mr-[0.2em] last:mr-0">
              <span className={i === 2 ? "text-accent" : ""} style={{ ["--d" as string]: `${0.08 + i * 0.1}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="fade-up mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg" style={{ ["--d" as string]: ".4s" }}>
          Vous souhaitez vendre votre voiture ? Échangeons directement sur votre projet. Un accompagnement simple, humain et sans démarches compliquées.
        </p>
      </div>

      {/* Moyens de contact */}
      <ul className="mx-auto mt-8 max-w-5xl border-t border-line md:mt-14" aria-label="Contacter IRONCAR">
        {contacts.map((c, i) => (
          <li key={c.n} className="fade-up border-b border-line" style={{ ["--d" as string]: `${0.5 + i * 0.09}s` }}>
            <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined}
              className="contact-row group flex min-h-[6.5rem] items-center gap-4 px-5 py-5 sm:gap-6 sm:px-8 md:min-h-[8rem]">
              <span className="hidden w-8 shrink-0 font-display text-sm font-semibold text-mute tabular-nums sm:block">{c.n}</span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent sm:size-12">
                <Icon name={c.icon} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="row-title block font-display text-[1.6rem] leading-[0.95] font-bold uppercase sm:text-[2.1rem] md:text-[2.6rem]">{c.title}</span>
                <span className="mt-1.5 block text-[0.9375rem] text-ink-2">{c.sub}</span>
                <span className="mt-1 flex flex-wrap items-center gap-2 text-sm text-mute">
                  <span className="truncate">{c.value}</span>
                </span>
              </span>
              <span className="row-arrow grid size-11 shrink-0 place-items-center rounded-full border border-line" aria-hidden>
                <Icon name="arrow" className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="fade-up mx-auto max-w-5xl px-5 pt-14 text-center sm:px-8" style={{ ["--d" as string]: ".85s" }}>
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-ink-2 uppercase">IRONCAR — Nice, Côte d&apos;Azur</p>
        <p className="mt-2 text-sm text-mute">Achat · Vente · Inspection · Location</p>
      </div>
    </section>
  );
}
