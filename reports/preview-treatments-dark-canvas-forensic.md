# Preview Treatments Dark Canvas Forensic Report

## Overview
This report surveys CSS and layout sources that can influence dark/light canvas behaviour on `/preview/treatments/**`. It maps background-related rules for global elements, preview shells/canvas wrappers, and hero engine classes, plus the React layout/wrapper structure that could introduce tone or theme changes.

## Global Background Rules
| Scope | Selector | Background-related properties | File |
| --- | --- | --- | --- |
| Global root | `:root` | `background: var(--bg-ink)`; sets base ink surface | `styles/champagne/theme.css`【F:styles/champagne/theme.css†L9-L21】 |
| Global body | `body, .champagne-page` | `background: var(--bg-ink)`; dark baseline with ink token | `styles/champagne/theme.css`【F:styles/champagne/theme.css†L15-L21】 |
| Themed body | `body` | `background: var(--background)`; follows theme-manager foreground/background tokens (can differ from ink) | `styles/brand/theme-manager.css`【F:styles/brand/theme-manager.css†L103-L107】 |
| Preview shell theme | `[data-theme="preview-dusk"]` | `background-color: var(--smh-ink)`; `color-scheme: dark` for the entire shell | `styles/preview/dusk.css`【F:styles/preview/dusk.css†L1-L7】 |

## Preview & Treatments Canvas Rules
| Scope | Selector | Background-related properties | File |
| --- | --- | --- | --- |
| Preview shell default | `.cpvShell` | Gradient background mixing ink/teal/magenta; sets overall preview backdrop | `components/preview/layout/preview-shell.module.css`【F:components/preview/layout/preview-shell.module.css†L1-L17】 |
| Preview shell when treatments present | `.cpvShell:has(.cpv-page--treatments), :has([data-preview-scope="treatments"])` | Forces `background: transparent`, disables backdrop/particles to defer canvas styling to treatments page | `components/preview/layout/preview-shell.module.css`【F:components/preview/layout/preview-shell.module.css†L13-L24】 |
| Preview shell overlay assets | `.cpvBackdrop`, `.cpvParticles` | Gradient/image backgrounds for non-treatments; hidden for treatments via `:has` above | `components/preview/layout/preview-shell.module.css`【F:components/preview/layout/preview-shell.module.css†L35-L55】 |
| cpv page base | `.cpv-page` | `background: transparent`; layout relies on inherited/ancestor background until modifiers apply | `styles/preview/champagne-preview.css`【F:styles/preview/champagne-preview.css†L179-L189】 |
| Dark canvas variant | `.cpv-page--champagne-dark` | `background-color: var(--bg-ink)` with layered gradients plus `color-scheme: dark` | `styles/preview/champagne-preview.css`【F:styles/preview/champagne-preview.css†L191-L217】 |
| Treatments-specific dark canvas | `.cpv-page.cpv-page--champagne-dark.cpv-page--treatments` | Keeps `background-color: var(--bg-ink)` and gradient `background-image`; enforces `color-scheme: dark` | `styles/preview/champagne-preview.css`【F:styles/preview/champagne-preview.css†L219-L233】 |
| Inline layout override | Treatments layout wrapper div | Inline `style={{ backgroundColor: "var(--bg-ink)" }}` on `.cpv-page cpv-page--champagne-dark cpv-page--treatments` | `app/preview/treatments/layout.tsx`【F:app/preview/treatments/layout.tsx†L37-L46】 |

## Layout & Shell Forensic Scan
| File | Wrapper structure & classes | Theme / data attributes | Notes |
| --- | --- | --- | --- |
| `app/preview/(with-shell)/layout.tsx` | Renders `<PreviewShell>{children}</PreviewShell>` | Imports `styles/preview/dusk.css` + `styles/champagne/theme.css`; no extra props | All preview pages under this segment inherit PreviewShell and its `data-theme="preview-dusk"` container |
| `components/preview/layout/PreviewShell.tsx` | Outer `<div className={`${styles.cpvShell} text-[var(--smh-white)]`}>` containing backdrop/particles and `<main>` | `data-theme="preview-dusk"` on the shell | Shell backdrop hides when `:has` detects treatments canvas; otherwise gradient/particle background applies |
| `app/preview/treatments/layout.tsx` | Wraps children with `<PreviewShell>`; inside renders `<PreviewTreatmentsToneGuard />` and a `<div className="cpv-page cpv-page--champagne-dark cpv-page--treatments" data-treatment=... data-preview-scope="treatments" style={{ backgroundColor: "var(--bg-ink)" }}>` | Inherits shell `data-theme` from PreviewShell; sets treatment data attributes | Tone guard runs client-side; canvas wrapper relies on inline ink background plus CSS gradients |
| `components/preview/treatments/PreviewTreatmentsToneGuard.tsx` | Client component; renders `null` | No additional attributes; uses `usePathname` for scope | On `/preview/treatments/**`, sets `document.body.style.backgroundColor = "var(--bg-ink)"` and `backgroundImage = "none"`; strips `hero-tone--*` from `.cpv-page--treatments`, `.cpv-treatments-canvas`, and descendant `.hero-frame`; restores prior body styles on cleanup | `components/preview/treatments/PreviewTreatmentsToneGuard.tsx`【F:components/preview/treatments/PreviewTreatmentsToneGuard.tsx†L1-L58】 |

