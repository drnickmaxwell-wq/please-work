"use client";

import React, { useEffect } from "react";

import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";
import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments-preview.css";
import "@/styles/preview/treatments-hardfix.css";

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

  useEffect(() => {
    const stripHeroTones = () => {
      document.querySelectorAll("[class*='hero-tone']").forEach((el) => {
        el.className = el.className.replace(/hero-tone--\w+/g, "");
      });
    };

    stripHeroTones();
    window.addEventListener("popstate", stripHeroTones);

    return () => window.removeEventListener("popstate", stripHeroTones);
  }, []);

  return (
    <div className="cpv-treatments-root" style={{ backgroundColor: "var(--smh-ink)", minHeight: "100vh" }}>
      <PreviewShell>
        <div
          className="cpv-page cpv-page--champagne-dark cpv-page--treatments"
          data-treatment={dataTreatment}
          data-preview-scope="treatments"
        >
          {children}
        </div>
      </PreviewShell>
    </div>
  );
}
