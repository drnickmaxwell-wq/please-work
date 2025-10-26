"use client";

import Link from "next/link";
import { useMemo, type CSSProperties } from "react";

export interface TimelineStep {
  title: string;
  body: string;
  icon?: "scan" | "sparkle" | "implant";
}

const defaultSteps: TimelineStep[] = [
  {
    title: "Initial Consultation",
    body: "Meet your dedicated clinician for a comprehensive smile assessment using our 4K digital imaging suite.",
    icon: "scan",
  },
  {
    title: "AI Smile Preview",
    body: "Visualize your future smile with photorealistic AR rendering and explore treatment options in real-time.",
    icon: "sparkle",
  },
  {
    title: "Treatment Planning",
    body: "Receive a personalized roadmap with transparent pricing, timeline estimates, and milestone tracking.",
    icon: "scan",
  },
  {
    title: "Precision Treatment",
    body: "Experience meticulous care in our serene coastal studio with advanced comfort protocols.",
    icon: "implant",
  },
  {
    title: "Progress Monitoring",
    body: "Track your transformation through our patient portal with regular updates and healing milestones.",
    icon: "sparkle",
  },
  {
    title: "Smile Reveal",
    body: "Celebrate your new smile with a final consultation and personalized aftercare guidance.",
    icon: "sparkle",
  },
];

export interface SmileJourneyProps {
  steps?: TimelineStep[];
}

