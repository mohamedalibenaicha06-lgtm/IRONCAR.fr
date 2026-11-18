import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "whatsapp" | "link";
const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/40",
  whatsapp: "bg-[#1fa855] text-white hover:bg-[#1a9549]",
  link: "!px-0 !h-auto text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink",
};

export function Button({ href, children, variant = "primary", icon, arrow, className = "", external }: {
  href: string; children: ReactNode; variant?: Variant; icon?: IconName; arrow?: boolean; className?: string; external?: boolean;
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles[variant]} ${className}`;
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
