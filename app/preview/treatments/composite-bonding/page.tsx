// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import '@/styles/treatments/preview-light.css';

const highlights = [
  {
    title: 'Feather-light sculpting',
    description: 'Layered by hand to refine edges and close micro-spaces without compromising healthy enamel.',
  },
  {
    title: 'Studio-finish polish',
    description: 'Shot under calibrated lighting so every refinement blends seamlessly with your natural smile.',
  },
  {
    title: 'Same-day glow',
    description: 'Digitally shade-matched and contoured in a single visit for an effortless reveal.',
  },
];

const bondingResults = [
  {
    title: 'Micro-gap refinement',
    description: 'Closing small spacing along the upper arch with layered resin that mirrors neighbouring translucency.',
  },
  {
    title: 'Edge rebalancing',
    description: 'Softening chipped corners and asymmetric lengths for a balanced smile line in a single appointment.',
  },
  {
    title: 'Lustre revival',
    description: 'Tuning brightness and gloss with a calibrated polish so the finish feels luminous yet entirely natural.',
  },
];

const bondingFaq = [
  {
    question: 'How durable is composite bonding?',
    answer:
      'With mindful care and routine hygiene visits, modern composites last 5–7 years on average and can be refreshed without invasive prep.',
  },
  {
    question: 'Will the results look natural?',
    answer:
      'We colour-match each layer under studio lighting and polish to a glass-smooth finish, so the enhancement blends seamlessly with your enamel.',
  },
  {
    question: 'What is the appointment like?',
    answer:
      'Plan for a single calm visit: digital shade capture, minimal preparation, sculpting, and final contouring in around 90 minutes per smile zone.',
  },
];

export default function CompositeBondingPreviewPage() {
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
              Composite bonding
            </li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">Treatments</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Composite bonding artistry
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed t-muted">
            Guided artistry layered over a calm coastal setting. Every detail—gloss, hue, texture—is tuned to your natural tooth
            anatomy for a luminous, camera-ready finish.
          </p>
        </header>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Why guests choose bonding
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {highlights.map((item) => (
                <article key={item.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Signature results
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {bondingResults.map((result) => (
                <article key={result.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {result.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{result.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Bonding FAQs
            </h2>
            <div className="space-y-4">
              {bondingFaq.map((faq) => (
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
              Plan your bonding session
            </h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Reserve a single-visit appointment where we refine edges, layer composite, and polish to a glass-smooth glow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="rounded-full border border-[color:var(--champagne-keyline)] px-6 py-3 text-sm font-semibold"
                href="/contact"
              >
                Reserve a consultation
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
