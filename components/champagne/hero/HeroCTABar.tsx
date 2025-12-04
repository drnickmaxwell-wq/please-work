"use client";

import PreviewChampagneCTA from "@/components/preview/shared/PreviewChampagneCTA";
import type { HeroCTAConfig, HeroTone } from "@/lib/champagne/hero-schema";
import previewCtaStyles from "@/components/preview/shared/preview-cta.module.css";

type HeroCTABarProps = {
  cta: HeroCTAConfig;
  tone: HeroTone;
};

export function HeroCTABar({ cta, tone }: HeroCTABarProps) {
  const primaryLabel = cta.primaryLabel ?? "Get started";
  const secondaryLabel = cta.secondaryLabel ?? "Explore";
  const primaryHref = cta.primaryHref ?? "/contact";
  const secondaryHref = cta.secondaryHref ?? "/treatments";
  const surface = tone === "whitening" || tone === "dawn" ? "light" : "dark";

  return (
    <div className="hero-cta-plate cta-plate-glass-dusk" data-surface={surface} data-tone={tone}>
      <div className={previewCtaStyles.heroCTAGroup}>
        <PreviewChampagneCTA className={`${previewCtaStyles.primaryHero} ${cta.primary}`} href={primaryHref}>
          {primaryLabel}
        </PreviewChampagneCTA>
        <PreviewChampagneCTA
          className={`${previewCtaStyles.secondaryHero} ${cta.secondary}`}
          href={secondaryHref}
          variant="secondary"
        >
          {secondaryLabel}
        </PreviewChampagneCTA>
      </div>
    </div>
  );
}
