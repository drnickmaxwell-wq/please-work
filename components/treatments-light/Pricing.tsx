import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const PLANS = [
  { label: 'Consultation', price: '£95 placeholder', detail: 'Includes digital scans and treatment planning overview.' },
  { label: 'Treatment bundle', price: 'From £1,950', detail: 'Swap in tiered pricing once campaign rates are confirmed.' },
  { label: 'Aftercare membership', price: '£18 / month', detail: 'Use for retention plans and maintenance programmes.' },
];

export default function Pricing({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Pricing and finance stub referencing treatment plan groups with safe placeholder currency."
      id="pricing"
      kicker={'<FinanceModule provider="tabeo" planGroup="{slug}" />'}
      route={route}
      title="Pricing & finance"
    >
      <table className="tl-pricing" role="presentation">
        <tbody>
          {PLANS.map((plan) => (
            <tr key={plan.label}>
              <th scope="row">{plan.label}</th>
              <td>{plan.price}</td>
              <td>{plan.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionFrame>
  );
}
