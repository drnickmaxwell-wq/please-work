"use client";

import type { CSSProperties, ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

import PreviewChampagneCTA from "../shared/PreviewChampagneCTA";
import styles from "./home-preview.module.css";

export type ChampagneHeroVariant = "home" | "whitening";

type HeroConfig = {
  gradient: string;
  waveMaskDesktop: string;
  waveMaskMobile?: string;
  waveBackground?: string;
  particleField: string;
  causticsSrc: string;
  shimmerSrc: string;
  particlesDriftSrc: string;
  dustSrc: string;
  causticsOpacity?: number;
  shimmerOpacity?: number;
  particlesDriftOpacity?: number;
  dustOpacity?: number;
  staticParticlesOpacity?: number;
  grainOpacity?: number;
  waveMaskOpacity?: number;
  grainTexture?: string;
  brightnessScale?: number;
  contrastScale?: number;
  vignetteStrength?: number;
};

const HERO_VARIANTS: Record<ChampagneHeroVariant, HeroConfig> = {
  home: {
    gradient: "var(--smh-gradient)",
    waveMaskDesktop: "/assets/champagne/waves/wave-mask-desktop.webp",
    waveMaskMobile: "/assets/champagne/waves/wave-mask-mobile.webp",
    waveBackground: "/assets/champagne/waves/waves-bg-1920.webp",
    particleField: "url('/assets/champagne/particles/home-hero-particles.webp')",
    causticsSrc: "/assets/champagne/motion/wave-caustics.webm",
    shimmerSrc: "/assets/champagne/motion/glass-shimmer.webm",
    particlesDriftSrc: "/assets/champagne/motion/particles-drift.webm",
    dustSrc: "/assets/champagne/particles/gold-dust-drift.webm",
    causticsOpacity: 0.1,
    shimmerOpacity: 0.12,
    particlesDriftOpacity: 0.06,
    dustOpacity: 0.08,
    staticParticlesOpacity: 0.08,
    grainOpacity: 0.07,
    waveMaskOpacity: 0.4,
    grainTexture: "/assets/champagne/textures/home-hero-film-grain.webp",
    brightnessScale: 1,
    contrastScale: 1,
    vignetteStrength: 1,
  },
  whitening: {
    gradient:
      "linear-gradient(135deg, color-mix(in srgb, var(--brand-magenta) 90%, var(--smh-white) 10%) 0%, color-mix(in srgb, var(--brand-teal) 90%, var(--smh-white) 10%) 60%, color-mix(in srgb, var(--brand-gold) 92%, var(--smh-white) 8%) 100%)",
    waveMaskDesktop: "/assets/champagne/waves/wave-mask-desktop.webp",
    waveMaskMobile: "/assets/champagne/waves/wave-mask-mobile.webp",
    waveBackground: "/assets/champagne/waves/waves-bg-2560.webp",
    particleField:
      "url('/brand/waves/wave-dots.svg'), url('/assets/champagne/particles/home-hero-particles.webp')",
    causticsSrc: "/assets/champagne/motion/wave-caustics.webm",
    shimmerSrc: "/assets/champagne/motion/glass-shimmer.webm",
    particlesDriftSrc: "/assets/champagne/motion/particles-drift.webm",
    dustSrc: "/assets/champagne/particles/gold-dust-drift.webm",
    causticsOpacity: 0.16,
    shimmerOpacity: 0.14,
    particlesDriftOpacity: 0.08,
    dustOpacity: 0.06,
    staticParticlesOpacity: 0.1,
    grainOpacity: 0.06,
    waveMaskOpacity: 0.46,
    grainTexture: "/assets/champagne/textures/home-hero-film-grain.webp",
    brightnessScale: 1.08,
    contrastScale: 1.02,
    vignetteStrength: 0.9,
  },
};

type ChampagneHeroFrameProps = {
  variant?: ChampagneHeroVariant;
  title?: string;
  description?: string;
  eyebrow?: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  className?: string;
  titleId?: string;
  ctas?: ReactNode;
};

export function ChampagneHeroFrame({
  variant = "home",
  title = "Your Luxury Smile Awaits",
  description = "Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.",
  eyebrow,
  primaryCtaHref = "/book",
  primaryCtaLabel = "Book a consultation",
  secondaryCtaHref = "/treatments",
  secondaryCtaLabel = "Explore treatments",
  className,
  titleId = "home-hero-title",
  ctas,
}: ChampagneHeroFrameProps) {
  const reduceMotion = usePrefersReducedMotion();
  const config = HERO_VARIANTS[variant];

  const style = {
    "--champagne-hero-gradient": config.gradient,
    "--champagne-hero-wave-desktop": `url('${config.waveMaskDesktop}')`,
    "--champagne-hero-wave-mobile": `url('${config.waveMaskMobile ?? config.waveMaskDesktop}')`,
    "--champagne-hero-wave-bg": config.waveBackground ? `url('${config.waveBackground}')` : undefined,
    "--champagne-hero-particles-static": config.particleField,
    "--champagne-hero-caustics-alpha": config.causticsOpacity,
    "--champagne-hero-shimmer-alpha": config.shimmerOpacity,
    "--champagne-hero-drift-alpha": config.particlesDriftOpacity,
    "--champagne-hero-dust-alpha": config.dustOpacity,
    "--champagne-hero-static-alpha": config.staticParticlesOpacity,
    "--champagne-hero-grain-alpha": config.grainOpacity,
    "--champagne-hero-wave-mask-alpha": config.waveMaskOpacity,
    "--champagne-hero-grain-texture": config.grainTexture
      ? `url('${config.grainTexture}')`
      : undefined,
    "--champagne-hero-brightness": config.brightnessScale,
    "--champagne-hero-contrast": config.contrastScale,
    "--champagne-hero-vignette-strength": config.vignetteStrength,
  } as CSSProperties;

  return (
    <section
      className={`champagne-hero${className ? ` ${className}` : ""}`}
      data-hero-variant={variant}
      aria-labelledby={titleId}
      style={style}
    >
      <div className="hero-gradient-base" />
      <div className="hero-vignette" />
      {!reduceMotion && (
        <>
          <div className="hero-wave-caustics">
            <video autoPlay loop muted playsInline preload="auto">
              <source src={config.causticsSrc} type="video/webm" />
            </video>
          </div>
          <div className="hero-glass-shimmer">
            <video autoPlay loop muted playsInline preload="auto">
              <source src={config.shimmerSrc} type="video/webm" />
            </video>
          </div>
          <div className="hero-particles-drift">
            <video autoPlay loop muted playsInline preload="auto">
              <source src={config.particlesDriftSrc} type="video/webm" />
            </video>
          </div>
          <div className="hero-gold-dust-drift">
            <video autoPlay loop muted playsInline preload="auto">
              <source src={config.dustSrc} type="video/webm" />
            </video>
          </div>
        </>
      )}
      <div className="hero-wave-mask" />
      <div className="hero-particles-static" />
      <div className="hero-film-grain" />
      <div className="hero-content">
        <div className={`hero-content-wrapper ${styles.heroContent}`}>
          {eyebrow ? <span className={styles.smallLabel}>{eyebrow}</span> : null}
          <h1 id={titleId}>{title}</h1>
          <p>{description}</p>
          <div className={styles.heroCtaPlate}>
            <div className={styles.heroCtaRow}>
              {ctas ?? (
                <>
                  <PreviewChampagneCTA href={primaryCtaHref} className={styles.heroCtaPrimary}>
                    {primaryCtaLabel}
                  </PreviewChampagneCTA>
                  <PreviewChampagneCTA
                    href={secondaryCtaHref}
                    variant="secondary"
                    className={styles.heroCtaSecondary}
                  >
                    {secondaryCtaLabel}
                  </PreviewChampagneCTA>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeHero() {
  return <ChampagneHeroFrame />;
}
