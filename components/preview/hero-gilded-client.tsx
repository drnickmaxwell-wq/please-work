"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useSearchParams } from "next/navigation";

const SHOW_DEV_HUD = process.env.NODE_ENV !== "production";

const WAVE_BACKGROUND =
  "image-set(url('/assets/champagne/waves/waves-bg-768.webp') 1x, url('/assets/champagne/waves/waves-bg-1600.webp') 2x, url('/assets/champagne/waves/waves-bg-2560.webp') 3x)";
const WAVE_MASK = "url('/brand/waves/wave-mask.svg')";
const FILM_GRAIN =
  "image-set(url('/assets/champagne/textures/home-hero-film-grain.webp') 1x)";
const PARTICLES_POSTER =
  "image-set(url('/assets/champagne/particles/home-hero-particles.webp') 1x)";
const GOLD_DUST_POSTER =
  "image-set(url('/brand-polish/wave-gold-dust.png') 1x)";

function normalizeMotionFlag(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "on" || normalized === "true" || normalized === "1";
}

export default function HeroGildedClientBaseline() {
  const searchParams = useSearchParams();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);

      return () => {
        mediaQuery.removeEventListener("change", updatePreference);
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  const motionRequested = normalizeMotionFlag(searchParams?.get("motion") ?? null);
  const motionEnabled = motionRequested && !prefersReducedMotion;
  const posterActive = !motionEnabled;

  const layerVariables = useMemo(
    () =>
      ({
        "--hero-wave-background": WAVE_BACKGROUND,
        "--hero-wave-mask": WAVE_MASK,
        "--hero-film-grain": FILM_GRAIN,
        "--hero-film-grain-opacity":
          "var(--champagne-grain-alpha, var(--smh-grain-alpha, 0.06))",
        "--hero-particles-poster": PARTICLES_POSTER,
        "--hero-gold-dust-poster": GOLD_DUST_POSTER,
      }) as CSSProperties,
    [],
  );

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--smh-ink)",
        color: "var(--smh-text)",
      }}
    >
      {SHOW_DEV_HUD ? (
        <aside
          aria-label="Preview status HUD"
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            minWidth: "10rem",
            padding: "0.5rem 0.85rem",
            borderRadius: "0.85rem",
            border: "1px solid color-mix(in oklab, var(--smh-text) 28%, transparent)",
            background: "color-mix(in oklab, var(--smh-ink) 82%, transparent)",
            color: "var(--smh-text)",
            boxShadow:
              "0 18px 42px color-mix(in oklab, var(--smh-ink) 26%, transparent)",
            backdropFilter: "blur(18px) saturate(1.1)",
          }}
        >
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", opacity: 0.72 }}>
            DEV HUD
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            Motion: {motionEnabled ? "on" : "off"}
          </span>
          <span style={{ fontSize: "0.85rem" }}>
            PRM: {prefersReducedMotion ? "respected" : "off"}
          </span>
          <span style={{ fontSize: "0.85rem" }}>
            Poster: {posterActive ? "active" : "standby"}
          </span>
        </aside>
      ) : null}

      <section
        className="champagne-hero champagne-hero--gilded preview-hero-gilded"
        aria-labelledby="hero-gilded-title"
        data-motion={motionEnabled ? "on" : "off"}
        data-prm={prefersReducedMotion ? "true" : undefined}
        style={{
          "--gold-dust-opacity": "0.18",
          "--lux-gold-opacity": "0.16",
          ...layerVariables,
        }}
      >
        <div
          className="hero-gradient-base gradient-base"
          aria-hidden
          style={{ background: "var(--smh-gradient)" }}
        />

        <div
          className="hero-wave-mask parallax-1"
          aria-hidden
          style={{
            backgroundImage: "var(--hero-wave-background)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: "var(--hero-wave-mask)",
            maskImage: "var(--hero-wave-mask)",
            maskSize: "cover",
            maskRepeat: "no-repeat",
            maskPosition: "bottom center",
          }}
        />

        {motionEnabled ? (
          <div className="hero-wave-caustics hero-motion" aria-hidden>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/wave-caustics.webm"
                type="video/webm"
              />
            </video>
          </div>
        ) : null}

        {motionEnabled ? (
          <div className="hero-glass-shimmer hero-motion" aria-hidden>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/glass-shimmer.webm"
                type="video/webm"
              />
            </video>
          </div>
        ) : null}

        {motionEnabled ? (
          <div className="hero-particles-drift hero-motion" aria-hidden>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/particles-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
        ) : null}

        <div
          className="hero-particles-static"
          aria-hidden
          style={{
            backgroundImage: "var(--hero-particles-poster)",
            backgroundSize: "512px 512px",
            backgroundRepeat: "repeat",
            opacity: "var(--champagne-particles-opacity-d, var(--smh-particles-alpha, 0.06))",
          }}
        />

        {motionEnabled ? (
          <div className="hero-gold-dust-drift parallax-2 lux-gold hero-motion" aria-hidden>
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/particles/gold-dust-drift.webm"
                type="video/webm"
              />
            </video>
          </div>
        ) : (
          <div
            className="hero-gold-dust-drift parallax-2 lux-gold"
            aria-hidden
            style={{
              backgroundImage: "var(--hero-gold-dust-poster)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "var(--gold-dust-opacity, 0.18)",
              animation: "none",
            }}
          />
        )}

        <div
          className="hero-film-grain"
          aria-hidden
          style={{
            backgroundImage: "var(--hero-film-grain)",
            backgroundSize: "512px 512px",
            backgroundRepeat: "repeat",
            opacity: "var(--hero-film-grain-opacity)",
          }}
        />

        <div className="hero-content">
          <div className="hero-content-wrapper">
            <h1 id="hero-gilded-title">Gilded Light, Calm Precision</h1>
            <p>
              Preview the Champagne experience in a dedicated sandbox. Refined motion,
              balanced shimmer, and the Manus signature glow.
            </p>
            <div className="hero-cta-group">
              <a href="/contact" className="hero-cta-primary">
                Request a private consult
              </a>
              <a href="/treatments" className="hero-cta-secondary">
                Explore bespoke treatments
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
