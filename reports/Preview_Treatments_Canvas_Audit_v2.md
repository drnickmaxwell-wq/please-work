# Preview Treatments Canvas Audit v2

Audit scope: `/app/preview/treatments/**` pages plus shared preview shells/styles that could influence their full-height canvases. Focused on selectors/components that paint a background on wrappers with `min-height: 100vh` or other page-level shells.

## Canvas-level wrappers

| File | Selector / Component | Class / Selector | Level | Routes under `/preview/treatments` using it |
| --- | --- | --- | --- | --- |
| `app/preview/treatments/layout.tsx` | Layout wrapper | `className="cpv-page cpv-page--champagne-dark cpv-page--treatments"` | canvas-level | **All** routes in the subtree inherit this wrapper. | 
| `styles/preview/champagne-preview.css` | `.cpv-page` | `.cpv-page` sets `min-height: 100vh` with transparent background; base canvas for treatments pages. | canvas-level | Applied via the layout wrapper on every treatments preview. |
| `styles/preview/champagne-preview.css` | `.cpv-page--champagne-dark` | Adds the champagne gradient background on the page shell. | canvas-level | Applied via `cpv-page cpv-page--champagne-dark` class from layout across all treatments routes. |
| `styles/preview/champagne-preview.css` | `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments` | Treatment-specific override: sets dark ink background/color mix and keeps `min-height: 100vh`; competes directly with any other canvas rule. | canvas-level | Active on every `/preview/treatments` route because the layout sets both classes and the treatments modifier. |
| `styles/preview/dusk.css` | `[data-theme="preview-dusk"]` | Attribute selector enforces `min-height: 100vh` and `background-color: var(--smh-ink)` on any element carrying the theme token. | canvas-level | Only applies if a treatments page is nested inside a parent with `data-theme="preview-dusk"` (e.g., `PreviewShell`); current treatments layout does **not** mount that shell, but this would override/stack with the champagne canvas if introduced. |
| `components/preview/layout/preview-shell.module.css` | `.cpvShell` | Shell component provides `min-height: 100vh` and a three-stop gradient background. | canvas-level | Used by `/preview/(with-shell)/**` routes; treatments pages are outside that segment. If a treatments page were rendered inside `PreviewShell`, this gradient would sit behind the champagne canvas. |
| `components/preview/layout/preview-shell.module.css` | `.cpvShell:has(.cpv-page--treatments)` | Special-case override that forces the shell background transparent and hides backdrop/particles when a treatments canvas is inside. | canvas-level | Would neutralize the shell gradient if treatments pages were ever rendered inside `PreviewShell`; currently unused for the subtree. |
| `styles/preview/preview-v2-treatments.css` | `.cpv-v2-shell` | Experimental shell with `min-height: 100vh` and layered gradients. | canvas-level | No current usage found in `/preview/treatments/**`, but if adopted it would compete with `cpv-page cpv-page--champagne-dark`. |

## Notes
- Every treatments route is wrapped by `cpv-page cpv-page--champagne-dark cpv-page--treatments`, so the champagne dark canvas (including the treatments-specific override) is the active background today.
- The only other full-height shells in scope (`data-theme="preview-dusk"`, `cpvShell`, and `.cpv-v2-shell`) are not mounted by the treatments subtree but would stack with or override the champagne canvas if introduced.
- No hero-level or section-level backgrounds with full-page height requirements were found in the inspected files; the remaining backgrounds live on cards/sections rather than page canvases.
