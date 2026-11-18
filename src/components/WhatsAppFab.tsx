"use client";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function WhatsAppFab() {
  // Masqué sur les fiches véhicules : la barre d'action mobile prend le relais.
  const onDetail = /^\/(achat|location)\/[^/]+/.test(usePathname());
  return (
    <a href={whatsappUrl("Bonjour, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
      className={`fixed right-4 bottom-4 z-30 size-13 place-items-center rounded-full bg-[#1fa855] text-white shadow-lg shadow-black/15 transition-transform duration-200 hover:scale-105 sm:right-6 sm:bottom-6 ${onDetail ? "hidden lg:grid" : "grid"}`}>
      <Icon name="whatsapp" className="size-6" />
    </a>
  );
}
