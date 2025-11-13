import type { ReactNode } from 'react';

import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';

import styles from './ChampagneTreatmentHeroLuxe.module.css';

export type HeroCTA = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
};

export type ChampagneTreatmentHeroLuxeProps = {
  kicker?: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  ctas?: HeroCTA[];
};

const ChampagneTreatmentHeroLuxe = ({
  kicker,
  title,
  subtitle,
  children,
  ctas = [],
}: ChampagneTreatmentHeroLuxeProps) => {
  return (
    <section className={styles.hero} aria-labelledby="treatment-hero-heading">
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.wave} aria-hidden="true" />
      <div className={styles.shimmer} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.stack}>
            {kicker ? <span className={styles.kicker}>{kicker}</span> : null}

            <div className={styles.titleGroup}>
              <h1 id="treatment-hero-heading" className={styles.title}>
                {title}
              </h1>
              {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
            </div>

            {children ? <div className={styles.body}>{children}</div> : null}

            {ctas.length > 0 ? (
              <div className={styles.ctaGroup}>
                {ctas.map(({ label, href, variant = 'primary', ariaLabel }) => (
                  <LuxeCtaLink
                    key={label}
                    href={href}
                    aria-label={ariaLabel}
                    variant={variant}
                  >
                    {label}
                  </LuxeCtaLink>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampagneTreatmentHeroLuxe;
