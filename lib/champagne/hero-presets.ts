import type { HeroSchema } from "./hero-schema";

export const whitening_hero: HeroSchema = {
  tone: "whitening",
  intensity: "lux",
  layout: "left",
  eyebrow: "Cosmetic treatment",
  headline: "Luminous Whitening",
  subcopy: "Professional whitening with Champagne-level attention to detail.",
  waves: {
    mask: "wave-02",
    opacity: 0.32,
    blendMode: "soft-light",
  },
  shimmer: {
    enabled: true,
    density: "med",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book whitening",
    secondaryLabel: "Explore treatment options",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
};

export const composite_bonding_hero: HeroSchema = {
  tone: "dusk",
  intensity: "lux",
  layout: "left",
  eyebrow: "Cosmetic treatment",
  headline: "Composite Bonding",
  subcopy: "Reshape and refine with colour-matched composites on Champagne glass gradients.",
  waves: {
    mask: "wave-03",
    opacity: 0.3,
    blendMode: "overlay",
  },
  shimmer: {
    enabled: true,
    density: "high",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book composite bonding",
    secondaryLabel: "View all treatments",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
};

export const implants_hero: HeroSchema = {
  tone: "noir",
  intensity: "standard",
  layout: "left",
  eyebrow: "Implant pathway",
  headline: "Dental Implants",
  subcopy: "Surgical clarity with noir gradients, guided flows, and steady CTA anchors.",
  waves: {
    mask: "wave-01",
    opacity: 0.26,
    blendMode: "soft-light",
  },
  shimmer: {
    enabled: true,
    density: "low",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book implant consult",
    secondaryLabel: "View all treatments",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
};

export const veneers_hero: HeroSchema = {
  tone: "dawn",
  intensity: "standard",
  layout: "center",
  eyebrow: "Cosmetic treatment",
  headline: "Porcelain Veneers",
  subcopy: "Balanced dawn palette with shimmer-ready layers for veneer case previews.",
  waves: {
    mask: "wave-02",
    opacity: 0.28,
    blendMode: "soft-light",
  },
  shimmer: {
    enabled: true,
    density: "med",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book veneer consult",
    secondaryLabel: "View all treatments",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
};

export const orthodontics_hero: HeroSchema = {
  tone: "teal-lux",
  intensity: "soft",
  layout: "left",
  eyebrow: "Orthodontics",
  headline: "Orthodontics",
  subcopy: "Soft teal gradients with glass CTA plate for aligner and braces previews.",
  waves: {
    mask: "wave-03",
    opacity: 0.24,
    blendMode: "overlay",
  },
  shimmer: {
    enabled: true,
    density: "low",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Book ortho consult",
    secondaryLabel: "View all treatments",
    primaryHref: "/contact",
    secondaryHref: "/treatments",
  },
};
