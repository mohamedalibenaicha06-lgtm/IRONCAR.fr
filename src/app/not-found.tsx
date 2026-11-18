import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-4 pt-32 sm:px-6">
      <p className="kicker">Erreur 404</p>
      <h1 className="display mt-4 text-6xl md:text-8xl">Hors piste</h1>
      <p className="mt-4 text-mute">Cette page ou ce véhicule n&apos;existe pas (ou plus).</p>
      <div className="mt-8"><Button href="/">Retour à l&apos;accueil</Button></div>
    </section>
  );
}
