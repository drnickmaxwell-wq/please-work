"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";
import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments-preview.css";
import "@/styles/preview/preview-treatments-canvas.css";

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
  const pathname = usePathname();

  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>("[data-preview-scope='treatments']");
    if (!canvas) return;

    canvas.classList.add("cpv-page", "cpv-page--champagne-dark", "cpv-page--treatments");

    const heroToneClasses = Array.from(canvas.classList).filter((className) => className.startsWith("hero-tone--"));
    heroToneClasses.forEach((className) => canvas.classList.remove(className));

    const bodyToneClasses = Array.from(document.body.classList).filter((className) => className.startsWith("hero-tone--"));
    bodyToneClasses.forEach((className) => document.body.classList.remove(className));

    canvas.style.backgroundColor = "var(--bg-ink)";
  }, [pathname, dataTreatment]);

  return (
    <PreviewShell>
      <div
        className="cpv-page cpv-page--champagne-dark cpv-page--treatments"
        data-treatment={dataTreatment}
        data-preview-scope="treatments"
      >
        {children}
      </div>
    </PreviewShell>
  );
}
