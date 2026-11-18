import type { Vehicle } from "@/types/vehicle";
import { site, whatsappUrl } from "@/lib/site";
import { Button } from "./Button";
import { vehicleTitle } from "./VehicleCard";

export function InquiryActions({ v }: { v: Vehicle }) {
  const label = `${vehicleTitle(v)} ${v.version} (${v.year}) — réf. ${v.id}`;
  const intent = v.listingType === "sale" ? "achat" : "location";
  const msg = v.listingType === "sale"
    ? `Bonjour IRONCAR, je suis intéressé(e) par le véhicule ${label}. Est-il toujours disponible ?`
    : `Bonjour IRONCAR, je souhaite louer le véhicule ${label}. Mes dates : `;
  return (
    <div className="grid gap-3">
      <Button href={whatsappUrl(msg)} external variant="whatsapp" icon="whatsapp" className="w-full">
        {v.listingType === "sale" ? "Demander sur WhatsApp" : "Réserver sur WhatsApp"}
      </Button>
      <Button href={`/contact?sujet=${intent}&vehicule=${encodeURIComponent(label)}`} className="w-full">
        Demande de renseignements
      </Button>
      <Button href={`tel:${site.phone.replace(/\s/g, "")}`} external variant="ghost" icon="phone" className="w-full">
        Appeler {site.phone}
      </Button>
    </div>
  );
}
