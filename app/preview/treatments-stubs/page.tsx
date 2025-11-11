export const dynamic = 'force-static';
export const revalidate = 0;

import { loadPreviewSchemaStatuses } from '@/lib/seo/preview/safe-loader';

export default async function TreatmentsStubsPreview() {
  const statuses = await loadPreviewSchemaStatuses();

  return (
    <main
      className="min-h-screen p-10"
      style={{
        background: 'var(--smh-gradient)',
        color: 'var(--smh-text)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <section className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight"
              style={{ color: 'var(--smh-primary-magenta)' }}>
            Treatments Schema Stubs
          </h1>
          <p className="mt-2 opacity-80">
            Schema-aligned sandbox for Champagne treatments workstreams.
          </p>
        </header>

        <div className="grid gap-8">
          {statuses.length > 0 ? (
            statuses.map((s) => (
              <article
                key={s.route}
                className="rounded-2xl shadow-md p-6 transition-all"
                style={{
                  background:
                    'color-mix(in oklab, var(--smh-accent-gold-soft) 85%, white)',
                  border: '1px solid color-mix(in oklab, var(--smh-accent-gold) 50%, transparent)',
                }}
              >
                <h2
                  className="font-semibold text-lg mb-2"
                  style={{ color: 'var(--smh-primary-teal)' }}
                >
                  {s.route}
                </h2>
                <p className="text-sm opacity-80">
                  Types: {s.schemaTypes.join(', ') || '—'}
                </p>
                <p className="text-sm opacity-80">
                  Breadcrumb: {s.breadcrumbStatus}
                </p>
                <p className="text-sm opacity-80">
                  Missing: {[
                    s.missing.howTo ? 'HowTo' : null,
                    s.missing.faq ? 'FAQPage' : null,
                  ]
                    .filter(Boolean)
                    .join(', ') || '—'}
                </p>
              </article>
            ))
          ) : (
            <div
              className="rounded-2xl text-center p-10"
              style={{
                background:
                  'color-mix(in oklab, var(--smh-accent-gold-soft) 90%, white)',
                border: '1px dashed var(--smh-accent-gold)',
              }}
            >
              <h2
                className="text-xl font-semibold"
                style={{ color: 'var(--smh-primary-teal)' }}
              >
                No Schema Data Found
              </h2>
              <p className="opacity-70 mt-2">
                Load packs from <code>/reports/schema/</code> to populate HUD.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
