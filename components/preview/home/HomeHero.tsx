import ChampagneHero from "@/components/home/ChampagneHero";

import styles from "./home-preview.module.css";

export default function HomeHero() {
  return (
    <div className={styles.heroCtaOverride}>
      <ChampagneHero />
    </div>
  );
}
