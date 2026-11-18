import { site, whatsappUrl } from "@/lib/site";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function ContactBand({ title = "Une question sur un véhicule ou un projet ?", text = "Appelez-nous, écrivez-nous sur WhatsApp ou envoyez une demande en ligne. Nous revenons vers vous pour en discuter." }) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8 md:mt-32">
      <Reveal className="grid gap-8 rounded-md bg-sand p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
        <div>
          <h2 className="text-2xl font-semibold leading-tight md:text-[2rem]">{title}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-mute">{text}</p>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <Button href="/contact" arrow>Envoyer une demande</Button>
          <Button href={whatsappUrl("Bonjour, je souhaite un renseignement.")} external variant="secondary" icon="whatsapp">WhatsApp</Button>
          <Button href={`tel:${site.phone.replace(/\s/g, "")}`} external variant="link" className="sm:col-span-2 md:col-span-1 lg:col-span-2">ou appelez le {site.phone}</Button>
        </div>
      </Reveal>
    </section>
  );
}
