'use client';

import React from 'react';

import '@/styles/preview/treatments-skin.css';

type Props = React.PropsWithChildren<{
  section: 'veneers' | 'implants' | 'spark-aligners' | 'whitening';
}>;

export function TreatmentPreviewFrame({ section, children }: Props) {
  return (
    <div className="champagne-preview-skin" data-section={section}>
      <div className="champagne-preview-skin__inner">{children}</div>
    </div>
  );
}
