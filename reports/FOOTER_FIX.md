Errors before:
- Not captured (no pre-fix typecheck log available).

Errors after:
- `pnpm run typecheck` succeeded with no errors.

Build summary:
- `pnpm run build` failed due to missing stylesheet `../../brand/lighting-effects.css` referenced from `app/treatments/technology/components`, and CSS syntax errors in `ai-innovation.css` and `technology-cta.css`.
