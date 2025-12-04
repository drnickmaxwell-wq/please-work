import { validateHeroSchema, type HeroSchema } from "./hero-schema";

const whitening: HeroSchema = validateHeroSchema({
  tone: "whitening",
  intensity: "lux",
  waves: { mask: "wave-02", opacity: 0.32 },
  shimmer: { enabled: true, density: "high" },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book whitening",
    secondaryLabel: "Explore treatment options",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
  layout: "left",
  eyebrow: "Cosmetic treatment",
  headline: "Luminous Whitening",
  subcopy: "Professional whitening with Champagne-level attention to detail and sensitivity-aware care.",
});

const compositeBonding: HeroSchema = validateHeroSchema({
  tone: "dusk",
  intensity: "standard",
  waves: { mask: "wave-01", opacity: 0.28 },
  shimmer: { enabled: true, density: "med" },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Plan composite bonding",
    secondaryLabel: "View smile menu",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
  layout: "left",
  eyebrow: "Cosmetic treatment",
  headline: "Composite Bonding",
  subcopy: "Shape, balance, and brighten with minimally invasive edge bonding guided by Champagne tone control.",
});

const implants: HeroSchema = validateHeroSchema({
  tone: "noir",
  intensity: "lux",
  waves: { mask: "wave-03", opacity: 0.34 },
  shimmer: { enabled: true, density: "high" },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book implant consult",
    secondaryLabel: "Explore implant pathway",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
  layout: "left",
  eyebrow: "Implant treatment",
  headline: "Implant Confidence",
  subcopy: "Preview the surgical-to-restorative pathway with stable gradients, wave control, and CTA System v2.",
});

const veneers: HeroSchema = validateHeroSchema({
  tone: "teal-lux",
  intensity: "lux",
  waves: { mask: "wave-02", opacity: 0.3 },
  shimmer: { enabled: true, density: "med" },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Design veneers",
    secondaryLabel: "View veneer styles",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
  layout: "center",
  eyebrow: "Cosmetic treatment",
  headline: "Signature Veneers",
  subcopy: "Layered ceramics with luxe dusk-to-ink gradients and shimmer-safe detailing across the hero canvas.",
});

const orthodontics: HeroSchema = validateHeroSchema({
  tone: "dawn",
  intensity: "soft",
  waves: { mask: "wave-01", opacity: 0.24 },
  shimmer: { enabled: true, density: "low" },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Start orthodontics",
    secondaryLabel: "Explore alignment options",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
  layout: "left",
  eyebrow: "Orthodontics",
  headline: "Champagne Aligner Journey",
  subcopy: "Balanced gradients and soft-light waves built for aligners, braces, and retention preview flows.",
});

export const whitening_hero = whitening;
export const composite_bonding_hero = compositeBonding;
export const implants_hero = implants;
export const veneers_hero = veneers;
export const orthodontics_hero = orthodontics;
