import Link from 'next/link';
import styles from './champagne-cta.module.css';

export type ChampagneCtaVariant = 'primary' | 'secondary' | 'pair';

export interface ChampagneCtaProps {
  variant: ChampagneCtaVariant;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function ChampagneCTA({
  variant,
  primaryHref = '#',
  primaryLabel = 'Primary action',
  secondaryHref = '#',
  secondaryLabel = 'Secondary action',
}: ChampagneCtaProps) {
  if (variant === 'primary') {
    return (
      <div className={styles.ctaGroup}>
        <Link className={`${styles.button} ${styles.buttonPrimary}`} href={primaryHref}>
          {primaryLabel}
        </Link>
      </div>
    );
  }

  if (variant === 'secondary') {
    return (
      <div className={styles.ctaGroup}>
        <Link className={`${styles.button} ${styles.buttonSecondary}`} href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.ctaGroup}>
      <Link className={`${styles.button} ${styles.buttonPrimary}`} href={primaryHref}>
        {primaryLabel}
      </Link>
      <Link className={`${styles.button} ${styles.buttonSecondary}`} href={secondaryHref}>
        {secondaryLabel}
      </Link>
    </div>
  );
}
