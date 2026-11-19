export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-mute ring-1 ring-line ${className}`}>
      Annonce fictive
    </span>
  );
}

const statusStyle = {
  available: { label: "Disponible", cls: "bg-black/60 text-ink", dot: "bg-emerald-400" },
  reserved: { label: "Réservé", cls: "bg-accent text-white", dot: "bg-white" },
  sold: { label: "Vendu", cls: "bg-ink text-paper", dot: "bg-paper" },
} as const;

export function StatusBadge({ status, className = "" }: { status: keyof typeof statusStyle; className?: string }) {
  const s = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-medium backdrop-blur ${s.cls} ${className}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />{s.label}
    </span>
  );
}
