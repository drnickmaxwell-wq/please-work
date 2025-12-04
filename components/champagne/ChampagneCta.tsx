import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./champagne-cta-variants.module.css";

export type ChampagneCtaVariant =
  | "primaryHero"
  | "secondaryHero"
  | "primarySection"
  | "secondarySection"
  | "primaryClinical";

type ChampagneCtaProps = {
  href: string;
  label: string;
  variant?: ChampagneCtaVariant;
  icon?: ReactNode;
  ariaLabel?: string;
  className?: string;
};

const variantClassName: Record<ChampagneCtaVariant, string> = {
  primaryHero: styles.ctaPrimaryHero,
  secondaryHero: styles.ctaSecondaryHero,
  primarySection: styles.ctaPrimarySection,
  secondarySection: styles.ctaSecondarySection,
  primaryClinical: styles.ctaPrimaryClinical,
};

export default function ChampagneCta({
  href,
  label,
  variant = "primarySection",
  icon,
  ariaLabel,
  className,
}: ChampagneCtaProps) {
  const composedClassName = [styles.cta, variantClassName[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={composedClassName} href={href} aria-label={ariaLabel ?? label}>
      {icon ? <span className={styles.ctaIcon}>{icon}</span> : null}
      <span>{label}</span>
    </Link>
  );
}
