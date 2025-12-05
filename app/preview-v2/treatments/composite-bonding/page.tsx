import Link from "next/link";

import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { composite_bonding_hero } from "@/lib/champagne/hero-presets";

export default function CompositeBondingV2Page() {
  return (
    <section className="cpv-v2-treatment-page">
      <HeroEngine schema={composite_bonding_hero} />

      <div className="cpv-v2-section">
        <h2>Composite artistry, distilled</h2>
        <p>
          Preview the composite bonding hero preset without legacy wrappers. The dark champagne canvas lets the
          cards, CTAs, and hero energy shine through.
        </p>
      </div>

      <div className="cpv-v2-section">
        <h3>Your composite bonding journey</h3>
        <ul className="cpv-v2-list">
          <li>Smile mapping and mock-ups to shape the plan</li>
          <li>Micro-layered bonding for balanced texture and tone</li>
          <li>Finishing polish plus easy upkeep guidance</li>
        </ul>
      </div>

      <div className="cpv-v2-cta-band cpv-card cpv-card--soft cta-plate-glass-dusk">
        <div className="cpv-v2-cta-content">
          <div>
            <p className="cpv-v2-kicker">Regal CTA system</p>
            <h3>Shape a confident smile</h3>
            <p className="cpv-v2-lede">
              Continue into the bonding journey with champagne CTAs tuned for the hero engine.
            </p>
          </div>
          <div className="cpv-v2-cta-row">
            <Link href="/book" className="cta-primary-ink-light">
              Start a bonding consult
            </Link>
            <Link href="/treatments/composite-bonding" className="cta-secondary-glass-gold">
              Explore composite details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
