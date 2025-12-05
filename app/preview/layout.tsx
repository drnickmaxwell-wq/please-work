"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const isTreatments = segments[0] === "treatments";

  if (isTreatments) {
    return <>{children}</>;
  }

  return <PreviewShell>{children}</PreviewShell>;
}
