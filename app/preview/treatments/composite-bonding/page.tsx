export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import { buildTreatmentPreviewMetadata } from "@/components/preview/sections/treatments/TreatmentPreviewPage";
import { previewRobots } from "@/lib/seo/preview/previewRobots";

import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";

import { CompositeBondingAiTools } from "@/components/preview/treatments/composite-bonding/CompositeBondingAiTools";
import { CompositeBondingCTA } from "@/components/preview/treatments/composite-bonding/CompositeBondingCTA";
import { CompositeBondingClinicianInsight } from "@/components/preview/treatments/composite-bonding/CompositeBondingClinicianInsight";
import { CompositeBondingFaq } from "@/components/preview/treatments/composite-bonding/CompositeBondingFaq";
import { CompositeBondingHero } from "@/components/preview/treatments/composite-bonding/CompositeBondingHero";
import { CompositeBondingOverview } from "@/components/preview/treatments/composite-bonding/CompositeBondingOverview";
import { CompositeBondingStories } from "@/components/preview/treatments/composite-bonding/CompositeBondingStories";
import styles from "@/components/preview/treatments/composite-bonding/composite-bonding-preview.module.css";

const slug = "composite-bonding";

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

export default function CompositeBondingPreviewPage() {
  return (
    <div className={styles.page}>
      <CompositeBondingHero />

      <main className={styles.main} role="main">
        <CompositeBondingOverview />
        <CompositeBondingAiTools />
        <CompositeBondingClinicianInsight />
        <CompositeBondingStories />
        <CompositeBondingFaq />
        <CompositeBondingCTA />
      </main>
    </div>
  );
}
