# Hero tone leak audit

## Discovery
- `styles/champagne/hero-engine.css` defines tone-driven backgrounds via `--hero-surface` on `.champagne-hero.hero-engine-shell.hero-frame.hero-tone--{dawn|day|dusk|night}` and wave/shimmer tone helpers scoped inside `.champagne-hero` only. Background paints are applied through the shell’s internal pseudo-element rather than any page wrapper.
- `lib/champagne/hero-tone.ts` maps time-of-day values to wrapper tone class names (`hero-tone--dawn|day|dusk|night`) plus wave/shimmer/CTA tone variants.
- `components/champagne/hero/HeroFrame.tsx` attaches the wrapper tone class (and tonal/intensity variants) directly to the hero `<section>` (`champagne-hero hero-engine-shell hero-gradient-base hero-frame ...`). No preview or layout wrappers receive tone classes.
- `components/preview/treatments/PreviewToneScrubber.tsx` runs on preview treatments mount/navigation to strip any hero-tone classes that may have landed on global elements and reasserts the dark canvas surface tokens for the preview wrapper.

## Element targets
- Tone classes are present only on hero sections rendered by `HeroFrame`; they are not added to `<body>`, preview shells, or `.cpv-page` wrappers.
- Tone selectors in CSS target `.champagne-hero` descendants, so gradients and shimmer/wave styles remain confined to the hero engine layers.

## Post-fix summary
- Body-level tone classes are scrubbed during preview treatments navigation by the dedicated `PreviewToneScrubber`, ensuring the preview canvas keeps its dark background even if upstream code attempted to tag `document.body` or `html` with hero-tone classes.
- The dark canvas remains locked via the preview treatments stylesheet, inline surface tokens from the scrubber, and the `cpv-page--champagne-dark` wrapper, while hero visuals stay unchanged inside their scoped shell.
