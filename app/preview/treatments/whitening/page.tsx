export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import { buildTreatmentPreviewMetadata } from "@/components/preview/sections/treatments/TreatmentPreviewPage";
import { previewRobots } from "@/lib/seo/preview/previewRobots";

import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";

import { WhiteningAiTools } from "@/components/preview/treatments/whitening/WhiteningAiTools";
import { WhiteningCTA } from "@/components/preview/treatments/whitening/WhiteningCTA";
import { WhiteningClinicianInsight } from "@/components/preview/treatments/whitening/WhiteningClinicianInsight";
import { WhiteningFaq } from "@/components/preview/treatments/whitening/WhiteningFaq";
import { WhiteningHero } from "@/components/preview/treatments/whitening/WhiteningHero";
import { WhiteningOverview } from "@/components/preview/treatments/whitening/WhiteningOverview";
import { WhiteningStories } from "@/components/preview/treatments/whitening/WhiteningStories";
import styles from "@/components/preview/treatments/whitening/whitening-preview.module.css";

const slug = "whitening";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

export default function WhiteningPreviewPage() {
  // Whitening preview: hard-cloned from composite-bonding layout.
  // Dark Champagne canvas only, no Tonal Pack or light mode applied.
  return (
    <div className={`cpv-page ${styles.page}`} data-treatment="composite" data-preview-treatment="whitening">
      <WhiteningHero />

      <main className={styles.main} role="main">
        <WhiteningOverview />
        <WhiteningAiTools />
        <WhiteningClinicianInsight />
        <WhiteningStories />
        <WhiteningFaq />
        <WhiteningCTA />
      </main>
    </div>
  );
}
