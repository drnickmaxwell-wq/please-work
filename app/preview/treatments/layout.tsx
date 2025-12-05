import React from "react";

import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-layout.css";
import "@/components/preview/preview-typography.css";
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

export default function TreatmentsPreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string | string[] };
}) {
  const dataTreatment = resolveTreatmentSlug(params?.slug);

  return (
    <div className="cpv-page cpv-page--champagne-dark" data-treatment={dataTreatment}>
      {children}
    </div>
  );
}
