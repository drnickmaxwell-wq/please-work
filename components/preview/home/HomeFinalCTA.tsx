import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

export default function HomeFinalCTA() {
  return (
    <section className={styles.sectionShell} aria-labelledby="final-cta-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Next step</p>
            <h2 className="text-display-sm" id="final-cta-heading">
              Ready to start your Champagne journey?
            </h2>
            <p className={`${styles.lead} text-body`}>
              Choose a visit type that suits you. No pressure, just clear options.
            </p>
          </div>
          <div className={styles.ctaRow}>
            <ChampagneCta href="/contact" label="Book a consultation" variant="primarySection" />
            <ChampagneCta
              href="/video-consultation"
              label="Request a video consultation"
              variant="secondarySection"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
