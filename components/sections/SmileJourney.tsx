"use client";

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
}

export default function SmileJourney({ steps = defaultSteps }: SmileJourneyProps) {
  const iconMap = {
    scan: "/assets/manus/icons/scan.svg",
    sparkle: "/assets/manus/icons/smile-curve.svg",
    implant: "/assets/manus/icons/scan.svg",
  } as const;

  return (
    <section className="champagne-surface py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center text-white">
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Your Smile Journey</h2>
          <p className="text-base text-white/85 sm:text-lg">Discover the path to your perfect smile</p>
          <Link
            href="/ai-smile-quiz"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-black shadow-lg shadow-black/30 transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            Start Your Journey
          </Link>
        </header>

        <div className="mt-16 grid gap-8 text-white md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const iconPath = step.icon ? iconMap[step.icon] : undefined;
            return (
              <article
                key={step.title}
                className="champagne-glass flex h-full flex-col gap-4 p-6 text-white/90 transition-transform duration-300 ease-out hover:-translate-y-1 focus:outline-none focus-visible:-translate-y-1 md:p-7"
              >
                {iconPath && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <img src={iconPath} alt="" aria-hidden="true" className="h-6 w-6" />
                  </div>
                )}
                <h3 className="font-serif text-2xl text-white">{step.title}</h3>
                <p className="text-base leading-relaxed">{step.body}</p>
              </article>
            );
          })}
        </div>

        <div className="champagne-glass mt-16 flex flex-col gap-6 p-8 text-center text-white md:mt-20 md:p-10">
          <div className="space-y-3">
            <h3 className="font-serif text-3xl">Ready to Begin?</h3>
            <p className="text-white/85">Take the first step toward your perfect smile.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-black shadow-lg shadow-black/30 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              Book a consultation
            </Link>
            <Link
              href="/treatments"
              className="rounded-full border border-[var(--champagne-keyline-gold)] px-6 py-3 font-semibold text-white/90 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              See treatment options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
