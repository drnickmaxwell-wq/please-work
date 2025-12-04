import Link from "next/link";

import styles from "./home-preview.module.css";

const testimonials = [
  {
    quote: "The team listened first, then showed a calm plan with scans so I knew what to expect.",
    name: "S. H.",
    tag: "Dental implants",
  },
  {
    quote: "Lovely quiet clinic. Veneers were previewed digitally before we started anything.",
    name: "A. R.",
    tag: "Cosmetic dentistry",
  },
  {
    quote: "Gentle, unhurried appointments and clear instructions for my aligners and retainers.",
    name: "J. M.",
    tag: "Clear aligners",
  },
];

export default function HomeTestimonials() {
  return (
    <section className={styles.sectionShell} aria-labelledby="testimonials-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Patient stories</p>
            <h2 className="text-display-sm" id="testimonials-heading">
              What Our Patients Say
            </h2>
            <p className={`${styles.lead} text-body`}>
              Snapshot quotes mirroring the HOME_TESTIMONIALS pattern. Full stories and video proof can replace these once the
              production gallery is ready.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {testimonials.map((item) => (
              <article key={item.quote} className={styles.card}>
                <p className="text-body">“{item.quote}”</p>
                <div className={styles.tightStack}>
                  <p className="text-eyebrow">{item.tag}</p>
                  <p className="text-body">{item.name}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link className="cpv-btn cpv-btn-ghost text-eyebrow" href="/patient-stories">
              View patient stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
