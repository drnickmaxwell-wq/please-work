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
      aria-labelledby="journey-hero-title"
      className="champagne-surface relative overflow-hidden py-24 md:py-32"
      data-particles={particlesActive ? "on" : "off"}
      data-wave="off"
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      <div className="relative">
        {particlesActive ? (
          <Particles className="champagne-particles" data-state="on" aria-hidden />
        ) : (
          <div className="champagne-particles" data-state="off" aria-hidden style={{ opacity: 0 }} />
        )}

        <div className="relative z-[20] mx-auto max-w-7xl px-4 md:px-6">
          <h2
            id="journey-hero-title"
            className="text-center text-3xl font-serif font-semibold tracking-tight text-white md:text-4xl"
          >
            Your Smile Journey
          </h2>
          <p className="mt-3 mx-auto max-w-3xl text-center text-base opacity-90 text-white md:text-lg">
            Discover the path to your perfect smile with a guided experience curated by Manus AI.
          </p>

          <div className="mt-12 grid gap-8 text-white/90 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const iconPath = step.icon ? iconMap[step.icon] : undefined;
              const connectorClass =
                index < 3
                  ? "after:hidden lg:after:absolute lg:after:left-1/2 lg:after:bottom-[-48px] lg:after:block lg:after:h-12 lg:after:w-px lg:after:-translate-x-1/2 lg:after:bg-[color:var(--champagne-keyline-gold)] lg:after:opacity-40 lg:after:content-['']"
                  : "";
              return (
                <article
                  key={step.title}
                  className={[
                    "champagne-glass relative overflow-hidden rounded-champagne p-6 text-white/92 shadow-champagne md:p-7",
                    connectorClass,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  tabIndex={0}
                >
                  {iconPath && (
                    <div className="mb-6 flex flex-col items-center text-[color:var(--champagne-keyline-gold)]">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--champagne-keyline-gold)] bg-white/5">
                        <img src={iconPath} alt="" aria-hidden="true" className="h-7 w-7" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-4 h-4 border-l border-[color:var(--champagne-keyline-gold)] opacity-60"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-2xl tracking-tight text-white">{step.title}</h3>
                  <p className="text-base leading-relaxed text-white/85">{step.body}</p>
                </article>
              );
            })}
          </div>

          <div className="champagne-glass mt-16 rounded-champagne border border-[color:var(--champagne-keyline-gold)] p-8 text-center text-white/92 shadow-champagne md:mt-20 md:p-10">
            <div className="space-y-3">
              <h3 className="font-serif text-3xl tracking-tight text-white">Ready to Begin?</h3>
              <p className="text-white/80">Take the first step toward your perfect smile.</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-[color:var(--smh-primary-ink)] transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
              >
                Book a consultation
              </Link>
              <Link
                href="/ai-smile-quiz"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 font-semibold text-white/90 transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
              >
                Start your AI smile preview
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="champagne-sheen-layer" />
    </section>
  );
}
