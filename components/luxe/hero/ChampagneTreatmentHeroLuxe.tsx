"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/styles/champagne/luxe/champagne-treatment-hero.module.css";

export type ChampagneTreatmentHeroTone =
  | "veneers"
  | "implants"
  | "whitening"
  | "spark"
  | "general";

type Cta = {
  label: string;
  href: string;
};

type ToneCopy = {
  badgeLabel: string;
  eyebrowFallback: string;
};

const TONE_COPY: Record<ChampagneTreatmentHeroTone, ToneCopy> = {
  veneers: {
    badgeLabel: "Porcelain veneers",
    eyebrowFallback: "Porcelain veneers",
  },
  implants: {
    badgeLabel: "Digital implants",
    eyebrowFallback: "Dental implants",
  },
  whitening: {
    badgeLabel: "Champagne whitening",
    eyebrowFallback: "Professional whitening",
  },
  spark: {
    badgeLabel: "Spark aligners",
    eyebrowFallback: "Spark aligners",
  },
  general: {
    badgeLabel: "Champagne treatments",
    eyebrowFallback: "Champagne treatments",
  },
};

type ChampagneTreatmentHeroLuxeProps = {
  tone: ChampagneTreatmentHeroTone;
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

const join = (...tokens: Array<string | false | null | undefined>) =>
  tokens.filter(Boolean).join(" ");

export function ChampagneTreatmentHeroLuxe({
  tone,
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: ChampagneTreatmentHeroLuxeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  const toneCopy = TONE_COPY[tone];

  return (
    <section
      aria-labelledby={`${tone}-treatment-hero`}
      className={styles.hero}
      data-tone={tone}
    >
      <div aria-hidden className={styles.waveOverlay} />
      <div aria-hidden className={styles.shimmerOverlay} />
      <div aria-hidden className={styles.staticParticles} />
      <div aria-hidden className={styles.grainOverlay} />

      {!reduceMotion && (
        <>
          <div aria-hidden className={styles.motionLayer}>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/wave-caustics.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div aria-hidden className={styles.motionLayer}>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/glass-shimmer.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div aria-hidden className={styles.motionLayer}>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/particles-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div aria-hidden className={styles.motionLayer}>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/particles/gold-dust-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
        </>
      )}

      <div className={styles.content}>
        <div className={styles.glassBand}>
          <div className={styles.meta}>
            <span className={styles.badge}>{toneCopy.badgeLabel}</span>
            <span className={styles.eyebrow}>{eyebrow ?? toneCopy.eyebrowFallback}</span>
          </div>
          <h1 className={styles.title} id={`${tone}-treatment-hero`}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.ctaGroup}>
            <Link className={join(styles.ctaPrimary)} href={primaryCta.href}>
              <span>{primaryCta.label}</span>
            </Link>
            {secondaryCta ? (
              <Link className={join(styles.ctaSecondary)} href={secondaryCta.href}>
                <span>{secondaryCta.label}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const champagneTreatmentHeroLuxeCopy = TONE_COPY;
