'use client';

import type { CSSProperties } from 'react';
import React from 'react';

import ChampagneHero from '@/components/home/ChampagneHero';

type Section = 'veneers' | 'implants' | 'spark-aligners';

type Props = {
  section: Section;
  title: string;
  eyebrow?: string;
  kicker?: string;
};

const SECTION_TINT: Record<Section, number> = {
  veneers: -6,
  implants: 10,
  'spark-aligners': 0,
};

const HEADING_IDS: Record<Section, string> = {
  veneers: 'preview-veneers-hero-title',
  implants: 'preview-implants-hero-title',
  'spark-aligners': 'preview-aligners-hero-title',
};

export default function PreviewTreatmentHero({
  section,
  title,
  eyebrow,
  kicker,
}: Props) {
  const tintStyle = {
    '--section-tint': `${SECTION_TINT[section]}deg`,
  } as CSSProperties;

  return (
    <div className="preview-treatment-hero" data-section={section} style={tintStyle}>
      <ChampagneHero
        variant="section"
        title={title}
        eyebrow={eyebrow ?? 'Treatments preview'}
        kicker={kicker}
        showCTAs={false}
        compact
        goldMax={0.12}
        headingId={HEADING_IDS[section]}
      />
    </div>
  );
}
