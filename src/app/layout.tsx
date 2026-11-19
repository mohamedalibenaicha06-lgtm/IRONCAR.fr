import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", locale: "fr_FR", siteName: "IRONCAR" },
  title: { default: "IRONCAR · Achat, vente, location et inspection automobile à Nice", template: "%s · IRONCAR Nice" },
  description: "Achat, vente, location, reprise et inspection automobile à Nice et sur la Côte d'Azur.",
};
export const viewport: Viewport = { themeColor: "#090909" };

const dealerLd = {
  "@context": "https://schema.org", "@type": "AutoDealer", name: site.name, url: siteUrl, telephone: site.phone, email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Nice", postalCode: "06000", addressCountry: "FR" },
  areaServed: "Alpes-Maritimes",
};

const introScript = `try{var d=document.documentElement,p=location.pathname==="/"&&!sessionStorage.getItem("ic-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.intro=p?"play":"seen";if(p){sessionStorage.setItem("ic-intro","1");setTimeout(function(){d.dataset.intro="seen"},2800)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Introduction : une seule fois par session, uniquement en arrivant sur l'accueil */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
