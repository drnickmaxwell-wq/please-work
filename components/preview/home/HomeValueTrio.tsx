import Link from "next/link";

import styles from "./home-preview.module.css";

const valueCards = [
  {
    title: "Champagne Atmosphere",
    body: "Warm lighting, calm playlists, and hospitality touches that keep each appointment feeling like a boutique visit.",
    href: "/about",
    linkLabel: "See the space",
  },
  {
    title: "Digital-First Dentistry",
    body: "3D scans, CBCT diagnostics, and AI previews so you can see options clearly and track progress with confidence.",
    href: "/technology",
    linkLabel: "Explore our technology",
  },
  {
    title: "Gentle, Unhurried Care",
    body: "Longer appointment times, sedation pathways, and clinicians who pause often so nervous guests stay comfortable.",
    href: "/anxiety-dentistry",
    linkLabel: "Support for nervous patients",
  },
];

export default function HomeValueTrio() {
  return (
    <section className={styles.sectionShell} aria-labelledby="champagne-experience-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Value pillars</p>
            <h2 className="text-display-sm" id="champagne-experience-heading">
              What makes St Mary’s House different
            </h2>
            <p className={`${styles.lead} text-body`}>
              A calm, design-led pathway for cosmetic, implant, and aligner guests. Technology, hospitality, and clinical
              governance combine to create a premium but reassuring visit.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {valueCards.map((card) => (
              <article key={card.title} className={styles.card}>
                <div className={styles.tightStack}>
                  <h3 className={`text-lead ${styles.cardTitle}`}>{card.title}</h3>
                  <p className="text-body">{card.body}</p>
                </div>
                <Link className={`${styles.inlineLink} text-body`} href={card.href}>
                  {card.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
