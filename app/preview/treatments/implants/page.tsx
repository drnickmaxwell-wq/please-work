export const dynamic = "force-static";
export const revalidate = 0;

import { ChampagneSectionShell } from "@/components/champagne/ChampagneSectionShell";
import { ChampagneTreatmentHero } from "@/components/champagne/ChampagneTreatmentHero";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

import "@/styles/preview/champagne-preview.css";

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
    <div className="cpv-page">
      <SchemaInjector route="/treatments/implants" />

      <ChampagneTreatmentHero
        treatmentKey="implants"
        eyebrow="Advanced implants"
        title="Implants that feel like your own teeth"
        subtitle="Digitally guided placement with Champagne motion layers keeps the experience calm, precise, and beautifully finished."
        primaryCta={{ label: "Book implant consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore patient stories", href: "/patient-stories" }}
        schemaRoute="/treatments/implants"
      />

      <main className="cpv-main" role="main">
        <ChampagneSectionShell treatmentKey="implants" id="viewer" label="3D overview (coming soon)" tone="muted">
          <p className="max-w-3xl leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_75%,transparent)]">
            Placeholder slot for the guided implant visualiser. The final module will highlight placement angles, abutment fit, and soft tissue transitions in real time.
          </p>
          <div className="flex min-h-[12rem] items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_20%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_85%,transparent)] text-sm uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-primary-teal)_64%,var(--smh-ink)_36%)]">
            3D VIEWER PLACEHOLDER
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="implants" id="benefits" label="Why patients choose implants">
          <ul className="grid gap-4 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {implantBenefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_16%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-5"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="implants" id="how-it-works" label="How it works">
          <ol className="grid gap-4 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {implantJourney.map((stage) => (
              <li
                key={stage.title}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_18%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_88%,transparent)] p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-primary-teal)_68%,var(--smh-ink)_32%)]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="implants" id="candidacy" label="Who it’s for" tone="muted">
          <ul className="grid gap-3 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)] md:grid-cols-2">
            {implantCandidates.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-primary-teal)_14%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-5"
              >
                {item}
              </li>
            ))}
          </ul>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="implants" id="pricing" label="Pricing & finance" tone="highlight">
          <div className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">
            <p>
              Finance modules from Tabeo slot in here. Prepare tiers for single implants, bridges, and full-arch solutions with repayment illustrations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-teal)_28%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-teal)_72%,var(--smh-ink)_28%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Book consultation
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_24%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/preview/treatments"
              >
                Back to previews
              </a>
            </div>
          </div>
        </ChampagneSectionShell>
      </main>
    </div>
  );
}
