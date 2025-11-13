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

const implantBenefits = [
  "Feels and functions like your natural teeth for confident eating and speaking.",
  "Preserves bone structure with digitally mapped placement.",
  "Designed to last with precision-engineered components and maintenance plans.",
  "Custom ceramics harmonise shade and translucency with neighbouring teeth.",
];

const implantJourney = [
  {
    title: "Consultation & scans",
    detail: "Cone beam imaging, digital impressions, and health review map the baseline.",
  },
  {
    title: "Guided placement",
    detail: "Champagne-calibrated guides support gentle, exact implant positioning.",
  },
  {
    title: "Integration & reviews",
    detail: "Regular reviews protect healing and refine the soft tissue profile.",
  },
  {
    title: "Restorative finish",
    detail: "Bespoke crowns balance bite, shade, and surface polish for seamless comfort.",
  },
];

const implantCandidates = [
  "Healthy gums and commitment to ongoing hygiene visits.",
  "Sufficient bone volume or grafting pathway confirmed via imaging.",
  "Non-smoker or actively reducing risk factors for long-term stability.",
  "Patients seeking fixed, natural-feeling restoration versus removable options.",
];

export default function ImplantsPreviewPage() {
  return (
    <PreviewPageShell>
      <SchemaInjector route="/treatments/implants" />

      <ChampagneTreatmentHeroLuxe
        tone="implants"
        eyebrow="Advanced implants"
        title="Implants that feel like your own teeth"
        subtitle="Digitally guided placement keeps every appointment calm, precise, and beautifully finished."
        primaryCta={{ label: "Book implant consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore patient stories", href: "/patient-stories" }}
      />

      <PreviewMain>
        <LuxeSection tone="implants" surfaceTone="muted" id="viewer" label="3D overview (coming soon)">
          <LuxeCard variant="muted" className="flex min-h-[12rem] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.28em]">3D viewer placeholder</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed">
              Placeholder slot for the guided implant visualiser. The final module will highlight placement angles, abutment fit,
              and soft tissue transitions in real time.
            </p>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="implants" id="benefits" label="Why patients choose implants">
          <div className="grid gap-4 md:grid-cols-2">
            {implantBenefits.map((benefit) => (
              <LuxeCard key={benefit}>
                <p className="text-base leading-relaxed">{benefit}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="how-it-works" label="How it works">
          <div className="grid gap-4 md:grid-cols-2">
            {implantJourney.map((stage) => (
              <LuxeCard key={stage.title}>
                <h3 className="text-sm uppercase tracking-[0.18em]">{stage.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="candidacy" label="Who it’s for" surfaceTone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {implantCandidates.map((item) => (
              <LuxeCard key={item} variant="muted">
                <p className="text-base leading-relaxed">{item}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="pricing" label="Pricing & finance" surfaceTone="highlight">
          <LuxeCard variant="highlight" className="flex flex-col gap-4">
            <p>
              Finance modules from Tabeo slot in here. Prepare tiers for single implants, bridges, and full-arch solutions with
              repayment illustrations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
                href="/contact"
              >
                Book consultation
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
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
