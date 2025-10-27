"use client";

import Link from "next/link";
import { useMemo } from "react";

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

  return (
    <section className="journey-section" aria-labelledby="journey-hero-title">
      <div className="journey-inner">
        <header className="journey-header" id="journey-hero-title">
          <h2 className="font-serif text-[color:var(--smh-text)]">Your Smile Journey</h2>
          <p className="font-sans text-[color:var(--smh-text-muted)]">Discover the path to your perfect smile</p>
          <Link href="/ai-smile-quiz" className="journey-cta">
            Start Your Journey
          </Link>
        </header>

        <div className="journey-grid" aria-label="Patient journey timeline">
          {steps.map((step) => {
            const iconPath = step.icon ? iconMap[step.icon] : undefined;
            return (
              <article
                key={step.title}
                role="group"
                tabIndex={0}
                className="journey-card glass-pane veiled"
                data-strength="strong"
              >
                {iconPath && (
                  <div className="journey-card-icon">
                    <img src={iconPath} alt="" aria-hidden="true" />
                  </div>
                )}
                <h3 className="font-serif text-[color:var(--smh-text)]">{step.title}</h3>
                <p className="font-sans text-[color:var(--smh-text-muted)]">{step.body}</p>
              </article>
            );
          })}
        </div>

        <div className="journey-callout glass-pane veiled" data-strength="strong">
          <span className="journey-callout-veil" aria-hidden="true" />
          <div className="journey-callout-content">
            <h3 className="font-serif text-[color:var(--smh-text)]">Ready to Begin?</h3>
            <p className="font-sans text-[color:var(--smh-text-muted)]">Take the first step toward your perfect smile.</p>
            <div className="journey-callout-actions">
              <Link href="/contact" className="journey-cta-primary">
                Book a consultation
              </Link>
              <Link href="/treatments" className="journey-cta-secondary">
                See treatment options
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-section {
          position: relative;
          width: 100%;
          margin: 0;
          overflow: hidden;
          padding-block: clamp(96px, 14vw, 168px);
          isolation: isolate;
          background: var(--smh-gradient);
        }

        .journey-section::before,
        .journey-section::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .journey-section::before {
          background: radial-gradient(1200px 900px at 30% 10%, color-mix(in srgb, var(--smh-bg) 12%, transparent) 0%, transparent 55%);
          opacity: 0.7;
          z-index: 0;
        }

        .journey-section::after {
          background:
            var(--smh-hero-overlay-wave),
            var(--smh-hero-overlay-grain);
          mix-blend-mode: soft-light;
          opacity: 0.54;
          z-index: 1;
          mask-image: var(--smh-hero-wave-mask);
          mask-repeat: no-repeat;
          mask-size: 150% 110%;
          mask-position: bottom center;
          -webkit-mask-image: var(--smh-hero-wave-mask);
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: 150% 110%;
          -webkit-mask-position: bottom center;
          transform: scaleY(-1);
          transform-origin: center;
        }

        .journey-inner {
          position: relative;
          width: 100%;
          max-width: min(1180px, 92vw);
          margin-inline: auto;
          padding-inline: clamp(20px, 6vw, 56px);
          display: grid;
          gap: clamp(64px, 8vw, 96px);
          z-index: 2;
        }

        .journey-header {
          display: grid;
          gap: 1rem;
          justify-items: center;
          text-align: center;
        }

        .journey-header h2 {
          margin: 0;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
        }

        .journey-header p {
          margin: 0;
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.6;
          max-width: 40ch;
        }

        .journey-cta {
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
          color: var(--ink);
          background: var(--cta-gradient);
          box-shadow: var(--shadow-cta-rest);
          transition:
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .journey-cta:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-cta);
        }

        .journey-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand-gold) 65%, transparent), var(--shadow-cta-rest);
        }

        .journey-grid {
          display: grid;
          gap: clamp(24px, 4vw, 40px);
          grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
        }

        .journey-card {
          position: relative;
          display: grid;
          gap: 1.1rem;
          padding: clamp(28px, 4.5vw, 40px);
          border-radius: 22px;
          box-shadow: var(--rim-gold-inset, inset 0 0 0 1px color-mix(in srgb, var(--brand-gold) 48%, transparent)),
            var(--journey-card-shadow);
          color: var(--ink-on-glass);
          transition:
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth),
            filter var(--motion-duration-fast) var(--motion-easing-smooth);
        }

        .journey-card::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: inherit;
          border: 1px solid color-mix(in srgb, var(--glass-border) 65%, transparent);
          opacity: 0.45;
          pointer-events: none;
          transition: opacity var(--motion-duration-fast) var(--motion-easing-smooth);
        }

        .journey-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--rim-gold-inset, inset 0 0 0 1px color-mix(in srgb, var(--brand-gold) 48%, transparent)),
            var(--journey-card-shadow-hover);
        }

        .journey-card:hover::before {
          opacity: 0.7;
        }

        .journey-card:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 2px color-mix(in srgb, var(--brand-gold) 65%, transparent),
            var(--journey-card-shadow);
        }

        .journey-card:focus-visible::before {
          opacity: 0.8;
        }

        .journey-card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: grid;
          place-items: center;
          background: var(--glass-bg-weak);
          border: 1px solid var(--glass-border);
        }

        .journey-card-icon img {
          width: 1.5rem;
          height: 1.5rem;
          filter: brightness(0) invert(1);
        }

        .journey-card h3 {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 700;
        }

        .journey-card p {
          margin: 0;
          line-height: 1.6;
        }

        .journey-callout {
          position: relative;
          border-radius: 26px;
          padding: clamp(36px, 6vw, 52px);
          box-shadow: var(--rim-gold-inset, inset 0 0 0 1px color-mix(in srgb, var(--brand-gold) 48%, transparent)),
            var(--journey-card-shadow);
          overflow: hidden;
          color: var(--ink-on-glass);
        }

        .journey-callout::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--smh-hero-pane-highlight);
          mix-blend-mode: soft-light;
          opacity: 0.45;
          pointer-events: none;
        }

        .journey-callout-veil {
          position: absolute;
          inset: 0;
          background: var(--ink-veil-12);
          pointer-events: none;
        }

        .journey-callout-content {
          position: relative;
          display: grid;
          gap: clamp(16px, 3vw, 24px);
          justify-items: center;
          text-align: center;
          color: var(--ink-on-glass);
        }

        .journey-callout-content h3 {
          margin: 0;
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 700;
        }

        .journey-callout-content p {
          margin: 0;
          line-height: 1.6;
        }

        .journey-callout-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .journey-cta-primary,
        .journey-cta-secondary {
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
            transform var(--motion-duration-normal) var(--motion-easing-smooth),
            box-shadow var(--motion-duration-normal) var(--motion-easing-smooth);
        }

        .journey-cta-primary {
          color: var(--ink);
          background: var(--cta-gradient);
          box-shadow: var(--shadow-cta-rest);
        }

        .journey-cta-secondary {
          color: var(--ink-on-glass);
          background: var(--glass-bg-weak);
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-cta-rest);
        }

        .journey-cta-primary:hover,
        .journey-cta-secondary:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-cta);
        }

        .journey-cta-primary:focus-visible,
        .journey-cta-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--brand-gold) 65%, transparent), var(--shadow-cta-rest);
        }

        @media (max-width: 768px) {
          .journey-card {
            padding: clamp(20px, 6vw, 28px);
          }

          .journey-callout {
            padding: clamp(28px, 10vw, 40px);
          }

          .journey-cta,
          .journey-cta-primary,
          .journey-cta-secondary {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-cta,
          .journey-card,
          .journey-cta-primary,
          .journey-cta-secondary {
            transition-duration: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
