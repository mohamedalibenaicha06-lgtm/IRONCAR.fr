"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function VehicleGallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const Nav = ({ className = "" }) => (
    <div className={`flex gap-2 ${className}`}>
      {[-1, 1].map((d) => (
        <button key={d} onClick={(e) => { e.stopPropagation(); go(d); }} aria-label={d < 0 ? "Photo précédente" : "Photo suivante"}
          className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur transition hover:bg-ember hover:text-black">
          <Icon name="arrow" className={`size-4 ${d < 0 ? "rotate-180" : ""}`} />
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-coal" onClick={() => setZoom(true)}>
        {images.map((src, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`${title} — photo ${n + 1}`}
            className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
        ))}
        <Nav className="absolute right-4 bottom-4" />
        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs backdrop-blur">{i + 1} / {images.length}</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, n) => (
          <button key={src} onClick={() => setI(n)} aria-label={`Voir la photo ${n + 1}`}
            className={`aspect-[16/10] overflow-hidden rounded-xl border-2 transition ${n === i ? "border-ember" : "border-transparent opacity-60 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>

      {zoom && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/95 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[i]} alt={title} className="max-h-[80vh] w-full max-w-6xl rounded-2xl object-contain" />
          <button aria-label="Fermer" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-white/20"><Icon name="close" /></button>
          <Nav className="absolute bottom-6 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}
