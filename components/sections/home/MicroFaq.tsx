import FAQJsonLd from "@/components/seo/FAQJsonLd";
import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

export type Faq = {
  question: string;
  answer: string;
};

type MicroFaqProps = {
  faqs: Faq[];
};

export default function MicroFaq({ faqs }: MicroFaqProps) {
  return (
    <SectionShell tone="paper" ariaLabelledby="micro-faq-title">
      <div className="flex flex-col gap-10">
        <div className={styles.sectionHeader}>
          <span className={`${styles.chip} text-eyebrow`}>Quick answers</span>
          <h2 id="micro-faq-title" className={`${styles.displayHeading} text-display-sm`}>
            Micro-FAQ for instant clarity
          </h2>
          <p className={`${styles.sectionLead} text-lead text-body ${styles.mutedText}`}>
            Short, speakable answers tuned for zero-click snippets and AI overview panels.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className={`${styles.glassCard} ${styles.interactiveGlow} rounded-2xl p-4`}
              aria-label={faq.question}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-lead font-semibold text-[var(--ink)]">
                {faq.question}
                <span aria-hidden className="text-eyebrow text-[var(--brand-magenta)]">Expand</span>
              </summary>
              <p className={`mt-3 text-body ${styles.mutedText}`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <FAQJsonLd items={faqs} />
    </SectionShell>
  );
}
