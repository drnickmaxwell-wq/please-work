import type { Metadata } from 'next';
import Link from 'next/link';

import '@/styles/preview/champagne-preview.css';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

const benefits = [
  {
    title: 'Same-day results',
    description: 'Advanced workflows allow crowns, veneers, and inlays to be designed and placed in one visit.',
  },
  {
    title: 'Precision accuracy',
    description: 'Digital impressions capture micron-level detail for a calm, confident fit.',
  },
  {
    title: 'Comfort first',
    description: 'Contactless scanning removes the need for messy moulds or repeated appointments.',
  },
  {
    title: 'Faster healing',
    description: 'Minimally invasive planning shortens chair time and promotes a gentle recovery.',
  },
];

const technologies = [
  {
    name: 'Intraoral 3D scanning',
    summary: 'High-resolution digital scans captured in minutes.',
    highlights: ['No gag reflex triggers', 'Instant on-screen preview', 'Precision accuracy', 'Comfort-led capture'],
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
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="technology"
        eyebrow="Treatments preview"
        title="3D digital dentistry"
        description="Contactless scanning, AI-guided planning, and on-site 3D printing come together under the Balanced Dusk hero so you can iterate freely before the production launch."
        primaryCta={{ label: 'Book a 3D consultation', href: '/contact' }}
        secondaryCta={{ label: 'View all treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Why guests choose 3D workflows"
          description={<p>Replace or reorder these cards as you finalise benefit copy and photography.</p>}
        >
          <div className="cpv-grid cpv-grid--two">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{benefit.title}</h3>
                <p className="cpv-subcard__body">{benefit.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Signature technology suites"
          description={<p>Swap these placeholders for photography, video loops, or manifest-driven modules.</p>}
        >
          <div className="cpv-grid cpv-grid--three">
            {technologies.map((tech) => (
              <article key={tech.name} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{tech.name}</h3>
                <p className="cpv-subcard__body">{tech.summary}</p>
                <ul className="cpv-subcard__list">
                  {tech.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Procedures enhanced by 3D planning"
          description={<p>Use the list below to rehearse scheduling flows or highlight packages.</p>}
        >
          <KeyList items={procedures} />
        </Section>

        <Section
          title="Explore 3D dentistry in person"
          description={<p>Adapt this CTA pair for your concierge scripts, waitlists, or automation tests.</p>}
        >
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Book a 3D consultation
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/treatments">
              View all treatments
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
