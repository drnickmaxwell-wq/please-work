import type { PreviewFaqEntry } from '@/lib/seo/preview/safe-loader';

export type FaqAccordionProps = {
  items: PreviewFaqEntry[];
  missing?: boolean;
};

export default function FaqAccordion({ items, missing = false }: FaqAccordionProps) {
  const hasFaq = items.length > 0;

  return (
    <section aria-labelledby="tp-faq-title" className="tp-section tp-faq">
      <div className="tp-section__heading">
        <p className="tp-kicker">FAQ</p>
        <h2 className="tp-title" id="tp-faq-title">
          Patient questions
        </h2>
      </div>
      <div className="tp-faq__list">
        {hasFaq
          ? items.map((item, index) => (
              <details className="tp-faq__item" key={`${item.question ?? 'faq'}-${index}`}>
                <summary>{item.question ?? 'Question pending copy'}</summary>
                <p>{item.answer ?? 'Awaiting acceptedAnswer.text from FAQPage schema.'}</p>
              </details>
            ))
          : [0, 1, 2].map((index) => (
              <div className="tp-faq__item tp-faq__item--placeholder" key={`faq-placeholder-${index}`}>
                <p className="tp-faq__placeholder-question">FAQ pending schema</p>
                <p className="tp-faq__placeholder-answer">
                  Provide FAQPage.mainEntity entries to replace preview placeholders.
                </p>
              </div>
            ))}
      </div>
      {missing ? <p className="tp-footnote">FAQPage schema missing; placeholders rendered.</p> : null}
    </section>
  );
}
