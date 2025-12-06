# Preview Lab Debug Dark Canvas

- **Route:** `/preview-lab/debug-dark-canvas`
- **Component:** `app/preview-lab/debug-dark-canvas/page.tsx`
- **Inline styles:** `minHeight: 100vh`, `padding: 4rem`, `backgroundColor: var(--bg-ink)`, `color: var(--smh-white)`, `display: flex`, `flexDirection: column`, `gap: 1.5rem`
- **Wrapping layout:** inherits the preview-lab root layout (`app/preview-lab/layout.tsx`) which applies the `preview-lab-page` and `preview-lab-shell` wrappers; no additional CSS is imported by the debug page itself.

If the page does not render with a dark ink background and readable white text, another global style or layout may be overriding the inline styles or routing elsewhere.
