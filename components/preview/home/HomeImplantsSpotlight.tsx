import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

const implantBullets = [
  "3D diagnostics, guided placement, and on-site printing",
  "Single-tooth, bridge, and full-arch solutions planned clearly",
  "Finance-friendly pathways with transparent milestones",
];

export default function HomeImplantsSpotlight() {
  return (
    <section className={styles.sectionShell} aria-labelledby="implants-spotlight-heading">
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Implant focus</p>
            <h2 className="text-display-sm" id="implants-spotlight-heading">
              Dental implants that feel like your own teeth
            </h2>
            <p className={`${styles.lead} text-body`}>
              High-value implant care for single teeth and full arches, with clear 3D planning, calm appointments, and
              restorative finishes that blend naturally.
            </p>
          </div>
          <ul className={styles.list}>
            {implantBullets.map((item) => (
              <li key={item} className="text-body">
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.ctaRow}>
            <ChampagneCTA href="/treatments/dental-implants">Dental implants</ChampagneCTA>
            <ChampagneCTA href="/video-consultation" variant="secondary">
              Book implant consultation
            </ChampagneCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
