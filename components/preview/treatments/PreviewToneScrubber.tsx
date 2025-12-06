"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TONE_PREFIX = "hero-tone--";

function stripToneClasses(el: Element | null) {
  if (!el?.classList) return;
  const removable: string[] = [];
  el.classList.forEach((cls) => {
    if (cls.startsWith(TONE_PREFIX)) {
      removable.push(cls);
    }
  });

  removable.forEach((cls) => el.classList.remove(cls));
}

function reinforceCanvasSurface(canvas: HTMLElement | null) {
  if (!canvas) return;

  canvas.style.setProperty(
    "background-color",
    "var(--smh-preview-treatments-dark-bg)",
    "important",
  );
  canvas.style.setProperty("color", "var(--smh-preview-treatments-ink-on-dark)", "important");
  canvas.style.setProperty("color-scheme", "dark");
}

export function PreviewToneScrubber() {
  const pathname = usePathname();

  useEffect(() => {
    stripToneClasses(document.documentElement);
    stripToneClasses(document.body);
    stripToneClasses(document.getElementById("__next"));

    const canvas =
      document.querySelector<HTMLElement>(
        ".cpv-page--champagne-dark[data-preview-scope='treatments']",
      ) ?? document.querySelector<HTMLElement>("[data-preview-scope='treatments']");

    reinforceCanvasSurface(canvas);
  }, [pathname]);

  return null;
}
