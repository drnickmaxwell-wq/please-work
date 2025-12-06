"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PreviewTreatmentsThemeGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".cpv-treatments-canvas");
    if (!root) return;

    root.classList.remove("cpv-page--champagne-light");
    root.classList.add("cpv-page--champagne-dark", "cpv-treatments-canvas");

    const heroFrames = root.querySelectorAll<HTMLElement>(".hero-frame");
    heroFrames.forEach((frame) => {
      frame.classList.remove(
        "hero-tone--dawn",
        "hero-tone--day",
        "hero-tone--dusk",
        "hero-tone--night"
      );
    });

    root.style.backgroundColor = "var(--bg-ink)";
    root.style.color = "var(--smh-white)";
  }, [pathname]);

  return null;
}
