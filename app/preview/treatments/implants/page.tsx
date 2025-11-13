export const dynamic = "force-static";
export const revalidate = 0;

import Link from "next/link";

import { ChampagneTreatmentHero } from "@/components/treatments/ChampagneTreatmentHero";
import {
  LuxeCard,
  LuxeSection,
  PreviewMain,
  PreviewPageShell,
} from "@/components/treatments/preview";
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

      <ChampagneTreatmentHero
        tone="implants"
        eyebrow="Advanced implants"
        title="Implants that feel like your own teeth"
        subtitle="Digitally guided placement keeps every appointment calm, precise, and beautifully finished."
        primaryCta={{ label: "Book implant consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore patient stories", href: "/patient-stories" }}
      />

      <PreviewMain>
        <LuxeSection tone="implants" surfaceTone="muted" id="viewer" label="3D overview (coming soon)">
          <LuxeCard tone="frosted" className="flex min-h-[12rem] flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-[color-mix(in_oklab,var(--smh-primary-teal)_62%,var(--smh-ink)_38%)]">
              3D viewer placeholder
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_72%,transparent)]">
              Placeholder slot for the guided implant visualiser. The final module will highlight placement angles, abutment fit,
              and soft tissue transitions in real time.
            </p>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="implants" id="benefits" label="Why patients choose implants">
          <div className="grid gap-4 md:grid-cols-2">
            {implantBenefits.map((benefit) => (
              <LuxeCard key={benefit}>
                <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_82%,transparent)]">{benefit}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="how-it-works" label="How it works">
          <div className="grid gap-4 md:grid-cols-2">
            {implantJourney.map((stage) => (
              <LuxeCard key={stage.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-primary-teal)_66%,var(--smh-ink)_34%)]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">
                  {stage.detail}
                </p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="candidacy" label="Who it’s for" surfaceTone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {implantCandidates.map((item) => (
              <LuxeCard key={item} tone="default">
                <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">{item}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="implants" id="pricing" label="Pricing & finance" surfaceTone="highlight">
          <LuxeCard tone="frosted" className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_82%,transparent)]">
            <p>
              Finance modules from Tabeo slot in here. Prepare tiers for single implants, bridges, and full-arch solutions with
              repayment illustrations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-teal)_28%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-teal)_72%,var(--smh-ink)_28%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Book consultation
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_24%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
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
