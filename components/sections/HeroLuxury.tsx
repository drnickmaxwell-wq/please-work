"use client";

import { useEffect } from "react";
import Link from "next/link";

export interface LuxuryHomeHeroProps {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function HeroLuxury({
  title = "Going the Extra Smile",
  subtitle = "Private dental care with calm precision",
  primaryHref = "/book",
  primaryLabel = "Book a consultation",
  secondaryHref = "/treatments",
  secondaryLabel = "Explore treatments",
}: LuxuryHomeHeroProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const s = getComputedStyle(document.documentElement);
      console.log("SMH tokens:", {
        gradient: s.getPropertyValue("--smh-gradient").trim(),
        magenta: s.getPropertyValue("--smh-primary-magenta").trim(),
        teal: s.getPropertyValue("--smh-primary-teal").trim(),
        gold: s.getPropertyValue("--smh-accent-gold").trim(),
        glassBg: s.getPropertyValue("--champagne-glass-bg").trim(),
        glassBorder: s.getPropertyValue("--champagne-glass-border").trim(),
      });
    }
  }, []);

  return (
    <section
      data-hero="champagne"
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden isolate champagne-sheen"
      style={{ background: "var(--smh-gradient)" }}
    >
      <div aria-hidden className="gold-flecks"></div>
      <div className="hero-container">
        <div
          className="glass-pane mx-auto max-w-5xl rounded-3xl px-6 py-10 md:px-10 md:py-14 shadow-none"
          style={{
            border: "1px solid var(--champagne-glass-border)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
          }}
        >
          <div className="hero-copy">
            <h1 id="home-hero-title">{title}</h1>
            {subtitle && <p className="hero-subtitle ink-veil">{subtitle}</p>}

            <div className="cta" role="group" aria-label="Primary actions">
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
        section[data-hero="champagne"] {
          position: relative;
          width: 100%;
          margin: 0;
          min-height: clamp(72svh, 100svh, 860px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-block: clamp(80px, 12vh, 128px);
          isolation: isolate;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          justify-content: center;
          padding-inline: clamp(20px, 5vw, 60px);
        }

        .glass-pane {
          position: relative;
          width: min(100%, 720px);
          color: var(--smh-text);
          background: var(--champagne-glass-bg);
          border: 1px solid var(--champagne-glass-border);
          --hero-ink-on-glass: color-mix(in srgb, var(--smh-ink) 78%, transparent 22%);
          --hero-body-on-glass: color-mix(in srgb, var(--smh-text) 92%, transparent 8%);
          --hero-glass-weak: color-mix(in srgb, white 4%, transparent);
          --hero-pane-highlight: linear-gradient(120deg, rgba(255, 255, 255, 0.32) 0%, transparent 80%);
          --hero-pill-radius: 999px;
          --hero-shadow-rest: 0 12px 32px rgba(0, 0, 0, 0.25);
          --hero-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.3);
          --hero-focus-ring: 0 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 46%, transparent);
        }

        .glass-pane::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--hero-pane-highlight);
          mix-blend-mode: soft-light;
          opacity: 0.55;
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          display: grid;
          gap: clamp(16px, 3vw, 28px);
        }

        h1 {
          margin: 0;
          color: var(--hero-ink-on-glass);
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 600;
        }

        .hero-subtitle {
          margin: 0;
          color: var(--hero-body-on-glass);
          font-family: var(--font-body);
          font-size: clamp(16px, 2.2vw, 20px);
          line-height: 1.6;
          max-width: 60ch;
          position: relative;
          padding: clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px);
          border-radius: 18px;
          display: inline-block;
        }

        .ink-veil {
          position: relative;
          isolation: isolate;
        }

        .ink-veil::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: color-mix(in srgb, black 36%, transparent);
          pointer-events: none;
          z-index: -1;
        }

        .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.85rem 2.25rem;
          border-radius: var(--hero-pill-radius);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition:
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
          box-shadow: var(--hero-shadow-rest);
        }

        .hero-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--hero-shadow-hover);
        }

        .hero-cta:focus-visible {
          outline: none;
          box-shadow: var(--hero-focus-ring), var(--hero-shadow-rest);
        }

        .hero-cta-primary {
          color: var(--smh-ink);
          background: var(--smh-gradient);
        }

        .hero-cta-secondary {
          color: var(--hero-ink-on-glass);
          background: var(--hero-glass-weak);
          border: 1px solid var(--champagne-glass-border);
        }

        @media (max-width: 768px) {
          .hero-container {
            padding-block: clamp(72px, 16vw, 112px);
          }

          .hero-cta {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cta {
            transition-duration: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
