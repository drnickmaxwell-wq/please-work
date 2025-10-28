"use client";

import Link from "next/link";
import { useMemo } from "react";

import Particles from "@/components/brand/Particles";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

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

  const prefersReducedMotion = usePrefersReducedMotion();
  const particlesActive = !prefersReducedMotion;

  return (
    <section
      className="champagne-surface journey-surface"
      aria-labelledby="journey-hero-title"
      data-hero="champagne"
      data-wave="on"
      data-particles={particlesActive ? "on" : "off"}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      {particlesActive ? (
        <Particles className="journey-particles" data-state="on" aria-hidden />
      ) : (
        <canvas className="journey-particles" data-state="off" aria-hidden />
      )}

      <div className="journey-inner">
        <header className="journey-header" id="journey-hero-title">
          <h2>Your Smile Journey</h2>
          <p>Discover the path to your perfect smile</p>
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
                className="journey-card champagne-glass"
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

        <div className="journey-callout champagne-glass">
          <span className="journey-callout-veil" aria-hidden="true" />
          <div className="journey-callout-content">
            <h3>Ready to Begin?</h3>
            <p>Take the first step toward your perfect smile.</p>
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
        .journey-surface {
          position: relative;
          overflow: hidden;
          padding-block: clamp(96px, 14vw, 168px);
          color: var(--smh-text-strong, var(--smh-text));
        }

        .journey-particles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .journey-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: min(1180px, 92vw);
          margin-inline: auto;
          padding-inline: clamp(20px, 6vw, 56px);
          display: grid;
          gap: clamp(64px, 8vw, 96px);
          --journey-card-shadow: 0 18px 48px rgba(13, 14, 16, 0.42);
          --journey-card-shadow-hover: 0 24px 62px rgba(13, 14, 16, 0.5);
          --journey-card-focus: 0 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 46%, transparent);
          --journey-card-glow: 0 0 24px rgba(0, 194, 199, 0.28);
        }

        .journey-header {
          display: grid;
          gap: 1rem;
          justify-items: center;
          text-align: center;
        }

        .journey-header h2 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 600;
        }

        .journey-header p {
          margin: 0;
          font-family: var(--font-body);
          color: var(--smh-text-subtle, var(--smh-text));
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
          font-family: var(--font-body);
          font-weight: 600;
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
          box-shadow: var(--journey-card-focus), var(--shadow-cta-rest);
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
          box-shadow:
            0 0 0 1px color-mix(in oklab, var(--smh-accent-gold) 26%, transparent),
            0 24px 72px rgba(0, 0, 0, 0.18) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            var(--journey-card-shadow);
          color: var(--smh-text-strong, var(--smh-text));
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
          border: 1px solid color-mix(in srgb, var(--smh-accent-gold) 18%, transparent);
          opacity: 0.45;
          pointer-events: none;
          transition: opacity var(--motion-duration-fast) var(--motion-easing-smooth);
        }

        .journey-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 0 0 1px color-mix(in oklab, var(--smh-accent-gold) 26%, transparent),
            0 24px 72px rgba(0, 0, 0, 0.18) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            var(--journey-card-shadow-hover),
            var(--journey-card-glow);
        }

        .journey-card:hover::before {
          opacity: 0.7;
        }

        .journey-card:focus-visible {
          outline: none;
          box-shadow:
            var(--journey-card-focus),
            0 0 0 1px color-mix(in oklab, var(--smh-accent-gold) 26%, transparent),
            0 24px 72px rgba(0, 0, 0, 0.18) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset;
        }

        .journey-card:focus-visible::before {
          opacity: 0.82;
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
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
        }

        .journey-card p {
          margin: 0;
          font-family: var(--font-body);
          color: var(--smh-text-subtle, var(--smh-text));
          line-height: 1.6;
        }

        .journey-callout {
          position: relative;
          border-radius: 26px;
          padding: clamp(36px, 6vw, 52px);
          box-shadow:
            0 0 0 1px color-mix(in oklab, var(--smh-accent-gold) 26%, transparent),
            0 24px 72px rgba(0, 0, 0, 0.18) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            inset 0 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 30%, transparent),
            var(--journey-card-shadow);
          overflow: hidden;
        }

        .journey-callout::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(160deg, rgba(255, 246, 224, 0.22), rgba(255, 255, 255, 0));
          mix-blend-mode: screen;
          opacity: 0.4;
          pointer-events: none;
        }

        .journey-callout-veil {
          position: absolute;
          inset: 0;
          background: color-mix(in srgb, black 28%, transparent);
          pointer-events: none;
        }

        .journey-callout-content {
          position: relative;
          display: grid;
          gap: clamp(16px, 3vw, 24px);
          justify-items: center;
          text-align: center;
          color: var(--smh-text-strong, var(--smh-text));
        }

        .journey-callout-content h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 600;
        }

        .journey-callout-content p {
          margin: 0;
          font-family: var(--font-body);
          color: var(--smh-text-subtle, var(--smh-text));
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
          font-family: var(--font-body);
          font-weight: 600;
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
          color: var(--smh-text-strong, var(--smh-text));
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
          box-shadow: var(--journey-card-focus), var(--shadow-cta-rest);
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
