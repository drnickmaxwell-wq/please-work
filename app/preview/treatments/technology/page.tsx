// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import '@/styles/treatments/preview-light.css';

const workflowSteps = [
  {
    title: 'Digital scan',
    description: 'Micron-level 3D scanning replaces impressions, capturing every contour with gentle, contactless mapping.',
    timeline: ['5 minute scan', 'No moulds', 'Instant preview'],
  },
  {
    title: 'Design in motion',
    description: 'Designers co-create your smile in real-time, blending anatomy, bite, and facial harmony under studio lighting.',
    timeline: ['Shade matching', 'Texture overlays', 'Your approval'],
  },
  {
    title: 'Same-day make',
    description: 'On-site milling and 3D printing deliver veneers, inlays, and aligners in a single relaxed visit.',
    timeline: ['Guided milling', 'Hand finishing', 'Studio polish'],
  },
];

const equipmentShowcase = [
  {
    title: 'Primescan digital suite',
    description: 'Ultra-fast intraoral scanners reduce chair time while capturing fine edge detail for veneers and crowns.',
    notes: ['Micron accuracy', 'Comfort-led capture', 'Instant modelling'],
  },
  {
    title: 'Guided implant theatre',
    description: 'CBCT imaging and dynamic navigation plan implants with precision, keeping procedures calm and efficient.',
    notes: ['Low-dose imaging', 'Sedation friendly', 'Same-day smile'],
  },
  {
    title: 'Femtosecond laser finishing',
    description: 'Laser contouring refines soft tissue and activates whitening gels with minimal sensation and zero downtime.',
    notes: ['Cooling comfort', 'High precision', 'Promotes healing'],
  },
];

const technologyFaq = [
  {
    question: 'How does AI improve my dental visit?',
    answer:
      'Predictive scanners and real-time analysis reduce guesswork, shorten chair time, and visualise outcomes before treatment begins.',
  },
  {
    question: 'Can I preview my smile changes virtually?',
    answer:
      'Yes. Our AR try-on and 3D modelling suite let you explore adjustments before we ever touch a tooth, so you can make confident decisions.',
  },
  {
    question: 'Is the technology comfortable for anxious patients?',
    answer:
      'We pair gentle laser dentistry with guided sedation pathways and noise-dampened equipment for a calmer experience from start to finish.',
  },
];

export default function TechnologyPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
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
              Technology
            </li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">Treatments</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Precision technology, calmer appointments
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed t-muted">
            Guided implants, 3D printing, and laser refinements make every appointment efficient and comfortable while delivering
            studio-ready results.
          </p>
        </header>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Our digital workflow
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {workflowSteps.map((step) => (
                <article key={step.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{step.description}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed t-muted">
                    {step.timeline.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Equipment gallery
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {equipmentShowcase.map((item) => (
                <article key={item.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed t-muted">
                    {item.notes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Technology FAQs
            </h2>
            <div className="space-y-4">
              {technologyFaq.map((faq) => (
                <article key={faq.question} className="t-card p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              See the suite in person
            </h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Arrange a tour to experience scanning, smile design, and laser finishing first-hand, and tailor a treatment plan to
              your goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="rounded-full border border-[color:var(--champagne-keyline)] px-6 py-3 text-sm font-semibold"
                href="/contact"
              >
                Book a technology tour
              </Link>
              <Link className="rounded-full border border-[color:var(--champagne-keyline)] px-6 py-3 text-sm font-semibold"
                href="/treatments"
              >
                View all treatments
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
