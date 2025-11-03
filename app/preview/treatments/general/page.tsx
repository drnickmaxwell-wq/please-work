// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import '@/styles/treatments/preview-light.css';

export default function GeneralDentistryPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
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
            <li aria-current="page" className="font-medium text-[color:var(--champagne-ink)]">
              General dentistry
            </li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">Treatments</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            General dentistry preview
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed t-muted">
            Placeholder copy for preventive and restorative care. Populate this preview with treatment flows, copy guidelines,
            and schema updates while leaving the production route unchanged.
          </p>
        </header>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <p className="leading-relaxed t-muted">
            Outline hygiene programs, exam sequences, and restorative options here. Replace with production components only when
            content and Champagne styling are complete.
          </p>
        </section>
      </div>
    </main>
  );
}
