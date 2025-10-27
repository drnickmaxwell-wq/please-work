"use client";

import { useEffect } from "react";

const TOKEN_KEYS = [
  "--smh-gradient",
  "--brand-magenta",
  "--brand-teal",
  "--brand-gold",
  "--glass-bg-weak",
  "--glass-bg-strong",
] as const;

type Snapshot = Record<(typeof TOKEN_KEYS)[number], string>;

export default function BrandTokenLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const styles = getComputedStyle(document.documentElement);
    const snapshot = TOKEN_KEYS.reduce<Snapshot>((acc, key) => {
      acc[key] = styles.getPropertyValue(key).trim();
      return acc;
    }, {} as Snapshot);

    console.info("[brand-lock]", snapshot);
  }, []);

  return null;
}
