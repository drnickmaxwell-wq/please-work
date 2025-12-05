import Link from "next/link";

import PreviewHero from "@/components/preview/PreviewHero";
import PreviewBreadcrumbs from "@/components/preview/sections/treatments/PreviewBreadcrumbs";
import Treatment3DViewerSlot from "@/components/preview/sections/treatments/Treatment3DViewerSlot";
import TreatmentBenefitsRail from "@/components/preview/sections/treatments/TreatmentBenefitsRail";
import StoriesTeaser, { type StoryCard } from "@/components/preview/sections/treatments/StoriesTeaser";
import TreatmentFinancePreview from "@/components/preview/sections/treatments/TreatmentFinancePreview";
import TreatmentHowItWorksPreview, {
  type TreatmentHowItWorksPreviewProps,
} from "@/components/preview/sections/treatments/TreatmentHowItWorksPreview";
import TreatmentMicroFaq from "@/components/preview/sections/treatments/TreatmentMicroFaq";
import TreatmentTechHighlight from "@/components/preview/sections/treatments/TreatmentTechHighlight";
import TreatmentPreviewSchema from "@/components/preview/seo/TreatmentPreviewSchema";
import {
  buildPreviewMetadata,
  getPreviewTreatmentConfig,
  type PreviewTreatmentConfig,
} from "@/lib/treatments/previewTreatmentConfig";
import "@/components/preview/preview-layout.css";
import layoutStyles from "@/components/preview/sections/treatments/preview-treatments.module.css";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments-preview.css";

const defaultBenefits: Record<string, string[]> = {
  veneers: [
    "Featherlight porcelain mirroring natural enamel texture",
    "Digital smile design previews to perfect harmony",
    "Hue-matched ceramics for a seamless Champagne finish",
    "Aftercare rituals that keep veneers radiant for years",
  ],
  implants: [
    "Natural feel for confident eating and speaking",
    "Bone preservation maintains facial harmony long term",
    "Longevity with a thoughtful hygiene partnership",
    "Custom ceramics designed to blend seamlessly",
  ],
  orthodontics: [
    "Discreet clear aligners balanced for comfort",
    "Regular reviews to keep movements predictable",
    "Retention planning to hold your new smile",
    "Digital progress tracking to reduce chair time",
  ],
  whitening: [
    "Shade mapping and sensitivity checks for calm, predictable results",
    "Supervised at-home phase with bespoke trays",
    "In-clinic finishing session for even radiance",
    "Remineralising aftercare that protects enamel",
  ],
  "composite-bonding": [
    "Hand-layered bonding to tidy chips and edges",
    "Minimal preparation with camera-ready polish",
    "Shade matching to blend with natural enamel",
    "Same-day refinements for micro gaps",
  ],
  general: [
    "Preventive check-ups to keep treatment plans steady",
    "Hygiene coaching with gentle polish and stain removal",
    "Restorative care that protects healthy tooth structure",
    "Sedation available for anxious guests",
  ],
  cosmetic: [
    "Blend veneers, bonding, and whitening into one roadmap",
    "Photography and mock-ups to preview results",
    "Shade and proportion planning matched to goals",
    "Aftercare plans to keep cosmetic work luminous",
  ],
  technology: [
    "CBCT mapping for precise planning",
    "Intraoral scanning for comfort and accuracy",
    "3D printing for guides, retainers, and splints",
    "Digital tracking to reduce chair time",
  ],
  "3d-dentistry": [
    "Guided workflows informed by 3D imaging",
    "On-site printing for rapid prototypes and guides",
    "Visual previews that set clear expectations",
    "Data-backed adjustments throughout treatment",
  ],
};

const defaultHowToSteps: TreatmentHowItWorksPreviewProps["steps"] = [
  { title: "Consultation", summary: "Goals, photos, and digital scans to plan the pathway calmly." },
  { title: "3D Planning", summary: "Mock-ups, guides, and aligner simulations mapped to schema." },
  { title: "Treatment Day", summary: "Guided workflows with sedation-ready options and clear timings." },
  { title: "Aftercare", summary: "Reviews, retainers, and hygiene coaching to hold the finish." },
];

const defaultFaqs = [
  {
    question: "How long does treatment take?",
    answer: "Timelines vary by pathway — we outline steps, reviews, and aftercare up front so you know what to expect.",
  },
  {
    question: "Is it comfortable?",
    answer: "Anaesthetic, gentle prep, and digital planning keep comfort high. Sedation is available for nervous guests.",
  },
  {
    question: "Do you offer finance?",
    answer: "Yes. Soft search finance examples are shown before commitment, matching the preview finance band.",
  },
];

