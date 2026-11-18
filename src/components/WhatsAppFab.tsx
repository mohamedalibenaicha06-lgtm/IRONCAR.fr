import { whatsappUrl } from "@/lib/site";
import { Icon } from "./Icon";

export function WhatsAppFab() {
  return (
    <a href={whatsappUrl("Bonjour IRONCAR, je souhaite un renseignement.")} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-black shadow-[0_10px_40px_-8px_rgb(37_211_102/.6)] transition-transform hover:scale-110 sm:right-6 sm:bottom-6">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <Icon name="whatsapp" className="relative size-7" />
    </a>
  );
}
