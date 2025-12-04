import Link from "next/link";

import styles from "./home-preview.module.css";

const valueCards = [
  {
    title: "Art & Architecture",
    body: "Veneers, composite bonding, and bespoke smile design shaped to your face, lips, and the natural Shoreham light.",
    href: "/treatments/cosmetic",
    linkLabel: "Explore cosmetic dentistry",
  },
  {
    title: "Implants & 3D Dentistry",
    body: "Guided implant planning, CBCT imaging, and on-site printing to keep treatment precise and efficient.",
    href: "/treatments/dental-implants",
    linkLabel: "See implant pathways",
  },
  {
    title: "Calm, Private Care",
    body: "Anxiety-aware appointments, sedation options, and a quiet setting for guests who prefer unhurried dentistry.",
    href: "/anxiety-dentistry",
    linkLabel: "Learn about calm visits",
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
              The Champagne Experience
            </h2>
            <p className={`${styles.lead} text-body`}>
              A calm, design-led pathway for cosmetic, implant, and aligner guests. Each visit is planned with technology that
              makes appointments efficient and with hospitality that keeps the atmosphere gentle.
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
