'use client';

import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import WaveFXPreview from '@/components/preview/fx/WaveFXPreview';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

type LuxeTreatmentHeroVariant = 'implants' | 'veneers' | 'whitening' | 'general' | 'technology';

type LuxeTreatmentHeroCta = {
  label: string;
  href: string;
};

type LuxeTreatmentHeroProps = {
  variant: LuxeTreatmentHeroVariant;
  title: string;
  eyebrow?: string;
  kicker?: string;
  description?: ReactNode;
  primaryCta?: LuxeTreatmentHeroCta;
  secondaryCta?: LuxeTreatmentHeroCta;
};

const VARIANT_THEMES: Record<LuxeTreatmentHeroVariant, CSSProperties> = {
  implants: {
    '--lth-stop-magenta': 'color-mix(in srgb, var(--smh-primary-magenta) 78%, transparent)',
    '--lth-stop-blend': 'color-mix(in srgb, var(--smh-primary-magenta) 26%, var(--smh-primary-teal))',
    '--lth-stop-teal': 'color-mix(in srgb, var(--smh-primary-teal) 94%, transparent)',
    '--lth-stop-gold': 'color-mix(in srgb, var(--smh-accent-gold-soft) 46%, transparent)',
    '--lth-ambient-top': 'color-mix(in srgb, var(--smh-primary-teal) 20%, transparent)',
    '--lth-ambient-bottom': 'color-mix(in srgb, var(--smh-accent-gold-soft) 16%, transparent)',
    '--lth-surface-opacity': '0.34',
    '--lth-glow-strength': '0.48',
    '--lth-speckle-opacity': '0.12',
  },
  veneers: {
    '--lth-stop-magenta': 'color-mix(in srgb, var(--smh-primary-magenta) 86%, transparent)',
    '--lth-stop-blend': 'color-mix(in srgb, var(--smh-primary-magenta) 34%, var(--smh-primary-teal))',
    '--lth-stop-teal': 'color-mix(in srgb, var(--smh-primary-teal) 84%, transparent)',
    '--lth-stop-gold': 'color-mix(in srgb, var(--smh-accent-gold-soft) 54%, transparent)',
    '--lth-ambient-top': 'color-mix(in srgb, var(--smh-primary-magenta) 18%, transparent)',
    '--lth-ambient-bottom': 'color-mix(in srgb, var(--smh-accent-gold-soft) 22%, transparent)',
    '--lth-surface-opacity': '0.32',
    '--lth-glow-strength': '0.52',
    '--lth-speckle-opacity': '0.1',
  },
  whitening: {
    '--lth-stop-magenta': 'color-mix(in srgb, var(--smh-primary-magenta) 62%, transparent)',
    '--lth-stop-blend': 'color-mix(in srgb, var(--smh-primary-magenta) 18%, var(--smh-primary-teal))',
    '--lth-stop-teal': 'color-mix(in srgb, var(--smh-primary-teal) 88%, transparent)',
    '--lth-stop-gold': 'color-mix(in srgb, var(--smh-accent-gold-soft) 36%, transparent)',
    '--lth-ambient-top': 'color-mix(in srgb, var(--smh-primary-teal) 24%, transparent)',
    '--lth-ambient-bottom': 'color-mix(in srgb, var(--smh-accent-gold-soft) 18%, transparent)',
    '--lth-surface-opacity': '0.3',
    '--lth-glow-strength': '0.42',
    '--lth-speckle-opacity': '0.09',
  },
  general: {
    '--lth-stop-magenta': 'color-mix(in srgb, var(--smh-primary-magenta) 72%, transparent)',
    '--lth-stop-blend': 'color-mix(in srgb, var(--smh-primary-magenta) 22%, var(--smh-primary-teal))',
    '--lth-stop-teal': 'color-mix(in srgb, var(--smh-primary-teal) 90%, transparent)',
    '--lth-stop-gold': 'color-mix(in srgb, var(--smh-accent-gold-soft) 40%, transparent)',
    '--lth-ambient-top': 'color-mix(in srgb, var(--smh-primary-teal) 18%, transparent)',
    '--lth-ambient-bottom': 'color-mix(in srgb, var(--smh-accent-gold-soft) 14%, transparent)',
    '--lth-surface-opacity': '0.28',
    '--lth-glow-strength': '0.38',
    '--lth-speckle-opacity': '0.08',
  },
  technology: {
    '--lth-stop-magenta': 'color-mix(in srgb, var(--smh-primary-magenta) 64%, transparent)',
    '--lth-stop-blend': 'color-mix(in srgb, var(--smh-primary-magenta) 20%, var(--smh-primary-teal))',
    '--lth-stop-teal': 'color-mix(in srgb, var(--smh-primary-teal) 96%, transparent)',
    '--lth-stop-gold': 'color-mix(in srgb, var(--smh-accent-gold-soft) 32%, transparent)',
    '--lth-ambient-top': 'color-mix(in srgb, var(--smh-primary-teal) 28%, transparent)',
    '--lth-ambient-bottom': 'color-mix(in srgb, var(--smh-primary-magenta) 16%, transparent)',
    '--lth-surface-opacity': '0.36',
    '--lth-glow-strength': '0.44',
    '--lth-speckle-opacity': '0.1',
  },
};

