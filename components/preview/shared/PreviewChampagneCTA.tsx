import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./preview-cta.module.css";

type PreviewChampagneCTAProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  ariaLabel?: string;
};

export default function PreviewChampagneCTA({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: PreviewChampagneCTAProps) {
  const variantClass = variant === "secondary" ? styles.secondary : styles.primary;
  const composedClassName = [styles.ctaBase, variantClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link aria-label={ariaLabel} href={href} className={composedClassName}>
      {children}
    </Link>
  );
}
