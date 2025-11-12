import type { ReactNode } from 'react';

import { getPreviewSchemaStatus, SchemaInjector } from '@/lib/seo/preview/SchemaInjector';

export type ChampagneTreatmentPreviewProps = {
  title: string;
  subtitle?: string;
  route: string;
  tint?: 'veneers' | 'implants' | 'spark' | 'default';
  children: ReactNode;
};

function normaliseRouteForId(route: string): string {
  const safe = route.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
  return safe.length > 0 ? safe : 'treatment-preview';
}

const tintClassMap: Record<NonNullable<ChampagneTreatmentPreviewProps['tint']>, string> = {
  default: '',
  veneers: 'ctv-frame--veneers',
  implants: 'ctv-frame--implants',
  spark: 'ctv-frame--spark',
};

export default function ChampagneTreatmentPreview({
  title,
  subtitle,
  route,
  tint = 'default',
  children,
}: ChampagneTreatmentPreviewProps) {
  const status = getPreviewSchemaStatus(route);
  const heroSlug = normaliseRouteForId(route);
  const heroTitleId = `ctv-hero-${heroSlug}-title`;
  const schemaTypes = status?.schemaTypes ?? [];
  const frameClassName = ['ctv-frame', tintClassMap[tint]].filter(Boolean).join(' ');

  return (
    <article className={frameClassName}>
      <section className="preview-hero-champagne" aria-labelledby={heroTitleId}>
        <div className="preview-hero-champagne__bg" aria-hidden="true" />
        <div className="preview-hero-champagne__wave" aria-hidden="true" />
        <div className="preview-hero-champagne__grain" aria-hidden="true" />
        <div className="preview-hero-champagne__glass" aria-hidden="true" />
        <div className="preview-hero-champagne__particles" aria-hidden="true" />
        <div className="preview-hero-champagne__inner">
          <p className="preview-hero-champagne__eyebrow">Treatments preview</p>
          <h1 id={heroTitleId} className="preview-hero-champagne__title">
            {title}
          </h1>
          {subtitle ? <p className="preview-hero-champagne__kicker">{subtitle}</p> : null}
          {status ? (
            <div className="ctv-schema-badge" role="status" aria-live="polite">
              <span>Types: {schemaTypes.length > 0 ? schemaTypes.join(', ') : '—'}</span>
              <span>Breadcrumb: {status.breadcrumbStatus}</span>
              {status.missing.howTo ? <span>Missing: HowTo</span> : null}
              {status.missing.faq ? <span>Missing: FAQPage</span> : null}
            </div>
          ) : null}
        </div>
      </section>

      <div className="ctv-divider" aria-hidden="true" />

      <section className="ctv-3d-slot" aria-label="3D viewer slot">
        <div className="ctv-3d-slot__card">
          <p>3D viewer slot (preview) — production integrates the interactive model.</p>
        </div>
      </section>

      <main className="ctv-main">{children}</main>

      <SchemaInjector route={route} />
    </article>
  );
}
