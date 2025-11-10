# Hex Fix Guard Run

## Commands

- `pnpm run brand:guard` → ✅ No rogue hex detected outside approved tokens.
- `pnpm run guard:hero` → ✅ Hero freeze OK (10 files checked); film grain asset regenerated with validated hashes.
- `node scripts/guard-rogue-hex.mjs` → ✅ No rogue HEX outside token files.
- `node scripts/verify-sacred.mjs` → ❌ Failed (module not found: scripts/verify-sacred.mjs).

## Notes

- Saved outputs after replacing rogue hex references with token aliases in neutrals and tests.
- Sacred verification script referenced in instructions is not present in the repository; recorded failure for visibility.
