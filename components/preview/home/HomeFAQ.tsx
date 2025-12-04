import MicroFaq, { type Faq } from "@/components/sections/home/MicroFaq";

import styles from "./home-preview.module.css";

const faqs: Faq[] = [
  { question: "Are you accepting new patients?", answer: "Yes. Private appointments are available with calm onboarding." },
  { question: "Do you offer finance?", answer: "Soft-search finance options can be discussed after your consultation." },
  { question: "Do you treat anxious patients?", answer: "Yes — quiet rooms, unhurried visits, and sedation where appropriate." },
  { question: "Where are you located?", answer: "1 St Mary’s House, Shoreham-by-Sea, serving Brighton and Sussex." },
];

export default function HomeFAQ() {
  return (
    <section className={styles.sectionShell} aria-labelledby="home-faq-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">FAQs</p>
            <h2 className="text-display-sm" id="home-faq-heading">
              Common questions
            </h2>
            <p className={`${styles.lead} text-body`}>
              Preview-only FAQ rail mirroring HOME_FAQ_V1. Structured schema and dynamic data will be slotted in later.
            </p>
          </div>
          <MicroFaq faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
