# Brand CI

## Deployment (Vercel)

Vercel runs the default `pnpm run build` script, which now executes `brand:guard` before building. This keeps the lightweight hard-hex drift protections in place without invoking Playwright. Playwright-related scripts exit immediately on Vercel because the `VERCEL` environment variable is set to `1`.

## Continuous Integration (GitHub Actions)

Pull requests trigger the **Brand CI** workflow. It installs the required Playwright browsers and runs the brand Playwright suite via `pnpm run brand:check:ci`, which chains together `brand:scan` and `brand:validate`.

## Local development

If you need to bypass Playwright locally (for example when iterating on unrelated work), export `PLAYWRIGHT_SKIP=1` before running the scripts:

```bash
PLAYWRIGHT_SKIP=1 pnpm run verify:hue
```

This skip variable is also respected by `brand:scan` and `brand:validate`.
