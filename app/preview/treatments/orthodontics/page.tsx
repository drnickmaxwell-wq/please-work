export { metadata } from '@/app/preview/metadata';
// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import TreatmentBanner from '@/components/preview/TreatmentBanner';
import '@/styles/treatments/preview-light.css';

export default function OrthodonticsPreviewPage() {
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
              Orthodontics
            </li>
          </ol>
        </nav>

        <TreatmentBanner
          label="Treatments"
          subtitle="Draft copy for aligner pathways, fixed appliance refinements, and retention planning in a Champagne-safe sandbox. Production routes stay untouched until final creative passes are approved."
          title="Orthodontics preview"
        />

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <p className="leading-relaxed t-muted">
            Capture proposed smile journey steps, photography requirements, and patient education notes here. Replace with live
            modules once the orthodontic experience is locked.
          </p>
        </section>
      </div>
    </main>
  );
}
