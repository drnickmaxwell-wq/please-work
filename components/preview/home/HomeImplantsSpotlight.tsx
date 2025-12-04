import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

const highlights = [
  "3D diagnostics and guided placement for precise, comfortable results",
  "Single tooth, multiple teeth, and full-arch options designed to blend in",
  "Finance options to spread the cost with transparent, tailored plans",
];

export default function HomeImplantsSpotlight() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Dental implants that feel like your own teeth</h2>
        <p className={styles.sectionLead}>
          A calm, technology-led implant experience guided by clinicians who
          prioritise comfort and long-term stability.
        </p>
      </div>
      <ul className={styles.list}>
        {highlights.map((item) => (
          <li key={item} className={styles.listItem}>
            <span className={styles.bullet} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className={styles.pillRow} style={{ marginTop: "1.4rem" }}>
        <ChampagneCTA href="/treatments/dental-implants">Book an implant consultation</ChampagneCTA>
        <ChampagneCTA href="/finance" variant="secondary">
          Explore finance options
        </ChampagneCTA>
      </div>
    </section>
  );
}
