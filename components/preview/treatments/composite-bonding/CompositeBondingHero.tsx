import ChampagnePreviewHero from "@/components/preview/ChampagnePreviewHero";
import { ChampagneCTA } from "@/components/cta/ChampagneCTA";

import styles from "./composite-bonding-preview.module.css";

export function CompositeBondingHero() {
  return (
    <ChampagnePreviewHero
      kicker="Composite bonding"
      title="Refine your smile with precision composite bonding."
      ctas={
        <div className={styles.heroActions}>
          <div className={styles.heroMeta}>
            <span className={styles.ratingCapsule}>
              <span className={styles.ratingAccent}>4.9</span> experience score · 180+ bonding journeys
            </span>
            <span className={styles.ratingCapsule}>Same-day finishing · Calibrated gloss</span>
          </div>
          <ChampagneCTA
            variant="pair"
            primaryLabel="Book a consultation"
            primaryHref="/contact"
            secondaryLabel="AI smile preview"
            secondaryHref="/ai-smile-quiz"
          />
        </div>
      }
    >
      <p className={styles.heroSubcopy}>
        Sculpted resin layers close micro-gaps, rebalance edges, and restore lustre without compromising healthy enamel. Explore
        how our clinicians map, model, and polish every refinement.
      </p>
    </ChampagnePreviewHero>
  );
}
