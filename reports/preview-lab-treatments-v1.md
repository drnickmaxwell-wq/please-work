# Preview lab — treatments v1

## Purpose
Create a fully isolated preview surface at `/preview-lab/**` for treatment templates on a stable Champagne ink canvas.

## Routes implemented
- `/preview-lab/treatments`
- `/preview-lab/treatments/composite-bonding`

## Notes
- Lab shell and treatments pages live under `app/preview-lab/**` and do not touch the existing `/preview` stack or production `/treatments` routes.
- Uses Champagne tokens on a dark ink backdrop without invoking hero-engine CSS.
- Preview-only framing; no production header/footer entanglement.

## Next steps
- Add additional treatment previews (veneers, implants, whitening).
- Expand quick-answer rails and rich media once Manus polish is ready.
