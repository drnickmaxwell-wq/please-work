'use client';

import Link from 'next/link';

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
    <section className="hero-lux">
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
          color: #f8fbff;
          background:
            linear-gradient(135deg, rgba(7, 12, 16, 0.95), rgba(12, 21, 32, 0.92) 40%, rgba(249, 232, 195, 0.24));
          padding: clamp(4rem, 6vw, 7rem) clamp(1.5rem, 5vw, 5rem);
          isolation: isolate;
        }

        .hero-lux__texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(140% 95% at 20% 10%, rgba(249, 232, 195, 0.18), transparent 60%),
            radial-gradient(120% 80% at 75% 25%, rgba(64, 196, 180, 0.12), transparent 65%);
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
          color: rgba(249, 232, 195, 0.78);
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
          color: rgba(237, 240, 244, 0.85);
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
          border-color: rgba(249, 232, 195, 0.7);
          box-shadow: none;
        }

        .hero-lux__secondary:hover,
        .hero-lux__secondary:focus-visible {
          color: #101c28;
          background-color: rgba(249, 232, 195, 0.9);
          box-shadow: 0 0 0 2px rgba(249, 232, 195, 0.2);
        }

        .hero-lux__visual {
          position: relative;
        }

        .hero-lux__panel {
          position: relative;
          border-radius: 24px;
          background: rgba(10, 18, 27, 0.65);
          border: 1px solid rgba(249, 232, 195, 0.25);
          box-shadow: 0 25px 50px rgba(6, 11, 16, 0.45);
          overflow: hidden;
        }

        .hero-lux__panel::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: radial-gradient(circle at 20% 20%, rgba(249, 232, 195, 0.25), transparent 55%),
            radial-gradient(circle at 80% 35%, rgba(64, 196, 180, 0.2), transparent 65%);
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
          color: rgba(249, 232, 195, 0.7);
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
          color: rgba(249, 232, 195, 0.92);
          font-family: var(--font-playfair, 'Playfair Display', serif);
        }

        .hero-lux__stat-label {
          font-size: 0.95rem;
          color: rgba(215, 224, 234, 0.75);
        }

        .hero-lux__panel-copy {
          margin: 0;
          font-size: 1rem;
          color: rgba(224, 230, 238, 0.85);
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
