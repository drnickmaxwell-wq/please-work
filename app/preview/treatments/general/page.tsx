export const dynamic = "force-static";
export const revalidate = 0;

import Link from "next/link";

import {
  ChampagneTreatmentHeroLuxe,
  LuxeCard,
  LuxeSection,
  PreviewMain,
  PreviewPageShell,
} from "@/components/luxe";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

const generalHighlights = [
  "Preventive exams with Champagne diagnostics keep care calm and proactive.",
  "Hygiene sessions blend ultrasonic comfort with hand-finished detailing.",
  "Restorative options span inlays, crowns, and biomimetic bonding for longevity.",
  "Soothing rituals and aftercare kits extend the Champagne experience home.",
];

const generalFlow = [
  {
    title: "Welcome & assessment",
    detail: "Digital health history, comfort preferences, and baseline scans set the tone for each visit.",
  },
  {
    title: "Preventive focus",
    detail: "Hygiene, fluoride, and micro-polishing routines are sequenced for calm precision.",
  },
  {
    title: "Restorative planning",
    detail: "3D imaging and shade mapping guide crowns, onlays, or bonding when needed.",
  },
  {
    title: "Aftercare concierge",
    detail: "Personalised recommendations, scheduling, and at-home rituals wrap every appointment.",
  },
];

export default function GeneralDentistryPreviewPage() {
  return (
    <PreviewPageShell>
      <SchemaInjector route="/treatments/general" />

      <ChampagneTreatmentHeroLuxe
        tone="general"
        eyebrow="General dentistry"
        title="General dentistry with Champagne calm"
        subtitle="Preview how hygiene, restorative, and preventive care flow within the Luxe treatment system."
        primaryCta={{ label: "Book routine visit", href: "/contact" }}
        secondaryCta={{ label: "Explore treatment index", href: "/preview/treatments" }}
      />

      <PreviewMain>
        <LuxeSection
          tone="general"
          surfaceTone="muted"
          label="Preview scope"
          description="Use this page to map core preventive care blocks before bringing components into the production route."
        >
          <LuxeCard variant="muted">
            <p>
              Reference hygiene modules, restorative paths, and patient comfort rituals here. Update copy, CTA targets, and
              schema hooks before elevating the production experience.
            </p>
            <div className="flex flex-wrap gap-3 pt-3 text-xs uppercase tracking-[0.24em]">
              <Link href="/reports/schema/Treatments_Breadcrumbs.json" className="underline-offset-4 hover:underline">
                Breadcrumb map
              </Link>
              <Link href="/preview/treatments" className="underline-offset-4 hover:underline">
                Back to previews
              </Link>
            </div>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="general" id="benefits" label="Comfort-first highlights">
          <div className="grid gap-4 md:grid-cols-2">
            {generalHighlights.map((highlight) => (
              <LuxeCard key={highlight}>
                <p className="text-base leading-relaxed">{highlight}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="general" id="flow" label="Appointment rhythm">
          <div className="grid gap-4 md:grid-cols-2">
            {generalFlow.map((step) => (
              <LuxeCard key={step.title}>
                <h3 className="text-sm uppercase tracking-[0.18em]">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{step.detail}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>
      </PreviewMain>
    </PreviewPageShell>
  );
}
