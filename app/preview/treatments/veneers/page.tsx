export const dynamic = "force-static";
export const revalidate = 0;

import { ChampagneTreatmentHero } from "@/components/treatments/ChampagneTreatmentHero";
import { LuxeCard, LuxeSection } from "@/components/treatments/preview";
import { SchemaInjector } from "@/lib/seo/preview/SchemaInjector";

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
    <div className="min-h-screen bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_18%,var(--smh-white))] text-[color-mix(in_oklab,var(--smh-ink)_90%,transparent)]">
      <SchemaInjector route="/treatments/veneers" />

      <ChampagneTreatmentHero
        variant="veneers"
        eyebrow="Porcelain veneers"
        title="Porcelain veneers with Champagne luminosity"
        kicker="Digital artistry, handcrafted glow"
        description="Digital artistry and handcrafted ceramics transform smiles with soft gold warmth, while keeping the hero stack entirely on-brand."
        primaryCta={{ label: "Plan veneer consultation", href: "/contact" }}
        secondaryCta={{ label: "Preview patient stories", href: "/patient-stories" }}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16" role="main">
        <LuxeSection variant="veneers" id="viewer" label="3D veneer visualiser" tone="muted">
          <LuxeCard tone="default" className="flex flex-col gap-3 text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">
            <p>
              Placeholder for the veneer layering viewer. Final build will display digital wax-ups, translucency maps, and before/after toggles in one Champagne-aligned module.
            </p>
            <div className="flex min-h-[10rem] items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--smh-accent-gold)_22%,transparent)] bg-[color-mix(in_oklab,var(--smh-accent-gold-soft)_32%,var(--smh-white)_68%)] text-xs uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--smh-ink)_62%,transparent)]">
              3D VIEWER PLACEHOLDER
            </div>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection variant="veneers" id="benefits" label="Why guests love veneers">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerHighlights.map((highlight) => (
              <LuxeCard key={highlight}>
                <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_82%,transparent)]">{highlight}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection variant="veneers" id="journey" label="The veneer journey">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerJourney.map((stage) => (
              <LuxeCard key={stage.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color-mix(in_oklab,var(--smh-accent-gold)_58%,var(--smh-ink)_42%)]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_78%,transparent)]">
                  {stage.detail}
                </p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection variant="veneers" id="candidacy" label="Are veneers right for you?" tone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerCandidates.map((item) => (
              <LuxeCard key={item} tone="default">
                <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--smh-ink)_76%,transparent)]">{item}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection variant="veneers" id="pricing" label="Finance & next steps" tone="highlight">
          <LuxeCard className="flex flex-col gap-4 text-[color-mix(in_oklab,var(--smh-ink)_80%,transparent)]">
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
          </LuxeCard>
        </LuxeSection>
      </main>
    </div>
  );
}
