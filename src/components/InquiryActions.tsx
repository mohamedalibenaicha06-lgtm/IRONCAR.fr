import type { Vehicle } from "@/types/vehicle";
import { site, whatsappUrl } from "@/lib/site";
import { Button } from "./Button";
import { vehicleTitle } from "./VehicleCard";

export function InquiryActions({ v }: { v: Vehicle }) {
  const label = `${vehicleTitle(v)} ${v.version} (${v.year}), réf. ${v.id}`;
  const intent = v.listingType === "sale" ? "achat" : "location";
  const msg = v.listingType === "sale"
    ? `Bonjour, je suis intéressé(e) par le véhicule ${label}. Est-il toujours disponible ?`
    : `Bonjour, je souhaite louer le véhicule ${label}. Dates souhaitées : `;
  return (
    <div className="grid gap-2.5">
      <Button href={`/contact?sujet=${intent}&vehicule=${encodeURIComponent(label)}`} className="w-full">
        {v.listingType === "sale" ? "Demander des informations" : "Demander une réservation"}
      </Button>
      <Button href={whatsappUrl(msg)} external variant="whatsapp" icon="whatsapp" className="w-full">Contacter sur WhatsApp</Button>
      <Button href={`tel:${site.phone.replace(/\s/g, "")}`} external variant="link" icon="phone" className="mx-auto mt-1">Appeler le {site.phone}</Button>
    </div>
  );
}
