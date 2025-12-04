import Link from "next/link";

import styles from "./home-preview.module.css";

const implantBullets = [
  "CBCT imaging and guided placement for precision",
  "Same-day and fixed-teeth options planned in 3D",
  "Restorations blended to your natural shade and profile",
];

export default function HomeImplantsSpotlight() {
  return (
    <section className={styles.sectionShell} aria-labelledby="implants-spotlight-heading">
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Implant focus</p>
            <h2 className="text-display-sm" id="implants-spotlight-heading">
              Dental Implants at SMH Dental
            </h2>
            <p className={`${styles.lead} text-body`}>
              High-value implant care for single teeth and full-arch cases, with digital planning that keeps the pathway clear
              and calm from consultation to final restoration.
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
            <Link className="cpv-btn cpv-btn-solid text-eyebrow" href="/treatments/dental-implants">
              Dental implants
            </Link>
            <Link className="cpv-btn cpv-btn-ghost text-eyebrow" href="/video-consultation">
              Book implant consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
