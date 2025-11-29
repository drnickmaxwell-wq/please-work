export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import { TreatmentPreviewPage, buildTreatmentPreviewMetadata } from "@/components/preview/sections/treatments/TreatmentPreviewPage";
import { previewRobots } from "@/lib/seo/preview/previewRobots";

const slug = "veneers";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

export default function VeneersPreviewPage() {
  return <TreatmentPreviewPage slug={slug} />;
}
