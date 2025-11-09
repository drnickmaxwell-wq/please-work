export { metadata } from '@/app/preview/metadata';
// Preview-only clone. No hard hexes. Do not edit production pages.
import type { Metadata } from 'next';
import Link from 'next/link';

import TreatmentBanner from '@/components/preview/TreatmentBanner';
import '@/styles/treatments/preview-light.css';

import CompositeBondingFaqSection from './_sections/CompositeBondingFaqSection';
import CompositeBondingHeroSection from './_sections/CompositeBondingHeroSection';
import CompositeBondingHighlightsSection from './_sections/CompositeBondingHighlightsSection';
import CompositeBondingPlanSessionSection from './_sections/CompositeBondingPlanSessionSection';
import CompositeBondingResultsSection from './_sections/CompositeBondingResultsSection';

export const metadata: Metadata = {
  title: 'Composite bonding stage preview',
  description:
    'Preview-only showcase for composite bonding sections before promotion to the live treatments route.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompositeBondingPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <div className="border-b border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/80 py-3 text-center text-sm text-[var(--champagne-ink)]">
        Preview Only · Sections pending approval before production promotion.
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[var(--champagne-ink-muted)]">
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview">
                Preview
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview/treatments">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
              Composite bonding
            </li>
          </ol>
        </nav>

        <TreatmentBanner
          label="Treatments"
          subtitle="Guided artistry layered over a calm coastal setting. Every detail—gloss, hue, texture—is tuned to your natural tooth anatomy for a luminous, camera-ready finish."
          title="Composite bonding artistry"
        />

        <div className="flex flex-col gap-10">
          <CompositeBondingHeroSection />
          <CompositeBondingHighlightsSection />
          <CompositeBondingResultsSection />
          <CompositeBondingFaqSection />
          <CompositeBondingPlanSessionSection />
        </div>
      </div>
    </main>
  );
}
