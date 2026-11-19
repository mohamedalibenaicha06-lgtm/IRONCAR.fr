"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "../Icon";
import { media } from "@/lib/site";
import { Reveal } from "../Reveal";

const services: { n: number; key: keyof typeof media.services; title: string; tag: string; text: string; points: string[]; href: string; cta: string; icon: IconName; pos: string }[] = [
  { n: 1, key: "achat", title: "Achat", tag: "Trouver la bonne voiture", text: "Des véhicules d'occasion choisis avec soin, présentés avec toutes leurs caractéristiques.", points: ["Annonces détaillées", "Essai sur rendez-vous", "Démarches prises en charge"], href: "/achat", cta: "Voir les véhicules", icon: "key", pos: "50% 78%" },
  { n: 2, key: "vente", title: "Vente", tag: "Vendre sans contrainte", text: "Nous estimons votre véhicule et vous proposons une reprise ou une vente accompagnée.", points: ["Estimation de votre véhicule", "Reprise ou dépôt-vente", "Recherche personnalisée"], href: "/reprise", cta: "Faire estimer", icon: "swap", pos: "50% 74%" },
  { n: 3, key: "inspection", title: "Inspection", tag: "Acheter l'esprit serein", text: "Un contrôle complet du véhicule que vous envisagez d'acheter, avant de vous engager.", points: ["Mécanique et carrosserie", "Essai sur route", "Compte rendu avec photos"], href: "/inspection", cta: "Réserver une inspection", icon: "shield", pos: "78% 76%" },
  { n: 4, key: "location", title: "Location", tag: "Rouler quelques jours", text: "Location à la journée ou à la semaine, pour un séjour ou un besoin ponctuel.", points: ["À la journée ou à la semaine", "Citadine, SUV, cabriolet", "Conditions claires"], href: "/location", cta: "Voir la location", icon: "calendar", pos: "40% 78%" },
];

/** Les 4 services comme 4 rapports : on « passe » d'un service à l'autre, la photo se dévoile comme un volet de garage. */
export function ServiceShifter() {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
      <ol className="relative lg:border-l lg:border-line">
        <span aria-hidden className="shift-bar absolute -left-px hidden w-[3px] bg-accent lg:block" style={{ transform: `translateY(${active * 100}%)`, height: "25%" }} />
        {services.map((x, i) => (
          <Reveal as="li" key={x.n} delay={i * 90}>
            <Link href={x.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
              className={`svc-row group press relative block overflow-hidden rounded-lg border border-line bg-coal lg:rounded-none lg:border-0 lg:border-b lg:bg-transparent lg:py-7 lg:pl-8 ${i === active ? "is-active" : ""}`}>
              {/* Photo (mobile) : volet de garage qui s'ouvre à l'apparition */}
              <div className="garage relative aspect-[16/9] overflow-hidden lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.services[x.key].src} alt={media.services[x.key].alt} loading="lazy" decoding="async" className="size-full object-cover" style={{ objectPosition: x.pos }} />
                <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-0.5 font-display text-xs font-semibold tracking-[0.2em] text-ink uppercase backdrop-blur">Rapport {x.n}</span>
              </div>
              <div className="flex items-center gap-5 p-5 lg:p-0">
                <span className={`gear-num grid size-14 shrink-0 place-items-center rounded-md border font-display text-[2rem] font-extrabold transition-colors duration-200 lg:size-16 ${i === active ? "border-accent bg-accent text-white" : "border-line text-mute"}`}>{x.n}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xs font-semibold tracking-[0.22em] text-accent uppercase">{x.tag}</p>
                  <h3 className={`mt-1 text-[2.6rem] transition-[color,transform] duration-300 lg:text-[3.5rem] ${i === active ? "lg:translate-x-2 lg:text-ink" : "lg:text-ink/45"}`}>{x.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2 lg:hidden">{x.text}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-[background-color,border-color,transform] duration-300 group-hover:border-accent group-hover:bg-accent group-active:scale-90">
                  <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>

      {/* Panneau (ordinateur) : change mécaniquement au passage d'un service */}
      <div className="relative hidden lg:block">
        <div key={s.n} className="shift-panel sticky top-24 overflow-hidden rounded-xl border border-line bg-coal">
          <div className="garage is-open relative aspect-[16/11] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media.services[s.key].src} alt={media.services[s.key].alt} decoding="async" className="shift-img size-full object-cover" style={{ objectPosition: s.pos }} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coal to-transparent" />
            <span className="absolute top-4 left-4 flex items-center gap-2 rounded bg-black/60 px-2.5 py-1 font-display text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur">
              <Icon name={s.icon} className="size-3.5 text-accent" /> Rapport {s.n} / 4
            </span>
          </div>
          <div className="shift-copy p-7">
            <h3 className="text-5xl">{s.title}</h3>
            <p className="mt-2 max-w-md leading-relaxed text-ink-2">{s.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.points.map((p) => <li key={p} className="rounded-full border border-line px-3 py-1 text-sm text-ink-2">{p}</li>)}
            </ul>
            <Link href={s.href} className="draw-border group press relative mt-7 inline-flex h-12 items-center gap-2 rounded-md px-6 font-display text-[1.0625rem] font-semibold tracking-[0.1em] uppercase">
              {s.cta} <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
