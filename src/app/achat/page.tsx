import type { Metadata } from "next";
import { vehicles } from "@/lib/repositories";
import { PageHero } from "@/components/PageHero";
import { CatalogView } from "@/components/CatalogView";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "Achat & Vente" };

export default async function AchatPage() {
  const [list, brands] = await Promise.all([vehicles.list({ listingType: "sale" }), vehicles.brands("sale")]);
  return (
    <>
      <PageHero kicker="Achat & Vente" title="Le catalogue" intro="Véhicules sélectionnés, contrôlés et garantis. Vous vendez ? Nous rachetons ou vendons pour vous." />
      <CatalogView vehicles={list} brands={brands} listingType="sale" />
      <CtaBand title="Vous vendez votre voiture ?" text="Estimation gratuite sous 48 h, rachat immédiat ou dépôt-vente : vous choisissez." />
    </>
  );
}
