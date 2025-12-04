import MicroFaq, { type Faq } from "@/components/sections/home/MicroFaq";

import styles from "./home-preview.module.css";

const faqs: Faq[] = [
  {
    question: "Are you accepting new patients?",
    answer: "Yes. Private appointments are available with calm onboarding.",
  },
  {
    question: "Do you offer finance?",
    answer: "Soft-search finance options can be discussed after your consultation.",
  },
  {
    question: "Do you treat anxious patients?",
    answer: "Yes — quiet rooms, unhurried visits, and sedation where appropriate.",
  },
  {
    question: "Can I book a video consultation?",
    answer: "Yes. Video consultations are available for initial triage and treatment planning.",
  },
  {
    question: "What dental technology do you use?",
    answer: "CBCT imaging, digital scanning, and 3D planning are built into most treatment pathways.",
  },
  {
    question: "Where are you located?",
    answer: "1 St Mary’s House, Shoreham-by-Sea, serving Brighton and Sussex.",
  },
  {
    question: "Do you provide clear aligners?",
    answer: "Yes. Clear aligner journeys include staged reviews and retention from day one.",
  },
];

export default function HomeFAQ() {
  return (
    <section className={styles.section} aria-labelledby="home-faq-heading">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereMid}`}>
        <div className={`cpv-card ${styles.sectionPanel}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
            <div className={styles.sectionHeader}>
              <p className={`${styles.smallLabel} text-eyebrow`}>FAQs</p>
              <h2 className={styles.sectionTitle} id="home-faq-heading">
                Questions we’re often asked
              </h2>
              <p className={`${styles.lead} ${styles.bodyText}`}>
                Preview-only FAQ rail mirroring HOME_FAQ_V1. Structured schema and dynamic data will be slotted in later.
              </p>
            </div>
            <MicroFaq faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
