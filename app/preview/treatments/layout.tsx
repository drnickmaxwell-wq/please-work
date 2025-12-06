import React from "react";

import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";
import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments.css";
import "@/styles/preview/treatments-preview.css";

function resolveTreatmentSlug(slug?: string | string[]): string {
  if (!slug) return "general";
  const value = Array.isArray(slug) ? slug[0] : slug;

  switch (value) {
    case "composite-bonding":
      return "composite";
    case "dental-implants":
      return "implants";
    default:
      return value || "general";
  }
}

// Canonical preview layout for all /preview/treatments/** routes.
// Always wrap treatments via PreviewShell + cpv-page; do not create alternate layouts.
export default function PreviewTreatmentsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string | string[] };
}) {
  const dataTreatment = resolveTreatmentSlug(params?.slug);

  return (
    <PreviewShell>
      <main
        className="cpv-page cpv-page--champagne-dark cpv-page--treatments cpv-treatments-canvas-lock"
        data-treatment={dataTreatment}
        data-preview-scope="treatments"
        style={{
          backgroundColor: "var(--smh-ink)",
          color: "var(--smh-white)",
        }}
      >
        {children}
      </main>
    </PreviewShell>
  );
}