const storyDeck: Record<string, StoryCard[]> = {
  veneers: [
    {
      title: "Veneers for chipped edges",
      blurb: "Two visits with digital mock-ups and soft-gloss porcelain for a natural coastal finish.",
      tag: "Veneers",
    },
    {
      title: "Brightening before bonding",
      blurb: "Sensitivity-safe whitening followed by edge bonding to restore symmetry for camera work.",
      tag: "Smile makeovers",
    },
  ],
  implants: [
    {
      title: "Implant to replace a premolar",
      blurb: "CBCT-led placement with a custom crown; patient back to hiking within days.",
      tag: "Implants",
    },
    {
      title: "Full-arch preview",
      blurb: "Digital wax-ups and guided surgery steps shown before day one, calming finance discussions.",
      tag: "Implants",
    },
  ],
  orthodontics: [
    {
      title: "Aligner journey for crowding",
      blurb: "Spark plan with remote check-ins and night-time retainers to hold the new arc.",
      tag: "Orthodontics",
    },
    {
      title: "Teen retainer rescue",
      blurb: "Rapid review and new retainers keep movements stable after sports-heavy weeks.",
      tag: "Retention",
    },
  ],
  whitening: [
    {
      title: "Glow before event",
      blurb: "Two-week at-home plan plus clinic finish to lift safely before a big moment.",
      tag: "Whitening",
    },
    {
      title: "Post-braces brighten",
      blurb: "Desensitising gels and gentle trays to refresh shade after orthodontic treatment.",
      tag: "Whitening",
    },
  ],
  "composite-bonding": [
    {
      title: "Edge bonding for chips",
      blurb: "One visit refinement with layered composite and soft polish for camera days.",
      tag: "Bonding",
    },
    {
      title: "Close a micro gap",
      blurb: "Colour-matched composite balances symmetry without drilling healthy enamel.",
      tag: "Bonding",
    },
  ],
};

function ensureBenefits(config: PreviewTreatmentConfig) {
  const items = config.benefits.length ? config.benefits : defaultBenefits[config.slug] ?? defaultBenefits.veneers;
  return items.map((item) => ({ title: item }));
}

function ensureHowTo(config: PreviewTreatmentConfig) {
  return config.howToSteps.length ? config.howToSteps : defaultHowToSteps;
}

function ensureFaqs(config: PreviewTreatmentConfig) {
  return config.faqItems.length ? config.faqItems : defaultFaqs;
}

function buildStories(slug: string, displayName: string) {
  return (
    storyDeck[slug] ?? [
      {
        title: `${displayName} patient story`,
        blurb: "Teaser space for future case studies aligned to the preview canvas.",
        tag: displayName,
      },
    ]
  );
}

function buildHeroDescription(config: PreviewTreatmentConfig) {
  return (
    config.answerFirst?.aiOverview ??
    config.shortDescription ??
    `${config.displayName} preview page with Champagne gradients, manifest-linked schema, and space for the 3D viewer.`
  );
}

export const buildTreatmentPreviewMetadata = buildPreviewMetadata;

export function TreatmentPreviewPage({ slug }: { slug: string }) {
  const config = getPreviewTreatmentConfig(slug);
  const stories = buildStories(config.slug, config.displayName);
  const heroDescription = buildHeroDescription(config);

  return (
    <div
      className={`cpv-page cpv-page--champagne-dark cpv-page--treatments ${layoutStyles.previewCanvas}`}
      data-treatment={config.slug}
    >
      <PreviewHero
        treatment={config.slug}
        eyebrow="Treatments preview"
        title={`${config.displayName} in Shoreham-by-Sea`}
        description={heroDescription}
        primaryCta={{ label: "Book a consultation", href: "/contact" }}
        secondaryCta={{ label: "View all treatments", href: "/treatments" }}
        devAccessory={
          <Link className="cpv-btn cpv-btn-outline text-eyebrow" href="/preview/treatments">
            Back to preview hub
          </Link>
        }
      />

      <PreviewBreadcrumbs breadcrumbs={config.breadcrumbs} fallbackLabel={config.displayName} />

      <main className="cpv-main" role="main">
        <TreatmentBenefitsRail
          slug={config.slug}
          benefits={ensureBenefits(config)}
          intro="Borrowed directly from answer-first copy blocks to surface who benefits most."
        />
        <Treatment3DViewerSlot
          slug={config.slug}
          treatmentName={config.displayName}
          description="Placeholder shell for the upcoming WebGL 3D preview. Keeps Champagne glass styling and respects reduced motion."
        />
        <TreatmentHowItWorksPreview steps={ensureHowTo(config)} />
        <TreatmentFinancePreview />
        <TreatmentTechHighlight />
        <StoriesTeaser stories={stories} />
        <TreatmentMicroFaq faqs={ensureFaqs(config)} />
      </main>

      <TreatmentPreviewSchema config={config} />
    </div>
  );
}
