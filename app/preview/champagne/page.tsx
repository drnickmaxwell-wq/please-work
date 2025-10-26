'use client';

import { useState } from 'react';

import '@/styles/preview/champagne/page.css';

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
                <span>Champagne background layers</span>
                <div className="hero-layer hero-layer--particles" aria-hidden="true" />
                <div className="hero-layer hero-layer--grain" aria-hidden="true" />
                <div className="hero-layer hero-layer--shimmer" aria-hidden="true" />
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
                <div className="preview-footer footer-preview">
                  <h3>Champagne Details</h3>
                  <p>Warm highlight bloom with layered gradients.</p>
                  <p>Elevated typography and luminous accents.</p>
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
