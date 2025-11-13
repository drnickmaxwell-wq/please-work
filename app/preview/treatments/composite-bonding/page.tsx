// Preview-only clone. No hard hexes. Do not edit production pages.
import type { Metadata } from 'next';

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';

import CompositeBondingFaqSection from './_sections/CompositeBondingFaqSection';
import CompositeBondingHeroSection from './_sections/CompositeBondingHeroSection';
import CompositeBondingHighlightsSection from './_sections/CompositeBondingHighlightsSection';
import CompositeBondingPlanSessionSection from './_sections/CompositeBondingPlanSessionSection';
import CompositeBondingResultsSection from './_sections/CompositeBondingResultsSection';

export const metadata: Metadata = {
  title: 'Composite bonding stage preview',
  description: 'Preview-only showcase for composite bonding sections before promotion to the live treatments route.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompositeBondingPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero kicker="Treatments preview" title="Composite bonding artistry">
        <p>
          Guided artistry layered over a calm Champagne hero. Assemble copy, imagery, and schema experiments here while the live treatments route remains unchanged.
        </p>
      </ChampagnePreviewHero>

      <main className="cpv-main" role="main">
        <CompositeBondingHeroSection />
        <CompositeBondingHighlightsSection />
        <CompositeBondingResultsSection />
        <CompositeBondingFaqSection />
        <CompositeBondingPlanSessionSection />
      </main>
    </div>
  );
}
