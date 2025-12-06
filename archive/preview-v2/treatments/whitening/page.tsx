import Link from "next/link";

import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { whitening_hero } from "@/lib/champagne/hero-presets";

export default function WhiteningV2Page() {
  return (
    <section className="cpv-v2-treatment-page">
      <HeroEngine schema={whitening_hero} />

      <div className="cpv-v2-section">
        <h2>Whitening on the dark champagne canvas</h2>
        <p>
          Experience the whitening hero preset without the legacy shell. This lab view keeps the canvas
          focused while highlighting the core journey steps and CTAs.
        </p>
      </div>

      <div className="cpv-v2-section">
        <h3>Your whitening journey</h3>
        <ul className="cpv-v2-list">
          <li>Shade mapping and sensitivity-safe planning</li>
          <li>Guided trays or in-surgery brightening with comfort focus</li>
          <li>Aftercare coaching to keep the finish luminous</li>
        </ul>
      </div>

      <div className="cpv-v2-cta-band cpv-card cpv-card--soft cta-plate-glass-dusk">
        <div className="cpv-v2-cta-content">
          <div>
            <p className="cpv-v2-kicker">Regal CTA system</p>
            <h3>Ready for a brighter smile?</h3>
            <p className="cpv-v2-lede">
              Step through the hero-driven whitening flow and book your champagne consultation.
            </p>
          </div>
          <div className="cpv-v2-cta-row">
            <Link href="/book" className="cta-primary-ink-light">
              Book whitening consult
            </Link>
            <Link href="/treatments/whitening" className="cta-secondary-glass-gold">
              View treatment details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
