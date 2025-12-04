import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

export default function HomeHeroCTABand() {
  return (
    <section className={styles.sectionHero} aria-label="Hero call to action preview">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereTop}`}>
        <div className={`cpv-card cpv-card--soft ${styles.sectionPanel} ${styles.heroBand}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack} ${styles.heroBandCard}`}>
            <p className={`${styles.smallLabel} text-eyebrow`}>Start your visit</p>
            <div className={styles.ctaRow}>
              <ChampagneCta href="/contact" label="Book a consultation" variant="primaryHero" />
              <ChampagneCta
                href="/treatments"
                label="Explore treatments"
                variant="secondaryHero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
