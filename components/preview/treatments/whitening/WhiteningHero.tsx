import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { whitening_hero } from "@/lib/champagne/hero-presets";

export function WhiteningHero() {
  return <HeroEngine schema={whitening_hero} />;
}
