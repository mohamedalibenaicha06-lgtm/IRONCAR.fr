export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200 backdrop-blur ${className}`}>
      <span className="size-1.5 rounded-full bg-amber-300" /> Démo fictive
    </span>
  );
}
