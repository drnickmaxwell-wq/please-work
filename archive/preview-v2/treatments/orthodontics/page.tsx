import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { ortho_hero as orthodontics_hero } from "@/lib/champagne/hero-presets";

export default function OrthodonticsV2Page() {
  return (
    <section className="cpv-v2-treatment-page">
      <HeroEngine schema={orthodontics_hero} />
      <p className="cpv-v2-body-copy">
        Orthodontics now previews on the champagne-dark canvas with no shell overlays or light wrappers.
      </p>
    </section>
  );
}
