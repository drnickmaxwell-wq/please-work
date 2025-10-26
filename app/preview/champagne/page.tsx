'use client';

import { useState } from 'react';

import BrandHeroGradient from '@/components/brand/BrandHeroGradient';
import '@/app/treatments/technology/components/technology-hero.css';
import '@/app/treatments/technology/components/ai-innovation.css';
import '@/styles/preview/champagne/page.css';
import '@/styles/preview/champagne/layers.css';
import '@/styles/preview/champagne/hero.css';
import '@/styles/preview/champagne/footer.css';

const ChampagnePreviewPage = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [showGrain, setShowGrain] = useState(true);
  const [showShimmer, setShowShimmer] = useState(true);

  return (
    <div className="preview-champagne-frame">
      <main className="preview-champagne-shell">
        <section className="preview-champagne-title">
          <h1>Champagne Experience Preview</h1>
          <p>
            Compare the current production hero and footer against the experimental champagne
            treatment. Use the toggles to show and hide layer effects applied to the preview.
          </p>
        </section>

        <section className="preview-controls" aria-label="Preview layer toggles">
          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={showParticles}
              onChange={(event) => setShowParticles(event.target.checked)}
            />
            Particles
          </label>
          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={showGrain}
              onChange={(event) => setShowGrain(event.target.checked)}
            />
            Film Grain
          </label>
          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={showShimmer}
              onChange={(event) => setShowShimmer(event.target.checked)}
            />
            Gold Shimmer
          </label>
        </section>

        <section className="preview-comparison-grid" aria-label="Hero previews">
          <h2 className="preview-section-title">Hero Variants</h2>
          <div className="preview-variant-grid">
            <article className="preview-variant-card hero-live">
              <header>Current Live Hero</header>
              <div className="preview-variant-body">
                <span>Live background layers</span>
              </div>
            </article>
            <article
              className={`preview-variant-card hero-preview${showParticles ? ' show-particles' : ''}${showGrain ? ' show-grain' : ''}${showShimmer ? ' show-shimmer' : ''}`}
            >
              <header>Preview Hero</header>
              <div className="preview-variant-body">
                <BrandHeroGradient
                  intensity="bold"
                  clip="wave-bottom"
                  goldDensity="med"
                  waveOpacity={0.24}
                  particles={showParticles}
                >
                  <div
                    className="hero-preview-stage"
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      padding: '3rem 1.5rem',
                      gap: '1.5rem',
                    }}
                  >
                    <div
                      className="hero-champagne tech-hero"
                      style={{
                        width: 'min(100%, 620px)',
                        padding: '2.75rem',
                        textAlign: 'left',
                        gap: '1.75rem',
                      }}
                    >
                      <div
                        className="hero-layer hero-layer--particles lux-particles"
                        aria-hidden="true"
                        role="presentation"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/particles/particles-gold.webp"
                          alt=""
                          loading="lazy"
                          fetchPriority="low"
                          decoding="async"
                          className="hero-layer-media hero-layer-media--particles"
                          aria-hidden="true"
                          role="presentation"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/particles/particles-magenta.webp"
                          alt=""
                          loading="lazy"
                          fetchPriority="low"
                          decoding="async"
                          className="hero-layer-media hero-layer-media--particles"
                          aria-hidden="true"
                          role="presentation"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/particles/particles-teal.webp"
                          alt=""
                          loading="lazy"
                          fetchPriority="low"
                          decoding="async"
                          className="hero-layer-media hero-layer-media--particles"
                          aria-hidden="true"
                          role="presentation"
                        />
                      </div>
                      <div
                        className="hero-layer hero-layer--grain lux-grain"
                        aria-hidden="true"
                        role="presentation"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/textures/film-grain-desktop.webp"
                          srcSet="/textures/film-grain-mobile.webp 600w, /textures/film-grain-desktop.webp 1200w"
                          sizes="(max-width: 768px) 600px, 1200px"
                          alt=""
                          loading="lazy"
                          fetchPriority="low"
                          decoding="async"
                          className="hero-layer-media hero-layer-media--grain"
                          aria-hidden="true"
                          role="presentation"
                        />
                      </div>
                      <div
                        className="hero-layer hero-layer--shimmer"
                        aria-hidden="true"
                        role="presentation"
                      />

                      <div
                        className="hero-headline-group"
                        style={{
                          position: 'relative',
                          zIndex: 3,
                          display: 'grid',
                          gap: '0.75rem',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.8rem',
                            letterSpacing: '0.32em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 240, 224, 0.7)',
                          }}
                        >
                          Champagne Preview
                        </span>
                        <h3
                          className="smh-heading"
                          style={{
                            margin: 0,
                            fontSize: '2rem',
                            lineHeight: 1.2,
                            color: 'rgba(255, 250, 238, 0.94)',
                          }}
                        >
                          Radiant First Impressions
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '1.05rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 244, 226, 0.78)',
                          }}
                        >
                          A wave-driven hero inspired by our Composite Bonding reveal, reframed in Champagne gold, teal, and
                          magenta. Layered particles, film grain, and shimmer can be toggled to audit each lighting pass.
                        </p>
                      </div>

                      <div
                        className="lux-glass"
                        style={{
                          position: 'relative',
                          zIndex: 3,
                          borderRadius: '18px',
                          padding: '1.5rem',
                          display: 'grid',
                          gap: '0.85rem',
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.78rem',
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 239, 220, 0.75)',
                          }}
                        >
                          Glass Concierge Cue
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 249, 236, 0.9)',
                          }}
                        >
                          Backdrop blur mirrors the production call-to-action while retaining Champagne translucency and a
                          polished rim.
                        </p>
                        <a
                          href="#book"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '999px',
                            background:
                              'linear-gradient(135deg, rgba(255, 245, 226, 0.18), rgba(255, 214, 170, 0.28))',
                            color: 'var(--surface-0)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                          }}
                        >
                          Plan Your Consultation
                        </a>
                      </div>
                    </div>
                  </div>
                </BrandHeroGradient>
              </div>
            </article>
          </div>
        </section>

        <section className="preview-comparison-grid" aria-label="Footer previews">
          <h2 className="preview-section-title">Footer Variants</h2>
          <div className="preview-variant-grid">
            <article className="preview-variant-card footer-card">
              <header>Current Live Footer</header>
              <div className="preview-variant-body">
                <div className="preview-footer footer-live">
                  <h3>Live Details</h3>
                  <p>Neutral background with subtle highlight.</p>
                  <p>Standard typography and spacing.</p>
                </div>
              </div>
            </article>
            <article className="preview-variant-card footer-card">
              <header>Preview Footer</header>
              <div className="preview-variant-body">
                <div className="preview-footer footer-preview footer-champagne">
                  <h3>Champagne Details</h3>
                  <div className="footer-preview-cards">
                    <div className="footer-preview-card lux-glass lux-gold-rim">
                      <p>Warm highlight bloom with layered gradients.</p>
                    </div>
                    <div className="footer-preview-card lux-glass lux-gold-rim">
                      <p>Elevated typography and luminous accents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
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
