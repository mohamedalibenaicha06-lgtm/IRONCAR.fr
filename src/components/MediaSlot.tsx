import type { MediaSlot as Slot } from "@/lib/site";

/**
 * Affiche une vraie photo si `slot.src` est renseigné, sinon un emplacement sobre
 * (studio sombre) qui n'invente aucune image.
 */
export function MediaSlot({ slot, label, className = "", imgClassName = "", priority = false, sizes = "100vw" }: {
  slot: Slot; label?: string; className?: string; imgClassName?: string; priority?: boolean; sizes?: string;
}) {
  if (slot.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={slot.src} alt={slot.alt} sizes={sizes} decoding="async" loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"} className={`size-full object-cover ${className} ${imgClassName}`} />
    );
  }
  return (
    <div role="img" aria-label={`${slot.alt} (photo à venir)`} className={`photo-slot size-full ${className}`}>
      {label && (
        <span aria-hidden className="absolute inset-x-0 top-[38%] -translate-y-1/2 text-center font-display text-[18vw] leading-none font-extrabold text-transparent uppercase select-none [-webkit-text-stroke:1px_rgb(255_255_255/0.13)] sm:text-[9rem]">
          {label}
        </span>
      )}
      <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-0.5 text-[11px] text-mute">Photo à venir</span>
    </div>
  );
}
