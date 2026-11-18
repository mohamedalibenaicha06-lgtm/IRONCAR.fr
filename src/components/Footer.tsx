import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-mute">{site.tagline}. Achat, vente, location, reprise et inspection — un interlocuteur unique sur la Côte d&apos;Azur.</p>
        </div>
        <div>
          <p className="kicker mb-4">Navigation</p>
          <ul className="space-y-2 text-sm text-mute">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-ivory">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="kicker mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-mute">
            <li>{site.address}</li>
            <li>{site.phone}</li>
            <li>{site.email}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <p aria-hidden className="display pointer-events-none select-none text-center text-[22vw] leading-[0.75] text-white/[0.03]">IRONCAR</p>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-mute">
        © {new Date().getFullYear()} {site.name} · Site de démonstration — véhicules et coordonnées fictifs.
      </div>
    </footer>
  );
}
