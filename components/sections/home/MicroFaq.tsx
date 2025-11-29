import FAQJsonLd from "@/components/seo/FAQJsonLd";
import styles from "./homepage-sections.module.css";

export type Faq = {
  question: string;
  answer: string;
};

type MicroFaqProps = {
  faqs: Faq[];
};

export default function MicroFaq({ faqs }: MicroFaqProps) {
  return (
    <section className="bg-[var(--smh-bg)] px-4 py-16 text-[var(--ink)] lg:py-20" aria-labelledby="micro-faq-title">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="space-y-2">
          <span className={styles.chip}>Quick answers</span>
          <h2 id="micro-faq-title" className="text-3xl font-semibold leading-tight md:text-4xl">
            Micro-FAQ for instant clarity
          </h2>
          <p className={`max-w-3xl text-lg leading-relaxed ${styles.mutedText}`}>
            Short, speakable answers tuned for zero-click snippets and AI overview panels.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className={`${styles.glassCard} rounded-2xl p-4`}
              aria-label={faq.question}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-lg font-semibold text-[var(--ink)]">
                {faq.question}
                <span aria-hidden className="text-sm text-[var(--brand-magenta)]">
                  Expand
                </span>
              </summary>
              <p className={`mt-2 text-base leading-relaxed ${styles.mutedText}`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <FAQJsonLd items={faqs} />
    </section>
  );
}
