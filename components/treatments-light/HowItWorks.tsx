import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const STEPS = [
  'Consultation with digital scans and photography.',
  '3D planning session with preview models and treatment mapping.',
  'Treatment day with calming amenities and clinical precision.',
  'Aftercare review with personalised maintenance plan.',
];

export default function HowItWorks({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Process steps stub pulling copy from schema-driven sequences."
      id="how-it-works"
      kicker={'<HowToSteps schemaKey="{process}" />'}
      route={route}
      title="How it works"
    >
      <ol className="tl-steps">
        {STEPS.map((step, index) => (
          <li className="tl-steps__item" key={step}>
            <span className="tl-steps__index">{index + 1}</span>
            <div className="tl-steps__content">
              <h3 className="tl-steps__title">Step {index + 1}</h3>
              <p className="tl-steps__body">{step}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
