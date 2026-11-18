import type { Metadata } from "next";
import { vehicles } from "@/lib/repositories";
import { PageHero } from "@/components/PageHero";
import { CatalogView } from "@/components/CatalogView";
import { ContactBand } from "@/components/ContactBand";

export const metadata: Metadata = { title: "Location de véhicules", description: "Location de voitures à Nice, à la journée ou à la semaine." };

export default async function LocationPage() {
  const [list, brands] = await Promise.all([vehicles.list({ listingType: "rental" }), vehicles.brands("rental")]);
  return (
    <>
      <PageHero eyebrow="Louer" title="Location de véhicules"
        intro="À la journée ou à la semaine. Indiquez-nous vos dates : nous vous confirmons la disponibilité et les conditions de location." />
      <CatalogView vehicles={list} brands={brands} listingType="rental" />
      <ContactBand title="Une demande particulière ?" text="Location longue durée, plusieurs véhicules, événement : décrivez-nous votre besoin et nous étudions la meilleure solution." />
    </>
  );
}
