"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface HeroLuxuryProps {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function HeroLuxury({
  title = "Going the Extra Smile",
  subtitle = "Private dental care with calm precision and modern technology",
  primaryHref = "/book",
  primaryLabel = "Book a consultation",
  secondaryHref = "/treatments",
  secondaryLabel = "Explore treatments",
}: HeroLuxuryProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const parallaxWave = prefersReducedMotion
    ? {}
    : {
        transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)`,
      };

  const parallaxParticles = prefersReducedMotion
    ? {}
    : {
        transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
      };

  return (
    <section ref={heroRef} className="hero-luxury" aria-labelledby="hero-title">
      {/* Layer 1: Gradient Base */}
      <div className="hero-gradient" aria-hidden="true" />

      {/* Layer 2: Wave Mask (CSS-only) */}
      <div className="hero-wave" style={parallaxWave} aria-hidden="true" />

      {/* Layer 3: Particles (CSS-only) */}
      <div className="hero-particles" style={parallaxParticles} aria-hidden="true" />

      {/* Layer 4: Film Grain (CSS-only) */}
      <div className="hero-grain" aria-hidden="true" />

      {/* Layer 5: Content */}
      <div className="hero-content">
        <div className="hero-pane">
          <div className="ink-veil" aria-hidden="true" />
          <div className="hero-copy">
            <h1 id="hero-title">{title}</h1>
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}

            <div className="hero-ctas" role="group" aria-label="Primary actions">
              <Link href={primaryHref} className="hero-cta hero-cta-primary">
                {primaryLabel}
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link href={secondaryHref} className="hero-cta hero-cta-secondary">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-luxury {
          position: relative;
          width: 100%;
          min-height: clamp(78vh, 86vh, 960px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(80px, 12vh, 128px) clamp(20px, 5vw, 60px);
          overflow: hidden;
          isolation: isolate;
        }

        /* Layer 1: Gradient Base */
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: var(--smh-gradient);
          z-index: 1;
        }

        /* Layer 2: Wave Mask (CSS diagonal waves) */
        .hero-wave {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(11, 19, 32, 0.18) 40px,
            rgba(11, 19, 32, 0.18) 80px,
            transparent 80px,
            transparent 120px,
            rgba(11, 19, 32, 0.12) 120px,
            rgba(11, 19, 32, 0.12) 160px
          );
          mix-blend-mode: overlay;
          opacity: 0.6;
          transition: transform var(--motion-normal) var(--motion-easing);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-wave {
            transform: none !important;
            transition: none !important;
          }
        }

        /* Layer 3: Particles (CSS radial-gradient dots) */
        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: radial-gradient(
              circle at 20% 30%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(212, 175, 55, 0.24) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 40% 70%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 90% 60%,
              rgba(212, 175, 55, 0.24) 2px,
              transparent 2px
            ),
            radial-gradient(
              circle at 15% 80%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 60% 40%,
              rgba(212, 175, 55, 0.24) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 30% 50%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 70% 85%,
              rgba(212, 175, 55, 0.24) 2px,
              transparent 2px
            );
          background-size: 100% 100%;
          background-position: 0 0;
          mix-blend-mode: screen;
          pointer-events: none;
          transition: transform var(--motion-normal) var(--motion-easing);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particles {
            transform: none !important;
            transition: none !important;
          }
        }

        /* Layer 4: Film Grain (CSS noise pattern) */
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          opacity: var(--grain-opacity);
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* Layer 5: Content */
        .hero-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: min(1200px, 92vw);
          margin-inline: auto;
          display: flex;
          justify-content: center;
        }

        .hero-pane {
          position: relative;
          background: color-mix(in oklab, #0b1320 42%, transparent);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 22px;
          border: 1px solid rgba(212, 175, 55, 0.28);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.18),
            0 24px 60px rgba(0, 0, 0, 0.35);
          padding: clamp(40px, 6vw, 72px);
          width: min(100%, 720px);
        }

        .hero-pane::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            transparent 65%
          );
          mix-blend-mode: soft-light;
          opacity: 0.5;
          pointer-events: none;
        }

        .ink-veil {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(8, 14, 24, 0.32),
            rgba(8, 14, 24, 0)
          );
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          display: grid;
          gap: clamp(20px, 3vw, 32px);
        }

        h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 700;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
          font-family: var(--font-body);
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.6;
          max-width: 60ch;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          min-width: 200px;
          padding: 0.9rem 2.5rem;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: transform var(--motion-normal) var(--motion-easing),
            box-shadow var(--motion-normal) var(--motion-easing);
          cursor: pointer;
        }

        .hero-cta-primary {
          color: #1a1a1a;
          background: var(--cta-gradient);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45);
        }

        .hero-cta-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-accent-gold),
            0 0 0 6px rgba(212, 175, 55, 0.25);
        }

        .hero-cta-secondary {
          color: #ffffff;
          background: rgba(14, 22, 34, 0.42);
          border: 1px solid rgba(212, 175, 55, 0.38);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .hero-cta-secondary:hover {
          transform: translateY(-2px);
          border-color: rgba(212, 175, 55, 0.6);
          background: rgba(14, 22, 34, 0.55);
        }

        .hero-cta-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-accent-gold),
            0 0 0 6px rgba(212, 175, 55, 0.25);
        }

        @media (max-width: 768px) {
          .hero-luxury {
            min-height: 72vh;
            padding: clamp(60px, 10vh, 96px) clamp(16px, 4vw, 32px);
          }

          .hero-pane {
            padding: clamp(28px, 7vw, 48px);
          }

          .hero-cta {
            width: 100%;
            min-width: unset;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta {
            transition: none !important;
          }
          .hero-cta:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