## Hero Engine Influence
| Selector | Background-related behaviour | File |
| --- | --- | --- |
| `.hero-engine-shell.hero-frame.hero-tone--dawn` | Radial gradients + `var(--smh-gradient)` background tied to dawn tone | `styles/champagne/hero-engine.css`【F:styles/champagne/hero-engine.css†L11-L58】 |
| `.hero-engine-shell.hero-frame.hero-tone--day` | `background: var(--smh-gradient)` | `styles/champagne/hero-engine.css`【F:styles/champagne/hero-engine.css†L49-L50】 |
| `.hero-engine-shell.hero-frame.hero-tone--dusk`, `.hero-engine-shell.hero-frame.hero-tone--night` | Dark-toned radial gradients layered over `var(--smh-gradient)` | `styles/champagne/hero-engine.css`【F:styles/champagne/hero-engine.css†L53-L58】 |
| `.hero-frame:not(.hero-engine-shell)` | Explicit `background: none` reset for non-engine hero frames | `styles/champagne/hero-engine.css`【F:styles/champagne/hero-engine.css†L60-L62】 |
| Tone class assignment | `getHeroToneClasses` returns `hero-tone--*` wrapper classes based on time of day | `lib/champagne/hero-tone.ts`【F:lib/champagne/hero-tone.ts†L8-L24】 |

## Potential Cascading Conflicts
- Theme-manager `body { background: var(--background) }` can override the base ink background; depending on runtime theme tokens, the body may shift away from ink between navigation events, competing with preview-specific expectations.【F:styles/brand/theme-manager.css†L103-L107】
- Preview shell default gradient (`.cpvShell`) is only bypassed when `:has(.cpv-page--treatments)` is applied; user agents without `:has` or timing before treatments markup hydrates could momentarily apply the gradient rather than ink.【F:components/preview/layout/preview-shell.module.css†L1-L24】
- `.cpv-page--champagne-dark` and `.cpv-page--treatments` both layer gradients over `var(--bg-ink)`; combined with inline styles and body-level backgrounds, the canvas may depend on which layer paints last during client navigation and whether tone classes briefly override it.【F:styles/preview/champagne-preview.css†L191-L233】
- Hero tone backgrounds still exist for `.hero-engine-shell.hero-frame.hero-tone--*`; if any preview wrapper temporarily carries these classes before the guard strips them, the gradients can repaint the canvas until the effect runs.【F:styles/champagne/hero-engine.css†L11-L58】【F:components/preview/treatments/PreviewTreatmentsToneGuard.tsx†L22-L55】

## Recommended Fix Strategy (No Code Yet)
1. Constrain hero-tone backgrounds to explicit hero containers only (e.g., require `.hero-engine-shell` ancestry or preview-safe data attributes) so generic `.hero-frame.hero-tone--*` combinations cannot repaint the treatments canvas during navigation.【F:styles/champagne/hero-engine.css†L11-L62】
2. Provide a deterministic, preview-only body/canvas background via CSS scoped to `[data-preview-scope="treatments"]` (instead of inline JS) to avoid race conditions with theme-manager body styles on client transitions.【F:styles/brand/theme-manager.css†L103-L107】【F:app/preview/treatments/layout.tsx†L37-L46】
3. Simplify the treatments canvas background to a single solid/token-backed layer (minimizing layered gradients) so any transient class changes are less likely to surface a light backdrop.【F:styles/preview/champagne-preview.css†L191-L233】
4. If `:has` support is uncertain, add an explicit treatments flag on the preview shell (e.g., a prop/class) to bypass the default shell gradient without relying on selector support timing.【F:components/preview/layout/preview-shell.module.css†L1-L24】【F:components/preview/layout/PreviewShell.tsx†L7-L19】

## Optional Debug Helper
No debug helper component was added. If needed, a temporary HUD could log computed backgrounds for `body` and `.cpv-page--treatments` without shipping to production; currently omitted to keep the branch read-only.
