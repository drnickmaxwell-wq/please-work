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
          overflow: hidden;
          min-height: clamp(72svh, 100svh, 860px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-block: clamp(80px, 12vh, 128px);
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
          background: var(--smh-gradient);
          z-index: 0;
        }

        section[data-hero="champagne"]::after {
          background:
            linear-gradient(180deg, var(--hero-wave-top), var(--hero-wave-bottom)),
            repeating-linear-gradient(
              0deg,
              var(--hero-grain-light) 0px,
              var(--hero-grain-dark) 1px,
              transparent 2px
            );
          mix-blend-mode: soft-light;
          opacity: 0.58;
          z-index: 1;
          mask-image: var(--hero-wave-mask);
          mask-repeat: no-repeat;
          mask-size: 140% 100%;
          mask-position: top center;
          -webkit-mask-image: var(--hero-wave-mask);
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: 140% 100%;
          -webkit-mask-position: top center;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: center;
          padding-inline: clamp(20px, 5vw, 60px);
        }

        .hero-pane {
          position: relative;
          width: min(100%, 720px);
          border-radius: 22px;
          background: var(--glass-bg-strong);
          backdrop-filter: blur(var(--glass-blur)) saturate(1.05);
          -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.05);
          border: 1px solid var(--glass-border);
          box-shadow: var(--rim-gold-inset), var(--shadow-hero-bloom);
          padding: clamp(32px, 6vw, 64px);
        }

        .hero-pane::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, var(--hero-pane-highlight), transparent 65%);
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
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition:
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
          box-shadow: var(--shadow-cta-rest);
        }

        .hero-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-cta);
        }

        .hero-cta:focus-visible {
          outline: none;
          box-shadow: var(--journey-card-focus), var(--shadow-cta-rest);
        }

        .hero-cta-primary {
          color: var(--ink);
          background: var(--cta-gradient);
        }

        .hero-cta-secondary {
          color: var(--ink-on-glass);
          background: var(--glass-bg-weak);
          border: 1px solid var(--glass-border);
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
