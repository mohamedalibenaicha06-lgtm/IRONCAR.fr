"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-baseline gap-2" aria-label="IRONCAR, accueil">
      <span className={`text-[1.125rem] font-bold tracking-[0.14em] ${light ? "text-white" : "text-ink"}`}>IRONCAR</span>
      <span className={`hidden text-xs sm:inline ${light ? "text-white/50" : "text-mute"}`}>Nice</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 8); ticking = false; });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 ${scrolled || open ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-[72px]">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`relative py-2 text-[0.9375rem] transition-colors ${active(n.href) ? "text-ink" : "text-mute hover:text-ink"}`}>
              {n.label}
              {active(n.href) && <span className="absolute inset-x-0 -bottom-[13px] h-0.5 bg-ink" />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={tel} className="hidden text-[0.9375rem] text-ink-2 hover:text-ink xl:inline">{site.phone}</a>
          <Link href="/contact" className="hidden h-10 items-center rounded-md bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-ink-2 sm:inline-flex">
            Nous contacter
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
            className="-mr-2 grid size-11 place-items-center lg:hidden">
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>
    </header>

      {/* Menu mobile (hors du header : backdrop-filter casserait le positionnement fixe) */}
      <div className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t border-line bg-white transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <nav className="flex-1 overflow-y-auto px-5 pt-2" aria-label="Navigation mobile">
          {[{ href: "/", label: "Accueil" }, ...nav].map((n, i) => (
            <Link key={n.href} href={n.href}
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              className={`flex items-center justify-between border-b border-line py-4 text-[1.0625rem] transition-[opacity,transform] duration-300 ${open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"} ${pathname === n.href ? "font-semibold" : ""}`}>
              {n.label}
              <Icon name="arrow" className="size-4 text-mute" />
            </Link>
          ))}
          <div className="mt-6 space-y-1 text-sm text-mute">
            <p>{site.address}</p>
            <p>{site.hours}</p>
          </div>
        </nav>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a href={tel} className="flex h-12 items-center justify-center gap-2 rounded-md border border-ink/15 text-[0.9375rem]"><Icon name="phone" className="size-4" /> Appeler</a>
          <a href={whatsappUrl("Bonjour, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#1fa855] text-[0.9375rem] font-medium text-white"><Icon name="whatsapp" className="size-4" /> WhatsApp</a>
        </div>
      </div>
    </>
  );
}
