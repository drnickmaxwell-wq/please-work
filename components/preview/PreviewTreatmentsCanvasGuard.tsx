"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PreviewTreatmentsCanvasGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/preview/treatments")) return;

    const root =
      document.querySelector<HTMLElement>(
        '.cpv-page.cpv-page--treatments[data-preview-scope="treatments"]'
      ) ||
      document.querySelector<HTMLElement>(
        ".cpv-page.cpv-page--treatments.cpv-treatments-canvas"
      );

    if (!root) return;

    root.classList.remove("cpv-page--champagne-light");
    root.classList.add("cpv-page--champagne-dark");
  }, [pathname]);

  return null;
}
