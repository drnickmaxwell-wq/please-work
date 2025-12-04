import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./champagne-cta.module.css";

type ChampagneCTAVariant = "primary" | "secondary";

type ChampagneCTAProps = {
  href: string;
  children: ReactNode;
  variant?: ChampagneCTAVariant;
  className?: string;
};

export default function ChampagneCTA({
  href,
  children,
  variant = "primary",
  className,
}: ChampagneCTAProps) {
  const variantClass = variant === "secondary" ? styles.secondary : styles.primary;

  return (
    <Link className={[styles.cta, variantClass, className].filter(Boolean).join(" ")} href={href}>
      {children}
    </Link>
  );
}
