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
    if (!pathname?.startsWith("/preview/treatments")) {
      return;
    }

    const body = document.body;
    const previousBackgroundColor = body.style.backgroundColor;
    const previousBackgroundImage = body.style.backgroundImage;

    body.style.backgroundColor = "var(--bg-ink)";
    body.style.backgroundImage = "none";

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

    return () => {
      body.style.backgroundColor = previousBackgroundColor;
      body.style.backgroundImage = previousBackgroundImage;
    };
  }, [pathname]);

  return null;
}
