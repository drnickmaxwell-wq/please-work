"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// NOTE: This guard deliberately avoids repainting <body>.
// Canvas tone is now handled by CSS scoped to the treatments preview.

const HERO_TONE_CLASSES = [
  "hero-tone--dawn",
  "hero-tone--day",
  "hero-tone--dusk",
  "hero-tone--night",
];

function stripToneClassesFrom(element: Element) {
  HERO_TONE_CLASSES.forEach((toneClass) => {
    element.classList.remove(toneClass);
  });
}

export function PreviewTreatmentsToneGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith("/preview/treatments")) {
      return;
    }

    const roots = document.querySelectorAll(
      ".cpv-page--treatments, .cpv-treatments-canvas, .hero-frame"
    );

    roots.forEach((root) => {
      stripToneClassesFrom(root);

      const leakedFrames = root.querySelectorAll(".hero-frame");
      leakedFrames.forEach((frame) => {
        stripToneClassesFrom(frame);
      });
    });
  }, [pathname]);

  return null;
}
