import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "ghost" | "whatsapp";
const styles: Record<Variant, string> = {
  primary: "bg-ember text-black hover:bg-ember-2",
  ghost: "border border-line text-ivory hover:border-ivory/40 hover:bg-white/5",
  whatsapp: "bg-[#25D366] text-black hover:brightness-110",
};

export function Button({ href, children, variant = "primary", icon, className = "", external }: {
  href: string; children: ReactNode; variant?: Variant; icon?: IconName; className?: string; external?: boolean;
}) {
  const cls = `shine group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[.97] ${styles[variant]} ${className}`;
  const inner = (
    <>
      {icon && <Icon name={icon} className="size-4.5" />}
      <span>{children}</span>
      {!icon && <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}
