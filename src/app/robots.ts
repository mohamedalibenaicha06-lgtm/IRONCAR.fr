import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Futur espace admin exclu de l'indexation.
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
