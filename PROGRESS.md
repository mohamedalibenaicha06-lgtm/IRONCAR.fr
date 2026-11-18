# IRONCAR — Avancement

## ✅ Terminé (v0.1 — données locales de démo)
- Next.js 16 (App Router) + TypeScript + Tailwind 4, polices auto-hébergées (Archivo / Inter)
- Pages : Accueil, Achat & Vente (catalogue + filtres), Location (catalogue + filtres), fiches véhicules (`/achat/[slug]`, `/location/[slug]`, galerie + lightbox), Reprise & Recherche, Inspection, Contact, 404
- Menu animé (plein écran mobile), révélations au scroll, bouton WhatsApp flottant, `prefers-reduced-motion` respecté
- Demandes de renseignements : WhatsApp pré-rempli, appel, formulaire (envoi WhatsApp / e-mail) pré-rempli depuis la fiche
- 9 véhicules **fictifs** (badge « Démo fictive ») + visuels SVG générés (`npm run demo:images`)
- Architecture prête pour Supabase :
  - `src/types/vehicle.ts` — modèle calqué sur la future table `vehicles`
  - `src/lib/repositories/` — interface `VehicleRepository` + implémentation locale ; point d'entrée unique `vehicles`
  - `src/lib/leads.ts` — `submitLead()` à brancher sur une table `leads`
- Build de production OK (`npm run build`), vérifié desktop + mobile

## ✅ v0.3 — Refonte « agence »
- Thème clair et sobre, une seule police (Inter), titres en casse normale, hiérarchie revue
- Effets supprimés (dégradés, néons, marquee, mot rotatif, compteurs, projecteur) ; animations courtes et discrètes
- Textes réécrits sans promesses inventées (statistiques, garanties, tarifs retirés)
- Navigation : Acheter / Vendre / Louer / Inspection / Contact ; menu mobile simple ; barre d'action fixe sur les fiches (mobile)
- Fiches : tableau de caractéristiques, galerie avec glissement tactile ; formulaires avec libellés
- Visuels de démo neutres « photo à venir » ; SEO : sitemap, robots, JSON-LD ; page contact statique

## ⏳ À faire
- [ ] **Vraies photos des véhicules** (non téléchargeables depuis l'environnement de travail)
- [ ] Remplacer coordonnées/adresse/WhatsApp fictifs (`src/lib/site.ts`)
- [ ] Supabase : tables `vehicles`, `leads`, Storage photos, `supabaseVehicleRepository`
- [ ] Authentification + espace admin privé (CRUD véhicules, upload photos)
- [ ] Revalidation (ISR / `revalidatePath`) après modification admin
- [ ] Vraies photos, logo définitif, mentions légales / RGPD
- [ ] SEO : sitemap, Open Graph, données structurées `Vehicle`
- [ ] Déploiement
