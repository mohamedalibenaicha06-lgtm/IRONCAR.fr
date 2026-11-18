"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-baseline gap-2" aria-label="IRONCAR, accueil">
      <span className={`logo-mark inline-block text-[1.125rem] font-bold tracking-[0.14em] ${light ? "text-white" : "text-ink"}`}>IRONCAR</span>
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
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  // Sur l'accueil, l'en-tête est transparent tant que l'on n'a pas défilé : le véhicule occupe toute la scène.
  const overlay = pathname === "/" && !scrolled && !open;
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
    <header data-menu-open={open} className={`site-header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${overlay ? "bg-transparent" : "bg-white/95 backdrop-blur"} ${scrolled || open ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-[72px]">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`group relative py-2 text-[0.9375rem] transition-colors ${active(n.href) ? "text-ink" : overlay ? "text-ink-2 hover:text-ink" : "text-mute hover:text-ink"}`}>
              {n.label}
              <span className={`absolute inset-x-0 -bottom-[13px] h-0.5 origin-left bg-ink transition-transform duration-200 ease-[cubic-bezier(.2,.9,.1,1)] ${active(n.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={tel} className="hidden text-[0.9375rem] text-ink-2 transition-colors hover:text-ink xl:inline">{site.phone}</a>
          <Link href="/contact" className="hidden h-10 items-center rounded-md bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-ink-2 sm:inline-flex">
            Nous contacter
          </Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
            className="-mr-2 grid size-11 place-items-center lg:hidden">
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-200 ease-[cubic-bezier(.2,.9,.1,1)] ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-200 ease-[cubic-bezier(.2,.9,.1,1)] ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>
    </header>

      {/* Menu mobile (hors du header : backdrop-filter casserait le positionnement fixe) */}
      <div data-open={open} inert={!open} aria-hidden={!open}
        className="menu-panel fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-hidden border-t border-line bg-white lg:hidden">
        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pt-2" aria-label="Navigation mobile">
          {[{ href: "/", label: "Accueil" }, ...nav].map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ ["--i" as string]: i }}
              className={`menu-item ${i % 2 ? "from-right" : "from-left"} group flex items-center justify-between border-b border-line py-4 text-[1.0625rem] active:bg-sand/60 ${pathname === n.href ? "font-semibold" : ""}`}>
              <span className="transition-transform duration-150 ease-out group-hover:translate-x-1 group-active:translate-x-1.5">{n.label}</span>
              <Icon name="arrow" className="size-4 text-mute transition-transform duration-150 ease-out group-hover:translate-x-1.5 group-hover:text-ink group-active:translate-x-2.5 group-active:text-ink" />
            </Link>
          ))}
          <div className="menu-fade mt-6 space-y-1 text-sm text-mute">
            <p>{site.address}</p>
            <p>{site.hours}</p>
          </div>
        </nav>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/hero/g63-menu.webp" alt="" width={640} height={404} decoding="async" loading="lazy"
          className="menu-car pointer-events-none mx-auto h-[min(22vh,170px)] w-auto shrink-0 object-contain mix-blend-multiply" />
        <div className="menu-fade grid grid-cols-2 gap-3 border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a href={tel} className="flex h-12 items-center justify-center gap-2 rounded-md border border-ink/15 text-[0.9375rem] transition-transform duration-150 active:scale-[.97]"><Icon name="phone" className="size-4" /> Appeler</a>
          <a href={whatsappUrl("Bonjour, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#1fa855] text-[0.9375rem] font-medium text-white transition-transform duration-150 active:scale-[.97]"><Icon name="whatsapp" className="size-4" /> WhatsApp</a>
        </div>
      </div>
    </>
  );
}
