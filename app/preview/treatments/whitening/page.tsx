// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from "next/link";

import { ChampagneTreatmentHero } from "@/components/treatments/ChampagneTreatmentHero";
import {
  LuxeCard,
  LuxeSection,
  PreviewMain,
  PreviewPageShell,
} from "@/components/treatments/preview";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

import "@/styles/treatments/preview-light.css";

const benefits = [
  {
    title: "Immediate results",
    description: "See dramatic whitening results in a single professional session calibrated for Champagne comfort.",
  },
  {
    title: "Safe & effective",
    description: "Professional-grade whitening protects enamel while lifting stains with even coverage.",
  },
  {
    title: "Long lasting",
    description: "Results can last 12–18 months with thoughtful aftercare, touch-ups, and hygiene visits.",
  },
  {
    title: "Confidence boost",
    description: "A brighter smile elevates presence for events, photography, and everyday confidence.",
  },
];

const options = [
  {
    name: "In-practice whitening",
    summary: "Fastest lift with dentist-applied gels and LED activation for enhanced brightness.",
    duration: "60–90 minutes",
    results: "Up to 8 shades lighter",
    highlights: [
      "Applied in practice with precision isolation",
      "Comfort-first LED activation",
      "Immediate reveal before you leave",
      "Perfect for rapid event prep",
    ],
  },
  {
    name: "Take-home whitening trays",
    summary: "Custom-fitted trays and professional gels allow gradual, flexible whitening at home.",
    duration: "1–2 weeks",
    results: "Up to 6 shades lighter",
    highlights: [
      "Thermoformed trays from your digital scans",
      "Professional gels for even coverage",
      "Evening or weekend flexibility",
      "Easy top-ups whenever needed",
    ],
  },
  {
    name: "Combination care",
    summary: "Begin in practice and maintain at home for long-lasting brilliance and even tone.",
    duration: "Ongoing",
    results: "Maximum whitening potential",
    highlights: [
      "Best-of-both schedules",
      "Custom plans for lasting brightness",
      "Top-up gels included",
      "Supports extended maintenance",
    ],
  },
];

const stainTypes = [
  {
    label: "Surface stains",
    causes: ["Coffee", "Tea", "Wine", "Tobacco"],
    approach: "Easily removed with a single professional session.",
    success: "95% response rate",
  },
  {
    label: "Age-related stains",
    causes: ["Enamel thinning", "Natural dentine changes"],
    approach: "Responds well to calibrated whitening under supervision.",
    success: "85% response rate",
  },
  {
    label: "Intrinsic stains",
    causes: ["Medications", "Fluorosis", "Tooth trauma"],
    approach: "May require layered treatments or veneers for complete correction.",
    success: "70% response rate",
  },
];

const aftercare = [
  {
    title: "First 48 hours",
    notes: [
      "Avoid richly coloured foods and drinks.",
      "Use a straw for any coloured beverages.",
      "Skip tobacco products while enamel settles.",
      "Choose clear or white dishes to maintain lift.",
    ],
  },
  {
    title: "Long-term maintenance",
    notes: [
      "Attend hygiene visits every 6 months.",
      "Use a gentle whitening toothpaste weekly.",
      "Rinse after stain-prone meals.",
      "Refresh with top-up syringes when needed.",
    ],
  },
];

export default function WhiteningPreviewPage() {
  return (
    <PreviewPageShell>
      <SchemaInjector route="/treatments/whitening" />

      <ChampagneTreatmentHero
        tone="whitening"
        eyebrow="Teeth whitening"
        title="Whitening that stays luminous"
        subtitle="Pearl-toned gradients and minimal gold detailing keep the experience calm, bright, and true to Champagne."
        primaryCta={{ label: "Book whitening consult", href: "/contact" }}
        secondaryCta={{ label: "View all previews", href: "/preview/treatments" }}
      />

      <PreviewMain>
        <LuxeSection tone="whitening" id="benefits" label="Why guests choose our whitening">
          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <LuxeCard key={benefit.title}>
                <h3
                  className="text-xl font-semibold text-[color-mix(in_oklab,var(--smh-ink)_86%,transparent)]"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                >
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
                  {benefit.description}
                </p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" surfaceTone="muted" id="pathways" label="Tailored whitening pathways">
          <div className="grid gap-6 lg:grid-cols-3">
            {options.map((option) => (
              <LuxeCard key={option.name} tone="default" className="flex h-full flex-col gap-3">
                <header>
                  <h3
                    className="text-lg font-semibold text-[color-mix(in_oklab,var(--smh-ink)_84%,transparent)]"
                    style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                  >
                    {option.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_58%,var(--smh-ink)_42%)]">
                    {option.duration} · {option.results}
                  </p>
                </header>
                <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
                  {option.summary}
                </p>
                <ul className="mt-auto space-y-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                  {option.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" id="stains" label="Understanding different stains">
          <div className="grid gap-6 lg:grid-cols-3">
            {stainTypes.map((type) => (
              <LuxeCard key={type.label} tone="default" className="flex h-full flex-col gap-3">
                <h3
                  className="text-lg font-semibold text-[color-mix(in_oklab,var(--smh-ink)_84%,transparent)]"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                >
                  {type.label}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_58%,var(--smh-ink)_42%)]">
                  Common causes
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[color-mix(in_oklab,var(--smh-ink)_70%,transparent)]">
                  {type.causes.map((cause) => (
                    <li key={cause}>{cause}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
                  {type.approach}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_58%,var(--smh-ink)_42%)]">
                  {type.success}
                </p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" surfaceTone="muted" id="aftercare" label="Aftercare guidance">
          <div className="grid gap-6 md:grid-cols-2">
            {aftercare.map((entry) => (
              <LuxeCard key={entry.title} tone="default" className="flex h-full flex-col gap-3">
                <h3
                  className="text-lg font-semibold text-[color-mix(in_oklab,var(--smh-ink)_84%,transparent)]"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                >
                  {entry.title}
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="whitening" surfaceTone="highlight" id="cta" label="Ready to brighten">
          <LuxeCard tone="default" className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_74%,transparent)]">
              Pair in-practice whitening with at-home maintenance to hold your preferred shade. Schema HUD confirms Service and
              HowTo packs are wired for this route.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-teal)_28%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-teal)_70%,var(--smh-ink)_30%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Book whitening consult
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_22%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/preview/treatments"
              >
                Back to previews
              </Link>
            </div>
          </LuxeCard>
        </LuxeSection>
      </PreviewMain>
    </PreviewPageShell>
  );
}
