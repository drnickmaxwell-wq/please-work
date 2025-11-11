import React from 'react';

import routesMap from '@/reports/schema/routes-map.json';
import Hero from '@/components/treatments-light/Hero';
import ValueGrid from '@/components/treatments-light/ValueGrid';
import FeaturedTreatments from '@/components/treatments-light/FeaturedTreatments';
import ThreeDViewerPreview from '@/components/treatments-light/ThreeDViewerPreview';
import Finance from '@/components/treatments-light/Finance';
import FaqRail from '@/components/treatments-light/FaqRail';
import Cta from '@/components/treatments-light/Cta';
import Benefits from '@/components/treatments-light/Benefits';
import HowItWorks from '@/components/treatments-light/HowItWorks';
import ThreeDViewer from '@/components/treatments-light/ThreeDViewer';
import Pricing from '@/components/treatments-light/Pricing';
import Gallery from '@/components/treatments-light/Gallery';
import Faqs from '@/components/treatments-light/Faqs';
import UnknownSection from '@/components/treatments-light/UnknownSection';
import '@/styles/preview/treatments-light.css';

const SECTION_COMPONENTS = {
  hero: Hero,
  'value-grid': ValueGrid,
  'featured-treatments': FeaturedTreatments,
  '3d-viewer-preview': ThreeDViewerPreview,
  finance: Finance,
  faq: FaqRail,
  cta: Cta,
  benefits: Benefits,
  'how-it-works': HowItWorks,
  '3d-viewer': ThreeDViewer,
  pricing: Pricing,
  gallery: Gallery,
  faqs: Faqs,
} as const;

type SectionKey = keyof typeof SECTION_COMPONENTS;

const treatmentsRoutes = Object.entries(routesMap as Record<string, string[]>).filter(([path]) =>
  path.startsWith('/treatments'),
);

export const metadata = {
  title: 'Treatments Light Preview',
  robots: { index: false, follow: false },
};

export default function TreatmentsLightPreviewPage() {
  return (
    <main className="tl-main">
      <div className="tl-shell">
        <header className="tl-header">
          <div className="tl-header__content">
            <h1>Treatments preview light</h1>
            <p>
              Non-production staging surface that renders treatment stacks based on <code>routes-map.json</code>. Each section
              pulls a tokenised stub so creative, content, and engineering can align before touching production heroes.
            </p>
            <div className="tl-header__meta" role="list">
              <span className="tl-chip" role="listitem">Tokens: smh champagne</span>
              <span className="tl-chip" role="listitem">Motion: PRM aware</span>
              <span className="tl-chip" role="listitem">Gradient: var(--smh-gradient)</span>
            </div>
          </div>
        </header>

        {treatmentsRoutes.map(([route, sections]) => (
          <article aria-labelledby={`route-${route}`} className="tl-route" key={route}>
            <div className="tl-route__intro">
              <h2 className="tl-route__title" id={`route-${route}`}>
                {route}
              </h2>
              <p className="tl-route__summary">
                Sections resolved directly from the schema to ensure parity between preview sandboxes and live builds.
              </p>
            </div>
            <div className="tl-route__stack">
              {sections.map((sectionKey) => {
                const Component = SECTION_COMPONENTS[sectionKey as SectionKey];
                if (Component) {
                  return <Component key={`${route}-${sectionKey}`} route={route} />;
                }

                return <UnknownSection key={`${route}-${sectionKey}`} route={route} section={sectionKey} />;
              })}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
