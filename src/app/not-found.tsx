import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-5 pt-32 sm:px-8">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Cette page est introuvable</h1>
      <p className="mt-3 text-mute">Le véhicule a peut-être été vendu, ou le lien n&apos;est plus valide.</p>
      <div className="mt-8 flex flex-col gap-2.5 sm:flex-row"><Button href="/achat" arrow>Voir les véhicules</Button><Button href="/" variant="secondary">Accueil</Button></div>
    </section>
  );
}
