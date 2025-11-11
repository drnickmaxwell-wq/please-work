import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const FAQS = [
  {
    question: 'How do follow-up visits work?',
    answer: 'Placeholder accordion content ready for JSON-LD FAQPage injection when production copy is final.',
  },
  {
    question: 'What results can I expect?',
    answer: 'Use this slot for expectation setting, photography references, and clinical disclaimers.',
  },
  {
    question: 'Is there downtime?',
    answer: 'Stub messaging covering recovery timelines and comfort measures to be replaced with final notes.',
  },
];

export default function Faqs({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Accordion-style FAQ stub supporting schema export and analytics hooks."
      id="faqs"
      kicker={'<FAQAccordion group="{slug}" />'}
      route={route}
      title="FAQ accordion"
    >
      <div className="tl-accordion">
        {FAQS.map((item) => (
          <details className="tl-accordion__item" key={item.question}>
            <summary className="tl-accordion__summary">{item.question}</summary>
            <p className="tl-accordion__content">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionFrame>
  );
}
