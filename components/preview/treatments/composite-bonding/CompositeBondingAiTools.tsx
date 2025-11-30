import { AIWidgetTrio } from "@/components/ai-tools/AIWidgetTrio";

import styles from "./composite-bonding-preview.module.css";

export function CompositeBondingAiTools() {
  return (
    <section className={styles.section} aria-labelledby="composite-ai-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>AI tools trio</span>
        <h2 id="composite-ai-heading" className={styles.sectionTitle}>
          Preview costs, timings, and your smile in one place
        </h2>
        <p className={styles.sectionLead}>
          Champagne AI widgets for composite bonding: quick cost estimates, treatment time predictors, and an AR smile try-on that
          keeps guests engaged before they visit.
        </p>
      </div>
      <div className={styles.aiCardGrid}>
        <AIWidgetTrio />
      </div>
    </section>
  );
}
