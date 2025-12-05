import type { ReactNode } from "react";
import "@/styles/preview/champagne-preview.css";

export default function TreatmentsLayout({ children }: { children: ReactNode }) {
  return <div className="cpv-page cpv-page--treatment-dark">{children}</div>;
}
