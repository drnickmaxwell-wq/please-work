export type TreatmentFaq = {
  question: string;
  answer: string;
};

export default function TreatmentMicroFaq({ faqs }: { faqs: TreatmentFaq[] }) {
  return (
    <section className="cpv-card" aria-labelledby="treatments-faq-heading">
      <div className="cpv-card__inner cpv-card__inner--stack">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow">FAQ</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title" id="treatments-faq-heading">
              Quick answers for search and schema
            </h2>
            <p className="cpv-card__lead">
              Built for the zero-click plan: concise answers that map directly to FAQPage schema for veneers, implants, finance, and comfort.
            </p>
          </div>
        </div>
        <div className="faq-rail" role="list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-rail__item" role="listitem">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
