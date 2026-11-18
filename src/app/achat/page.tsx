import type { Metadata } from "next";
import { vehicles } from "@/lib/repositories";
import { PageHero } from "@/components/PageHero";
import { CatalogView } from "@/components/CatalogView";
import { ContactBand } from "@/components/ContactBand";

export const metadata: Metadata = { title: "Véhicules à vendre", description: "Véhicules d'occasion à vendre à Nice." };

export default async function AchatPage() {
  const [list, brands] = await Promise.all([vehicles.list({ listingType: "sale" }), vehicles.brands("sale")]);
  return (
    <>
      <PageHero eyebrow="Acheter" title="Véhicules à vendre"
        intro="Retrouvez nos véhicules disponibles. Pour toute question ou pour organiser un essai, contactez-nous directement depuis la fiche." />
      <CatalogView vehicles={list} brands={brands} listingType="sale" />
      <ContactBand title="Vous ne trouvez pas le bon modèle ?" text="Indiquez-nous le véhicule recherché, votre budget et vos critères. Nous lançons la recherche pour vous." />
    </>
  );
}
