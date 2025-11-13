// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from "next/link";

import { ChampagneSectionShell } from "@/components/champagne/ChampagneSectionShell";
import { ChampagneTreatmentHero } from "@/components/champagne/ChampagneTreatmentHero";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";
import TreatmentBanner from "@/components/preview/TreatmentBanner";

import "@/styles/treatments/preview-light.css";

const PREVIEW_ROUTES = [
  { slug: "3d-dentistry", label: "3D digital dentistry", summary: "Contactless scanning and same-day restorations." },
  { slug: "composite-bonding", label: "Composite bonding", summary: "Hand-layered artistry for micro refinements." },
  { slug: "cosmetic", label: "Cosmetic dentistry", summary: "Champagne-safe workspace for upcoming campaign copy." },
  { slug: "dental-implants", label: "Dental implants", summary: "Titanium precision with 3D planning and prosthetics." },
  { slug: "general", label: "General dentistry", summary: "Preventive and restorative care planning sandbox." },
  { slug: "implants", label: "Implants (alias)", summary: "Alias of dental implants preview for parity checks." },
  { slug: "orthodontics", label: "Orthodontics", summary: "Aligner journeys and retention roadmap scaffolding." },
  { slug: "technology", label: "Technology", summary: "Digital workflow, equipment, and FAQ explorations." },
  { slug: "veneers", label: "Porcelain veneers", summary: "Ultra-thin veneer planning with 3D visualiser." },
  { slug: "whitening", label: "Teeth whitening", summary: "Whitening pathways, stain education, and aftercare." },
];

export default function TreatmentsPreviewIndex() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <SchemaInjector route="/treatments" />

      <ChampagneTreatmentHero
        treatmentKey="general"
        eyebrow="Preview hub"
        title="Treatment previews in Champagne"
        subtitle="Preview Champagne variants before they reach production. Each route keeps the hero wave, gradient law, and schema coverage aligned with the design system."
        primaryCta={{ label: "View production treatments", href: "/treatments" }}
        secondaryCta={{ label: "Book a consultation", href: "/contact" }}
        schemaRoute="/treatments"
        footnote={
          <span>
            Preview-only surfaces use soft gold balancing to stay within the 4% gold guidance while keeping Champagne warmth.
          </span>
        }
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <ChampagneSectionShell
          id="preview-directory"
          treatmentKey="general"
          label="Preview routes"
          tone="highlight"
        >
          <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">
            Use these links to review layouts, tone adjustments, and schema HUD output before routing updates go live.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {PREVIEW_ROUTES.map((route) => (
              <Link
                key={route.slug}
                className="group block rounded-2xl p-6 transition-transform duration-300"
                href={`/preview/treatments/${route.slug}`}
                style={{
                  background: "color-mix(in oklab, var(--smh-white) 14%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--smh-primary-teal) 18%, transparent)",
                  boxShadow: "0 18px 38px color-mix(in srgb, var(--smh-ink) 12%, transparent)",
                }}
              >
                <h2
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                >
                  {route.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                  {route.summary}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--smh-primary-teal)_62%,var(--smh-ink)_38%)]"
                  style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
                >
                  View preview
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="technology" tone="muted" label="Schema & HUD references">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_12%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_88%,transparent)] p-5">
              <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-primary-teal)_64%,var(--smh-ink)_36%)]">
                Schema coverage
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                Heroes stay linked to the preview schema packs for Service, HowTo, and FAQ validation. Watch the HUD overlay for badges while reviewing copy.
              </p>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-magenta)_12%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-5">
              <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_64%,var(--smh-ink)_36%)]">
                Tone controls
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                Section shells inherit the same variant key as their hero, keeping gradients, borders, and copy blocks harmonised without touching production styles.
              </p>
            </div>
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="general" tone="muted">
          <TreatmentBanner
            label="Reminder"
            title="Production treatment pages remain untouched"
            subtitle="All Champagne experiments live only under /preview. Continue reviewing tone, motion, and schema before migrating to the production routes."
          />
        </ChampagneSectionShell>
      </div>
    </main>
  );
}
