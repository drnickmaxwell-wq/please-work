export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import ChampagneTreatmentTemplate from "@/components/preview/treatments/ChampagneTreatmentTemplate";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

const slug = "veneers";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const veneersCta = {
  title: "Refined veneers consult",
  body: "Preview how the Champagne treatment canvas supports veneers journey planning, finance, and smile mockups before launch.",
  primaryLabel: "Book veneer consult",
  primaryHref: "/contact",
  secondaryLabel: "See veneer stories",
  secondaryHref: "/preview/lux/patient-stories",
  context: "treatment" as const,
};

export default function VeneersPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    <ChampagneTreatmentTemplate
      slug={slug}
      schemaKey="veneers-process"
      treatmentName="Veneers"
      category="Cosmetic"
      has3DViewer
      financePlanGroup="veneers"
      galleryEnabled
      faqKey="veneers"
      luxDividerBeforeFaq="dusk"
      ctaBarProps={veneersCta}
      searchParams={searchParams}
    />
  );
}
