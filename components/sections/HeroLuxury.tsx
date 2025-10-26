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
    ? `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`
    : "translate(0, 0)";

  const particlesTransform = isMotionEnabled
    ? `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`
    : "translate(0, 0)";

  const motionTransition = isMotionEnabled
    ? `transform var(--motion-duration-slow) var(--motion-easing-smooth)`
    : "none";

  const focusRingVars = {
    "--outline-focus-color": "var(--brand-gold)",
  } as CSSProperties;

  return (
    <section
      ref={heroRef}
      className="luxury-home-hero relative overflow-hidden py-24 md:py-28"
      aria-labelledby="home-hero-title"
      style={focusRingVars}
    >
      <div className="hero-layer hero-gradient-base" aria-hidden />
      <div
        className="hero-layer hero-wave-mask"
        style={{ transform: waveTransform, transition: motionTransition }}
        aria-hidden
      />
      {showParticles && (
        <div
          className="hero-layer hero-particles"
          style={{ transform: particlesTransform, transition: motionTransition }}
          aria-hidden
        />
      )}
      {showGrain && <div className="hero-layer hero-film-grain" aria-hidden />}
      <div className="absolute inset-0 pointer-events-none z-20" style={{ background: "var(--hero-veil)" }} aria-hidden />
      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
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

      <style jsx>{`
        .luxury-home-hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 68vh;
        }

        .hero-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .hero-gradient-base {
          background: var(--gradient-champagne);
          z-index: 10;
        }

        .hero-wave-mask {
          background-image: url('/assets/manus/waves/home-hero-mask-desktop.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          mix-blend-mode: overlay;
          opacity: 0.4;
        }

        @media (max-width: 768px) {
          .hero-wave-mask {
            background-image: url('/assets/manus/waves/home-hero-mask-mobile.webp');
          }
        }

        .hero-particles {
          background-image: url('/assets/manus/particles/home-hero-particles.webp');
          background-size: 1024px 1024px;
          background-repeat: repeat;
          mix-blend-mode: screen;
          opacity: 0.08;
        }

        .hero-film-grain {
          background-image: url('/assets/manus/textures/home-hero-film-grain.webp');
          background-size: 512px 512px;
          background-repeat: repeat;
          mix-blend-mode: overlay;
          opacity: 0.07;
        }

        .hero-content-wrapper {
          position: relative;
          max-width: 42rem;
          color: var(--paper);
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
          opacity: 0.92;
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
          .hero-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta,
          .hero-layer {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

