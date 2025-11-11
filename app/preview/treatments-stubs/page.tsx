import type { Metadata } from 'next';

import routesMap from '@/reports/schema/routes-map.json';
import { SchemaInjector, getAllPreviewSchemaStatuses, logPreviewSchemaIntegration } from '@/lib/seo/preview/SchemaInjector';
import { DevHud, shouldShowHud } from '@/components/preview/Hud';

import '@/styles/preview/schema-injector.css';
import './page.css';

type RouteMap = Record<string, string[]>;

type CanonicalSection = 'hero' | 'how-it-works' | 'experts' | 'faqs' | 'gallery';

type SectionMatch = {
  canonical: CanonicalSection;
  alias: string;
};

const SECTION_ORDER: CanonicalSection[] = ['hero', 'how-it-works', 'experts', 'faqs', 'gallery'];

const SECTION_LABEL: Record<CanonicalSection, string> = {
  hero: 'Hero',
  'how-it-works': 'How it works',
  experts: 'Experts',
  faqs: 'FAQs',
  gallery: 'Gallery',
};

const SECTION_ALIAS: Record<CanonicalSection, string[]> = {
  hero: ['hero'],
  'how-it-works': ['how-it-works', 'how_it_works', 'howTo'],
  experts: ['experts', 'team', 'clinicians'],
  faqs: ['faqs', 'faq'],
  gallery: ['gallery', 'before-after', 'before-after-gallery'],
};

const routes = routesMap as RouteMap;
const schemaStatuses = getAllPreviewSchemaStatuses();
const schemaStatusMap = new Map(schemaStatuses.map((status) => [status.route, status]));

logPreviewSchemaIntegration();

export const metadata: Metadata = {
  title: 'Treatments Schema Stubs Preview',
  robots: {
    index: false,
    follow: false,
  },
  description:
    'Schema-driven preview surface for treatments routes. Visualises hero, process, experts, FAQs, and gallery stubs to track planned coverage.',
};

type TreatmentsStubsPreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function resolveSections(allSections: string[]): SectionMatch[] {
  return SECTION_ORDER.flatMap((section) => {
    const alias = SECTION_ALIAS[section].find((candidate) => allSections.includes(candidate));

    if (!alias) {
      return [];
    }

    return [
      {
        canonical: section,
        alias,
      },
    ];
  });
}

export default function TreatmentsStubsPreviewPage({ searchParams }: TreatmentsStubsPreviewPageProps) {
  const treatmentEntries = Object.entries(routes)
    .filter(([path]) => path.startsWith('/treatments'))
    .map(([path, sections]) => ({
      path,
      sections,
      matches: resolveSections(sections),
      schemaStatus: schemaStatusMap.get(path),
    }));

  const showHud = shouldShowHud(searchParams?.hud);

  return (
    <main className="tl-main">
      {showHud ? (
        <DevHud
          title="Treatments HUD"
          stats={[
            { label: 'Total preview routes', value: treatmentEntries.length },
            { label: 'Canonical sections tracked', value: SECTION_ORDER.length },
            {
              label: 'Routes with full coverage',
              value: treatmentEntries.filter((entry) => entry.matches.length === SECTION_ORDER.length).length,
            },
            {
              label: 'Routes with schema pack',
              value: treatmentEntries.filter((entry) => entry.schemaStatus?.hasPrimarySchemas).length,
            },
          ]}
        />
      ) : null}

      <section className="tl-shell" aria-labelledby="treatments-preview-heading">
        <header className="tl-header">
          <div className="tl-header__grid">
            <div>
              <h1 className="tl-heading" id="treatments-preview-heading">
                Treatments schema stubs
              </h1>
              <p className="tl-lede">
                Schema-aligned sandbox for champagne treatments workstreams. Each card reflects the canonical sections planned in
                <code className="tl-inline-code">/reports/schema/routes-map.json</code> so creative and engineering can iterate
                without touching protected hero surfaces.
              </p>
            </div>
            <div className="tl-meta">
              <span className="tl-chip">Tokenised stubs</span>
              <span className="tl-chip">PRM aware</span>
              <span className="tl-chip">Developer safe-space</span>
            </div>
          </div>
          <span className="tl-prm-label" aria-live="polite">
            motion paused
          </span>
        </header>

        <div className="tl-grid" role="list">
          {treatmentEntries.map(({ path, matches, sections, schemaStatus }) => {
            const remaining = SECTION_ORDER.filter(
              (section) => !matches.some((match) => match.canonical === section),
            );

            return (
              <article className="tl-card" key={path} role="listitem">
                <SchemaInjector route={path} />
                <header className="tl-card__header">
                  <h2 className="tl-card__title">{path}</h2>
                  <p className="tl-card__summary">
                    {matches.length > 0
                      ? 'Rendering available stubs with champagne tokens.'
                      : 'No canonical sections matched in schema map yet.'}
                  </p>
                  <p className="tl-card__schema" aria-label="Schema keys tracked">
                    {sections.join(' • ')}
                  </p>
                  <div className="tl-card__flags" role="status">
                    {!schemaStatus?.hasPrimarySchemas ? (
                      <span className="tl-badge tl-badge--alert">Missing schema pack</span>
                    ) : null}
                    {schemaStatus?.missing.howTo || schemaStatus?.missing.faq ? (
                      <span className="tl-badge tl-badge--muted">
                        Missing
                        {schemaStatus.missing.howTo ? ' HowTo' : ''}
                        {schemaStatus.missing.howTo && schemaStatus.missing.faq ? ' and' : ''}
                        {schemaStatus.missing.faq ? ' FAQPage' : ''} schema
                      </span>
                    ) : null}
                    {schemaStatus?.breadcrumbStatus === 'missing' ? (
                      <span className="tl-badge tl-badge--muted">Missing breadcrumb</span>
                    ) : null}
                  </div>
                </header>
                <div className="tl-stub-grid">
                  {matches.map((match) => (
                    <section
                      className="tl-stub"
                      data-schema-key={match.alias}
                      key={`${path}-${match.canonical}`}
                    >
                      <h3 className="tl-stub__title">{SECTION_LABEL[match.canonical]}</h3>
                      <p className="tl-stub__copy">
                        {match.canonical === 'hero' &&
                          'Hero shell anchored to champagne hero spec with gradient, grain, and CTA placeholders.'}
                        {match.canonical === 'how-it-works' &&
                          'Process rail stub referencing planning steps for choreography and instrumentation.'}
                        {match.canonical === 'experts' &&
                          'Expert spotlight placeholder for clinical bios sourced from treatments manifests.'}
                        {match.canonical === 'faqs' &&
                          'FAQ accordion tokens to validate schema injection and accessibility structure.'}
                        {match.canonical === 'gallery' &&
                          'Before / after gallery frame ensuring keyline and caption treatments stay aligned.'}
                      </p>
                    </section>
                  ))}
                </div>
                {remaining.length > 0 ? (
                  <footer className="tl-card__footer">
                    <p className="tl-card__footer-copy">
                      Missing canonical stubs: {remaining.map((key) => SECTION_LABEL[key]).join(', ')}
                    </p>
                  </footer>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
