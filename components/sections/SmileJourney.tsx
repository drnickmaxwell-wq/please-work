"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  reducedMotion?: boolean;
}

export default function SmileJourney({ 
  steps = defaultSteps,
  reducedMotion 
}: SmileJourneyProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const isMotionEnabled = reducedMotion !== undefined ? !reducedMotion : !prefersReducedMotion;

  // Parallax effect for hero
  useEffect(() => {
    if (!isMotionEnabled || !heroRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMotionEnabled]);

  // Stagger reveal animation for timeline steps
  useEffect(() => {
    if (!isMotionEnabled) {
      setVisibleSteps(steps.map((_, i) => i));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleSteps.includes(index)) {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 80); // 80ms stagger delay
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [steps, isMotionEnabled, visibleSteps]);

  const waveTransform = isMotionEnabled
    ? `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`
    : "translate(0, 0)";
  
  const particlesTransform = isMotionEnabled
    ? `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`
    : "translate(0, 0)";

  const getIconPath = (icon?: string) => {
    switch (icon) {
      case "scan":
        return "/assets/manus/icons/scan.svg";
      case "sparkle":
        return "/assets/manus/icons/smile-curve.svg";
      case "implant":
        return "/assets/manus/icons/scan.svg";
      default:
        return null;
    }
  };

  return (
    <>
      {/* Journey Hero Section */}
      <section
        ref={heroRef}
        className="journey-hero"
        aria-labelledby="journey-hero-title"
      >
        <div className="journey-hero-gradient" />

        <div
          className="journey-hero-wave"
          style={{
            transform: waveTransform,
            transition: isMotionEnabled ? "transform 0.48s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
          }}
        />

        <div
          className="journey-hero-particles"
          style={{
            transform: particlesTransform,
            transition: isMotionEnabled ? "transform 0.48s cubic-bezier(0.65, 0, 0.35, 1)" : "none",
          }}
        />

        <div className="journey-hero-grain" />

        <div className="journey-hero-content">
          <div className="container">
            <h2 id="journey-hero-title" className="journey-hero-title">
              Your Smile Journey
            </h2>

            <p className="journey-hero-subtitle">
              Discover the path to your perfect smile
            </p>

            <div>
              <Link href="/ai-smile-quiz" className="journey-hero-cta">
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="journey-timeline" aria-label="Patient journey timeline">
        <div className="container">
          <div className="timeline-wrapper">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index);
              const isLeft = index % 2 === 0;
              const iconPath = getIconPath(step.icon);

              return (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`timeline-step ${isLeft ? "timeline-step-left" : "timeline-step-right"} ${
                    isVisible ? "timeline-step-visible" : ""
                  }`}
                  style={{
                    opacity: isMotionEnabled ? (isVisible ? 1 : 0) : 1,
                    transform: isMotionEnabled
                      ? isVisible
                        ? "translateY(0)"
                        : "translateY(20px)"
                      : "translateY(0)",
                    transition: isMotionEnabled
                      ? "opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)"
                      : "none",
                  }}
                >
                  <div className="timeline-step-card">
                    {iconPath && (
                      <div className="timeline-step-icon">
                        <img src={iconPath} alt="" aria-hidden="true" />
                      </div>
                    )}
                    <h3 className="timeline-step-title">{step.title}</h3>
                    <p className="timeline-step-body">{step.body}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="timeline-connector">
                      <div
                        className="timeline-connector-line"
                        style={{
                          animation: isMotionEnabled && isVisible
                            ? "shimmer 3s ease-in-out infinite"
                            : "none",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey CTA Section */}
      <section className="journey-cta">
        <div className="container">
          <div className="journey-cta-card">
            <div className="journey-cta-gradient" />
            <div className="journey-cta-content">
              <h3 className="journey-cta-title">Ready to Begin?</h3>
              <p className="journey-cta-subtitle">Take the first step toward your perfect smile</p>
              <div className="journey-cta-actions">
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
      </section>

      <style jsx>{`
        /* Journey Hero */
        .journey-hero {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          padding: 6rem 0 4rem;
          overflow: hidden;
          text-align: center;
        }

        @media (max-width: 768px) {
          .journey-hero {
            min-height: 45vh;
            padding: 4rem 0 3rem;
          }
        }

        .journey-hero-gradient {
          position: absolute;
          inset: 0;
          background: var(--gradient-champagne);
          z-index: 1;
        }

        .journey-hero-wave {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image: url('/assets/manus/waves/home-hero-mask-desktop.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.35;
          mix-blend-mode: overlay;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .journey-hero-wave {
            background-image: url('/assets/manus/waves/home-hero-mask-mobile.webp');
          }
        }

        .journey-hero-particles {
          position: absolute;
          inset: 0;
          z-index: 3;
          background-image: url('/assets/manus/particles/home-hero-particles.webp');
          background-size: 1024px 1024px;
          background-repeat: repeat;
          opacity: 0.06;
          mix-blend-mode: screen;
          will-change: transform;
          pointer-events: none;
        }

        .journey-hero-grain {
          position: absolute;
          inset: 0;
          z-index: 4;
          background-image: url('/assets/manus/textures/home-hero-film-grain.webp');
          background-size: 512px 512px;
          background-repeat: repeat;
          opacity: 0.06;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .journey-hero-content {
          position: relative;
          z-index: 5;
          width: 100%;
          color: var(--paper);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 3rem);
        }

        .journey-hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0 0 1.25rem 0;
          color: var(--paper);
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'};
        }

        .journey-hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 2rem;
          color: rgba(255, 255, 255, 0.95);
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.1s both' : 'none'};
        }

        .journey-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
          min-height: 44px;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          background: var(--gradient-cta);
          color: var(--paper);
          border: none;
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-glow);
          transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
          animation: ${isMotionEnabled ? 'fadeInUp 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.22s both' : 'none'};
        }

        .journey-hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), 0 12px 32px rgba(194, 24, 91, 0.3);
        }

        .journey-hero-cta:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--brand-gold), var(--shadow-gold-glow);
        }

        /* Journey Timeline */
        .journey-timeline {
          padding: 6rem 0;
          background: var(--background);
        }

        @media (max-width: 768px) {
          .journey-timeline {
            padding: 4rem 0;
          }
        }

        .timeline-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Timeline Center Line (Desktop) */
        @media (min-width: 769px) {
          .timeline-wrapper::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, 
              transparent 0%, 
              rgba(212, 175, 55, 0.3) 10%, 
              rgba(212, 175, 55, 0.3) 90%, 
              transparent 100%
            );
            transform: translateX(-50%);
          }
        }

        .timeline-step {
          position: relative;
          margin-bottom: 4rem;
        }

        @media (min-width: 769px) {
          .timeline-step-left .timeline-step-card {
            margin-right: 52%;
          }

          .timeline-step-right .timeline-step-card {
            margin-left: 52%;
          }
        }

        .timeline-step-card {
          position: relative;
          background: rgba(12, 21, 32, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          box-shadow: 0 20px 45px rgba(7, 12, 16, 0.28);
          transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .timeline-step-card:hover {
          border-color: var(--brand-gold);
          transform: translateY(-2px);
          box-shadow: 0 24px 50px rgba(7, 12, 16, 0.35);
        }

        .timeline-step-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          padding: 12px;
          background: var(--gradient-champagne);
          border: 1px solid var(--brand-gold);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-step-icon img {
          width: 24px;
          height: 24px;
          filter: brightness(0) invert(1);
        }

        .timeline-step-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          margin: 0 0 0.9rem 0;
          color: rgba(249, 232, 195, 0.88);
        }

        .timeline-step-body {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
        }

        .timeline-connector {
          position: absolute;
          top: 50%;
          width: 48%;
          height: 2px;
          z-index: -1;
        }

        @media (min-width: 769px) {
          .timeline-step-left .timeline-connector {
            left: 50%;
            margin-left: 1rem;
          }

          .timeline-step-right .timeline-connector {
            right: 50%;
            margin-right: 1rem;
          }
        }

        @media (max-width: 768px) {
          .timeline-connector {
            display: none;
          }
        }

        .timeline-connector-line {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            var(--brand-gold) 0%, 
            rgba(212, 175, 55, 0.48) 100%
          );
          opacity: 0.48;
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.48;
          }
          50% {
            opacity: 0.72;
          }
        }

        /* Journey CTA */
        .journey-cta {
          padding: 6rem 0;
          background: var(--background);
        }

        @media (max-width: 768px) {
          .journey-cta {
            padding: 4rem 0;
          }
        }

        .journey-cta-card {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          background: rgba(12, 21, 32, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--brand-gold);
          border-radius: 24px;
          padding: clamp(2.5rem, 5vw, 4rem);
          text-align: center;
          overflow: hidden;
        }

        .journey-cta-gradient {
          position: absolute;
          inset: 0;
          background: var(--gradient-champagne);
          opacity: 0.08;
          z-index: 0;
        }

        .journey-cta-content {
          position: relative;
          z-index: 1;
        }

        .journey-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: var(--paper);
        }

        .journey-cta-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.2rem);
          margin: 0 0 2rem 0;
          color: rgba(255, 255, 255, 0.85);
        }

        .journey-cta-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .journey-cta-primary,
        .journey-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          min-height: 44px;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          border-radius: var(--radius-pill);
          transition: all 0.3s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .journey-cta-primary {
          background: var(--gradient-cta);
          color: var(--paper);
          border: none;
          box-shadow: var(--shadow-glow);
        }

        .journey-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow), 0 12px 32px rgba(194, 24, 91, 0.3);
        }

        .journey-cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          color: var(--paper);
          border: 1px solid var(--brand-gold);
        }

        .journey-cta-secondary:hover {
          background: rgba(212, 175, 55, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .journey-hero-wave,
          .journey-hero-particles,
          .timeline-connector-line {
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          
          .journey-hero-title,
          .journey-hero-subtitle,
          .journey-hero-cta {
            animation: none !important;
          }
          
          .journey-hero-cta:hover,
          .journey-cta-primary:hover,
          .journey-cta-secondary:hover,
          .timeline-step-card:hover {
            transform: none;
          }
        }

        @media (max-width: 640px) {
          .journey-cta-primary,
          .journey-cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

