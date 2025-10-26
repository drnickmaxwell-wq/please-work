"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

export interface LuxuryHomeHeroProps {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showParticles?: boolean;
  showGrain?: boolean;
  reducedMotion?: boolean;
}

export default function HeroLuxury({
  title = "Going the Extra Smile",
  subtitle = "Private dental care with calm precision",
  primaryHref = "/book",
  primaryLabel = "Book a consultation",
  secondaryHref = "/treatments",
  secondaryLabel = "Explore treatments",
  showParticles = true,
  showGrain = true,
  reducedMotion,
}: LuxuryHomeHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const isMotionEnabled = reducedMotion !== undefined ? !reducedMotion : !prefersReducedMotion;

  // Parallax effect on mouse move
  useEffect(() => {
    if (!isMotionEnabled || !heroRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1 range
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMotionEnabled]);

  // Calculate parallax transforms (wave ±4px, particles ±3px)
  const waveTransform = isMotionEnabled
    ? `translate3d(${mousePosition.x * 4}px, ${mousePosition.y * 4}px, 0)`
    : "translate3d(0, 0, 0)";

  const particlesTransform = isMotionEnabled
    ? `translate3d(${mousePosition.x * -3}px, ${mousePosition.y * -3}px, 0)`
    : "translate3d(0, 0, 0)";

  const focusRingVars = {
    "--outline-focus-color": "var(--brand-gold)",
    "--wave-transform": waveTransform,
    "--particle-transform": particlesTransform,
    "--hero-grain-strength": showGrain ? "1" : "0",
  } as CSSProperties;

  const sectionClassName = [
    "luxury-home-hero",
    "relative",
    "overflow-hidden",
    "py-24",
    "md:py-28",
    isMotionEnabled ? "" : "motion-reduced",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={heroRef}
      className={sectionClassName}
      aria-labelledby="home-hero-title"
      style={focusRingVars}
    >
      <div className="hero-panel">
        {showParticles && <div className="hero-particles" aria-hidden="true" />}
        <div className="hero-panel-inner">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="hero-veil">
              <div className="hero-content-wrapper">
                <h1 id="home-hero-title" className="hero-title">
                  {title}
                </h1>

                {subtitle && <p className="hero-subtitle">{subtitle}</p>}

                <div className="hero-cta-group">
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
        </div>
      </div>

      <style jsx>{`
        .luxury-home-hero {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          min-height: 68vh;
          color: var(--text-hero);
        }

        .luxury-home-hero::before,
        .luxury-home-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .luxury-home-hero::before {
          z-index: 1;
          inset: -10% -20% -5% -20%;
          background:
            radial-gradient(1200px 600px at 0% 40%, color-mix(in srgb, var(--text-hero) 12%, transparent 88%), transparent 60%),
            linear-gradient(135deg, color-mix(in srgb, var(--text-hero) 10%, transparent 90%), transparent 55%);
          -webkit-mask-image:
            linear-gradient(to bottom, rgb(0 0 0 / 1) 0 40%, transparent 60%),
            linear-gradient(to right, rgb(0 0 0 / 0.9) 0 55%, rgb(0 0 0 / 0.7) 60%, transparent 85%);
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(to bottom, rgb(0 0 0 / 1) 0 40%, transparent 60%),
            linear-gradient(to right, rgb(0 0 0 / 0.9) 0 55%, rgb(0 0 0 / 0.7) 60%, transparent 85%);
          mask-composite: intersect;
          mix-blend-mode: screen;
          transform: var(--wave-transform, translate3d(0, 0, 0));
          transition: transform var(--motion-duration-slow) var(--motion-easing-smooth);
        }

        .luxury-home-hero::after {
          z-index: 2;
          inset: -1px;
          background: repeating-radial-gradient(
            circle at 20% 30%,
            rgb(from var(--text-hero) r g b / var(--grain-opacity)) 0 var(--particles-size),
            transparent var(--particles-size) calc(var(--particles-size) * 2)
          );
          mix-blend-mode: soft-light;
          opacity: calc(var(--grain-opacity) * var(--hero-grain-strength, 1));
        }

        .hero-panel {
          position: relative;
          z-index: 3;
          width: 100%;
          background: var(--gradient-champagne);
          box-shadow: var(--rim-gold-inset), var(--bloom-outer);
          border-radius: clamp(2rem, 6vw, 3rem);
          overflow: hidden;
          display: flex;
        }

        .hero-panel-inner {
          position: relative;
          width: 100%;
          padding: clamp(3rem, 8vw, 5rem) 0;
        }

        .hero-particles {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(var(--particles-size), rgb(from var(--text-hero) r g b / calc(var(--particles-opacity) * 1.4)), transparent 70%) 12% 18% /
              var(--particles-spread) var(--particles-spread),
            radial-gradient(var(--particles-size), rgb(from var(--text-hero) r g b / calc(var(--particles-opacity) * 1.2)), transparent 70%) 48% 42% /
              calc(var(--particles-spread) * 0.9) calc(var(--particles-spread) * 0.9),
            radial-gradient(var(--particles-size), rgb(from var(--text-hero) r g b / calc(var(--particles-opacity) * 1.3)), transparent 70%) 76% 24% /
              calc(var(--particles-spread) * 1.2) calc(var(--particles-spread) * 1.2);
          opacity: var(--particles-opacity);
          mix-blend-mode: overlay;
          filter: blur(0.2px);
          pointer-events: none;
          transform: var(--particle-transform, translate3d(0, 0, 0));
          transition: transform var(--motion-duration-slow) var(--motion-easing-smooth);
          animation: float var(--motion-duration-slow) var(--motion-easing-smooth) alternate infinite;
        }

        .hero-veil {
          position: relative;
          border-radius: clamp(1.5rem, 4vw, 2.5rem);
          padding: clamp(2rem, 5vw, 3rem);
          background: linear-gradient(125deg, var(--veil-darker) 0%, var(--veil-dark) 35%, transparent 70%);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: inset 0 0 0 1px var(--glass-highlight);
        }

        .hero-content-wrapper {
          position: relative;
          max-width: 42rem;
          color: var(--text-hero);
          text-shadow: var(--shadow-hero-text);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.75rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.6;
          margin: 0;
          color: var(--text-hero-muted);
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 11rem;
          min-height: 3rem;
          padding: 0.75rem 2rem;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .hero-cta-primary {
          background: var(--gradient-cta);
          color: var(--paper);
          box-shadow: var(--shadow-glow);
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), var(--shadow-card);
        }

        .hero-cta-primary:focus-visible {
          outline: none;
          box-shadow: var(--outline-focus);
        }

        .hero-cta-secondary {
          background: var(--glass-bg-strong);
          color: var(--paper);
          border: 1px solid var(--glass-border);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
        }

        .hero-cta-secondary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-card-soft);
        }

        .hero-cta-secondary:focus-visible {
          outline: none;
          box-shadow: var(--outline-focus);
        }

        @media (max-width: 640px) {
          .hero-panel {
            border-radius: clamp(1.5rem, 8vw, 2.5rem);
          }

          .hero-panel-inner {
            padding: clamp(2.5rem, 10vw, 4rem) 0;
          }

          .hero-veil {
            padding: clamp(1.5rem, 8vw, 2.5rem);
            background: linear-gradient(135deg, var(--veil-darker) 0%, var(--veil-dark) 45%, transparent 80%);
          }

          .hero-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta,
          .hero-particles,
          .luxury-home-hero::before {
            transition: none !important;
          }

          .hero-particles {
            animation: none !important;
          }
        }

        .luxury-home-hero.motion-reduced::before {
          transition: none;
          transform: translate3d(0, 0, 0);
        }

        .luxury-home-hero.motion-reduced .hero-particles {
          transition: none;
          animation: none;
          transform: translate3d(0, 0, 0);
        }

        @keyframes float {
          from {
            transform: translate3d(0, -2px, 0);
          }

          to {
            transform: translate3d(0, 2px, 0);
          }
        }
      `}</style>
    </section>
  );
}
