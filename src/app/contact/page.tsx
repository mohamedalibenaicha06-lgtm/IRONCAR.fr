import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { LeadForm, LeadFormFromUrl } from "@/components/LeadForm";
import { Icon, type IconName } from "@/components/Icon";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const items: [IconName, string, string, string?][] = [
    ["phone", "Téléphone", site.phone, `tel:${site.phoneHref}`],
    ["whatsapp", "WhatsApp", "Écrire un message", whatsappUrl("Bonjour, je souhaite un renseignement.")],
    ["mail", "E-mail", site.email, `mailto:${site.email}`],
    ["pin", "Adresse", `${site.address} · ${site.hours}`],
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Nous contacter"
        intro="Une question sur un véhicule, une estimation ou une location ? Choisissez le moyen qui vous convient le mieux." />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <ul className="border-t border-line">
          {items.map(([icon, t, d, href]) => {
            const inner = (
              <>
                <Icon name={icon} className="mt-0.5 size-5 shrink-0 text-ink-2" />
                <span><span className="block text-[0.8125rem] text-mute">{t}</span><span className="mt-0.5 block font-medium">{d}</span></span>
              </>
            );
            const cls = "flex gap-4 border-b border-line py-5";
            return (
              <li key={t}>
                {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={`${cls} transition-colors hover:text-accent`}>{inner}</a> : <div className={cls}>{inner}</div>}
              </li>
            );
          })}
        </ul>
        <Suspense fallback={<LeadForm />}><LeadFormFromUrl /></Suspense>
      </section>
    </>
  );
}
