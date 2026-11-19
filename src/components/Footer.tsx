import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-coal text-ink-2 md:mt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Achat, vente, location et inspection de véhicules à Nice et dans les Alpes-Maritimes.</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white">Services</p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-white/45 sm:px-8">
          © {new Date().getFullYear()} {site.name}. Version de démonstration : les annonces affichées sont fictives.
        </p>
      </div>
    </footer>
  );
}
