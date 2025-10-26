"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface JourneyStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    icon: "📋",
    title: "Initial Consultation",
    description:
      "Meet with our expert team to discuss your smile goals and explore treatment options tailored to your needs.",
  },
  {
    id: 2,
    icon: "🔬",
    title: "Digital Scan",
    description:
      "Experience our state-of-the-art 3D scanning technology for precise, comfortable impressions without traditional molds.",
  },
  {
    id: 3,
    icon: "📊",
    title: "Personalized Plan",
    description:
      "Receive a comprehensive treatment plan with clear timelines, costs, and expected outcomes for your smile transformation.",
  },
  {
    id: 4,
    icon: "😊",
    title: "Trial Smile Preview",
    description:
      "See your future smile before treatment begins with our advanced digital smile design and visualization technology.",
  },
  {
    id: 5,
    icon: "🦷",
    title: "Treatment Journey",
    description:
      "Begin your transformation with gentle, precise care using modern techniques and continuous support from our team.",
  },
  {
    id: 6,
    icon: "✨",
    title: "Smile Reveal",
    description:
      "Celebrate your new smile with confidence, backed by our commitment to long-term care and maintenance guidance.",
  },
];

export interface SmileJourneyProps {
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function SmileJourney({
  title = "Your Smile Journey",
  subtitle = "Discover the path to your perfect smile with our comprehensive, patient-centered approach",
  ctaTitle = "Ready to Begin?",
  ctaSubtitle = "Take the first step toward your perfect smile today.",
  primaryHref = "/book",
  primaryLabel = "Book a consultation",
  secondaryHref = "/treatments",
  secondaryLabel = "See treatment options",
}: SmileJourneyProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
    if (prefersReducedMotion) {
      // Show all cards immediately if reduced motion is preferred
      setVisibleCards(new Set(JOURNEY_STEPS.map((step) => step.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(
              entry.target.getAttribute("data-card-id") || "0",
              10
            );
            if (cardId) {
              // Stagger delay: 80ms per card
              const delay = (cardId - 1) * 80;
              setTimeout(() => {
                setVisibleCards((prev) => new Set([...prev, cardId]));
              }, delay);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="smile-journey" aria-labelledby="journey-title">
      {/* Background layers at 60% strength */}
      <div className="journey-gradient" aria-hidden="true" />
      <div className="journey-waves" aria-hidden="true">
        <div className="wave-layer wave-1" />
        <div className="wave-layer wave-2" />
        <div className="wave-layer wave-3" />
      </div>
      <div className="journey-grain" aria-hidden="true" />

      {/* Content */}
      <div className="journey-content">
        {/* Header */}
        <header className="journey-header">
          <h2 id="journey-title">{title}</h2>
          {subtitle && <p className="journey-subtitle">{subtitle}</p>}
          <Link href={primaryHref} className="journey-header-cta">
            {primaryLabel}
          </Link>
        </header>

        {/* Timeline Cards Grid */}
        <div className="journey-grid" role="list">
          {JOURNEY_STEPS.map((step) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) cardRefs.current.set(step.id, el);
              }}
              data-card-id={step.id}
              className={`journey-card ${
                visibleCards.has(step.id) ? "visible" : ""
              }`}
              role="listitem"
            >
              {/* Gold inner keyline */}
              <div className="card-inner-ring" aria-hidden="true" />
              
              <div className="card-badge" aria-hidden="true">
                {step.id}
              </div>
              
              <div className="card-icon" aria-hidden="true">
                {step.icon}
              </div>
              
              <h3 className="card-title">{step.title}</h3>
              <p className="card-description">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Panel */}
        <div className="journey-cta-panel">
          <div className="cta-panel-inner">
            <h3 className="cta-title">{ctaTitle}</h3>
            {ctaSubtitle && <p className="cta-subtitle">{ctaSubtitle}</p>}

            <div className="cta-actions" role="group" aria-label="Call to action">
              <Link href={primaryHref} className="cta-btn cta-btn-primary">
                {primaryLabel}
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link href={secondaryHref} className="cta-btn cta-btn-secondary">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .smile-journey {
          position: relative;
          width: 100%;
          padding: clamp(80px, 10vh, 120px) clamp(20px, 5vw, 60px);
          overflow: hidden;
          isolation: isolate;
        }

        /* Background layers at 60% strength */
        .journey-gradient {
          position: absolute;
          inset: 0;
          background: var(--smh-gradient);
          opacity: 0.6;
          z-index: 1;
        }

        .journey-waves {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.6;
        }

        .wave-layer {
          position: absolute;
          inset: 0;
          mix-blend-mode: overlay;
        }

        .wave-1 {
          background: linear-gradient(
            135deg,
            transparent 0%,
            transparent 20%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.08) 60%,
            transparent 80%,
            transparent 100%
          );
          opacity: 0.5;
        }

        .wave-2 {
          background: linear-gradient(
            125deg,
            transparent 0%,
            transparent 30%,
            rgba(0, 0, 0, 0.06) 45%,
            rgba(0, 0, 0, 0.1) 55%,
            rgba(0, 0, 0, 0.06) 65%,
            transparent 85%,
            transparent 100%
          );
          opacity: 0.3;
        }

        .wave-3 {
          background: linear-gradient(
            145deg,
            transparent 0%,
            transparent 25%,
            rgba(255, 255, 255, 0.05) 42%,
            rgba(255, 255, 255, 0.09) 52%,
            rgba(255, 255, 255, 0.05) 62%,
            transparent 78%,
            transparent 100%
          );
          opacity: 0.4;
        }

        .journey-grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 1px,
              transparent 2px
            );
          opacity: calc(var(--grain-opacity) * 0.6);
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        /* Content */
        .journey-content {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: min(1400px, 94vw);
          margin-inline: auto;
          display: grid;
          gap: clamp(48px, 6vw, 72px);
        }

        /* Header */
        .journey-header {
          display: grid;
          gap: clamp(16px, 2vw, 24px);
          text-align: center;
          justify-items: center;
        }

        h2 {
          margin: 0;
          color: var(--smh-text);
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          font-family: var(--font-display);
          font-weight: 700;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .journey-subtitle {
          margin: 0;
          color: var(--smh-text-muted);
          font-family: var(--font-body);
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.6;
          max-width: 64ch;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
        }

        .journey-header-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0.9rem 2.5rem;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          color: var(--smh-bg);
          background: var(--cta-gradient);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35),
            inset 0 0 0 1px rgba(212, 175, 55, 0.5);
          transition: transform var(--motion-normal) var(--motion-easing),
            box-shadow var(--motion-normal) var(--motion-easing);
          cursor: pointer;
        }

        .journey-header-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45),
            inset 0 0 0 1px rgba(212, 175, 55, 0.7);
        }

        .journey-header-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-bg),
            0 0 0 6px var(--smh-accent-gold),
            inset 0 0 0 2px rgba(212, 175, 55, 0.8);
        }

        /* Timeline Cards Grid */
        .journey-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
          gap: clamp(24px, 3vw, 32px);
        }

        @media (min-width: 768px) {
          .journey-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .journey-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Glass Cards with Gold Inner Keyline */
        .journey-card {
          position: relative;
          padding: clamp(32px, 4vw, 40px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          display: grid;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity var(--motion-slow) var(--motion-easing),
            transform var(--motion-slow) var(--motion-easing),
            box-shadow var(--motion-normal) var(--motion-easing);
        }

        .journey-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .journey-card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* Gold Inner Keyline (not outer stroke) */
        .card-inner-ring {
          position: absolute;
          inset: 8px;
          border: 1px solid var(--smh-accent-gold);
          border-radius: 12px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .card-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--cta-gradient);
          border-radius: 50%;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 18px;
          color: var(--smh-bg);
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3),
            inset 0 0 0 1px rgba(212, 175, 55, 0.5);
          z-index: 2;
        }

        .card-icon {
          font-size: 48px;
          line-height: 1;
          margin-top: 32px;
        }

        .card-title {
          margin: 0;
          color: var(--smh-text);
          font-size: clamp(20px, 2vw, 24px);
          line-height: 1.2;
          font-family: var(--font-display);
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .card-description {
          margin: 0;
          color: var(--smh-text-muted);
          font-family: var(--font-body);
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.6;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        /* CTA Panel */
        .journey-cta-panel {
          margin-top: clamp(32px, 4vw, 48px);
        }

        .cta-panel-inner {
          position: relative;
          padding: clamp(48px, 6vw, 64px) clamp(32px, 5vw, 48px);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 0 0 1px rgba(212, 175, 55, 0.3);
          display: grid;
          gap: clamp(20px, 3vw, 28px);
          text-align: center;
          justify-items: center;
        }

        .cta-title {
          margin: 0;
          color: var(--smh-text);
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.1;
          font-family: var(--font-display);
          font-weight: 700;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .cta-subtitle {
          margin: 0;
          color: var(--smh-text-muted);
          font-family: var(--font-body);
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.6;
          max-width: 56ch;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .cta-btn {
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

        .cta-btn-primary {
          color: var(--smh-bg);
          background: var(--cta-gradient);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.35),
            inset 0 0 0 1px rgba(212, 175, 55, 0.5);
        }

        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45),
            inset 0 0 0 1px rgba(212, 175, 55, 0.7);
        }

        .cta-btn-primary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-bg),
            0 0 0 6px var(--smh-accent-gold),
            inset 0 0 0 2px rgba(212, 175, 55, 0.8);
        }

        .cta-btn-secondary {
          color: var(--smh-text);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid var(--smh-accent-gold);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.3);
        }

        .cta-btn-secondary:hover {
          transform: translateY(-2px);
          border-color: var(--smh-accent-gold);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.5);
        }

        .cta-btn-secondary:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--smh-bg),
            0 0 0 6px var(--smh-accent-gold),
            inset 0 0 0 1px rgba(212, 175, 55, 0.6);
        }

        @media (prefers-color-scheme: dark) {
          h2,
          .card-title,
          .cta-title {
            color: var(--smh-text);
          }
          .journey-subtitle,
          .card-description,
          .cta-subtitle {
            color: var(--smh-text-muted);
          }
          .journey-card,
          .cta-panel-inner {
            background: rgba(13, 14, 16, 0.4);
            border-color: rgba(255, 255, 255, 0.15);
          }
          .cta-btn-primary {
            color: var(--smh-bg);
          }
          .cta-btn-secondary {
            color: var(--smh-text);
            background: rgba(13, 14, 16, 0.3);
          }
        }

        @media (max-width: 768px) {
          .cta-btn {
            width: 100%;
            min-width: unset;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-header-cta,
          .cta-btn {
            transition: none !important;
          }
          .journey-header-cta:hover,
          .cta-btn:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

