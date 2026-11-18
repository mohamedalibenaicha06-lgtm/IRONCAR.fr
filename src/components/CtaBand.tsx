import { whatsappUrl } from "@/lib/site";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function CtaBand({ title = "Un projet automobile ?", text = "Achat, vente, location ou inspection : parlons-en. Réponse rapide, 7j/7 sur WhatsApp." }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <Reveal className="grain relative overflow-hidden rounded-[2rem] bg-ember p-8 text-black md:p-16">
        <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-black/10" />
        <h2 className="display relative max-w-3xl text-4xl md:text-6xl">{title}</h2>
        <p className="relative mt-4 max-w-xl text-black/70">{text}</p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl("Bonjour IRONCAR, j'ai un projet automobile.")} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-ivory transition hover:bg-black/80">
            Écrire sur WhatsApp
          </a>
          <Button href="/contact" variant="ghost" className="!border-black/30 !text-black hover:!bg-black/10">Formulaire de contact</Button>
        </div>
      </Reveal>
    </section>
  );
}
