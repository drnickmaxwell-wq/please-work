export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "implants";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const implantsCta = {
  title: "Implant pathway booking band",
  body: "Showcase the lux CTA band with implant-ready copy, finance cues, and Champagne motion that respects PRM toggles.",
  primaryLabel: "Plan my implant",
  primaryHref: "/contact",
  secondaryLabel: "Preview the treatment journey",
  secondaryHref: "/preview/treatments/technology",
  context: "treatment" as const,
};

export default function ImplantsPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    <ChampagneTreatmentTemplate
      slug={slug}
      schemaKey="implant-process"
      treatmentName="Dental implants"
      category="Implants"
      has3DViewer
      financePlanGroup="implants"
      galleryEnabled
      faqKey="implants"
      luxDividerBeforeFaq="horizon"
      ctaBarProps={implantsCta}
      searchParams={searchParams}
    />
  );
}
