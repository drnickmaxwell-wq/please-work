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
      <div className="preview-hero-champagne__grain" aria-hidden="true" />
      <div className="preview-hero-champagne__glass" aria-hidden="true" />
      <div className="preview-hero-champagne__particles" aria-hidden="true" />
      <div className="preview-hero-champagne__inner">
        <p className="preview-hero-champagne__eyebrow eyebrow">{eyebrow}</p>
        <h1 className="preview-hero-champagne__title title">{title}</h1>
        {kicker && <p className="preview-hero-champagne__kicker kicker">{kicker}</p>}

        {(ctaPrimary || ctaSecondary) && (
          <div className="cta-row preview-hero-champagne__cta-row" role="group" aria-label="Primary actions">
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
