import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const CTA_OPTIONS = [
  { label: 'Book an appointment', intent: 'book' },
  { label: 'Start a video e-consult', intent: 'econsult' },
  { label: 'Message on WhatsApp', intent: 'whatsapp' },
];

export default function Cta({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Flexible CTA block stub wired for multiple intents across treatments experiences."
      id="cta"
      kicker={'<CTASection intent="book|econsult|whatsapp" />'}
      route={route}
      title="Final CTA"
    >
      <div className="tl-cta">
        <h3 className="tl-cta__headline">Ready for a brighter smile?</h3>
        <p className="tl-cta__body">
          Swap in campaign-specific copy and configure tracking once the intents are confirmed by marketing.
        </p>
        <div className="tl-cta__actions">
          {CTA_OPTIONS.map((cta) => (
            <button className="tl-button tl-button--primary" data-intent={cta.intent} key={cta.intent} type="button">
              {cta.label}
            </button>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
