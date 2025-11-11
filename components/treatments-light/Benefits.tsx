import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const BENEFITS = [
  'Confidence-led smiles with carefully layered composite artistry.',
  'Comfort-first journeys featuring gentle sedation options.',
  'Digital planning with scanner data, smile design previews, and lab collaboration.',
];

export default function Benefits({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Treatment-specific benefits placeholder grid keyed by schema groups."
      id="benefits"
      kicker={'<BenefitGrid group="{slug}" />'}
      route={route}
      title="Benefits"
    >
      <ul className="tl-benefits">
        {BENEFITS.map((benefit) => (
          <li className="tl-benefits__item tl-tilt" key={benefit}>
            <span className="tl-benefits__icon" aria-hidden="true">
              ✦
            </span>
            <span className="tl-benefits__copy">{benefit}</span>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
