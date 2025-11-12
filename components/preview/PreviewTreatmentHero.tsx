'use client';

import { memo } from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  kicker?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export default memo(function PreviewTreatmentHero({
  eyebrow = 'TREATMENTS',
  title,
  kicker,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  return (
    <section className="preview-hero-champagne" aria-label="Intro">
      <div className="preview-hero-champagne__bg" aria-hidden="true" />
      <div className="preview-hero-champagne__wave" aria-hidden="true" />
      <div className="preview-hero-champagne__glass" aria-hidden="true" />
      <div className="preview-hero-champagne__grain" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="title">{title}</h1>
        {kicker && <p className="kicker">{kicker}</p>}

        {(ctaPrimary || ctaSecondary) && (
          <div className="cta-row" role="group" aria-label="Primary actions">
            {ctaPrimary && (
              <a className="btn btn-primary" href={ctaPrimary.href}>
                {ctaPrimary.label}
              </a>
            )}
            {ctaSecondary && (
              <a className="btn btn-ghost" href={ctaSecondary.href}>
                {ctaSecondary.label}
              </a>
            )}
          </div>
        )}
      </div>
      <div className="preview-hero-champagne__divider" aria-hidden="true" />
    </section>
  );
});
