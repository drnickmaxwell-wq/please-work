"use client";

import { useEffect, useState } from "react";

import PreviewHeroGilded from "@/components/preview/HeroGilded";
import "@/styles/champagne/hero-gilded-tweaks.css";
import "@/styles/champagne/hero-polish.css";

function ensureVeilLayer() {
  if (typeof document === "undefined") {
    return;
  }

  const hero = document.querySelector<HTMLElement>(".preview-hero-gilded");
  if (!hero || hero.querySelector(".veil-layer")) {
    return;
  }

  const veil = document.createElement("div");
  veil.className = "veil-layer";

  const gradient = hero.querySelector(".hero-gradient-base");
  if (gradient?.parentElement === hero) {
    gradient.insertAdjacentElement("afterend", veil);
    return;
  }

  hero.prepend(veil);
}

function syncMotionState(prefersReducedMotion: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  const hero = document.querySelector<HTMLElement>(".preview-hero-gilded");
  if (!hero) {
    return;
  }

  if (prefersReducedMotion) {
    hero.setAttribute("data-prm", "true");
  } else {
    hero.removeAttribute("data-prm");
  }

  const videos = hero.querySelectorAll<HTMLVideoElement>("video");
  videos.forEach((video) => {
    const originalPreload =
      video.getAttribute("data-preload-default") ?? video.getAttribute("preload") ??
      "auto";

    if (!video.hasAttribute("data-preload-default")) {
      video.setAttribute("data-preload-default", originalPreload);
    }

    if (prefersReducedMotion) {
      try {
        video.pause();
      } catch {
        // Ignore pause errors for streams that are not ready.
      }

      try {
        video.currentTime = 0;
      } catch {
        // Safari may throw while seeking metadata-only resources; ignore.
      }

      video.setAttribute("preload", "metadata");

      return;
    }

    const defaultPreload = video.getAttribute("data-preload-default");
    if (defaultPreload) {
      video.setAttribute("preload", defaultPreload);
    } else {
      video.removeAttribute("preload");
    }

    if (!video.hasAttribute("autoplay")) {
      return;
    }

    const playPromise = video.play();
    if (typeof playPromise?.catch === "function") {
      playPromise.catch(() => {});
    }
  });
}

export default function Page() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    ensureVeilLayer();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);

      return () => {
        mediaQuery.removeEventListener("change", updatePreference);
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  useEffect(() => {
    syncMotionState(prefersReducedMotion);
  }, [prefersReducedMotion]);

  return (
    <main
      className="min-h-screen"
      data-prm={prefersReducedMotion ? "true" : undefined}
      style={{
        backgroundColor: "var(--smh-ink)",
        color: "var(--smh-text)",
      }}
    >
      <PreviewHeroGilded />
    </main>
  );
}
