'use client';

import { useMemo, useState } from 'react';

import HeroBand from '@/components/layout/sections/HeroBand';
import Footer from '@/components/layout/footer';

import '@/styles/preview/champagne/page.css';

const grainLevels = [0, 0.04, 0.08] as const;
type GrainLevel = (typeof grainLevels)[number];

const ChampagnePreviewPage = () => {
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [grainOpacity, setGrainOpacity] = useState<GrainLevel>(0.08);
  const [goldRimEnabled, setGoldRimEnabled] = useState(true);

  const heroPreviewClasses = useMemo(() => {
    return [
      'champagne-preview-stage',
      'hero-champagne',
      particlesEnabled ? 'lux-particles' : '',
      goldRimEnabled ? 'lux-gold-rim' : ''
    ]
      .filter(Boolean)
      .join(' ');
  }, [particlesEnabled, goldRimEnabled]);

  const footerPreviewClasses = useMemo(() => {
    return ['footer', 'footer-champagne', goldRimEnabled ? 'lux-gold-rim' : '']
      .filter(Boolean)
      .join(' ');
  }, [goldRimEnabled]);

  const styleSummary = useMemo(() => {
    const utilities = [
      'hero-champagne',
      particlesEnabled ? 'lux-particles (enabled)' : 'lux-particles (disabled)',
      `grain overlay (${(grainOpacity * 100).toFixed(0)}%)`,
      goldRimEnabled ? 'gold-rim highlight' : 'gold-rim highlight (off)',
      'lux-glass CTA panel'
    ];

    const tokens = [
      '--brand-magenta',
      '--brand-teal',
      '--brand-gold',
      '--smh-champagne',
      '--film-grain-opacity'
    ];

    return { utilities, tokens };
  }, [particlesEnabled, grainOpacity, goldRimEnabled]);

  return (
    <div className="preview-champagne-frame">
      <main className="preview-champagne-shell">
        <section className="preview-champagne-title">
          <h1>Champagne Experience Preview</h1>
          <p>
            Compare the current production hero and footer against the experimental champagne
            treatment. Use the toggles to turn on utilities and adjust grain intensity before a
            rollout to production.
          </p>
        </section>

        <section className="preview-controls" aria-label="Preview layer toggles">
          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={particlesEnabled}
              onChange={(event) => setParticlesEnabled(event.target.checked)}
            />
            Champagne Particles (.lux-particles)
          </label>

          <fieldset className="preview-toggle" aria-label="Film grain opacity">
            <legend style={{ fontSize: '0.95rem', marginBottom: '0.35rem' }}>Film Grain</legend>
            <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
              {grainLevels.map((level) => (
                <label key={level} className="preview-toggle" style={{ gap: '0.35rem' }}>
                  <input
                    type="radio"
                    name="grain-level"
                    value={level}
                    checked={grainOpacity === level}
                    onChange={(event) =>
                      setGrainOpacity(Number(event.target.value) as GrainLevel)
                    }
                  />
                  {(level * 100).toFixed(0)}%
                </label>
              ))}
            </div>
          </fieldset>

          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={goldRimEnabled}
              onChange={(event) => setGoldRimEnabled(event.target.checked)}
            />
            Gold Rim Accent
          </label>
        </section>

        <section className="preview-comparison-grid" aria-label="Hero previews">
          <h2 className="preview-section-title">Hero Variants</h2>
          <div className="preview-variant-grid">
            <article className="preview-variant-card hero-live">
              <header>Current Production Hero</header>
              <div
                className="preview-variant-body"
                style={{ padding: 0, alignItems: 'stretch', justifyContent: 'flex-start' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '60%',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(0.55)',
                      transformOrigin: 'top left',
                      width: '182%',
                      height: '182%'
                    }}
                  >
                    <HeroBand />
                  </div>
                </div>
              </div>
            </article>

            <article className="preview-variant-card hero-preview">
              <header>Champagne Preview Hero</header>
              <div
                className="preview-variant-body"
                style={{ padding: 0, alignItems: 'stretch', justifyContent: 'flex-start' }}
              >
                <div
                  className={heroPreviewClasses}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2.5rem',
                    gap: '1.5rem',
                    width: '100%',
                    color: '#fff',
                    background:
                      'radial-gradient(900px circle at 20% 10%, rgba(255, 228, 194, 0.18), transparent 65%), linear-gradient(140deg, rgba(24, 18, 14, 0.92), rgba(54, 36, 21, 0.96))',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '-40% -20%',
                      background:
                        'radial-gradient(1200px circle at 20% 25%, rgba(212, 175, 55, 0.2), transparent 65%), radial-gradient(1000px circle at 80% 30%, rgba(64, 196, 180, 0.25), transparent 70%), radial-gradient(900px circle at 50% 80%, rgba(194, 24, 91, 0.2), transparent 70%)',
                      mixBlendMode: 'screen',
                      pointerEvents: 'none'
                    }}
                  />

                  {grainOpacity > 0 ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: "url('/textures/film-grain-desktop.webp')",
                        backgroundSize: 'cover',
                        mixBlendMode: 'overlay',
                        opacity: grainOpacity,
                        pointerEvents: 'none'
                      }}
                    />
                  ) : null}

                  {goldRimEnabled ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '1px',
                        borderRadius: '22px',
                        border: '1px solid rgba(212, 175, 55, 0.55)',
                        boxShadow: '0 0 36px rgba(212, 175, 55, 0.35)',
                        pointerEvents: 'none'
                      }}
                    />
                  ) : null}

                  <div style={{ position: 'relative', zIndex: 1, maxWidth: '28rem' }}>
                    <h3 style={{ margin: 0, fontSize: '2rem', letterSpacing: '0.03em' }}>
                      Luminous Coastline Care
                    </h3>
                    <p
                      style={{
                        marginTop: '0.75rem',
                        marginBottom: 0,
                        color: 'rgba(255, 244, 234, 0.85)',
                        lineHeight: 1.6
                      }}
                    >
                      Immersive hero treatment drawing from the champagne palette with particle and
                      grain accents.
                    </p>
                  </div>

                  <div
                    className="lux-glass"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      padding: '1.25rem 1.5rem',
                      borderRadius: '18px',
                      background: 'rgba(16, 12, 10, 0.45)',
                      border: '1px solid rgba(255, 224, 191, 0.3)',
                      boxShadow: '0 20px 45px rgba(0,0,0,0.38)',
                      backdropFilter: 'blur(24px)'
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
                      CTA Panel · Lux Glass
                    </p>
                    <p style={{ margin: '0.35rem 0 0', color: 'rgba(255, 238, 216, 0.8)' }}>
                      Uses champagne tokens for glow, glass, and accent rim.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="preview-comparison-grid" aria-label="Footer previews">
          <h2 className="preview-section-title">Footer Variants</h2>
          <div className="preview-variant-grid">
            <article className="preview-variant-card footer-card">
              <header>Current Production Footer</header>
              <div
                className="preview-variant-body"
                style={{ padding: 0, alignItems: 'stretch', justifyContent: 'flex-start' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '65%',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(0.55)',
                      transformOrigin: 'top left',
                      width: '182%',
                      height: '182%'
                    }}
                  >
                    <Footer />
                  </div>
                </div>
              </div>
            </article>

            <article className="preview-variant-card footer-card">
              <header>Champagne Preview Footer</header>
              <div
                className="preview-variant-body"
                style={{ padding: 0, alignItems: 'stretch', justifyContent: 'flex-start' }}
              >
                <div
                  className={footerPreviewClasses}
                  style={{
                    position: 'relative',
                    width: '100%',
                    padding: '2.5rem',
                    display: 'grid',
                    gap: '1.25rem',
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(255, 224, 191, 0.2), transparent 65%), linear-gradient(160deg, rgba(20, 15, 12, 0.9), rgba(43, 29, 21, 0.95))',
                    color: 'rgba(255, 244, 234, 0.9)'
                  }}
                >
                  {particlesEnabled ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                          'radial-gradient(circle at 20% 20%, rgba(255, 240, 211, 0.2) 0, transparent 55%), radial-gradient(circle at 80% 30%, rgba(255, 237, 199, 0.25) 0, transparent 60%), radial-gradient(circle at 55% 75%, rgba(255, 226, 188, 0.25) 0, transparent 65%)',
                        pointerEvents: 'none'
                      }}
                    />
                  ) : null}

                  {grainOpacity > 0 ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: "url('/textures/film-grain-desktop.webp')",
                        backgroundSize: 'cover',
                        mixBlendMode: 'overlay',
                        opacity: grainOpacity,
                        pointerEvents: 'none'
                      }}
                    />
                  ) : null}

                  {goldRimEnabled ? (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: '1px',
                        borderRadius: '22px',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        boxShadow: '0 0 24px rgba(212, 175, 55, 0.25)',
                        pointerEvents: 'none'
                      }}
                    />
                  ) : null}

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ margin: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Champagne Footer Concept
                    </h3>
                    <p style={{ margin: '0.65rem 0 0', color: 'rgba(255, 236, 219, 0.85)' }}>
                      Emphasises luminous gradients, controlled grain, and rim glows against a warm
                      neutral surface.
                    </p>
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', letterSpacing: '0.08em' }}>
                      Modules
                    </strong>
                    <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', fontSize: '0.95rem' }}>
                      <li>Luxury navigation summary</li>
                      <li>Contact + CTA micro panel</li>
                      <li>Tokenised social cluster</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="preview-comparison-grid" aria-label="Champagne style recipe">
          <h2 className="preview-section-title">Style Recipe Snapshot</h2>
          <div
            className="preview-variant-card"
            style={{
              display: 'grid',
              gap: '1.25rem',
              padding: '1.75rem',
              background: 'rgba(17, 12, 10, 0.85)'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', letterSpacing: '0.06em' }}>Utilities</h3>
              <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                {styleSummary.utilities.map((utility) => (
                  <li key={utility}>{utility}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', letterSpacing: '0.06em' }}>Token Sources</h3>
              <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                {styleSummary.tokens.map((token) => (
                  <li key={token}>{token}</li>
                ))}
              </ul>
            </div>

            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255, 236, 219, 0.75)' }}>
              Grain opacity set to {(grainOpacity * 100).toFixed(0)}% with
              {particlesEnabled ? '' : 'out'} particles and {goldRimEnabled ? 'an active' : 'no'} gold
              rim. Export this combination when aligning preview utilities with production tokens.
            </p>
          </div>
        </section>

        <p className="preview-note">
          This preview is isolated for design review. It is not linked from public navigation and
          should not be shared outside of the preview program.
        </p>
      </main>
    </div>
  );
};

export default ChampagnePreviewPage;
