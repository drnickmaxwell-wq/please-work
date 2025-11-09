import Link from 'next/link';

export default function TreatmentConsultationCta(): JSX.Element {
  return (
    <div
      data-component="treatment-consultation-cta"
      className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/70 px-6 py-4 text-sm text-[var(--champagne-ink)] shadow-sm"
    >
      <span className="font-semibold">Ready to plan your bonding session?</span>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--champagne-keyline-gold)] px-5 py-2 font-medium text-[var(--champagne-ink)] transition-transform duration-150 hover:-translate-y-0.5"
          href="/contact"
        >
          Reserve a consultation
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2 font-medium text-[var(--champagne-ink)] underline-offset-4 hover:underline"
          href="/treatments"
        >
          Explore all treatments
        </Link>
      </div>
    </div>
  );
}
