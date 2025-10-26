"use client";

import { useEffect, useRef, useState } from "react";
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

  return (
    <section
      ref={heroRef}
      className="luxury-home-hero"
      aria-labelledby="home-hero-title"
    >
      {/* Layer 1: Gradient Base */}
      <div className="hero-gradient-base" />

      {/* Layer 2: Wave Mask */}
      <div
        className="hero-wave-mask"
        style={{
          transform: waveTransform,
          transition: isMotionEnabled ? "transform 0.48s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
        }}
      />

      {/* Layer 3: Particles */}
      {showParticles && (
        <div
          className="hero-particles"
          style={{
            transform: particlesTransform,
            transition: isMotionEnabled ? "transform 0.48s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
          }}
        />
      )}

      {/* Layer 4: Film Grain */}
      {showGrain && <div className="hero-film-grain" />}

      {/* Layer 5: Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-content-wrapper">
            <h1
              id="home-hero-title"
              className="hero-title"
            >
              {title}
            </h1>

            {subtitle && (
              <p className="hero-subtitle">
                {subtitle}
              </p>
            )}

            <div className="hero-cta-group">
              <Link href={primaryHref} className="hero-cta-primary">
                {primaryLabel}
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link href={secondaryHref} className="hero-cta-secondary">
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
          min-height: 70vh;
          overflow: hidden;
          padding: clamp(4rem, 6vw, 7rem) 0;
        }

        @media (max-width: 768px) {
          .luxury-home-hero {
            min-height: 68vh;
          }
        }

        /* Layer 1: Gradient Base */
        .hero-gradient-base {
          position: absolute;
          inset: 0;
          background: var(--gradient-champagne);
          z-index: 1;
        }

        /* Layer 2: Wave Mask */
        .hero-wave-mask {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image: url('/assets/manus/waves/home-hero-mask-desktop.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.4;
          mix-blend-mode: overlay;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .hero-wave-mask {
            background-image: url('/assets/manus/waves/home-hero-mask-mobile.webp');
          }
        }

        /* Layer 3: Particles */
        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: url('/assets/manus/particles/home-hero-particles.webp');
          background-size: 1024px 1024px;
          background-repeat: repeat;
          opacity: 0.08;
          mix-blend-mode: screen;
          will-change: transform;
          pointer-events: none;
        }

        /* Layer 4: Film Grain */
        .hero-film-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          background-image: url('/assets/manus/textures/home-hero-film-grain.webp');
          background-size: 512px 512px;
          background-repeat: repeat;
          opacity: 0.07;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* Layer 5: Content */
        .hero-content {
          position: relative;
          z-index: 5;
          width: 100%;
          color: var(--paper);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 3rem);
        }

        .hero-content-wrapper {
          max-width: 800px;
          padding: 2rem 0;
        }

        @media (max-width: 768px) {
          .hero-content-wrapper {
            padding: 1.5rem 0;
          }
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0 0 1.5rem 0;
          color: var(--paper);
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'};
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 0 2.5rem 0;
          color: rgba(255, 255, 255, 0.95);
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.1s both' : 'none'};
        }

        /* CTA Buttons */
        .hero-cta-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.22s both' : 'none'};
        }

        .hero-cta-primary,
        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          min-height: 44px;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          border-radius: var(--radius-pill);
          transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          cursor: pointer;
        }

        .hero-cta-primary {
          background: var(--gradient-cta);
          color: var(--paper);
          border: none;
          box-shadow: var(--shadow-glow);
          position: relative;
          overflow: hidden;
        }

        .hero-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .hero-cta-primary:hover::before {
          opacity: 1;
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), 0 12px 32px rgba(194, 24, 91, 0.3);
        }

        .hero-cta-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--brand-gold), var(--shadow-gold-glow);
        }

        .hero-cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--paper);
          border: 1px solid var(--brand-gold);
        }

        .hero-cta-secondary:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--brand-gold);
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.3);
        }

        .hero-cta-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--brand-gold), var(--shadow-gold-glow);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-wave-mask,
          .hero-particles {
            transform: none !important;
            transition: none !important;
          }
          
          .hero-title,
          .hero-subtitle,
          .hero-cta-group {
            animation: none !important;
          }
          
          .hero-cta-primary:hover,
          .hero-cta-secondary:hover {
            transform: none;
          }
        }

        @media (max-width: 640px) {
          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

