import type { Metadata } from 'next';

import React from 'react';

import routesMap from '@/reports/routes-map.json';
import schemaPack from '@/reports/seo/Treatments_Schema_Pack.json';
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

import { DevHud, shouldShowHud } from '../_utils/dev-hud';

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

type SchemaRoute = {
  ['@context']?: string;
  ['@graph']?: unknown[];
  ['@type']?: string;
};

type SchemaPack = {
  generated?: string;
  routes?: Record<string, SchemaRoute>;
};

const schemaRoutes = (schemaPack as SchemaPack).routes ?? {};

const treatmentsRoutes = Object.entries(routesMap as Record<string, string[]>).filter(([path]) =>
  path.startsWith('/treatments'),
);

export const metadata: Metadata = {
  title: 'Treatments Light Preview',
  robots: { index: false, follow: false },
};

type TreatmentsLightPreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function TreatmentsLightPreviewPage({ searchParams }: TreatmentsLightPreviewPageProps) {
  const knownSectionKeys = new Set<SectionKey>(Object.keys(SECTION_COMPONENTS) as SectionKey[]);

  const enrichedRoutes = treatmentsRoutes.map(([route, sections]) => {
    const schemaInfo = schemaRoutes[route] ?? {};
    const graphNodes = Array.isArray(schemaInfo['@graph']) ? schemaInfo['@graph'].length : 0;
    const context = schemaInfo['@context'];

    const knownSections = sections.filter((sectionKey) => knownSectionKeys.has(sectionKey as SectionKey));

    return {
      route,
      sections,
      schemaInfo,
      graphNodes,
      context,
      knownSections,
    };
  });

  const showHud = shouldShowHud(searchParams?.hud);

  return (
    <main className="tl-main">
      {showHud ? (
        <DevHud
          title="Treatments preview HUD"
          stats={[
            { label: 'Routes tracked', value: enrichedRoutes.length },
            {
              label: 'Known shells rendered',
              value: enrichedRoutes.reduce((total, entry) => total + entry.knownSections.length, 0),
            },
            {
              label: 'Schema contexts set',
              value: enrichedRoutes.filter((entry) => Boolean(entry.context)).length,
            },
          ]}
        />
      ) : null}

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

        {enrichedRoutes.map(({ route, sections, graphNodes, context }) => (
          <article aria-labelledby={`route-${route}`} className="tl-route" key={route}>
            <div className="tl-route__intro">
              <h2 className="tl-route__title" id={`route-${route}`}>
                {route}
              </h2>
              <p className="tl-route__summary">
                Sections resolved directly from the schema to ensure parity between preview sandboxes and live builds. Schema
                context{' '}
                {context ? <code>{context}</code> : <span className="tl-fallback">pending context</span>}{' '}
                with {graphNodes} graph node{graphNodes === 1 ? '' : 's'} tracked for structured data QA.
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
