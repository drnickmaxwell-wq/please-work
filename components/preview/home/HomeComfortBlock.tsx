import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

const comfortPoints = [
  "Gentle, unhurried appointments",
  "Options for sedation",
  "Clear communication, no pressure",
];

export default function HomeComfortBlock() {
  return (
    <section className={styles.sectionShell} aria-labelledby="comfort-block-heading">
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Comfort</p>
            <h2 className="text-display-sm" id="comfort-block-heading">
              Designed for nervous patients
            </h2>
            <p className={`${styles.lead} text-body`}>
              Calm, quiet appointments with time to pause. The team explains every step, offers pauses often, and adapts to
              your pace.
            </p>
          </div>
          <ul className={styles.list}>
            {comfortPoints.map((item) => (
              <li key={item} className="text-body">
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.ctaRow}>
            <ChampagneCTA href="/anxiety-dentistry" variant="secondary">
              Learn about anxiety dentistry
            </ChampagneCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
