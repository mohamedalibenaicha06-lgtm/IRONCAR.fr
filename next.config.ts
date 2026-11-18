import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prêt pour Supabase Storage : ajouter le domaine du projet ici.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
