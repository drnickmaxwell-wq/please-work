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
        glassStrong: s.getPropertyValue("--glass-bg-strong").trim(),
        glassBorder: s.getPropertyValue("--glass-border").trim(),
      });
    }
  }, []);

  return (
    <section
      data-hero="champagne"
      aria-labelledby="home-hero-title"
      className="relative overflow-hidden isolate"
      style={{ background: "var(--smh-gradient)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/waves/smh-wave-mask.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(2px 2px at 12% 28%, color-mix(in srgb, var(--smh-accent-gold) 70%, transparent) 60%, transparent 61%)," +
            "radial-gradient(2px 2px at 78% 62%, color-mix(in srgb, var(--smh-accent-gold) 65%, transparent) 60%, transparent 61%)," +
            "radial-gradient(1.5px 1.5px at 32% 68%, color-mix(in srgb, var(--smh-accent-gold) 60%, transparent) 60%, transparent 61%)",
        }}
      />
      <div className="hero-container">
        <div
          className="glass-pane relative z-10 mx-auto max-w-5xl rounded-3xl px-6 py-10 md:px-10 md:py-14 bg-transparent"
          style={{
            background: "var(--glass-bg-strong)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow:
              "0 24px 80px color-mix(in srgb, black 16%, transparent 84%)",
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
        }

        .glass-pane::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--smh-hero-pane-highlight);
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
