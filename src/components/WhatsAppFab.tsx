"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function WhatsAppFab() {
  // Masqué sur les fiches véhicules : la barre d'action mobile prend le relais.
  const path = usePathname();
  const onDetail = /^\/(achat|location)\/[^/]+/.test(path);
  const home = path === "/";
  // Sur l'accueil, le bouton apparaît une fois le premier écran passé, pour ne pas masquer le sélecteur et la fresque.
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (!home) return;
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);
  const hidden = home && !past;
  return (
    <a href={whatsappUrl("Bonjour, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
      tabIndex={hidden ? -1 : undefined} aria-hidden={hidden || undefined}
      className={`fixed right-4 bottom-4 z-30 size-13 place-items-center rounded-full bg-[#1fa855] text-white shadow-lg shadow-black/15 transition-[transform,opacity] duration-300 hover:scale-105 sm:right-6 sm:bottom-6 ${onDetail ? "hidden lg:grid" : path === "/reprise" ? "hidden sm:grid" : "grid"} ${hidden ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"}`}>
      <Icon name="whatsapp" className="size-6" />
    </a>
  );
}
