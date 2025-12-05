# Preview Treatments Canvas Fix (Final)

## Canvas ownership
- Wrapper: `app/preview/treatments/layout.tsx` renders `<div class="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-preview-scope="treatments" data-treatment="{slug}" data-treatments-canvas="champagne-dark">…</div>` on every `/preview/treatments/**` route.
- Painter: the high-specificity selector in `styles/preview/champagne-preview.css` — `[data-preview-scope="treatments"].cpv-page.cpv-page--champagne-dark.cpv-page--treatments, [data-preview-scope="treatments"] .cpv-page.cpv-page--champagne-dark.cpv-page--treatments, .cpv-page.cpv-page--champagne-dark.cpv-page--treatments[data-treatments-canvas="champagne-dark"]` — explicitly sets the dark Champagne background, on-dark text, chip, and link variables and does not depend on any `:root[data-theme=…]` value.

## Selectors narrowed/cordoned
- Added a treatments-only selector stack with higher specificity than any other `.cpv-page` rule to prevent time-of-day or shell themes from repainting the canvas. It defines the ink-based background, gradient overlays, and on-dark text/link tokens only when `cpv-page--treatments` is present.

## Hero tone containment
- Verified `styles/champagne/hero-engine.css` scopes tone backgrounds to `.hero-engine-shell.hero-frame.hero-tone--*` and other `.hero-tonal-*` utilities without targeting `.cpv-page` or outer wrappers. Hero tones remain band-only and cannot alter the treatments canvas.

## Navigation sanity checks (code review)
For each flow, the canvas stays on the dark Champagne surface because the wrapper classes/attributes remain constant and the treatments-specific selector owns the background:
- hub → whitening → hub
- hub → composite-bonding → hub
- hub → whitening → composite-bonding → hub
- Any of the above after visiting `/portal` or `/preview/home`
