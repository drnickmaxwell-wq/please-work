import { ChampagneCTA } from "@/components/cta/ChampagneCTA";

import styles from "./composite-bonding-preview.module.css";

export function CompositeBondingCTA() {
  return (
    <section className={styles.section} aria-labelledby="composite-cta-heading">
      <div className={styles.ctaBand}>
        <div className={styles.ctaContent}>
          <div>
            <p className={styles.eyebrow}>Plan</p>
            <h2 id="composite-cta-heading" className={styles.ctaHeading}>
              Ready for your composite bonding plan?
            </h2>
            <p className={styles.ctaBody}>
              Pair the Champagne CTA skin with dusk-to-ink gradients. Book a consultation or explore the AI smile preview to see how
              bonding could refine your edges.
            </p>
          </div>
          <ChampagneCTA
            variant="pair"
            primaryLabel="Book a consultation"
            primaryHref="/contact"
            secondaryLabel="AI smile preview"
            secondaryHref="/ai-smile-quiz"
          />
        </div>
      </div>
    </section>
  );
}
