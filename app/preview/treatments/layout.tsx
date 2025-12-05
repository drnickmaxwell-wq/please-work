import React from "react";

import "@/styles/preview/preview-treatments-canvas.css";
import "@/styles/preview/champagne-preview-typography.css";

export default function TreatmentsPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cpv-page cpv-page--champagne-dark">
      {children}
    </div>
  );
}
