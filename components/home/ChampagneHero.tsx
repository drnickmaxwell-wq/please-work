"use client";

import React from "react";

type ChampagneHeroVariant = "default" | "section";

type ChampagneHeroProps = {
  variant?: ChampagneHeroVariant;
  title?: string;
  eyebrow?: string;
  kicker?: string;
  showCTAs?: boolean;
  compact?: boolean;
  goldMax?: number;
  headingId?: string;
};

const DEFAULT_TITLE = "Your Luxury Smile Awaits";
const DEFAULT_KICKER =
  "Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.";

export default function ChampagneHero({
  variant = "default",
  title = DEFAULT_TITLE,
  eyebrow,
  kicker = DEFAULT_KICKER,
  showCTAs = true,
  compact = false,
  goldMax,
  headingId,
}: ChampagneHeroProps = {}) {
  const reduceMotion = shouldReduceMotion();
  const classNames = ["champagne-hero"];

  if (variant !== "default") {
    classNames.push(`champagne-hero--${variant}`);
  }

  if (compact) {
    classNames.push("champagne-hero--compact");
  }

  const resolvedHeadingId =
    headingId ?? (variant === "default" ? "home-hero-title" : "champagne-hero-title");

  const goldOpacity =
    typeof goldMax === "number"
      ? Math.min(Math.max(goldMax, 0), 0.12)
      : undefined;

  return (
    <section className={classNames.join(" ")} aria-labelledby={resolvedHeadingId}>
      <HeroLayers reduceMotion={reduceMotion} goldOpacity={goldOpacity} />
      <HeroContent
        headingId={resolvedHeadingId}
        title={title}
        eyebrow={eyebrow}
        kicker={kicker}
        showCTAs={showCTAs}
      />
    </section>
  );
}

type HeroLayersProps = {
  reduceMotion: boolean;
  goldOpacity?: number;
};

function HeroLayers({ reduceMotion, goldOpacity }: HeroLayersProps) {
  return (
    <>
      <div className="hero-gradient-base" data-layer="gradient" />
      {!reduceMotion && (
        <>
          <div className="hero-wave-caustics" data-layer="wave-caustics">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/wave-caustics.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div className="hero-glass-shimmer" data-layer="glass-shimmer">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/glass-shimmer.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div className="hero-particles-drift" data-layer="particles-drift">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/particles-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div
            className="hero-gold-dust-drift"
            data-layer="gold-dust"
            style={
              goldOpacity !== undefined ? { opacity: goldOpacity } : undefined
            }
          >
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/particles/gold-dust-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
        </>
      )}
      <div className="hero-wave-mask" data-layer="wave-mask" />
      <div className="hero-particles-static" data-layer="particles-static" />
      <div className="hero-film-grain" data-layer="film-grain" />
    </>
  );
}

type HeroContentProps = {
  headingId: string;
  title: string;
  eyebrow?: string;
  kicker?: string;
  showCTAs: boolean;
};

function HeroContent({
  headingId,
  title,
  eyebrow,
  kicker,
  showCTAs,
}: HeroContentProps) {
  return (
    <div className="hero-content">
      <div className="hero-content-wrapper">
        {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
        <h1 id={headingId} className="hero-title">
          {title}
        </h1>
        {kicker ? <p className="hero-subtitle">{kicker}</p> : null}
        {showCTAs ? (
          <div className="hero-cta-group">
            <a href="/contact" className="hero-cta-primary">
              Book a consultation
            </a>
            <a href="/treatments" className="hero-cta-secondary">
              Explore treatments
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function shouldReduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
