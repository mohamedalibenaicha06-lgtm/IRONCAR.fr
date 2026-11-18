import { Reveal } from "./Reveal";

export function SectionHeading({ kicker, title, intro, align = "left" }: {
  kicker: string; title: string; intro?: string; align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-10 md:mb-14 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className="kicker mb-4">{kicker}</p>
      <h2 className="display text-4xl sm:text-5xl md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-base text-mute md:text-lg">{intro}</p>}
    </Reveal>
  );
}
