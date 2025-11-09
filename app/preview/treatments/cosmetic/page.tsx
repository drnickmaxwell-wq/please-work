export { metadata } from '@/app/preview/metadata';
// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import TreatmentBanner from '@/components/preview/TreatmentBanner';
import '@/styles/treatments/preview-light.css';

export default function CosmeticPreviewPage() {
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
            <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
              Cosmetic dentistry
            </li>
          </ol>
        </nav>

        <TreatmentBanner
          label="Treatments"
          subtitle="Scaffold content for the upcoming cosmetic dentistry journey. The production route remains untouched while this preview hosts copy, imagery, and schema experiments in the Champagne palette."
          title="Cosmetic dentistry preview"
        />

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <p className="leading-relaxed t-muted">
            Use this preview space to assemble section outlines, photography notes, and brand-safe colour studies before the
            hero and treatment modules are finalised. No production assets are modified here.
          </p>
        </section>
      </div>
    </main>
  );
}
