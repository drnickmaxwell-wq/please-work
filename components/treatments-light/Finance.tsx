import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

export default function Finance({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Finance band stub referencing Tabeo provider with safe placeholder APR and repayment info."
      id="finance"
      kicker={'<FinanceBand provider="tabeo" />'}
      route={route}
      title="Finance band"
    >
      <div className="tl-finance">
        <div className="tl-finance__headline">
          <span className="tl-chip">Provider: Tabeo</span>
          <h3 className="tl-finance__title">Spread the investment</h3>
          <p className="tl-finance__body">
            Placeholder terms for interest-free and low-rate finance options. Final copy lives here once compliance clears the
            messaging.
          </p>
        </div>
        <dl className="tl-finance__grid">
          <div>
            <dt>Example plan</dt>
            <dd>£3,000 over 24 months</dd>
          </div>
          <div>
            <dt>Representative APR</dt>
            <dd>9.9% placeholder</dd>
          </div>
          <div>
            <dt>Deposit</dt>
            <dd>£0 optional</dd>
          </div>
        </dl>
      </div>
    </SectionFrame>
  );
}
