import type { ReactNode } from "react";

import { HeroCTABar } from "./HeroCTABar";
import { HeroShimmer } from "./HeroShimmer";
import { HeroWaveStack } from "./HeroWaveStack";
import type { HeroSchema } from "@/lib/champagne/hero-schema";

type HeroFrameProps = {
  schema: HeroSchema;
  children?: ReactNode;
};

export function HeroFrame({ schema, children }: HeroFrameProps) {
  const toneClass = schema.tone === "teal-lux" ? "hero-tonal-teal-lux" : `hero-tonal-${schema.tone}`;
  const intensityClass = schema.intensity === "soft"
    ? "hero-intensity-soft"
    : schema.intensity === "lux"
      ? "hero-intensity-lux"
      : "";
  const layoutClass = schema.layout === "center" ? "hero-layout-center" : "hero-layout-left";

  return (
    <section className={`hero-engine-shell hero-gradient-base ${toneClass} ${intensityClass}`} aria-label={schema.headline}>
      <HeroWaveStack waves={schema.waves} />
      <HeroShimmer shimmer={schema.shimmer} tone={schema.tone} />

      <div className={`hero-engine__inner ${layoutClass}`}>
        <div className="hero-engine__content">
          {schema.eyebrow ? <p className="hero-engine__eyebrow">{schema.eyebrow}</p> : null}
          <h1 className="hero-engine__headline">{schema.headline}</h1>
          <p className="hero-engine__subcopy">{schema.subcopy}</p>
          <HeroCTABar cta={schema.cta} />
          {children}
        </div>
      </div>
    </section>
  );
}
