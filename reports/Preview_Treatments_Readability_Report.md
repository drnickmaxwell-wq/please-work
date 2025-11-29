# Preview Treatments Readability Report

## Overview
- Lifted preview treatments hub and treatment detail pages with lighter glass shells, clearer keylines, and brighter text tokens for stronger contrast on the dusk canvas.
- Reused preview typography tokens for consistent eyebrows, headings, and lead copy across all preview sections while keeping the hero canvas unchanged.
- Clarified the 3D viewer placeholder with a bordered glass panel and high-contrast label that respects reduced-motion users.

## Before → After
- **Concern and benefit cards**: Previously sunk into the ink background with faint borders; now sit on lighter glass gradients with gold/teal keylines and brighter body text for easy scanning.
- **How-it-works + finance bands**: Steps and finance tiers now feature clearer section dividers, stronger gradients, and legible labels/values that stand out against the canvas.
- **Tech, stories, and FAQ rails**: Each card gains visible keylines and softened backgrounds so headings and body copy remain readable on desktop and mobile.
- **3D viewer shell**: Added a defined glass frame and centered label (“3D viewer placeholder / static shell only…”) so the slot no longer merges with the backdrop.

## Token Usage
- Relied on existing Champagne preview tokens: `--cpv-page-text`, `--cpv-page-text-soft`, `--cpv-card-bg`, `--cpv-gold-keyline`, `--brand-magenta`, `--brand-teal`, `--smh-white`, and `--smh-ink` via `color-mix` for contrast without new hex values.
- Buttons and chips continue to use the magenta→teal gradient and ink-glass outline hierarchy defined in preview styles.

## Known Limitations / TODO
- 3D viewer remains a static placeholder awaiting WebGL assets and motion-safe controls.
- Finance copy and ranges stay preview-only and should be replaced once final pricing is approved.
- Time-of-day palette remains static; future work could wire manifest-driven mood shifts without affecting readability.