export default function SmileJourney({ steps = defaultSteps }: SmileJourneyProps) {
  const iconMap = useMemo(
    () => ({
      scan: "/assets/manus/icons/scan.svg",
      sparkle: "/assets/manus/icons/smile-curve.svg",
      implant: "/assets/manus/icons/scan.svg",
    }),
    []
  );

  const focusRingVars = {
    "--outline-focus-color": "var(--brand-gold)",
  } as CSSProperties;

  return (
    <section
      className="journey-section relative overflow-hidden py-20 md:py-24"
      aria-labelledby="journey-hero-title"
      style={focusRingVars}
    >
      <div className="journey-layer journey-gradient" aria-hidden />
      <div className="journey-layer journey-wave" aria-hidden />
      <div className="journey-layer journey-particles" aria-hidden />
      <div className="journey-layer journey-grain" aria-hidden />
      <div className="absolute inset-0 pointer-events-none z-20" style={{ background: "var(--hero-veil)" }} aria-hidden />

      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
          <header className="journey-header text-center text-white">
            <h2 id="journey-hero-title">Your Smile Journey</h2>
            <p>Discover the path to your perfect smile</p>
            <Link href="/ai-smile-quiz" className="journey-cta focus-visible:outline-none">
              Start Your Journey
            </Link>
          </header>

          <div className="journey-grid" aria-label="Patient journey timeline">
            {steps.map((step) => {
              const iconPath = step.icon ? iconMap[step.icon] : undefined;
              return (
                <article
                  key={step.title}
                  tabIndex={0}
                  className="journey-card focus-visible:outline-none"
                  style={{ boxShadow: "var(--shadow-card-soft)" }}
                >
                  {iconPath && (
                    <div className="journey-card-icon">
                      <img src={iconPath} alt="" aria-hidden="true" />
                    </div>
                  )}
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              );
            })}
          </div>

          <div className="journey-callout">
            <div className="journey-callout-sheen" aria-hidden />
            <div className="journey-callout-content">
              <h3>Ready to Begin?</h3>
              <p>Take the first step toward your perfect smile.</p>
              <div className="journey-callout-actions">
                <Link href="/contact" className="journey-cta-primary focus-visible:outline-none">
                  Book a consultation
                </Link>
                <Link href="/treatments" className="journey-cta-secondary focus-visible:outline-none">
                  See treatment options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-section {
          background: var(--background);
          color: var(--paper);
        }

        .journey-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }

        .journey-gradient {
          background: var(--gradient-champagne);
        }

        .journey-wave {
          background-image: url('/assets/manus/waves/home-hero-mask-desktop.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          mix-blend-mode: overlay;
          opacity: 0.35;
        }

        @media (max-width: 768px) {
          .journey-wave {
            background-image: url('/assets/manus/waves/home-hero-mask-mobile.webp');
          }
        }

        .journey-particles {
          background-image: url('/assets/manus/particles/home-hero-particles.webp');
          background-size: 1024px 1024px;
          background-repeat: repeat;
          mix-blend-mode: screen;
          opacity: 0.06;
        }

        .journey-grain {
          background-image: url('/assets/manus/textures/home-hero-film-grain.webp');
          background-size: 512px 512px;
          background-repeat: repeat;
          mix-blend-mode: overlay;
          opacity: 0.06;
        }

        .journey-header {
          display: grid;
          gap: 1rem;
          justify-items: center;
          text-shadow: var(--shadow-hero-text);
        }

        .journey-header h2 {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
        }

        .journey-header p {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          line-height: 1.6;
          max-width: 36rem;
          margin: 0;
          opacity: 0.92;
        }

        .journey-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          padding: 0.75rem 2rem;
          margin-top: 0.5rem;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          border-radius: var(--radius-pill);
          color: var(--paper);
          background: var(--gradient-cta);
          box-shadow: var(--shadow-glow);
          text-decoration: none;
          transition: transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .journey-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), var(--shadow-card);
        }

        .journey-cta:focus-visible {
          outline: none;
          box-shadow: var(--outline-focus);
        }

        .journey-grid {
          display: grid;
          gap: 1.75rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .journey-card {
          position: relative;
          background: var(--glass-bg-weak);
          border: 1px solid var(--glass-border);
          border-radius: 1.125rem;
          padding: 1.75rem;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          display: grid;
          gap: 1rem;
          transition: transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .journey-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }

        .journey-card:focus-visible {
          transform: translateY(-2px);
          box-shadow: var(--outline-focus);
        }

        .journey-card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          border: 1px solid var(--glass-border);
          background: var(--gradient-champagne);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .journey-card-icon img {
          width: 1.5rem;
          height: 1.5rem;
          filter: brightness(0) invert(1);
        }

        .journey-card h3 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          margin: 0;
          color: var(--gold-champagne);
        }

        .journey-card p {
          margin: 0;
          font-family: var(--font-body);
          line-height: 1.6;
          opacity: 0.85;
        }

        .journey-callout {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
          padding: clamp(2rem, 4vw, 3rem);
          background: var(--glass-bg-strong);
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-card);
          text-align: center;
        }

        .journey-callout-sheen {
          position: absolute;
          inset: 0;
          background: var(--gradient-champagne);
          opacity: 0.12;
        }

        .journey-callout-content {
          position: relative;
          display: grid;
          gap: 1.5rem;
          justify-items: center;
          text-shadow: var(--shadow-hero-text);
        }

        .journey-callout-content h3 {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          margin: 0;
        }

        .journey-callout-content p {
          font-family: var(--font-body);
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        .journey-callout-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .journey-cta-primary,
        .journey-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          padding: 0.75rem 2rem;
          border-radius: var(--radius-pill);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .journey-cta-primary {
          background: var(--gradient-cta);
          color: var(--paper);
          box-shadow: var(--shadow-glow);
        }

        .journey-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), var(--shadow-card);
        }

        .journey-cta-secondary {
          background: var(--glass-bg-weak);
          color: var(--paper);
          border: 1px solid var(--glass-border);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
        }

        .journey-cta-secondary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-card-soft);
        }

        .journey-cta-primary:focus-visible,
        .journey-cta-secondary:focus-visible {
          outline: none;
          box-shadow: var(--outline-focus);
        }

        @media (max-width: 640px) {
          .journey-cta,
          .journey-cta-primary,
          .journey-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
