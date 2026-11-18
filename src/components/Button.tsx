import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "whatsapp" | "link";
const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent hover:text-white",
  secondary: "border border-ink/25 bg-black/20 text-ink backdrop-blur hover:border-accent hover:text-white",
  whatsapp: "bg-[#1fa855] text-white hover:bg-[#1a9549]",
  link: "!px-0 !h-auto text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink",
};

export function Button({ href, children, variant = "primary", icon, arrow, className = "", external }: {
  href: string; children: ReactNode; variant?: Variant; icon?: IconName; arrow?: boolean; className?: string; external?: boolean;
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 font-display text-[1.0625rem] font-semibold uppercase tracking-[0.1em] transition-[background-color,color,border-color,transform] duration-200 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles[variant]} ${className}`;
  const inner = (
    <>
      {icon && <Icon name={icon} className="size-[18px]" />}
      <span>{children}</span>
      {arrow && <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  return external ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}
