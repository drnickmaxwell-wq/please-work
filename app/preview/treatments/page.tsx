import Link from 'next/link';

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { Section } from '@/components/preview/PreviewBlocks';

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
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="Treatment previews"
        ctas={
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/preview">
              Back to preview hub
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/treatments">
              View live treatments
            </Link>
          </div>
        }
      >
        <p>
          Explore Champagne-themed staging areas for each treatment while production routes remain untouched. Use these links to review copy, layout, and token usage before launch.
        </p>
      </ChampagnePreviewHero>

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
