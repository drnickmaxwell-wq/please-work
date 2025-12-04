export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "whitening";

// Placeholder copy for Director review before launch.
const whiteningBenefits = [
  "Sensitivity-aware protocols with dentist-led gel calibration.",
  "Shade planning that pairs whitening with future bonding or veneers.",
  "Comfort-first sessions with desensitising serums between applications.",
  "Aftercare mapped to maintain brightness without harsh rebounds.",
];

const whiteningSteps = [
  { title: "Consult & shade map", summary: "Set your target shade, capture scans, and align whitening with any upcoming cosmetic work." },
  { title: "Gentle activation", summary: "Apply low-heat whitening cycles with sensitivity checkpoints built into the protocol." },
  { title: "Calm recovery", summary: "Soothe with fluoride serums and polish edges so enamel feels smooth post-whitening." },
  { title: "Plan the finish", summary: "Review shade stability, schedule top-ups, and align bonding or aligners to the new baseline." },
];

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function WhiteningPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    <ChampagneTreatmentTemplate
      slug={slug}
      schemaKey="whitening-process"
      treatmentName="Teeth whitening"
      category="Cosmetic"
      heroTitle="Luminous Whitening"
      heroCopy="Professional whitening with Champagne-level attention to detail."
      primaryCtaLabel="Book whitening"
      primaryCtaHref="/book"
      secondaryCtaLabel="Explore treatment options"
      secondaryCtaHref="/preview/home"
      benefitBullets={whiteningBenefits}
      howItWorksLabel="Your whitening journey"
      howItWorksSteps={whiteningSteps}
      financePlanGroup="whitening"
      faqKey="whitening"
      searchParams={searchParams}
    />
  );
}
