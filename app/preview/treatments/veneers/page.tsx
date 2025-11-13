export const dynamic = "force-static";
export const revalidate = 0;

import { ChampagneSectionShell } from "@/components/champagne/ChampagneSectionShell";
import { ChampagneTreatmentHero } from "@/components/champagne/ChampagneTreatmentHero";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

import "@/styles/preview/champagne-preview.css";

const veneerHighlights = [
  "Featherlight porcelain mirrors natural enamel for luminous reflections.",
  "Digital smile design previews ensure proportion, symmetry, and bite balance.",
  "Hand-layered ceramics blend with neighbouring teeth for seamless transitions.",
  "Aftercare plans maintain sheen with gentle polishing and tailored hygiene.",
];

const veneerJourney = [
  {
    title: "Discovery consultation",
    detail: "Goal setting, facial analysis, and photographic mapping align design direction.",
  },
  {
    title: "Design refinement",
    detail: "3D planning, wax-ups, and mock-ups refine shape, translucency, and incisal flow.",
  },
  {
    title: "Preparation day",
    detail: "Minimal enamel contouring with comfortable temporaries shaped to the approved design.",
  },
  {
    title: "Placement & polish",
    detail: "Bespoke porcelain bonded, contoured, and polished to a Champagne sheen.",
  },
];

const veneerCandidates = [
  "Healthy gums and consistent hygiene routine.",
  "Desire to elevate colour, balance, or minor alignment without orthodontics.",
  "Commitment to caring for temporaries between appointments.",
  "Looking for camera-ready confidence with handcrafted detail.",
];

export default function VeneersPreviewPage() {
  return (
    <div className="cpv-page">
      <SchemaInjector route="/treatments/veneers" />

      <ChampagneTreatmentHero
        treatmentKey="veneers"
        eyebrow="Porcelain veneers"
        title="Porcelain veneers with Champagne luminosity"
        subtitle="Digital artistry and handcrafted ceramics transform smiles with soft gold warmth, while keeping the hero stack entirely on-brand."
        primaryCta={{ label: "Plan veneer consultation", href: "/contact" }}
        secondaryCta={{ label: "Preview patient stories", href: "/patient-stories" }}
        schemaRoute="/treatments/veneers"
      />

      <main className="cpv-main" role="main">
        <ChampagneSectionShell treatmentKey="veneers" id="viewer" label="3D veneer visualiser" tone="muted">
          <p className="max-w-3xl leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)]">
            Placeholder for the veneer layering viewer. Final build will display digital wax-ups, translucency maps, and before/after toggles in one Champagne-aligned module.
          </p>
          <div className="flex min-h-[12rem] items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--smh-accent-gold)_18%,transparent)] bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_24%,var(--smh-white)_76%)] text-sm uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--smh-ink)_64%,transparent)]">
            3D VIEWER PLACEHOLDER
          </div>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="veneers" id="benefits" label="Why guests love veneers">
          <ul className="grid gap-4 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_80%,transparent)] md:grid-cols-2">
            {veneerHighlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-accent-gold)_18%,transparent)] bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_26%,var(--smh-white)_74%)] p-5"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="veneers" id="journey" label="The veneer journey">
          <ol className="grid gap-4 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {veneerJourney.map((stage) => (
              <li
                key={stage.title}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-accent-gold)_20%,transparent)] bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_24%,var(--smh-white)_76%)] p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-accent-gold)_54%,var(--smh-ink)_46%)]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="veneers" id="candidacy" label="Are veneers right for you?" tone="muted">
          <ul className="grid gap-3 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)] md:grid-cols-2">
            {veneerCandidates.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--smh-accent-gold)_16%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_90%,transparent)] p-5"
              >
                {item}
              </li>
            ))}
          </ul>
        </ChampagneSectionShell>

        <ChampagneSectionShell treatmentKey="veneers" id="pricing" label="Finance & next steps" tone="highlight">
          <div className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_80%,transparent)]">
            <p>
              Reserve slots for finance illustrations, treatment timelines, and follow-up scheduling. CTA buttons keep Champagne hover easing within the 1.03 scale guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-accent-gold)_28%,transparent)] bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_38%,var(--smh-white)_62%)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-ink)_62%,var(--smh-accent-gold)_38%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
                href="/contact"
              >
                Reserve consultation
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--smh-primary-magenta)_20%,transparent)] bg-[color-mix(in_oklab,var(--smh-white)_92%,transparent)] px-5 py-2 text-sm font-semibold tracking-[0.16em] text-[color-mix(in_oklab,var(--smh-primary-magenta)_68%,var(--smh-ink)_32%)] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] hover:translate-y-[-2px]"
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
