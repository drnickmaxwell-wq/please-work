export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "general";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function GeneralPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    <ChampagneTreatmentTemplate
      slug={slug}
      schemaKey="general"
      treatmentName="General dentistry"
      category="General"
      financePlanGroup="general"
      faqKey="general"
      searchParams={searchParams}
    />
  );
}
