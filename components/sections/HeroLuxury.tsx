"use client";

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
  return (
    <section data-hero="champagne" aria-labelledby="home-hero-title">
      <div className="hero-container">
        <div className="hero-pane">
          <span className="ink-veil" aria-hidden="true" />

          <div className="hero-copy">
            <h1 id="home-hero-title">{title}</h1>
            {subtitle && <p className="hero-subtitle">{subtitle}</p>}

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
          width: 100vw;
          margin-inline: calc(50% - 50vw);
          overflow: clip;
          min-height: clamp(56vh, 68vh, 78vh);
          background: linear-gradient(
            135deg,
            var(--champ-start) 0%,
            var(--champ-mid) 55%,
            var(--champ-end) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        section[data-hero="champagne"]::before,
        section[data-hero="champagne"]::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        section[data-hero="champagne"]::before {
          background:
            radial-gradient(120% 120% at 0% 100%, var(--wave-ink) 0%, transparent 60%),
            radial-gradient(90% 90% at 100% 10%, var(--wave-ink-soft) 0%, transparent 70%);
          mix-blend-mode: soft-light;
          opacity: var(--fx-wave-opacity);
        }

        section[data-hero="champagne"]::after {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.015) 0px,
            rgba(0, 0, 0, 0.02) 1px,
            transparent 2px
          );
          opacity: var(--fx-grain-opacity);
        }

        .hero-container {
          position: relative;
          width: min(100%, 1320px);
          margin-inline: auto;
          padding: clamp(72px, 8vw, 112px) clamp(20px, 6vw, 56px);
          display: flex;
          justify-content: center;
        }

        .hero-pane {
          position: relative;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.26)),
            var(--glass-bg);
          backdrop-filter: blur(var(--glass-blur)) saturate(120%);
          -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(120%);
          border-radius: 22px;
          box-shadow: var(--shadow-glass), var(--glow-edge);
          outline: 1px solid var(--glass-border);
          padding: clamp(24px, 4vw, 56px);
          width: min(100%, 720px);
        }

        .hero-pane::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: inherit;
          box-shadow: 0 0 0 1px var(--glass-inner-ring);
          opacity: 0.75;
          pointer-events: none;
        }

        .ink-veil {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(8, 14, 24, 0.28),
            rgba(8, 14, 24, 0)
          );
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          display: grid;
          gap: clamp(16px, 3vw, 28px);
        }

        h1 {
          margin: 0;
          color: var(--ink-on-glass);
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 600;
        }

        .hero-subtitle {
          margin: 0;
          color: var(--body-on-glass);
          font-family: var(--font-body);
          font-size: clamp(16px, 2.2vw, 20px);
          line-height: 1.6;
          max-width: 60ch;
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
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition:
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.25);
        }

        .hero-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(226, 182, 74, 0.25);
        }

        .hero-cta:focus-visible {
          outline: 2px solid var(--glass-inner-ring);
          outline-offset: 2px;
        }

        .hero-cta-primary {
          color: var(--ink);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.92),
            rgba(226, 182, 74, 0.65)
          );
        }

        .hero-cta-secondary {
          color: var(--ink-on-glass);
          background: rgba(10, 19, 32, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.24);
        }

        @media (max-width: 768px) {
          .hero-container {
            padding-block: clamp(72px, 16vw, 112px);
          }

          .hero-pane {
            padding: clamp(24px, 8vw, 48px);
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
