import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { implants_hero } from "@/lib/champagne/hero-presets";

export default function ImplantsV2Page() {
  return (
    <section className="cpv-v2-treatment-page">
      <HeroEngine schema={implants_hero} />
      <p className="cpv-v2-body-copy">
        This lab view keeps the implants hero preset on the dark champagne canvas with no legacy shell layers.
      </p>
    </section>
  );
}
