import { ChampagneFAQ } from "@/components/faq/ChampagneFAQ";

import styles from "./whitening-preview.module.css";

const FAQ_ITEMS = [
  {
    id: "sensitivity",
    question: "Will whitening make my teeth sensitive?",
    answer:
      "We use sensitivity-aware gels and can adjust the protocol or add serums if you feel any zing during treatment.",
  },
  {
    id: "duration",
    question: "How long do whitening results last?",
    answer:
      "Results typically hold for months with good care. We map your shade and advise when quick top-ups are helpful.",
  },
  {
    id: "safety",
    question: "Is whitening safe for my enamel?",
    answer:
      "Dentist-prescribed whitening keeps gels within safe limits and avoids overheating so enamel stays protected.",
  },
  {
    id: "work",
    question: "Can I still have whitening if I have fillings or crowns?",
    answer:
      "We check any existing work, explain how it will respond, and plan refinements or replacements if needed.",
  },
];

export function WhiteningFaq() {
  return (
    <section className={styles.section} aria-labelledby="whitening-faq-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 id="whitening-faq-heading" className={styles.sectionTitle}>
          Whitening questions preview
        </h2>
        <p className={styles.sectionLead}>Swap with schema-connected FAQ entries once they land.</p>
      </div>

      <ChampagneFAQ items={FAQ_ITEMS} />
    </section>
  );
}
