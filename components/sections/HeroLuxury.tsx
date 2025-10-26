'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';

const heroBackgroundStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, color-mix(in oklab, var(--navy-950) 94%, transparent) 0%, color-mix(in oklab, var(--navy-900) 88%, transparent) 58%, color-mix(in oklab, var(--gold-champagne) 18%, transparent) 100%), radial-gradient(1200px 820px at 18% 12%, color-mix(in oklab, var(--smh-primary-magenta, var(--brand-magenta)) 28%, transparent) 0%, transparent 70%), radial-gradient(1000px 760px at 82% 18%, color-mix(in oklab, var(--smh-primary-teal, var(--brand-teal)) 26%, transparent) 0%, color-mix(in oklab, var(--gold-champagne) 12%, transparent) 70%)',
  backgroundBlendMode: 'overlay, soft-light, normal',
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hero-lux__stat">
      <span className="hero-lux__stat-value">{value}</span>
      <span className="hero-lux__stat-label">{label}</span>
    </div>
  );
}

const HeroLuxury = () => {
  return (
    <section className="hero-lux" style={heroBackgroundStyle}>
      <div className="hero-lux__texture" aria-hidden="true" />
      <svg className="lux-wave" viewBox="0 0 1440 320" aria-hidden="true">
        <defs>
          <linearGradient id="lux-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
          </linearGradient>
          <mask id="lux-wave-mask">
            <path
              d="M0,200 C180,150 360,90 540,110 C720,130 900,230 1080,220 C1260,210 1350,150 1440,180 L1440,320 L0,320 Z"
              fill="url(#lux-wave-gradient)"
            />
          </mask>
        </defs>
        <rect width="1440" height="320" fill="var(--gold-champagne)" mask="url(#lux-wave-mask)" opacity="0.22" />
      </svg>
      <div className="hero-lux__inner">
        <div className="hero-lux__copy">
          <p className="hero-lux__eyebrow">Luxury coastal dentistry, reimagined</p>
          <h1 className="hero-lux__heading">
            Precision smiles crafted with champagne calm
          </h1>
          <p className="hero-lux__subheading">
            Immerse yourself in a serene, technology-led experience that blends mindful comfort with meticulous cosmetic results.
          </p>
          <div className="hero-lux__actions">
            <Link className="smh-btn" href="/book">
              Book a private consultation
            </Link>
            <Link className="smh-btn hero-lux__secondary" href="/treatments">
              Explore signature treatments
            </Link>
          </div>
        </div>
        <aside className="hero-lux__visual" aria-label="Highlights from our studio">
          <div className="hero-lux__panel">
            <div className="hero-lux__panel-inner">
              <p className="hero-lux__panel-title">What to expect</p>
              <div className="hero-lux__stats">
                <Stat label="Digital smile preview" value="4K" />
                <Stat label="Average treatment time" value="45 min" />
                <Stat label="Patient comfort rating" value="98%" />
              </div>
              <p className="hero-lux__panel-copy">
                Every visit begins with a sensory welcome ritual, calming aromatics and a personalised plan shaped by our AI planning suite.
              </p>
            </div>
          </div>
        </aside>
      </div>
      <style jsx>{`
        .hero-lux {
          position: relative;
          overflow: hidden;
          color: color-mix(in srgb, white 92%, var(--navy-950) 8%);
          padding: clamp(4rem, 6vw, 7rem) clamp(1.5rem, 5vw, 5rem);
          isolation: isolate;
        }

        .hero-lux__texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(140% 95% at 20% 10%, color-mix(in oklab, var(--gold-champagne) 32%, transparent) 0%, transparent 60%),
            radial-gradient(120% 80% at 75% 25%, color-mix(in oklab, var(--smh-primary-teal, var(--brand-teal)) 26%, transparent) 0%, transparent 65%);
          opacity: 0.9;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .lux-wave {
          position: absolute;
          inset-inline: 0;
          bottom: -1px;
          width: 100%;
          height: auto;
          mix-blend-mode: screen;
        }

        .hero-lux::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: var(--smh-filmgrain, none);
          opacity: var(--grain-opacity, 0.05);
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .hero-lux__inner {
          position: relative;
          display: grid;
          gap: clamp(2.5rem, 4vw, 4rem);
          grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
          max-width: min(1160px, 94vw);
          margin: 0 auto;
          z-index: 1;
          align-items: center;
        }

        .hero-lux__copy {
          display: grid;
          gap: 1.25rem;
        }

        .hero-lux__eyebrow {
          font-size: 0.95rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--gold-champagne) 78%, transparent);
          margin: 0;
        }

        .hero-lux__heading {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: clamp(2.8rem, 5vw, 3.8rem);
          line-height: 1.1;
          margin: 0;
          text-wrap: balance;
        }

        .hero-lux__subheading {
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          color: color-mix(in srgb, white 88%, var(--navy-950) 12%);
          margin: 0;
          max-width: 36ch;
        }

        .hero-lux__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .hero-lux__secondary {
          background-image: none !important;
          background-color: transparent;
          color: var(--gold-champagne);
          border-color: color-mix(in oklab, var(--gold-champagne) 70%, transparent);
          box-shadow: none;
        }

        .hero-lux__secondary:hover,
        .hero-lux__secondary:focus-visible {
          color: color-mix(in oklab, var(--navy-950) 94%, white 6%);
          background-color: color-mix(in oklab, var(--gold-champagne) 90%, white 10%);
          box-shadow: 0 0 0 2px color-mix(in oklab, var(--gold-champagne) 20%, transparent);
        }

        .hero-lux__visual {
          position: relative;
        }

        .hero-lux__panel {
          position: relative;
          border-radius: 24px;
          background: color-mix(in oklab, var(--navy-900) 72%, transparent);
          border: 1px solid color-mix(in oklab, var(--gold-champagne) 25%, transparent);
          box-shadow: 0 25px 50px color-mix(in oklab, var(--navy-950) 45%, transparent);
          overflow: hidden;
        }

        .hero-lux__panel::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--gold-champagne) 25%, transparent) 0%, transparent 55%),
            radial-gradient(circle at 80% 35%, color-mix(in oklab, var(--smh-primary-teal, var(--brand-teal)) 20%, transparent) 0%, transparent 65%);
          opacity: 0.9;
          pointer-events: none;
        }

        .hero-lux__panel-inner {
          position: relative;
          padding: clamp(1.75rem, 3vw, 2.5rem);
          display: grid;
          gap: 1.5rem;
        }

        .hero-lux__panel-title {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: color-mix(in srgb, var(--gold-champagne) 70%, transparent);
          margin: 0;
        }

        .hero-lux__stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .hero-lux__stat {
          display: grid;
          gap: 0.35rem;
        }

        .hero-lux__stat-value {
          font-size: 1.8rem;
          font-weight: 600;
          color: color-mix(in srgb, var(--gold-champagne) 92%, transparent);
          font-family: var(--font-playfair, 'Playfair Display', serif);
        }

        .hero-lux__stat-label {
          font-size: 0.95rem;
          color: color-mix(in srgb, white 78%, var(--navy-950) 22%);
        }

        .hero-lux__panel-copy {
          margin: 0;
          font-size: 1rem;
          color: color-mix(in srgb, white 86%, var(--navy-950) 14%);
        }

        .hero-lux__panel,
        .hero-lux__texture,
        .lux-wave {
          animation: heroFloat 12s ease-in-out infinite alternate;
        }

        @keyframes heroFloat {
          0% {
            transform: translate3d(0, -4px, 0);
          }
          100% {
            transform: translate3d(0, 4px, 0);
          }
        }

        @media (max-width: 768px) {
          .hero-lux {
            text-align: left;
          }

          .hero-lux__panel {
            margin-inline: auto;
            max-width: 420px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-lux__panel,
          .hero-lux__texture,
          .lux-wave {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroLuxury;
