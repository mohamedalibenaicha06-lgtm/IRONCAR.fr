import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/Icon";
import { leadSubjects, type LeadSubject } from "@/lib/leads";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

type Props = { searchParams: Promise<{ sujet?: string; vehicule?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { sujet, vehicule } = await searchParams;
  const subject = (sujet && sujet in leadSubjects ? sujet : "autre") as LeadSubject;
  const cards: [IconName, string, string, string?][] = [
    ["whatsapp", "WhatsApp", "Réponse rapide 7j/7", whatsappUrl("Bonjour IRONCAR !")],
    ["phone", "Téléphone", site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
    ["mail", "E-mail", site.email, `mailto:${site.email}`],
    ["pin", "Showroom", site.address],
  ];
  return (
    <>
      <PageHero kicker="Contact" title="Parlons auto" intro={`${site.hours} · Sur rendez-vous à ${site.city}.`} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="grid content-start gap-3">
          {cards.map(([icon, t, d, href], i) => {
            const inner = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ember/10 text-ember"><Icon name={icon} className="size-5" /></span>
                <span><span className="block text-xs uppercase tracking-widest text-mute">{t}</span><span className="mt-0.5 block">{d}</span></span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-2xl border border-line bg-coal p-5 transition hover:border-ember/50";
            return (
              <Reveal key={t} delay={i * 70}>
                {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={120}><LeadForm defaultSubject={subject} vehicle={vehicule ?? ""} /></Reveal>
      </section>
    </>
  );
}
