"use client";

import ChampagneCTA from "@/components/champagne/ChampagneCTA";
import ChampagneHero from "@/components/home/ChampagneHero";

import styles from "./home-preview.module.css";

export default function HomeHeroPreview() {
  return (
    <div className={styles.heroPreview}>
      <ChampagneHero />
      <div className={styles.heroCtas}>
        <ChampagneCTA href="/contact">Book a consultation</ChampagneCTA>
        <ChampagneCTA href="/treatments" variant="secondary">
          Explore treatments
        </ChampagneCTA>
      </div>
    </div>
  );
}
