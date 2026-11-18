import type { Metadata } from "next";
import { vehicles } from "@/lib/repositories";
import { PageHero } from "@/components/PageHero";
import { CatalogView } from "@/components/CatalogView";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "Location" };

export default async function LocationPage() {
  const [list, brands] = await Promise.all([vehicles.list({ listingType: "rental" }), vehicles.brands("rental")]);
  return (
    <>
      <PageHero kicker="Location" title="Rouler la Riviera" intro="Location courte et moyenne durée. Livraison à Nice, à l'aéroport Nice Côte d'Azur ou à votre hôtel." />
      <CatalogView vehicles={list} brands={brands} listingType="rental" />
      <CtaBand title="Un événement, un séjour ?" text="Mariage, tournage, séminaire : nous composons votre flotte sur-mesure." />
    </>
  );
}
