// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import '@/styles/treatments/preview-light.css';

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
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">Preview</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Treatment previews
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed t-muted">
            Explore Champagne-themed staging areas for each treatment while production routes remain unchanged. Use these links
            to review copy, layout, and token usage before launch.
          </p>
        </header>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            {PREVIEW_ROUTES.map((route) => (
              <Link
                key={route.slug}
                className="t-card block rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
                href={`/preview/treatments/${route.slug}`}
              >
                <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  {route.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed t-muted">{route.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
