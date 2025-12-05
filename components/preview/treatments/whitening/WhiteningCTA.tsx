import { ChampagneCTA } from "@/components/cta/ChampagneCTA";

import styles from "./whitening-preview.module.css";

export function WhiteningCTA() {
  return (
    <section className={styles.section} aria-labelledby="whitening-cta-heading">
      <div className={styles.ctaBand}>
        <div className={styles.ctaContent}>
          <div>
            <p className={styles.eyebrow}>Plan</p>
            <h2 id="whitening-cta-heading" className={styles.ctaHeading}>
              Ready for your whitening plan?
            </h2>
            <p className={styles.ctaBody}>
              Book a whitening consultation or explore the full treatment list. The Champagne CTA pair stays on CTA System v2.
            </p>
          </div>
          <ChampagneCTA
            variant="pair"
            primaryLabel="Book Teeth whitening"
            primaryHref="/contact"
            secondaryLabel="View all treatments"
            secondaryHref="/treatments"
          />
        </div>
      </div>
    </section>
  );
}
