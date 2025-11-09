### Champagne PR Checklist
- [ ] No hardcoded hex; only `smh-champagne-tokens.css` vars used
- [ ] Stage labels respected (prod vs /preview/**), robots noindex for non-prod
- [ ] Guard scripts pass: `brand:guard`, `guard:hero`, `guard-preview-only`, `verify:hue`
- [ ] Scroll framework PRM-aware (prefers-reduced-motion safe)
- [ ] Manifests updated if assets/layers change
- [ ] JSON-LD emitted on production pages only
