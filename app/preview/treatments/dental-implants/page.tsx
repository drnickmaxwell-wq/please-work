// Preview-only clone. No hard hexes. Do not edit production pages.
export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "dental-implants";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function DentalImplantsPreviewPage({ searchParams }: PreviewPageProps) {
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
      searchParams={searchParams}
    />
  );
}
