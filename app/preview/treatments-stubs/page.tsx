export const dynamic = 'force-static';
export const revalidate = 0;

import type { Metadata } from 'next';

import { loadPreviewSchemaStatuses } from '@/lib/seo/preview/safe-loader';

export const metadata: Metadata = {
  title: 'Treatments Schema Stubs Preview',
  robots: {
    index: false,
    follow: false,
  },
  description:
    'Schema-driven preview surface for treatments routes. Visualises hero, process, experts, FAQs, and gallery stubs to track planned coverage.',
};

export default async function Page() {
  const statuses = await loadPreviewSchemaStatuses();

  if (!Array.isArray(statuses) || statuses.length === 0) {
    return (
      <main className="min-h-screen grid place-items-center p-8" style={{ background: 'var(--smh-bg)' }}>
        <div
          className="max-w-xl rounded-2xl p-6"
          style={{
            background: 'color-mix(in oklab, var(--smh-white) 86%, transparent)',
            border: '1px solid color-mix(in oklab, var(--brand-gold-keyline) 60%, transparent)',
            boxShadow: '0 10px 30px color-mix(in oklab, var(--ink) 12%, transparent)',
          }}
        >
          <h1 className="text-xl" style={{ color: 'var(--smh-text)' }}>
            No Preview Schema Detected
          </h1>
          <p className="opacity-70 mt-2" style={{ color: 'var(--smh-text)' }}>
            This preview reads JSON from <code>/reports/schema/</code>. Ensure these files exist:
          </p>
          <ul className="mt-3 ml-5 list-disc" style={{ color: 'var(--smh-text)' }}>
            <li>routes-map.json</li>
            <li>Treatments_Schema_Pack_v2.json (or v3)</li>
            <li>Treatments_Breadcrumbs.json</li>
          </ul>
          <p className="opacity-70 mt-4" style={{ color: 'var(--smh-text)' }}>
            When present, HUD cards will appear here. This page never renders blank.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8" style={{ background: 'var(--smh-bg)' }}>
      <h1 className="text-2xl mb-4" style={{ color: 'var(--smh-text)' }}>
        Treatments — Preview Stubs
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statuses.map((s) => (
          <article
            key={s.route}
            className="rounded-2xl p-4"
            style={{
              background: 'color-mix(in oklab, var(--smh-white) 90%, transparent)',
              border: '1px solid color-mix(in oklab, var(--brand-gold-keyline) 60%, transparent)',
            }}
          >
            <h2 className="font-semibold" style={{ color: 'var(--smh-text)' }}>
              {s.route}
            </h2>
            <p className="mt-1 text-sm opacity-70" style={{ color: 'var(--smh-text)' }}>
              Types: {s.schemaTypes.join(', ') || '—'}
            </p>
            <p className="mt-1 text-sm opacity-70" style={{ color: 'var(--smh-text)' }}>
              Breadcrumb: {s.breadcrumbStatus}
            </p>
            <p className="mt-1 text-sm opacity-70" style={{ color: 'var(--smh-text)' }}>
              Missing: {[
                s.missing.howTo ? 'HowTo' : null,
                s.missing.faq ? 'FAQPage' : null,
              ]
                .filter(Boolean)
                .join(', ') || '—'}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