function LuxeTreatmentHeroButton({ label, href, intent }: LuxeTreatmentHeroCta & { intent: 'primary' | 'secondary' }) {
  const className = intent === 'primary' ? 'cpv-btn cpv-btn-solid' : 'cpv-btn cpv-btn-outline';

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

const heroEasing = [0.645, 0.045, 0.355, 1];

const LuxeTreatmentHero = ({
  variant,
  title,
  eyebrow,
  kicker,
  description,
  primaryCta,
  secondaryCta,
}: LuxeTreatmentHeroProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = VARIANT_THEMES[variant] ?? VARIANT_THEMES.general;
  const cardHover = prefersReducedMotion
    ? undefined
    : {
        scale: 1.02,
        y: -4,
      };

  const descriptionContent =
    typeof description === 'string' ? <p>{description}</p> : description ?? null;

  return (
    <motion.section
      className="cpv-hero lth-hero"
      data-variant={variant}
      style={theme}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: heroEasing }}
    >
      <div aria-hidden className="lth-hero__surface" />
      <WaveFXPreview />
      <motion.div
        aria-hidden
        className="lth-hero__glow"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.32, 0.46, 0.34], y: [0, -6, 0] }
        }
        transition={{
          duration: 16,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: 'mirror',
          ease: heroEasing,
        }}
      />
      <motion.div
        aria-hidden
        className="lth-hero__speckle"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.04, 0.12, 0.06], backgroundPosition: ['0% 0%', '6% 4%', '0% 0%'] }
        }
        transition={{
          duration: 20,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: 'mirror',
          ease: heroEasing,
        }}
      />
      <div className="container">
        <div className="cpv-hero__inner">
          <div className="cpv-hero__content">
            <motion.div
              className="cpv-glass cpv-hero__card"
              whileHover={cardHover}
              transition={{ duration: 0.6, ease: heroEasing }}
            >
              <div className="flex flex-col gap-6">
                {eyebrow || kicker ? (
                  <span className="cpv-hero__kicker">{eyebrow ?? kicker}</span>
                ) : null}
                <div className="space-y-4">
                  <h1 className="cpv-hero__title">{title}</h1>
                  {descriptionContent ? (
                    <div className="cpv-hero__body text-lg leading-relaxed">{descriptionContent}</div>
                  ) : null}
                </div>
                {primaryCta || secondaryCta ? (
                  <div className="cpv-cta-row">
                    {primaryCta ? (
                      <LuxeTreatmentHeroButton intent="primary" {...primaryCta} />
                    ) : null}
                    {secondaryCta ? (
                      <LuxeTreatmentHeroButton intent="secondary" {...secondaryCta} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LuxeTreatmentHero;
