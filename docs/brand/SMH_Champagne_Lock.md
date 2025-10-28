# St Mary’s House Dental – Champagne Design Lock (v5.0)

**Core tokens**

Token | Value reference | Purpose
---|---|---
--smh-primary-magenta | Defined in `styles/tokens/smh-champagne-tokens.css` | Hero start, gradient base
--smh-primary-teal | Defined in `styles/tokens/smh-champagne-tokens.css` | Hero end, accent hover
--smh-accent-gold | Defined in `styles/tokens/smh-champagne-tokens.css` | Icons, dividers, keylines
--smh-gradient | Canonical gradient token (`var(--smh-gradient)`) | Universal background
--smh-ink | Defined in `styles/tokens/smh-champagne-tokens.css` | Base neutral + surface fallback
--smh-text | Defined in `styles/tokens/smh-champagne-tokens.css` | Primary text
--champagne-glass-bg | `var(--champagne-glass-bg)` | Pane background
--champagne-glass-border | `var(--champagne-glass-border)` | Pane rim
--rim-gold-inset | `var(--rim-gold-inset)` | Accent outline

Fonts:
Playfair Display (headlines) · Inter (UI/body)

Visual layers (hero):
gradient → wave mask → flecks (gold, blur≈0.6px, opacity≈0.06) → content

CI protection:
`pnpm run brand:guard`
Blocks merges if `--champagne-glass-bg` drifts or if any hard-coded brand hex is detected outside `/styles/tokens/`.
