import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { vehicles } from "@/lib/repositories";
import { VehicleDetail } from "@/components/VehicleDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await vehicles.list({ listingType: "rental" })).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await vehicles.getBySlug((await params).slug);
  return v ? { title: `${v.brand} ${v.model} ${v.version}`, description: v.description } : {};
}

export default async function Page({ params }: Props) {
  const v = await vehicles.getBySlug((await params).slug);
  if (!v || v.listingType !== "rental") notFound();
  const related = (await vehicles.list({ listingType: "rental" })).filter((r) => r.id !== v.id).slice(0, 3);
  return <VehicleDetail v={v} related={related} />;
}
