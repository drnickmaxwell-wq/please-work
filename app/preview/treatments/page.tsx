import type { Metadata } from 'next';
import Link from 'next/link';

import '@/styles/preview/champagne-preview.css';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { Section } from '@/components/preview/PreviewBlocks';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

const PREVIEW_ROUTES = [
  { slug: '3d-dentistry', label: '3D digital dentistry', summary: 'Contactless scanning and same-day restorations.' },
  { slug: 'composite-bonding', label: 'Composite bonding', summary: 'Hand-layered artistry for micro refinements.' },
  { slug: 'cosmetic', label: 'Cosmetic dentistry', summary: 'Champagne-safe workspace for upcoming campaign copy.' },
  { slug: 'dental-implants', label: 'Dental implants', summary: 'Titanium precision with 3D planning and prosthetics.' },
  { slug: 'general', label: 'General dentistry', summary: 'Preventive and restorative care planning sandbox.' },
  { slug: 'implants', label: 'Implants (alias)', summary: 'Alias of dental implants preview for parity checks.' },
  { slug: 'orthodontics', label: 'Orthodontics', summary: 'Aligner journeys and retention roadmap scaffolding.' },
  { slug: 'technology', label: 'Technology', summary: 'Digital workflow, equipment, and FAQ explorations.' },
  { slug: 'veneers', label: 'Porcelain veneers', summary: 'Ultra-thin veneer planning with 3D visualiser.' },
  { slug: 'whitening', label: 'Teeth whitening', summary: 'Whitening pathways, stain education, and aftercare.' },
];

export default function TreatmentsPreviewIndex() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="general"
        eyebrow="Treatments preview"
        title="Treatment previews"
        description="Explore Champagne-themed staging areas for each treatment while production routes remain untouched. Use these links to review copy, layout, and token usage before launch."
        primaryCta={{ label: 'Back to preview hub', href: '/preview' }}
        secondaryCta={{ label: 'View live treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Browse preview routes"
          description={<p>Select a route to fine-tune copy, hero states, metrics, and luxe block experiments.</p>}
        >
          <div className="cpv-grid cpv-grid--links">
            {PREVIEW_ROUTES.map((route) => (
              <Link key={route.slug} className="cpv-linkcard" href={`/preview/treatments/${route.slug}`}>
                <h2 className="cpv-linkcard__title">{route.label}</h2>
                <p className="cpv-linkcard__summary">{route.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
