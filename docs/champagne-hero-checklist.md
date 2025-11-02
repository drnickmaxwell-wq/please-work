# Champagne Hero Checklist

## Required DOM selectors
Copy and verify these selectors in the rendered hero markup:

```
.champagne-hero
.hero-gradient-base
.hero-wave-mask
.hero-film-grain
.hero-particles-static
.hero-wave-caustics
.hero-glass-shimmer
.hero-particles-drift
.hero-gold-dust-drift
.hero-content
```

## Required asset paths
Ensure each path exists on disk and resolves in the build:

```
/assets/champagne/waves/wave-mask-desktop.webp
/assets/champagne/motion/wave-caustics.webm
/assets/champagne/motion/glass-shimmer.webm
/assets/champagne/motion/particles-drift.webm
/assets/champagne/particles/gold-dust-drift.webm
/assets/champagne/particles/home-hero-particles.webp
/assets/champagne/textures/home-hero-film-grain.webp
```

## Manifest keys
Confirm the manifests parse and expose these token keys:

```
waves.mask
waves.background
textures.filmGrain
motion.waveCaustics
motion.glassShimmer
motion.particlesDrift
particles.goldDust
```

## Done?
- [ ] DOM selectors present
- [ ] Assets confirmed
- [ ] Manifest keys parsed
- [ ] `pnpm run hero:check` passes locally
