import type { ReactNode } from 'react';
import { ChampagneCTA } from '../cta/ChampagneCTA';
import '../../styles/champagne/hero-skeleton.css';

export type TimeOfDay = 'dawn' | 'dusk' | 'night';

export interface ChampagneHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: string;
  timeOfDay?: TimeOfDay;
  showWave?: boolean;
  showParticles?: boolean;
  showGrain?: boolean;
  aside?: ReactNode;
}

export function ChampagneHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  badge,
  showWave = true,
  showParticles = false,
  showGrain = false,
  aside,
}: ChampagneHeroProps) {
  return (
    <section className="hero-root" aria-labelledby="champagne-hero-title">
      <div className="hero-layers" aria-hidden>
        <div className="hero-layer gradient" />
        {showWave ? <div className="hero-layer wave" /> : null}
        {showParticles ? <div className="hero-layer particles" /> : null}
        {showGrain ? <div className="hero-layer grain" /> : null}
      </div>
      <div className="hero-shell">
        <div className="hero-content">
          {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
          <h1 className="hero-title" id="champagne-hero-title">
            {title}
          </h1>
          {badge ? <span className="hero-badge">{badge}</span> : null}
          {subtitle ? <p className="hero-subtitle">{subtitle}</p> : null}
          <div className="hero-actions">
            {primaryCta || secondaryCta ? (
              <ChampagneCTA
                variant={primaryCta && secondaryCta ? 'pair' : primaryCta ? 'primary' : 'secondary'}
                primaryLabel={primaryCta?.label}
                primaryHref={primaryCta?.href}
                secondaryLabel={secondaryCta?.label}
                secondaryHref={secondaryCta?.href}
              />
            ) : null}
          </div>
        </div>
        {aside ? <div className="hero-content">{aside}</div> : null}
      </div>
    </section>
  );
}
