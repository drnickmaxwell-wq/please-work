import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

export default function HomeHeroCTABand() {
  return (
    <div className={`${styles.sectionShell} ${styles.heroBand}`} aria-label="Hero call to action preview">
      <div className="cpv-card cpv-card--soft">
        <div className={`cpv-card__inner cpv-card__inner--stack ${styles.heroBandCard}`}>
          <p className="text-eyebrow">Start your visit</p>
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
  );
}
