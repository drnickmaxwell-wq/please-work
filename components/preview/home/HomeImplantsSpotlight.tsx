import ChampagneCta from "@/components/champagne/ChampagneCta";

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
            <ChampagneCta
              href="/treatments/dental-implants"
              label="Dental implants"
              variant="primaryClinical"
            />
            <ChampagneCta
              href="/video-consultation"
              label="Book implant consultation"
              variant="secondarySection"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
