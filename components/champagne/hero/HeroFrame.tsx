"use client";

import { HeroCTABar } from "./HeroCTABar";
import { HeroShimmer } from "./HeroShimmer";
import { HeroWaveStack } from "./HeroWaveStack";
import type { HeroSchema } from "@/lib/champagne/hero-schema";

function composeClasses(classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type HeroFrameProps = {
  schema: HeroSchema;
};

export function HeroFrame({ schema }: HeroFrameProps) {
  const toneKey = schema.tone === "custom" ? "dusk" : schema.tone;
  const toneClass = `hero-tonal-${toneKey === "teal-lux" ? "teal-lux" : toneKey}`;
  const intensityClass = schema.intensity === "standard" ? undefined : `hero-intensity-${schema.intensity}`;
  const layoutClass = `hero-layout-${schema.layout}`;
  const composedClassName = composeClasses(["hero-gradient-base", toneClass, intensityClass, layoutClass]);

  return (
    <section className={composedClassName} role="banner" aria-label={schema.headline || "Champagne hero"}>
      <HeroWaveStack mask={schema.waves.mask} opacity={schema.waves.opacity} />
      {schema.shimmer.enabled ? <HeroShimmer density={schema.shimmer.density} /> : null}

      <div className="hero-frame__content">
        {schema.eyebrow ? <p className="hero-eyebrow">{schema.eyebrow}</p> : null}
        {schema.headline ? <h1 className="hero-headline">{schema.headline}</h1> : null}
        {schema.subcopy ? <p className="hero-subcopy">{schema.subcopy}</p> : null}
        <HeroCTABar cta={schema.cta} tone={schema.tone} />
      </div>
    </section>
  );
}
