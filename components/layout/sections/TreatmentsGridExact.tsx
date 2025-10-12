'use client';

import dynamic from 'next/dynamic';

/**
 * TreatmentsGridExact
 * -------------------
 * This version is for /preview/lux only.
 * It dynamically loads the Luxury Treatment Cards component so that
 * your main homepage stays unchanged until you decide to promote it.
 */

const ExactLuxuryTreatmentCards = dynamic(
  () => import('@/components/exact/ExactLuxuryTreatmentCards'),
  { ssr: false }
);

export default function TreatmentsGridExact() {
  return (
    <div className="relative">
      <ExactLuxuryTreatmentCards />
    </div>
  );
}
