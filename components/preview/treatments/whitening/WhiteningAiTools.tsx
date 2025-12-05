import { AIWidgetTrio } from "@/components/ai-tools/AIWidgetTrio";

import styles from "./whitening-preview.module.css";

export function WhiteningAiTools() {
  return (
    <section className={styles.section} aria-labelledby="whitening-ai-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>AI tools trio</span>
        <h2 id="whitening-ai-heading" className={styles.sectionTitle}>
          See whitening timing, cost, and your shade lift in one place
        </h2>
        <p className={styles.sectionLead}>
          Champagne AI widgets tuned for whitening: quick cost previews, estimated session timings, and visual journeys that keep
          guests engaged before they book.
        </p>
      </div>
      <div className={styles.aiCardGrid}>
        <AIWidgetTrio />
      </div>
    </section>
  );
}
