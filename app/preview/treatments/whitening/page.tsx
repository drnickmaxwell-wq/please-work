// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from "next/link";

import { ChampagneSectionShell } from "@/components/champagne/ChampagneSectionShell";
import { ChampagneTreatmentHero } from "@/components/champagne/ChampagneTreatmentHero";
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
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <SchemaInjector route="/treatments/whitening" />

      <ChampagneTreatmentHero
        treatmentKey="whitening"
        eyebrow="Teeth whitening"
        title="Whitening that stays luminous"
        subtitle="Preview the Champagne whitening journey with bright, pearl-toned gradients and minimal gold."
        primaryCta={{ label: "Book whitening consult", href: "/contact" }}
        secondaryCta={{ label: "View all previews", href: "/preview/treatments" }}
        schemaRoute="/treatments/whitening"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <ChampagneSectionShell treatmentKey="whitening" id="benefits" label="Why guests choose our whitening">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_14%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_94%,var(--smh-accent-gold-soft)_6%)] p-6"
              >
                <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="whitening" id="pathways" label="Tailored whitening pathways" tone="muted">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)] lg:grid-cols-3">
            {options.map((option) => (
              <article
                key={option.name}
                className="flex h-full flex-col gap-3 rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_16%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_95%,transparent)] p-6"
              >
                <header>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                    {option.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_58%,var(--smh-ink)_42%)]">
                    {option.duration} · {option.results}
                  </p>
                </header>
                <p className="text-base leading-relaxed">{option.summary}</p>
                <ul className="mt-auto space-y-2 text-sm leading-relaxed">
                  {option.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="whitening" id="stains" label="Understanding different stains">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)] lg:grid-cols-3">
            {stainTypes.map((type) => (
              <article
                key={type.label}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-magenta)_14%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_95%,transparent)] p-6"
              >
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                  {type.label}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_58%,var(--smh-ink)_42%)]">
                  Common causes
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {type.causes.map((cause) => (
                    <li key={cause}>{cause}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed">{type.approach}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_58%,var(--smh-ink)_42%)]">
                  {type.success}
                </p>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="whitening" id="aftercare" label="Aftercare guidance" tone="muted">
          <div className="grid gap-6 text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {aftercare.map((entry) => (
              <article
                key={entry.title}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_14%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_94%,transparent)] p-6"
              >
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                  {entry.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  {entry.notes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <span aria-hidden>•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="whitening" id="cta" label="Ready to brighten" tone="highlight">
          <div className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)]">
            <p>
              Use these CTAs to plug in scheduling widgets, finance options, or educational downloads. Keep hover offsets subtle to respect Champagne motion rules.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-teal)_26%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_94%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-teal)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Book consultation
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_22%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_94%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/preview/treatments"
              >
                Explore more previews
              </Link>
            </div>
          </div>
        </ChampagneSectionShell>
      </div>
    </main>
  );
}
