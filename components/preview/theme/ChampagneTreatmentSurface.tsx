import type { ReactNode } from 'react';

interface ChampagneTreatmentSurfaceProps {
  eyebrow?: string;
  headline?: string;
  description?: string;
  children?: ReactNode;
}

export default function ChampagneTreatmentSurface({
  eyebrow,
  headline,
  description,
  children,
}: ChampagneTreatmentSurfaceProps): JSX.Element {
  return (
    <section
      data-component="champagne-treatment-surface"
      className="relative overflow-hidden rounded-3xl border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-surface)] px-8 py-10 text-[var(--champagne-ink)] shadow-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color:var(--champagne-glass-bg)]/45"
      />
      <div className="relative flex flex-col gap-6">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">{eyebrow}</p>
        ) : null}
        {headline ? (
          <h2
            className="text-3xl font-semibold text-[var(--champagne-ink)]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {headline}
          </h2>
        ) : null}
        {description ? (
          <p className="max-w-3xl text-base leading-relaxed text-[var(--champagne-ink-muted)]">{description}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
