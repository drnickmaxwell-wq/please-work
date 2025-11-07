"use client";

import { useMemo, useState, type CSSProperties } from "react";
import PreviewHeroGilded from "@/components/preview/HeroGilded";
import "@/styles/champagne/hero-gilded-tweaks.css";
import "@/styles/champagne/hero-polish.css";
import "@/styles/champagne/hero-gilded-polish.css";

export const metadata = {
  title: "Preview: Gilded Champagne Hero",
};

export default function Page() {
  const [boosted, setBoosted] = useState(false);

  const surfaceStyle = useMemo((): CSSProperties => {
    const goldBoost = boosted ? 1.2 : 0.8;

    return {
      backgroundColor: "var(--smh-ink)",
      color: "var(--smh-text)",
      ["--gold-boost" as "--gold-boost"]: goldBoost.toString(),
    };
  }, [boosted]);

  return (
    <main
      className="min-h-screen"
      style={surfaceStyle}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-end px-6 pt-6 text-xs text-[color:var(--smh-text-muted,#d2c6b5)]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="size-4 cursor-pointer accent-[color:var(--smh-accent-gold,#d4b77b)]"
            checked={boosted}
            onChange={(event) => setBoosted(event.target.checked)}
          />
          <span className="tracking-wide uppercase">Gold boost</span>
          <span aria-hidden="true" className="font-mono text-[0.7rem] opacity-70">
            {boosted ? "1.2×" : "0.8×"}
          </span>
        </label>
      </div>
      <PreviewHeroGilded />
    </main>
  );
}
