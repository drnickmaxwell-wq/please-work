// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from "next/link";

import { ChampagneTreatmentHero } from "@/components/treatments/ChampagneTreatmentHero";
import { LuxeCard, LuxeSection } from "@/components/treatments/preview";
import TreatmentBanner from "@/components/preview/TreatmentBanner";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

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
    <main className="min-h-screen bg-[color-mix(in_oklab,var(--smh-white)_96%,transparent)] text-[color-mix(in_oklab,var(--smh-ink)_92%,transparent)]">
      <SchemaInjector route="/treatments" />

      <ChampagneTreatmentHero
        variant="general"
        eyebrow="Preview hub"
        title="Treatment previews in Champagne"
        kicker="Review gradients, motion, and schema before launch"
        description="Preview Champagne variants before they reach production. Each route keeps the hero wave, gradient law, and schema coverage aligned with the design system."
        primaryCta={{ label: "View production treatments", href: "/treatments" }}
        secondaryCta={{ label: "Book a consultation", href: "/contact" }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <LuxeSection
          variant="general"
          tone="highlight"
          label="Preview routes"
          description="Use these links to review layouts, tone adjustments, and schema HUD output before routing updates go live."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {PREVIEW_ROUTES.map((route) => (
              <Link key={route.slug} href={`/preview/treatments/${route.slug}`} className="group block no-underline">
                <LuxeCard className="h-full">
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
                  >
                    {route.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                    {route.summary}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[color-mix(in_oklab,var(--smh-primary-teal)_62%,var(--smh-ink)_38%)] transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
                  >
                    View preview
                    <span aria-hidden>→</span>
                  </span>
                </LuxeCard>
              </Link>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection variant="technology" tone="muted" label="Schema & HUD references">
          <div className="grid gap-6 md:grid-cols-2">
            <LuxeCard>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_62%,var(--smh-ink)_38%)]">
                Schema coverage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                Heroes stay linked to the preview schema packs for Service, HowTo, and FAQ validation. Watch the HUD overlay for
                badges while reviewing copy.
              </p>
            </LuxeCard>
            <LuxeCard>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_60%,var(--smh-ink)_40%)]">
                Tone controls
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
                Section shells inherit the same variant key as their hero, keeping gradients, borders, and copy blocks harmonised
                without touching production styles.
              </p>
            </LuxeCard>
          </div>
        </LuxeSection>

        <LuxeSection variant="general" tone="muted">
          <TreatmentBanner
            label="Reminder"
            title="Production treatment pages remain untouched"
            subtitle="All Champagne experiments live only under /preview. Continue reviewing tone, motion, and schema before migrating to the production routes."
          />
        </LuxeSection>
      </div>
    </main>
  );
}
