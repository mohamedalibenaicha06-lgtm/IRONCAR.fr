export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded bg-white/90 px-2 py-0.5 text-[11px] font-medium text-mute ring-1 ring-line ${className}`}>
      Annonce fictive
    </span>
  );
}
