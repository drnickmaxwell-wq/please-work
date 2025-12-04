import styles from "./home-preview.module.css";

const faqs = [
  {
    question: "Do you offer evening or weekend appointments?",
    answer: "Preview hours include early mornings and select evenings to fit busy schedules.",
  },
  {
    question: "Can I spread the cost of treatment?",
    answer: "Yes — finance options are available following a consultation and suitability checks.",
  },
  {
    question: "What happens at my first visit?",
    answer: "We listen, scan, and photograph to create a calm, detailed plan without rushing decisions.",
  },
  {
    question: "Do you treat anxious patients?",
    answer: "We tailor appointments with quiet rooms, gentle clinicians, and sedation choices when appropriate.",
  },
  {
    question: "Are digital scans safe?",
    answer: "We use low-dose CBCT imaging and comfortable 3D scanning to minimise exposure and maximise accuracy.",
  },
  {
    question: "Can I see examples of your work?",
    answer: "Yes — explore the smile gallery or request case studies during your consultation.",
  },
  {
    question: "Which treatments are available in-house?",
    answer: "From hygiene to implants, aligners, veneers, bonding, and whitening are all delivered on-site.",
  },
  {
    question: "Is parking available?",
    answer: "Nearby parking and coastal transport links make visits simple for Sussex patients.",
  },
];

export default function HomeFAQ() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Questions we’re often asked</h2>
        <p className={styles.sectionLead}>
          Fast FAQs to show how we keep consultations calm, informed, and
          technology-led.
        </p>
      </div>
      <div className={styles.faqGrid}>
        {faqs.map((faq) => (
          <article key={faq.question} className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>{faq.question}</h3>
            <p className={styles.faqAnswer}>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
