import Link from "next/link";

import styles from "./home-preview.module.css";

export default function HomeHeroCTABand() {
  return (
    <section className={styles.sectionHero} aria-label="Hero call to action preview">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereTop}`}>
        <div className={`cpv-card cpv-card--soft ${styles.sectionPanel} ${styles.heroBand}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack} ${styles.heroBandCard}`}>
            <p className={`${styles.smallLabel} text-eyebrow`}>Start your visit</p>
            <div className={styles.ctaRow}>
              <Link href="/contact" className={styles.ctaPrimaryRegal}>
                Book a consultation
              </Link>
              <Link href="/treatments" className={styles.ctaSecondaryGlass}>
                Explore treatments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
