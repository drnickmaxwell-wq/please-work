"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface TimelineStep {
  title: string;
  body: string;
}

const defaultSteps: TimelineStep[] = [
  {
    title: "Initial Consultation",
    body: "Meet with our expert team to discuss your smile goals and explore treatment options tailored to your needs.",
  },
  {
    title: "Digital Scan",
    body: "Experience our state-of-the-art 3D scanning technology for precise, comfortable impressions without traditional molds.",
  },
  {
    title: "Personalized Plan",
    body: "Receive a comprehensive treatment plan with clear timelines, costs, and expected outcomes for your smile transformation.",
  },
  {
    title: "Trial Smile Preview",
    body: "See your future smile before treatment begins with our advanced digital smile design and visualization technology.",
  },
  {
    title: "Treatment Journey",
    body: "Begin your transformation with gentle, precise care using modern techniques and continuous support from our team.",
  },
  {
    title: "Smile Reveal",
    body: "Celebrate your new smile with confidence, backed by our commitment to long-term care and maintenance guidance.",
  },
];

export interface SmileJourneyProps {
  steps?: TimelineStep[];
}

export default function SmileJourney({ steps = defaultSteps }: SmileJourneyProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              // Show all steps instantly
              setVisibleSteps(steps.map((_, i) => i));
            } else {
              // Stagger reveal with 80ms delay
              steps.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleSteps((prev) => [...prev, index]);
                }, index * 80);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, [steps, prefersReducedMotion]);

  return (
    <section className="journey-section" aria-labelledby="journey-title">
      {/* Background layers (same as hero, 60% strength) */}
      <div className="journey-gradient" aria-hidden="true" />
      <div className="journey-wave" aria-hidden="true" />
      <div className="journey-particles" aria-hidden="true" />
      <div className="journey-grain" aria-hidden="true" />

      <div className="journey-content">
        {/* Hero section */}
        <header className="journey-hero">
          <h2 id="journey-title">Your Smile Journey</h2>
          <p className="journey-subtitle">
            Discover the path to your perfect smile with our comprehensive, patient-centered approach
          </p>
          <Link href="/ai-smile-quiz" className="journey-cta-primary">
            Start Your Journey
          </Link>
        </header>

        {/* Timeline cards */}
        <div ref={timelineRef} className="journey-timeline" aria-label="Patient journey timeline">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className={`journey-card ${visibleSteps.includes(index) ? "visible" : ""}`}
              role="group"
              tabIndex={0}
            >
              <div className="card-inner-ring" aria-hidden="true" />
              <div className="card-icon" aria-hidden="true">
                <span className="icon-number">{index + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>

        {/* Final CTA panel */}
        <div className="journey-cta-panel">
          <div className="cta-panel-veil" aria-hidden="true" />
          <div className="cta-panel-content">
            <h3>Ready to Begin?</h3>
            <p>Take the first step toward your perfect smile today.</p>
            <div className="cta-panel-actions">
              <Link href="/book" className="journey-cta-primary">
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
          padding: clamp(96px, 14vh, 168px) clamp(20px, 5vw, 60px);
          overflow: hidden;
          isolation: isolate;
        }

        /* Background Layer 1: Gradient (60% strength) */
        .journey-gradient {
          position: absolute;
          inset: 0;
          background: var(--smh-gradient);
          opacity: 0.6;
          z-index: 1;
        }

        /* Background Layer 2: Wave Mask (60% strength) */
        .journey-wave {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(11, 19, 32, 0.12) 40px,
            rgba(11, 19, 32, 0.12) 80px,
            transparent 80px,
            transparent 120px,
            rgba(11, 19, 32, 0.08) 120px,
            rgba(11, 19, 32, 0.08) 160px
          );
          mix-blend-mode: overlay;
          opacity: 0.5;
        }

        /* Background Layer 3: Particles (60% strength) */
        .journey-particles {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: radial-gradient(
              circle at 25% 35%,
              rgba(212, 175, 55, 0.15) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 75% 25%,
              rgba(212, 175, 55, 0.15) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 45% 65%,
              rgba(212, 175, 55, 0.15) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 85% 55%,
              rgba(212, 175, 55, 0.15) 1.5px,
              transparent 1.5px
            );
          background-size: 100% 100%;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* Background Layer 4: Film Grain (60% strength) */
        .journey-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.02) 0px,
              rgba(0, 0, 0, 0.02) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 0px,
              rgba(0, 0, 0, 0.02) 1px,
              transparent 1px,
              transparent 2px
            );
          opacity: 0.6;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* Content Layer */
        .journey-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: min(1180px, 92vw);
          margin-inline: auto;
          display: grid;
          gap: clamp(64px, 8vw, 96px);
        }

        /* Hero Section */
        .journey-hero {
          display: grid;
          gap: clamp(20px, 3vw, 28px);
          justify-items: center;
          text-align: center;
        }

        .journey-hero h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(36px, 5.5vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 700;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .journey-subtitle {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
          font-family: var(--font-body);
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.6;
          max-width: 50ch;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
        }

        /* Timeline Grid */
        .journey-timeline {
          display: grid;
          gap: clamp(28px, 4vw, 40px);
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        /* Glass Cards */
        .journey-card {
          position: relative;
          display: grid;
          gap: 1rem;
          padding: clamp(32px, 5vw, 44px);
          border-radius: 22px;
          background: color-mix(in oklab, #0b1320 42%, transparent);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.28);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
          color: #ffffff;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity var(--motion-normal) var(--motion-easing),
            transform var(--motion-normal) var(--motion-easing),
            box-shadow var(--motion-normal) var(--motion-easing);
        }

        .journey-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-inner-ring {
          position: absolute;
          inset: 8px;
          border-radius: inherit;
          border: 1px solid rgba(212, 175, 55, 0.18);
          opacity: 0.48;
          pointer-events: none;
          transition: opacity var(--motion-fast) var(--motion-easing);
        }

        .journey-card:hover {
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
          transform: translateY(-4px);
        }

        .journey-card:hover .card-inner-ring {
          opacity: 0.7;
        }

        .journey-card:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-accent-gold),
            0 0 0 6px rgba(212, 175, 55, 0.25);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--smh-primary-magenta), var(--smh-primary-teal));
          border: 1px solid var(--smh-accent-gold);
        }

        .icon-number {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }

        .journey-card h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 600;
          line-height: 1.2;
        }

        .journey-card p {
          margin: 0;
          font-family: var(--font-body);
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* CTA Panel */
        .journey-cta-panel {
          position: relative;
          border-radius: 26px;
          padding: clamp(40px, 6vw, 56px);
          background: color-mix(in oklab, #0b1320 42%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(212, 175, 55, 0.38);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.18),
            0 24px 60px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .journey-cta-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            transparent 70%
          );
          mix-blend-mode: soft-light;
          opacity: 0.45;
          pointer-events: none;
        }

        .cta-panel-veil {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(217, 75, 198, 0.08),
            rgba(0, 194, 199, 0.08)
          );
          pointer-events: none;
        }

        .cta-panel-content {
          position: relative;
          display: grid;
          gap: clamp(20px, 3vw, 28px);
          text-align: center;
          justify-items: center;
        }

        .cta-panel-content h3 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.15;
          font-family: var(--font-display);
          font-weight: 600;
        }

        .cta-panel-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
          font-family: var(--font-body);
          font-size: clamp(16px, 1.8vw, 18px);
          line-height: 1.6;
          max-width: 50ch;
        }

        .cta-panel-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 8px;
        }

        /* CTA Buttons */
        .journey-cta-primary,
        .journey-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          min-width: 200px;
          padding: 0.9rem 2.5rem;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: transform var(--motion-normal) var(--motion-easing),
            box-shadow var(--motion-normal) var(--motion-easing);
          cursor: pointer;
        }

        .journey-cta-primary {
          color: #1a1a1a;
          background: var(--cta-gradient);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35);
        }

        .journey-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45);
        }

        .journey-cta-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-accent-gold),
            0 0 0 6px rgba(212, 175, 55, 0.25);
        }

        .journey-cta-secondary {
          color: #ffffff;
          background: rgba(14, 22, 34, 0.42);
          border: 1px solid rgba(212, 175, 55, 0.38);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .journey-cta-secondary:hover {
          transform: translateY(-2px);
          border-color: rgba(212, 175, 55, 0.6);
          background: rgba(14, 22, 34, 0.55);
        }

        .journey-cta-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-accent-gold),
            0 0 0 6px rgba(212, 175, 55, 0.25);
        }

        @media (max-width: 768px) {
          .journey-section {
            padding: clamp(72px, 12vh, 120px) clamp(16px, 4vw, 32px);
          }

          .journey-timeline {
            grid-template-columns: 1fr;
          }

          .journey-cta-primary,
          .journey-cta-secondary {
            width: 100%;
            min-width: unset;
          }

          .cta-panel-actions {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .journey-cta-primary,
          .journey-cta-secondary {
            transition: none !important;
          }
          .journey-cta-primary:hover,
          .journey-cta-secondary:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

