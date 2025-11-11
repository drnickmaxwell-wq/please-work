// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import TreatmentBanner from '@/components/preview/TreatmentBanner';
import ChampagneFX from '@/components/preview/fx/ChampagneFX';
import '@/styles/treatments/preview-light.css';
import '@/styles/champagne/preview-fx.css';

const benefits = [
  {
    title: 'Same-day results',
    description: 'Advanced workflows allow crowns, veneers, and inlays to be designed and placed in one visit.',
  },
  {
    title: 'Precision accuracy',
    description: 'Digital impressions capture detail at micron level—50x more accurate than traditional putty.',
  },
  {
    title: 'Comfort first',
    description: 'Contactless scanning removes the need for messy moulds or repeated appointments.',
  },
  {
    title: 'Faster healing',
    description: 'Minimally invasive planning shortens chair time and promotes a calm recovery.',
  },
];

const technologies = [
  {
    name: 'Intraoral 3D scanning',
    summary: 'High-resolution digital scans captured in minutes.',
    highlights: ['No gag reflex triggers', 'Instant on-screen preview', 'Perfect accuracy', 'Comfortable experience'],
  },
  {
    name: 'Digital smile design',
    summary: 'Visualise your smile before we begin treatment.',
    highlights: ['Preview final results', 'Collaborative planning', 'Patient-led refinements', 'Realistic expectations'],
  },
  {
    name: '3D printing & milling',
    summary: 'On-site fabrication for bespoke restorations.',
    highlights: ['Same-day delivery', 'Precision fit', 'Premium materials', 'Immediate placement'],
  },
];

const procedures = [
  'Same-day crowns',
  'Digital implant planning',
  'Invisalign treatment',
  'Porcelain veneers',
  'Bridges and onlays',
  'Surgical guides',
  'Orthodontic planning',
  'Comprehensive bite analysis',
];

export default function ThreeDDentistryPreviewPage() {
  const heroId = 'champagne-preview-hero-3d';

  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
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
              3D digital dentistry
            </li>
          </ol>
        </nav>

        <section className="champagne-hero-shell" id={heroId}>
          <ChampagneFX targetId={heroId} dust="low" parallax />
          <div className="champagne-hero-shell__inner" data-parallax-depth="1">
            <TreatmentBanner
              label="Treatments"
              subtitle="Experience contactless scanning, AI-guided planning, and on-site 3D printing that deliver a smoother, faster appointment. Every stage is choreographed for precision and calm."
              title="3D digital dentistry"
            />
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Why guests choose 3D workflows
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="t-card h-full p-6">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Signature technology suites
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {technologies.map((tech) => (
                <article key={tech.name} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {tech.name}
                  </h3>
                  <p className="mt-2 leading-relaxed t-muted">{tech.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed t-muted">
                    {tech.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Procedures enhanced by 3D planning
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {procedures.map((procedure) => (
                <article key={procedure} className="t-card p-6">
                  <p className="font-medium" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {procedure}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Explore 3D dentistry in person
            </h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Tour the technology, preview your smile design, and build a treatment roadmap tailored to your goals. Our team will
              guide you through every digital step.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="rounded-full border border-[var(--champagne-keyline)] px-6 py-3 text-sm font-semibold"
                href="/contact"
              >
                Book a 3D consultation
              </Link>
              <Link className="rounded-full border border-[var(--champagne-keyline)] px-6 py-3 text-sm font-semibold"
                href="/treatments"
              >
                View all treatments
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
