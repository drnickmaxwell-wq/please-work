import styles from "./home-preview.module.css";
import PreviewChampagneCTA from "../shared/PreviewChampagneCTA";

export default function HomeFinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereBase}`}>
        <div className={`cpv-card ${styles.sectionPanel}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
            <div className={styles.sectionHeader}>
              <p className={`${styles.smallLabel} text-eyebrow`}>Next step</p>
              <h2 className={styles.sectionTitle} id="final-cta-heading">
                Ready to start your Champagne journey?
              </h2>
              <p className={`${styles.lead} ${styles.bodyText}`}>
                Choose a visit type that suits you. No pressure, just clear options.
              </p>
            </div>
            <div className={styles.ctaRow}>
              <PreviewChampagneCTA href="/contact">Book a consultation</PreviewChampagneCTA>
              <PreviewChampagneCTA href="/video-consultation" variant="secondary">
                Request a video consultation
              </PreviewChampagneCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
