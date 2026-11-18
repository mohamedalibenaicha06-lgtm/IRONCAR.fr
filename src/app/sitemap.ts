import type { MetadataRoute } from "next";
import { vehicles } from "@/lib/repositories";
import { nav, siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const list = await vehicles.list();
  return [
    { url: siteUrl, priority: 1 },
    ...nav.map((n) => ({ url: siteUrl + n.href, priority: 0.8 })),
    ...list.map((v) => ({ url: `${siteUrl}/${v.listingType === "sale" ? "achat" : "location"}/${v.slug}`, lastModified: v.createdAt, priority: 0.6 })),
  ];
}
