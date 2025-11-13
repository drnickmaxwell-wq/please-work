import Link from "next/link";
import { ReactNode } from "react";

import styles from "./ChampagneTreatmentHero.module.css";

export type TreatmentVariantKey =
  | "veneers"
  | "implants"
  | "whitening"
  | "spark-aligners"
  | "emergency"
  | "general"
  | "technology";

type TreatmentVariant = {
  tint: "soft-gold" | "cool-teal" | "pearl" | "aqua" | "ink-dusk";
  waveIntensity: "low" | "medium" | "high";
  particleDensity: "low" | "medium" | "high";
  goldEmphasis: "whisper" | "normal" | "clinical-low";
};

export const TREATMENT_VARIANTS: Record<TreatmentVariantKey, TreatmentVariant> = {
  veneers: {
    tint: "soft-gold",
    waveIntensity: "medium",
    particleDensity: "medium",
    goldEmphasis: "normal",
  },
  implants: {
    tint: "cool-teal",
    waveIntensity: "low",
    particleDensity: "low",
    goldEmphasis: "clinical-low",
  },
  whitening: {
    tint: "pearl",
    waveIntensity: "medium",
    particleDensity: "high",
    goldEmphasis: "whisper",
  },
  "spark-aligners": {
    tint: "aqua",
    waveIntensity: "medium",
    particleDensity: "medium",
    goldEmphasis: "clinical-low",
  },
  emergency: {
    tint: "ink-dusk",
    waveIntensity: "high",
    particleDensity: "high",
    goldEmphasis: "whisper",
  },
  general: {
    tint: "soft-gold",
    waveIntensity: "low",
    particleDensity: "medium",
    goldEmphasis: "normal",
  },
  technology: {
    tint: "aqua",
    waveIntensity: "medium",
    particleDensity: "high",
    goldEmphasis: "clinical-low",
  },
};

type Cta = {
  label: string;
  href: string;
};

type ChampagneTreatmentHeroProps = {
  treatmentKey: TreatmentVariantKey;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  schemaRoute?: string;
  footnote?: ReactNode;
};

export function ChampagneTreatmentHero({
  treatmentKey,
  title,
  subtitle,
  eyebrow,
  primaryCta,
  secondaryCta,
  schemaRoute,
  footnote,
}: ChampagneTreatmentHeroProps) {
  const variant = TREATMENT_VARIANTS[treatmentKey];

  return (
    <section
      aria-labelledby={`${treatmentKey}-hero-title`}
      className={`champagne-hero ${styles.heroRoot}`}
      data-gold={variant.goldEmphasis}
      data-particles={variant.particleDensity}
      data-schema-route={schemaRoute}
      data-tint={variant.tint}
      data-variant={treatmentKey}
      data-wave={variant.waveIntensity}
    >
      <div aria-hidden className="hero-gradient-base" />
      <div aria-hidden className={`hero-wave-caustics ${styles.motionLayer}`}>
        <video autoPlay loop muted playsInline preload="auto">
          <source src="/assets/champagne/motion/wave-caustics.webm" type="video/webm" />
        </video>
      </div>
      <div aria-hidden className={`hero-glass-shimmer ${styles.motionLayer}`}>
        <video autoPlay loop muted playsInline preload="auto">
          <source src="/assets/champagne/motion/glass-shimmer.webm" type="video/webm" />
        </video>
      </div>
      <div aria-hidden className={`hero-particles-drift ${styles.motionLayer}`}>
        <video autoPlay loop muted playsInline preload="auto">
          <source src="/assets/champagne/motion/particles-drift.webm" type="video/webm" />
        </video>
      </div>
      <div aria-hidden className={`hero-gold-dust-drift ${styles.motionLayer}`}>
        <video autoPlay loop muted playsInline preload="auto">
          <source src="/assets/champagne/particles/gold-dust-drift.webm" type="video/webm" />
        </video>
      </div>
      <div aria-hidden className="hero-wave-mask" />
      <div aria-hidden className="hero-particles-static" />
      <div aria-hidden className="hero-film-grain" />
      <div className={`hero-content ${styles.content}`}>
        <div className={styles.contentInner}>
          {eyebrow ? (
            <span className={styles.eyebrow}>{eyebrow}</span>
          ) : null}
          <h1 className={styles.title} id={`${treatmentKey}-hero-title`}>
            {title}
          </h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          {footnote ? <div className={styles.footnote}>{footnote}</div> : null}
          {primaryCta || secondaryCta ? (
            <div className={styles.ctaGroup}>
              {primaryCta ? (
                <Link className={styles.primaryCta} href={primaryCta.href}>
                  <span>{primaryCta.label}</span>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link className={styles.secondaryCta} href={secondaryCta.href}>
                  <span>{secondaryCta.label}</span>
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
