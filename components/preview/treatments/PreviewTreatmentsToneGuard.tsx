"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
    const roots = document.querySelectorAll(
      ".cpv-page--treatments, .cpv-treatments-canvas"
    );

    roots.forEach((root) => {
      stripToneClassesFrom(root);

      if (root.classList.contains("hero-frame")) {
        stripToneClassesFrom(root);
      }

      const leakedFrames = root.querySelectorAll(".hero-frame");
      leakedFrames.forEach((frame) => {
        stripToneClassesFrom(frame);
      });
    });
  }, [pathname]);

  return null;
}
