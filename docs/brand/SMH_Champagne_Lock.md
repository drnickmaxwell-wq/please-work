# St Mary’s House Dental – Champagne Design Lock (v5.0)

**Core tokens**

Token | Value | Purpose
--- | --- | ---
`--smh-primary-magenta` | Champagne magenta anchor | Hero start, gradient base
`--smh-primary-teal` | Champagne turquoise anchor | Hero end, accent hover
`--smh-accent-gold` | Token gold (used via aliases) | Icons, dividers, keylines
`--smh-gradient` | `linear-gradient(135deg, magenta anchor → turquoise anchor)` | Universal background
`--smh-bg` | Light: surface white · Dark: deep navy charcoal | Neutral surfaces
`--smh-text` | Light: ink charcoal · Dark: warm white | Primary text
`--glass-bg-strong` | `color-mix(in srgb, var(--smh-bg) 68%, transparent 32%)` | Pane background
`--glass-border` | `color-mix(in srgb, var(--smh-text) 18%, transparent 82%)` | Pane rim
`--rim-gold-inset` | `inset 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 55%, transparent 45%)` | Accent outline

Fonts:
Playfair Display (headlines) · Inter (UI/body)

Visual layers (hero):
gradient → optional wave mask → flecks (token gold, blur ≈0.2px, opacity ≈0.12) → content

CI protection:
`pnpm run brand:guard`
Blocks merges if glass translucency regresses or any hard-coded brand hex escapes the token sources.
