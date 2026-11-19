"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { MediaSlot } from "./MediaSlot";

export function VehicleGallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);
  const swipe = {
    onTouchStart: (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  });

  const Arrows = ({ dark = false }) => (
    <>
      {[-1, 1].map((d) => (
        <button key={d} onClick={(e) => { e.stopPropagation(); go(d); }} aria-label={d < 0 ? "Photo précédente" : "Photo suivante"}
          className={`absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full transition-opacity ${d < 0 ? "left-3" : "right-3"} ${dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/60 text-ink opacity-100 shadow-sm hover:bg-coal md:opacity-0 md:group-hover:opacity-100"}`}>
          <Icon name="arrow" className={`size-4 ${d < 0 ? "rotate-180" : ""}`} />
        </button>
      ))}
    </>
  );

  if (images.length === 0) {
    return (
      <div className="aspect-[3/2] overflow-hidden rounded-lg border border-line">
        <MediaSlot slot={{ alt: title }} label={title.split(" ").slice(-1)[0]} priority />
      </div>
    );
  }

  return (
    <div>
      <div className="group relative aspect-[4/5] cursor-zoom-in sm:aspect-[4/3] touch-pan-y overflow-hidden rounded-lg bg-sand" onClick={() => setZoom(true)} {...swipe}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[i]} alt="" aria-hidden className="absolute inset-0 hidden size-full scale-110 object-cover opacity-40 blur-2xl sm:block" />
        {images.map((src, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`${title}, photo ${n + 1} sur ${images.length}`} width={1600} height={1000} decoding="async"
            fetchPriority={n === 0 ? "high" : "low"}
            className={`absolute inset-0 size-full object-cover object-[50%_75%] transition-[opacity,transform] duration-500 sm:object-contain ${n === i ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`} />
        ))}
        {images.length > 1 && <Arrows />}
        {images.length > 1 && <span className="absolute right-3 bottom-3 rounded bg-black/55 px-2 py-0.5 text-xs text-white tabular-nums">{i + 1} / {images.length}</span>}
      </div>
      {images.length > 1 && <div className="mt-2.5 grid grid-cols-4 gap-2.5">
        {images.map((src, n) => (
          <button key={src} onClick={() => setI(n)} aria-label={`Afficher la photo ${n + 1}`} aria-current={n === i}
            className={`aspect-[3/2] overflow-hidden rounded bg-sand transition-opacity ${n === i ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" width={160} height={100} loading="lazy" decoding="async" className="size-full object-cover" />
          </button>
        ))}
      </div>}

      {zoom && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/95 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true" aria-label={title} {...swipe}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[i]} alt={title} className="max-h-[85vh] w-full max-w-6xl object-contain" />
          <button aria-label="Fermer" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-white hover:bg-white/10"><Icon name="close" /></button>
          {images.length > 1 && <Arrows dark />}
        </div>
      )}
    </div>
  );
}
