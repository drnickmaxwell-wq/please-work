export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import { TreatmentPreviewPage, buildTreatmentPreviewMetadata } from "@/components/preview/sections/treatments/TreatmentPreviewPage";
import { previewRobots } from "@/lib/seo/preview/previewRobots";

const slug = "3d-dentistry";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

export default function ThreeDDentistryPreviewPage() {
  return <TreatmentPreviewPage slug={slug} />;
}
