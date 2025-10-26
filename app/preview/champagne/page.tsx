'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import BrandHeroGradient, { type BrandHeroGradientProps } from '@/components/brand/BrandHeroGradient';
import '@/styles/tokens/smh-champagne-tokens.css';
import '@/styles/brand/brand-gradient.css';
import './champagne.css';

const MIN_GRAIN = 0;
const MAX_GRAIN = 0.25;
const GRAIN_STEP = 0.01;

const ChampagnePreviewPage = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [grainOpacity, setGrainOpacity] = useState(0.14);
  const [goldRimEnabled, setGoldRimEnabled] = useState(false);

  const formattedGrain = useMemo(() => grainOpacity.toFixed(2), [grainOpacity]);
  const heroStyle = useMemo<CSSProperties>(
    () => ({ '--champagne-grain': formattedGrain }),
    [formattedGrain],
  );

  return (
    <div className="champagne-preview">
      <section className="champagne-controls" aria-label="Champagne hero controls">
        <p className="champagne-controls-title">Layer Toggles</p>
        <div className="champagne-control-group">
          <div className="champagne-control">
            <label htmlFor="champagne-toggle-particles">
              <span>Particles</span>
            </label>
            <input
              id="champagne-toggle-particles"
              type="checkbox"
              role="switch"
              aria-label="Toggle particle overlay"
              checked={showParticles}
              onChange={(event) => setShowParticles(event.target.checked)}
            />
          </div>
          <div className="champagne-control">
            <label htmlFor="champagne-toggle-grain">
              <span>Grain</span>
            </label>
            <input
              id="champagne-toggle-grain"
              type="range"
              min={MIN_GRAIN}
              max={MAX_GRAIN}
              step={GRAIN_STEP}
              aria-valuetext={`${formattedGrain}`}
              aria-label="Adjust film grain opacity"
              value={grainOpacity}
              onChange={(event) => setGrainOpacity(Number(event.target.value))}
            />
            <span className="champagne-control-output">Opacity {formattedGrain}</span>
          </div>
          <div className="champagne-control">
            <label htmlFor="champagne-toggle-gold">
              <span>Gold Rim</span>
            </label>
            <input
              id="champagne-toggle-gold"
              type="checkbox"
              role="switch"
              aria-label="Toggle gold rim highlight"
              checked={goldRimEnabled}
              onChange={(event) => setGoldRimEnabled(event.target.checked)}
            />
          </div>
        </div>
      </section>

      <div className="champagne-hero-frame">
        <BrandHeroGradient
          {...({
            intensity: 'bold',
            clip: 'wave-bottom',
            goldDensity: 'med',
            waveOpacity: 0.24,
            particles: showParticles,
            waveMask: '/waves/smh-wave-mask.svg',
            gradient: {
              from: 'var(--brand-magenta)',
              to: 'var(--brand-teal)',
            },
            grain: {
              opacity: grainOpacity,
            },
          } as BrandHeroGradientProps)}
        >
          <section className="champagne-hero" style={heroStyle}>
            <div className="champagne-shimmer" aria-hidden="true" />
            <div className="champagne-hero-content">
              <p className="champagne-eyebrow">Champagne Preview</p>
              <h1 className="champagne-heading">On-brand radiance, ready for launch</h1>
              <p className="champagne-description">
                This hero uses production tokens for the magenta-to-teal gradient while layering particles, wave masks, and
                film grain that can be tuned for polish audits.
              </p>
              <a className="champagne-cta" href="#consult">
                Plan Your Consultation
              </a>
            </div>
          </section>
        </BrandHeroGradient>
        <div className="champagne-gold-rim" data-enabled={goldRimEnabled} aria-hidden="true" />
      </div>

      <p className="champagne-note">
        Preview the Champagne hero with adjustable layers to validate the gold rim treatment alongside film grain and particles.
      </p>
    </div>
  );
};

export default ChampagnePreviewPage;
