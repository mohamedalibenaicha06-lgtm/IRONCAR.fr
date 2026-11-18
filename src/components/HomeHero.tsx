import { Button } from "./Button";
import { MediaSlot } from "./MediaSlot";
import { media } from "@/lib/site";

const words = ["Achetez.", "Vendez.", "Roulez."];

/** Premier écran : titre mot par mot, véhicule qui entre par la gauche et freine, profondeur au défilement. */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-8 md:pt-36">
        <p className="fade-up eyebrow eyebrow-accent mb-5" style={{ ["--d" as string]: ".05s" }}>Nice · Côte d&apos;Azur</p>
        <h1 className="text-[clamp(3.4rem,15vw,9.5rem)] leading-[0.86] font-extrabold">
          {words.map((w, i) => (
            <span key={w} className="word mr-[0.18em] last:mr-0">
              <span className={i === 2 ? "text-accent" : ""} style={{ ["--d" as string]: `${0.15 + i * 0.14}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <p className="fade-up max-w-lg text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg" style={{ ["--d" as string]: ".6s" }}>
            Achat, vente, location et inspection de véhicules à Nice. Un seul interlocuteur pour trouver, vérifier et obtenir la bonne voiture.
          </p>
          <div className="fade-up flex flex-col gap-2.5 sm:flex-row" style={{ ["--d" as string]: ".72s" }}>
            <Button href="/achat" arrow>Explorer les véhicules</Button>
            <Button href="#services" variant="secondary">Nos services</Button>
          </div>
        </div>
      </div>
      <div className="depth relative mx-auto mt-10 max-w-[1600px] md:mt-14">
        <div className="car-enter aspect-[4/3] w-full sm:aspect-[16/7] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_72%,transparent)]">
          <MediaSlot slot={media.hero} priority label="Ironcar" />
        </div>
      </div>
    </section>
  );
}
