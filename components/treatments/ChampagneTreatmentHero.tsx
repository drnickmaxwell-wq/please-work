"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./ChampagneTreatmentHero.module.css";

export type ChampagneTreatmentHeroTone =
  | "veneers"
  | "implants"
  | "whitening"
  | "spark"
  | "general";

type MotionSettings = {
  tint: "soft-gold" | "cool-teal" | "pearl" | "aqua" | "ink-dusk";
  wave: "low" | "medium" | "high";
  particles: "low" | "medium" | "high";
  gold: "whisper" | "normal" | "clinical-low";
  badgeLabel: string;
  badgeTone: "magenta" | "teal" | "gold" | "neutral";
};

const TONE_SETTINGS: Record<ChampagneTreatmentHeroTone, MotionSettings> = {
  veneers: {
    tint: "soft-gold",
    wave: "medium",
    particles: "medium",
    gold: "normal",
    badgeLabel: "Porcelain veneers",
    badgeTone: "gold",
  },
  implants: {
    tint: "cool-teal",
    wave: "low",
    particles: "low",
    gold: "clinical-low",
    badgeLabel: "Digital implants",
    badgeTone: "teal",
  },
  whitening: {
    tint: "pearl",
    wave: "medium",
    particles: "high",
    gold: "whisper",
    badgeLabel: "Champagne whitening",
    badgeTone: "magenta",
  },
  spark: {
    tint: "aqua",
    wave: "medium",
    particles: "medium",
    gold: "clinical-low",
    badgeLabel: "Spark aligners",
    badgeTone: "teal",
  },
  general: {
    tint: "soft-gold",
    wave: "medium",
    particles: "medium",
    gold: "normal",
    badgeLabel: "Champagne treatments",
    badgeTone: "neutral",
  },
};

type Cta = {
  label: string;
  href: string;
};

type ChampagneTreatmentHeroProps = {
  tone: ChampagneTreatmentHeroTone;
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

const badgeToneClass: Record<MotionSettings["badgeTone"], string> = {
  magenta: styles.badgeMagenta,
  teal: styles.badgeTeal,
  gold: styles.badgeGold,
  neutral: styles.badgeNeutral,
};

const join = (...tokens: Array<string | false | null | undefined>) =>
  tokens.filter(Boolean).join(" ");

export function ChampagneTreatmentHero({
  tone,
  eyebrow,
  title,
  subtitle,
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

  const settings = TONE_SETTINGS[tone];

  return (
    <section
      aria-labelledby={`${tone}-treatment-hero`}
      className={join("champagne-hero", styles.hero)}
      data-tone={tone}
      data-tint={settings.tint}
      data-wave={settings.wave}
      data-particles={settings.particles}
      data-gold={settings.gold}
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
          <div className={styles.meta}>
            {settings.badgeLabel ? (
              <span className={join(styles.badge, badgeToneClass[settings.badgeTone])}>
                {settings.badgeLabel}
              </span>
            ) : null}
            {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          </div>
          <h1 className={styles.title} id={`${tone}-treatment-hero`}>
            {title}
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.ctaGroup}>
            <Link href={primaryCta.href} className={styles.primaryCta}>
              <span>{primaryCta.label}</span>
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className={styles.secondaryCta}>
                <span>{secondaryCta.label}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const champagneTreatmentHeroTones = TONE_SETTINGS;
