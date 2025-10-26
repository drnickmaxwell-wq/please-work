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
  const [isVisible, setIsVisible] = useState(false);
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
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
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

      {/* Layer 2: CSS Wave Masks (3-4 diagonal layers) */}
      <div className="hero-waves" style={parallaxWave} aria-hidden="true">
        <div className="wave-layer wave-1" />
        <div className="wave-layer wave-2" />
        <div className="wave-layer wave-3" />
        <div className="wave-layer wave-4" />
      </div>

      {/* Layer 3: Gold Particles */}
      <div className="hero-particles" style={parallaxParticles} aria-hidden="true" />

      {/* Layer 4: Film Grain */}
      <div className="hero-grain" aria-hidden="true" />

      {/* Layer 5: Content with Frosted Glass Pane */}
      <div className={`hero-content ${isVisible ? "visible" : ""}`}>
        {/* Ink veil behind text for contrast */}
        <div className="ink-veil" aria-hidden="true" />
        
        <div className="glass-pane">
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

        /* Layer 2: CSS Wave Masks (diagonal layers) */
        .hero-waves {
          position: absolute;
          inset: 0;
          z-index: 2;
          transition: transform var(--motion-normal) var(--motion-easing);
        }

        .wave-layer {
          position: absolute;
          inset: 0;
          mix-blend-mode: overlay;
        }

        .wave-1 {
          background: linear-gradient(
            135deg,
            transparent 0%,
            transparent 20%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.08) 60%,
            transparent 80%,
            transparent 100%
          );
          opacity: 0.6;
        }

        .wave-2 {
          background: linear-gradient(
            125deg,
            transparent 0%,
            transparent 30%,
            rgba(0, 0, 0, 0.06) 45%,
            rgba(0, 0, 0, 0.1) 55%,
            rgba(0, 0, 0, 0.06) 65%,
            transparent 85%,
            transparent 100%
          );
          opacity: 0.4;
        }

        .wave-3 {
          background: linear-gradient(
            145deg,
            transparent 0%,
            transparent 25%,
            rgba(255, 255, 255, 0.05) 42%,
            rgba(255, 255, 255, 0.09) 52%,
            rgba(255, 255, 255, 0.05) 62%,
            transparent 78%,
            transparent 100%
          );
          opacity: 0.5;
        }

        .wave-4 {
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 35%,
            rgba(0, 0, 0, 0.04) 48%,
            rgba(0, 0, 0, 0.08) 58%,
            rgba(0, 0, 0, 0.04) 68%,
            transparent 88%,
            transparent 100%
          );
          opacity: 0.3;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-waves {
            transform: none !important;
            transition: none !important;
          }
        }

        /* Layer 3: Gold Particles */
        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: radial-gradient(
              circle at 18% 25%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 12% 45%,
              rgba(212, 175, 55, 0.24) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 22% 65%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 8% 80%,
              rgba(212, 175, 55, 0.24) 2px,
              transparent 2px
            ),
            radial-gradient(
              circle at 85% 20%,
              rgba(212, 175, 55, 0.24) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 92% 55%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 88% 75%,
              rgba(212, 175, 55, 0.24) 2px,
              transparent 2px
            ),
            radial-gradient(
              circle at 78% 90%,
              rgba(212, 175, 55, 0.24) 1px,
              transparent 1px
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

        /* Layer 4: Film Grain */
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

        /* Layer 5: Content Container */
        .hero-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: min(1200px, 92vw);
          margin-inline: auto;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity var(--motion-slow) var(--motion-easing),
            transform var(--motion-slow) var(--motion-easing);
        }

        .hero-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-content {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* Ink Veil (behind text only for contrast) */
        .ink-veil {
          position: absolute;
          inset: -40px;
          background: color-mix(in oklab, #0b1320 42%, transparent);
          filter: blur(6px);
          -webkit-filter: blur(6px);
          border-radius: 24px;
          z-index: -1;
          pointer-events: none;
        }

        /* Frosted Glass Pane */
        .glass-pane {
          position: relative;
          padding: clamp(48px, 6vw, 72px) clamp(32px, 5vw, 64px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          display: grid;
          gap: clamp(24px, 3vw, 36px);
          text-align: center;
          justify-items: center;
        }

        h1 {
          margin: 0;
          color: var(--smh-text);
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 700;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        .hero-subtitle {
          margin: 0;
          color: var(--smh-text-muted);
          font-family: var(--font-body);
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.6;
          max-width: 60ch;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
          justify-content: center;
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
          position: relative;
        }

        /* Primary CTA with gold inner ring focus */
        .hero-cta-primary {
          color: var(--smh-bg);
          background: var(--cta-gradient);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35),
            inset 0 0 0 1px rgba(212, 175, 55, 0.5);
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45),
            inset 0 0 0 1px rgba(212, 175, 55, 0.7);
        }

        .hero-cta-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-bg),
            0 0 0 6px var(--smh-accent-gold),
            inset 0 0 0 2px rgba(212, 175, 55, 0.8);
        }

        /* Secondary CTA with gold keyline */
        .hero-cta-secondary {
          color: var(--smh-text);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid var(--smh-accent-gold);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.3);
        }

        .hero-cta-secondary:hover {
          transform: translateY(-2px);
          border-color: var(--smh-accent-gold);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.5);
        }

        .hero-cta-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-bg),
            0 0 0 6px var(--smh-accent-gold),
            inset 0 0 0 1px rgba(212, 175, 55, 0.6);
        }

        @media (prefers-color-scheme: dark) {
          h1 {
            color: var(--smh-text);
          }
          .hero-subtitle {
            color: var(--smh-text-muted);
          }
          .glass-pane {
            background: rgba(13, 14, 16, 0.4);
            border-color: rgba(255, 255, 255, 0.12);
          }
          .hero-cta-primary {
            color: var(--smh-bg);
          }
          .hero-cta-secondary {
            color: var(--smh-text);
            background: rgba(13, 14, 16, 0.3);
          }
        }

        @media (max-width: 768px) {
          .hero-luxury {
            min-height: 72vh;
            padding: clamp(60px, 10vh, 96px) clamp(16px, 4vw, 32px);
          }

          .glass-pane {
            padding: clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px);
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

