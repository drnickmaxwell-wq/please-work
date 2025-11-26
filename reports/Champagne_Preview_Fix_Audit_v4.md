# Champagne Preview Fix Audit v4

## Hero Before / After
- **Before:** Preview heroes carried extra dusk weight and softer waves, so the canonical gradient and wave arc read flatter than the live home hero.
- **After:** Heroes sit directly on the canonical magenta→teal→gold gradient with the `/brand/waves-bg-1920.webp` texture at high visibility and a lighter smoked-white glass card plus stronger lift to mirror the home hero feel.

## Cards Before / After
- **Before:** Page chrome and preview cards skewed toward dark ink slabs with thin gradient keylines and subdued text legibility.
- **After:** Page ink is softened to the main site tone while cards, FAQs, and link tiles use light smoked-glass fills with the canonical gradient reserved for borders and accents, restoring bright, readable content hierarchy.

## Compliance
- Tokens remain untouched and no new hex values were introduced; all colour uses existing tokens and the canonical gradient string.
- Guard suite remains green in local runs (`guard-rogue-hex`, `brand:guard`, `guard:hero`), with preview-only guard unchanged in behavior.
