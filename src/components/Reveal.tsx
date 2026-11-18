"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/** Un seul IntersectionObserver partagé pour tous les éléments. */
let io: IntersectionObserver | null = null;
const getIO = () =>
  (io ??= new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (e.target as HTMLElement).dataset.visible = "true";
      io!.unobserve(e.target);
    }),
    { rootMargin: "0px 0px -6% 0px" },
  ));

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: {
  children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getIO();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
