"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function Logo() {
  return (
    <Link href="/" className="display flex items-center gap-2 text-xl tracking-tight" aria-label="IRONCAR — accueil">
      <span className="grid size-8 place-items-center rounded-md bg-ember text-sm text-black">IC</span>
      <span>IRON<span className="text-ember">CAR</span></span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "py-3" : "py-5"}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6 ${scrolled && !open ? "mx-3 border border-line bg-ink/70 py-2.5 backdrop-blur-xl sm:mx-6 lg:mx-auto" : ""}`}>
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active(n.href) ? "text-ivory" : "text-mute hover:text-ivory"}`}>
                {n.label}
                <span className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-ember transition-transform duration-500 ${active(n.href) ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={whatsappUrl("Bonjour IRONCAR, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-black transition hover:bg-ember-2 sm:inline-flex">
              <Icon name="whatsapp" className="size-4" /> WhatsApp
            </a>
            <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
              className="relative grid size-11 place-items-center rounded-full border border-line lg:hidden">
              <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div className={`fixed inset-0 z-40 flex flex-col overflow-hidden bg-ink transition-[clip-path] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden ${open ? "[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]"}`}>
        <div className="pointer-events-none absolute bottom-0 left-1/2 size-[480px] -translate-x-1/2 translate-y-1/2 rounded-full bg-ember/25 blur-[120px]" />
        <nav className="relative mt-28 flex flex-1 flex-col gap-1 px-6">
          {[{ href: "/", label: "Accueil" }, ...nav].map((n, i) => (
            <Link key={n.href} href={n.href}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              className={`display flex items-baseline gap-4 border-b border-line py-4 text-3xl transition-all duration-700 sm:text-4xl ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${pathname === n.href ? "text-ember" : ""}`}>
              <span className="font-sans text-xs font-normal text-mute">0{i + 1}</span>{n.label}
            </Link>
          ))}
        </nav>
        <div className={`relative grid grid-cols-2 gap-3 p-6 transition-opacity delay-500 duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-full border border-line py-3.5 text-sm"><Icon name="phone" className="size-4" /> Appeler</a>
          <a href={whatsappUrl("Bonjour IRONCAR !")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-black"><Icon name="whatsapp" className="size-4" /> WhatsApp</a>
        </div>
      </div>
    </>
  );
}
