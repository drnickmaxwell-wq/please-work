import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { veneers_hero } from "@/lib/champagne/hero-presets";

export default function VeneersV2Page() {
  return (
    <section className="cpv-v2-treatment-page">
      <HeroEngine schema={veneers_hero} />
      <p className="cpv-v2-body-copy">
        Veneers ride on the champagne hero engine here, isolated from any PreviewShell or light treatments skins.
      </p>
    </section>
  );
}
