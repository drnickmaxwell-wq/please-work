import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const QUESTIONS = [
  {
    question: 'How long do appointments take?',
    answer: 'Use this area to confirm appointment cadence, treatment length expectations, and comfort provisions.',
  },
  {
    question: 'Do you offer digital smile previews?',
    answer: 'Placeholder response for scanner availability, mock-ups, and how previews integrate with consultations.',
  },
  {
    question: 'What financing checks are required?',
    answer: 'Space for compliance-approved finance messaging, timing, and documentation notes.',
  },
];

export default function FaqRail({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Rail-style FAQ stub referencing the global treatments FAQ group with preview copy."
      id="faq"
      kicker={'<FAQRail group="treatments" />'}
      route={route}
      title="FAQ rail"
    >
      <div className="tl-faq-rail">
        {QUESTIONS.map((item) => (
          <article className="tl-faq-rail__item" key={item.question}>
            <h3 className="tl-faq-rail__question">{item.question}</h3>
            <p className="tl-faq-rail__answer">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
