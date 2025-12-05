import PreviewChampagneCTA from "@/components/preview/shared/PreviewChampagneCTA";
import type { HeroSchema } from "@/lib/champagne/hero-schema";

type HeroCTABarProps = {
  cta: HeroSchema["cta"];
};

export function HeroCTABar({ cta }: HeroCTABarProps) {
  return (
    <div className="hero-cta-plate cta-plate-glass-dusk">
      <div className="hero-cta-row">
        {cta.primaryLabel ? (
          <PreviewChampagneCTA
            ariaLabel={cta.primaryLabel}
            className={cta.primary}
            href={cta.primaryHref ?? "/contact"}
          >
            {cta.primaryLabel}
          </PreviewChampagneCTA>
        ) : null}

        {cta.secondaryLabel ? (
          <PreviewChampagneCTA
            ariaLabel={cta.secondaryLabel}
            className={cta.secondary}
            href={cta.secondaryHref ?? "/treatments"}
            variant="secondary"
          >
            {cta.secondaryLabel}
          </PreviewChampagneCTA>
        ) : null}
      </div>
    </div>
  );
}
