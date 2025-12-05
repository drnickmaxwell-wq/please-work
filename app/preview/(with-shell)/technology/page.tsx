import type { Metadata } from "next";

import PreviewHero from "@/components/preview/PreviewHero";
import PreviewAiAnd3D from "@/components/preview/sections/technology/PreviewAiAnd3D";
import PreviewEquipmentGallery from "@/components/preview/sections/technology/PreviewEquipmentGallery";
import PreviewTechStats from "@/components/preview/sections/technology/PreviewTechStats";
import PreviewTechnologyCta from "@/components/preview/sections/technology/PreviewTechnologyCta";
import PreviewWorkflow from "@/components/preview/sections/technology/PreviewWorkflow";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments-preview.css";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import styles from "@/components/preview/sections/technology/preview-technology.module.css";

export const metadata: Metadata = {
  title: "Technology Preview | Champagne Canvas",
  description:
    "Technology in Shoreham-by-Sea with Champagne hero, workflow cards, equipment gallery, AI planning copy, and a 3D viewer slot.",
  robots: previewRobots,
};

export default function PreviewTechnologyPage() {
  return (
    <div className={`cpv-page ${styles.previewTechnology}`} data-treatment="technology">
      <PreviewHero
        eyebrow="Treatments preview"
        title="Technology in Shoreham-by-Sea"
        description="Digital dentistry that keeps precision and comfort in harmony across every visit."
        primaryCta={{ label: "Explore our digital workflow", href: "#workflow" }}
        secondaryCta={{ label: "View all technology", href: "#equipment" }}
      />

      <main className="cpv-main" role="main">
        <PreviewWorkflow />
        <PreviewEquipmentGallery />
        <PreviewAiAnd3D />
        <PreviewTechStats />
        <PreviewTechnologyCta />
      </main>
    </div>
  );
}
