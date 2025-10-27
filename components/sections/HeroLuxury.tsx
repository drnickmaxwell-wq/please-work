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
    <section
      data-hero="champagne"
      aria-labelledby="home-hero-title"
      className="relative isolate flex min-h-[72svh] items-center justify-center overflow-hidden py-[clamp(80px,12vh,128px)]"
    >
      <span aria-hidden className="hero-gradient" />
      <span aria-hidden className="hero-wave" />

      <div className="hero-container">
        <div className="hero-pane glass-pane veiled" data-strength="strong">
          <div className="hero-copy">
            <h1 id="home-hero-title" className="font-serif text-balance text-[color:var(--smh-text)]">
              {title}
            </h1>
            {subtitle && (
              <p className="hero-subtitle ink-veil font-sans text-[color:var(--smh-text-muted)]">
                {subtitle}
              </p>
            )}

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
          background: var(--smh-gradient);
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(1200px 900px at 30% 10%, color-mix(in srgb, var(--smh-bg) 12%, transparent) 0%, transparent 55%);
          opacity: 0.7;
          pointer-events: none;
          z-index: 0;
        }

        .hero-wave {
          position: absolute;
          inset: 0;
          background:
            var(--smh-hero-overlay-wave),
            var(--smh-hero-overlay-grain);
          mix-blend-mode: soft-light;
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
          mask-image: var(--smh-hero-wave-mask);
          mask-repeat: no-repeat;
          mask-size: 140% 100%;
          mask-position: top center;
          -webkit-mask-image: var(--smh-hero-wave-mask);
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
          width: min(100%, 720px);
          padding: clamp(32px, 6vw, 64px);
          box-shadow: var(--rim-gold-inset, inset 0 0 0 1px color-mix(in srgb, var(--brand-gold) 48%, transparent)),
            var(--shadow-hero-bloom);
          color: var(--ink-on-glass);
        }

        .hero-pane::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--smh-hero-pane-highlight);
          mix-blend-mode: soft-light;
          opacity: 0.45;
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          display: grid;
          gap: clamp(16px, 3vw, 28px);
        }

        h1 {
          margin: 0;
          font-family: var(--font-serif);
          font-size: clamp(2.125rem, 6vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          font-weight: 700;
        }

        .hero-subtitle {
          margin: 0;
          font-size: clamp(1rem, 2.2vw, 1.25rem);
          line-height: 1.6;
          max-width: 60ch;
          position: relative;
          padding: clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px);
          border-radius: 1rem;
          font-weight: 400;
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
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          transition:
            transform var(--motion-duration-normal, 220ms) ease,
            box-shadow var(--motion-duration-normal, 220ms) ease;
          box-shadow: var(--shadow-cta-rest);
        }

        .hero-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-cta);
        }

        .hero-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand-gold) 65%, transparent), var(--shadow-cta-rest);
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
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
