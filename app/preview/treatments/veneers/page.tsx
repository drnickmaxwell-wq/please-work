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
    <PreviewPageShell>
      <SchemaInjector route="/treatments/veneers" />

      <ChampagneTreatmentHeroLuxe
        tone="veneers"
        eyebrow="Porcelain veneers"
        title="Porcelain veneers with Champagne luminosity"
        subtitle="Digital artistry and handcrafted ceramics bring a soft gold warmth to every smile design session."
        primaryCta={{ label: "Plan veneer consultation", href: "/contact" }}
        secondaryCta={{ label: "Preview patient stories", href: "/patient-stories" }}
      />

      <PreviewMain>
        <LuxeSection tone="veneers" surfaceTone="muted" id="viewer" label="3D veneer visualiser">
          <LuxeCard variant="muted" className="flex flex-col gap-3 text-center">
            <p className="text-xs uppercase tracking-[0.28em]">3D viewer placeholder</p>
            <p className="mx-auto max-w-2xl text-base leading-relaxed">
              Placeholder for the veneer layering viewer. Final build will display digital wax-ups, translucency maps, and
              before/after toggles in one Champagne-aligned module.
            </p>
            <div className="flex min-h-[10rem] items-center justify-center rounded-2xl border border-dashed border-current text-xs uppercase tracking-[0.24em]">
              Visual coming soon
            </div>
          </LuxeCard>
        </LuxeSection>

        <LuxeSection tone="veneers" id="benefits" label="Why guests love veneers">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerHighlights.map((highlight) => (
              <LuxeCard key={highlight}>
                <p className="text-base leading-relaxed">{highlight}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="veneers" id="journey" label="The veneer journey">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerJourney.map((stage) => (
              <LuxeCard key={stage.title}>
                <h3 className="text-sm uppercase tracking-[0.18em]">{stage.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{stage.detail}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="veneers" id="candidacy" label="Are veneers right for you?" surfaceTone="muted">
          <div className="grid gap-4 md:grid-cols-2">
            {veneerCandidates.map((item) => (
              <LuxeCard key={item} variant="muted">
                <p className="text-base leading-relaxed">{item}</p>
              </LuxeCard>
            ))}
          </div>
        </LuxeSection>

        <LuxeSection tone="veneers" id="pricing" label="Finance & next steps" surfaceTone="highlight">
          <LuxeCard variant="highlight" className="flex flex-col gap-4">
            <p>
              Reserve slots for finance illustrations, treatment timelines, and follow-up scheduling. CTA buttons keep Champagne
              hover easing within the 1.03 scale guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-current px-6 py-2 text-xs uppercase tracking-[0.2em] transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] motion-safe:hover:-translate-y-1"
                href="/contact"
              >
                Reserve consultation
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
