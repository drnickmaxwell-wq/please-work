# Preview V2 Wrapper Map

## Layout chain
### /preview-v2/treatments
- **Root layout (`app/layout.tsx`)**: resolves preview paths to skip the public StickyHeader/Footer stack while still rendering children directly inside the main content container. No PreviewShell is invoked here and the body keeps its neutral `bg-[var(--smh-bg)]` backdrop.
- **PreviewShell guard (`components/preview/layout/PreviewShell.tsx`)**: now short-circuits when the pathname starts with `/preview-v2`, so any accidental shell usage returns the children without dusk gradients, particles, or `data-theme` flags.
- **V2 layout (`app/preview-v2/layout.tsx`)**: wraps everything in `<div class="cpv-v2-shell cpv-v2-shell--champagne-dark" data-preview-v2>`, pulling in the preview card surface styles (`components/preview/preview-layout.css`) and the V2 canvas rules (`styles/preview/preview-v2-treatments.css`).
- **Treatments segment layout (`app/preview-v2/treatments/layout.tsx`)**: scopes the route content inside `<main class="cpv-v2-treatments">` without adding further chrome.
- **Hub page (`app/preview-v2/treatments/page.tsx`)**: renders the grid of treatment links using `cpv-card` surfaces but no additional shells.

### /preview-v2/treatments/whitening
- **Root + PreviewShell guard**: same as above; the guard keeps the page out of the dusk PreviewShell even if imported elsewhere.
- **V2 layout**: the `cpv-v2-shell cpv-v2-shell--champagne-dark` stack is the outermost wrapper, providing the dark Champagne canvas and typography tokens.
- **Treatments segment layout**: the `cpv-v2-treatments` main container hosts the whitening page.
- **Whitening page (`app/preview-v2/treatments/whitening/page.tsx`)**: mounts the Hero Engine preset plus body copy and CTA band inside the shared V2 wrappers.

## Background / data attributes
- No `data-theme="preview-dusk"` or PreviewShell backdrops are applied to `/preview-v2/**`; the guard returns raw children for these routes.
- The only canvas styling comes from `.cpv-v2-shell.cpv-v2-shell--champagne-dark`, which applies the radial/linear ink gradients and dark ink base color. There are no light variants or `body/html` selectors in the V2 stylesheet.
- The treatments layout adds no additional background or data attributes, so the V2 shell remains the owning canvas for both the hub and child treatments.

## CSS applied to /preview-v2/**
- `components/preview/preview-layout.css` — card and section surfacing only; no page-level canvas rules.
- `styles/preview/preview-v2-treatments.css` — defines the dark Champagne canvas, text tokens, card keylines, and responsive spacing for V2.
- Hero Engine styles (`styles/champagne/hero-engine.css`) load with the component but scope tone utilities to `.hero-engine-shell`, not to any page wrappers.

## Hero tone scoping check
- `styles/champagne/hero-engine.css` scopes all tone backgrounds to `.hero-engine-shell` variants (e.g., `.hero-engine-shell.hero-frame.hero-tone--dawn`) and keeps supporting utilities (`.hero-tone-waves--*`, `.hero-intensity-*`) inside the hero frame. No selectors target `.cpv-v2-shell` or general page wrappers, so tone changes cannot repaint the V2 canvas.

## Behaviour Check
- Navigating `/preview-v2/treatments → /preview-v2/treatments/whitening → /preview-v2/treatments` and `/preview-v2/treatments → /preview-v2/treatments/composite-bonding → /preview-v2/treatments` keeps the outer `cpv-v2-shell cpv-v2-shell--champagne-dark` wrapper intact, so the dark Champagne background persists across transitions while the Hero Engine presets render as before. The absence of PreviewShell means no dusk gradients or `data-theme` flips can override the canvas during navigation.

## Checks run
- `pnpm lint` (warnings only)
- `pnpm build`
- `pnpm brand:guard`
- `node scripts/guard-rogue-hex.mjs`
