# Manus Luxury Hero – Audit & Tokens

## New / Updated Tokens
- `--smh-primary-magenta`, `--smh-primary-teal`, `--smh-accent-gold` – brand anchors for the champagne sweep and cta states.
- `--smh-gradient` – canonical diagonal gradient applied to hero, Smile Journey, and diagnostics surfaces.
- `--champagne-glass-bg`, `--champagne-glass-border` – shared glass stack for hero panes, Smile Journey cards, and live previews.
- `--champagne-vignette-alpha`, `--champagne-sheen-opacity` – overlay controls to keep gradients vivid without heavy veils.
- `--smh-ink`, `--smh-text` – base neutrals used to derive ink-on-glass and subtle text mixes within each component.

## Implementation Notes
- **HeroLuxury.tsx** now renders a full-bleed `<section data-hero="champagne">` with gradient, wave, and film grain layers built entirely from tokens. The inner glass pane uses the updated glass tokens, including an inner gold ring and ink veil to maintain WCAG AA contrast.
- **SmileJourney.tsx** inherits the same backdrop tokens for visual continuity, applies the shared glass stack to each card, and reuses the gold ring treatment with hover/focus opacity shifts. Focus states reference the new glass inner ring token for accessibility.
- **Global layout** keeps the footer untouched while ensuring the homepage renders only `HeroLuxury` and `SmileJourney`.
