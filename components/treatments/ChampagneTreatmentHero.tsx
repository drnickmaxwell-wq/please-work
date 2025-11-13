"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./ChampagneTreatmentHero.module.css";

export type TreatmentHeroVariant =
  | "veneers"
  | "implants"
  | "whitening"
  | "spark-aligners"
  | "emergency"
  | "general"
  | "technology";

type MotionSettings = {
  tint: "soft-gold" | "cool-teal" | "pearl" | "aqua" | "ink-dusk";
  waveIntensity: "low" | "medium" | "high";
  particleDensity: "low" | "medium" | "high";
  goldEmphasis: "whisper" | "normal" | "clinical-low";
};

const VARIANT_SETTINGS: Record<TreatmentHeroVariant, MotionSettings> = {
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
    particleDensity: "medium",
    goldEmphasis: "whisper",
  },
  general: {
    tint: "soft-gold",
    waveIntensity: "medium",
    particleDensity: "medium",
    goldEmphasis: "normal",
  },
  technology: {
    tint: "aqua",
    waveIntensity: "medium",
    particleDensity: "medium",
    goldEmphasis: "clinical-low",
  },
};

type Cta = {
  label: string;
  href: string;
};

type ChampagneTreatmentHeroProps = {
  variant: TreatmentHeroVariant;
  eyebrow?: string;
  title: string;
  kicker?: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

const join = (...tokens: Array<string | false | null | undefined>) =>
  tokens.filter(Boolean).join(" ");

export function ChampagneTreatmentHero({
  variant,
  eyebrow,
  title,
  kicker,
  description,
  primaryCta,
  secondaryCta,
}: ChampagneTreatmentHeroProps) {
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

  const settings = VARIANT_SETTINGS[variant];

  return (
    <section
      aria-labelledby={`${variant}-treatment-hero`}
      className={join("champagne-hero", styles.hero)}
      data-variant={variant}
      data-tint={settings.tint}
      data-wave={settings.waveIntensity}
      data-particles={settings.particleDensity}
      data-gold={settings.goldEmphasis}
    >
      <div aria-hidden className="hero-gradient-base" />

      {!reduceMotion && (
        <>
          <div aria-hidden className={join("hero-wave-caustics", styles.motionLayer)}>
            <video autoPlay loop muted playsInline preload="auto">
              <source src="/assets/champagne/motion/wave-caustics.webm" type="video/webm" />
            </video>
          </div>
          <div aria-hidden className={join("hero-glass-shimmer", styles.motionLayer)}>
            <video autoPlay loop muted playsInline preload="auto">
              <source src="/assets/champagne/motion/glass-shimmer.webm" type="video/webm" />
            </video>
          </div>
          <div aria-hidden className={join("hero-particles-drift", styles.motionLayer)}>
            <video autoPlay loop muted playsInline preload="auto">
              <source src="/assets/champagne/motion/particles-drift.webm" type="video/webm" />
            </video>
          </div>
          <div aria-hidden className={join("hero-gold-dust-drift", styles.motionLayer)}>
            <video autoPlay loop muted playsInline preload="auto">
              <source src="/assets/champagne/particles/gold-dust-drift.webm" type="video/webm" />
            </video>
          </div>
        </>
      )}

      <div aria-hidden className="hero-wave-mask" />
      <div aria-hidden className="hero-particles-static" />
      <div aria-hidden className="hero-film-grain" />

      <div className={join("hero-content", styles.content)}>
        <div className={styles.inner}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h1 className={styles.title} id={`${variant}-treatment-hero`}>
            {title}
          </h1>
          {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
          <p className={styles.description}>{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className={styles.ctaGroup}>
              {primaryCta ? (
                <Link href={primaryCta.href} className={styles.primaryCta}>
                  <span>{primaryCta.label}</span>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className={styles.secondaryCta}>
                  <span>{secondaryCta.label}</span>
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const treatmentHeroVariants = VARIANT_SETTINGS;
