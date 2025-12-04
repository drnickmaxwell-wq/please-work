import Link from "next/link";

import styles from "./home-preview.module.css";

export default function HomeFinalCTA() {
  return (
    <section className={styles.sectionShell} aria-labelledby="final-cta-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Next step</p>
            <h2 className="text-display-sm" id="final-cta-heading">
              Ready to talk about your smile?
            </h2>
            <p className={`${styles.lead} text-body`}>
              Choose a visit type that suits you. No pressure, just clear options.
            </p>
          </div>
          <div className={styles.ctaRow}>
            <Link className="cpv-btn cpv-btn-solid text-eyebrow" href="/contact">
              Book a consultation
            </Link>
            <Link className="cpv-btn cpv-btn-ghost text-eyebrow" href="/video-consultation">
              Request a video consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
