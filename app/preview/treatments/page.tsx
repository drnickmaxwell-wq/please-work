import Link from "next/link";

import {
  ChampagneTreatmentHeroLuxe,
  LuxeCard,
  LuxeSection,
  PreviewMain,
  PreviewPageShell,
} from "@/components/luxe";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

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
    <PreviewPageShell>
      <SchemaInjector route="/treatments" />

      <ChampagneTreatmentHeroLuxe
        tone="general"
        eyebrow="Preview hub"
        title="Treatment previews in Champagne"
        subtitle="Review gradients, motion, and schema HUD output before these experiences ship to production."
        primaryCta={{ label: "View production treatments", href: "/treatments" }}
        secondaryCta={{ label: "Book a consultation", href: "/contact" }}
      />

      <PreviewMain>
        <LuxeSection
          tone="general"
          surfaceTone="highlight"
          label="Preview routes"
          description="Use these links to review layout, tone adjustments, and schema HUD output before routing updates go live."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {PREVIEW_ROUTES.map((route) => (
              <Link key={route.slug} href={`/preview/treatments/${route.slug}`} className="group block h-full no-underline">
                <LuxeCard className="h-full">
                  <h3 className="text-xl">{route.label}</h3>
                  <p className="text-base leading-relaxed">{route.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em]">
                    View preview <span aria-hidden>→</span>
                  </span>
                </LuxeCard>
              </Link>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="general" surfaceTone="muted" label="Schema & HUD references">
          <div className="grid gap-6 md:grid-cols-2">
            <LuxeCard>
              <h3 className="text-sm uppercase tracking-[0.2em]">Schema coverage</h3>
              <p className="text-base leading-relaxed">
                Heroes stay linked to the preview schema packs for Service, HowTo, and FAQ validation. Watch the HUD overlay for
                badges while reviewing copy.
              </p>
            </LuxeCard>
            <LuxeCard>
              <h3 className="text-sm uppercase tracking-[0.2em]">Tone controls</h3>
              <p className="text-base leading-relaxed">
                Section shells inherit the same tone key as their hero, so gradients, borders, and copy blocks stay harmonised
                without touching production styles.
              </p>
            </LuxeCard>
          </div>
        </LuxeSection>

        <LuxeSection
          tone="general"
          surfaceTone="muted"
          label="Preview guardrails"
          description="All Champagne experiments live only under /preview. Keep iterating on tone, motion, and schema here before migrating updates to production routes."
        >
          <LuxeCard variant="muted">
            <p>
              Production treatment pages remain untouched while this preview system evolves. Share feedback via the schema HUD
              or update tickets before anything ships live.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.24em]">
              <Link href="/preview" className="underline-offset-4 hover:underline">
                Back to preview index
              </Link>
              <Link href="/reports/schema/Treatments_Schema_Pack_v2.json" className="underline-offset-4 hover:underline">
                View schema pack
              </Link>
            </div>
          </LuxeCard>
        </LuxeSection>
      </PreviewMain>
    </PreviewPageShell>
  );
}
