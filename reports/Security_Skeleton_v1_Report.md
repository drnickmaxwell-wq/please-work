# Security Skeleton v1 Report

## Added Security Utilities
- **lib/security/env.ts** – typed environment surface and `getEnv` helper for future config validation.
- **lib/security/sanitizeInput.ts** – placeholder sanitization helper to centralize input cleaning.
- **lib/security/accessControl.ts** – role-based access control scaffolding (`Role`, `AccessContext`, `assertHasRole`, `canAccessResource`).
- **lib/security/logError.ts** – stub error logger for security-sensitive errors.
- **lib/security/logSecurityEvent.ts** – stub logger for structured security events.
- **lib/security/recordAuditEvent.ts** – stub for audit trail entries.
- **lib/security/rateLimit.ts** – placeholder rate limiting entrypoint.
- **lib/security/types/** – shared typings for roles, security events, and audit events.
- **lib/security/index.ts** – barrel export for all security utilities.

All implementations are currently safe stubs that only log to the console for observability without altering runtime behaviour.

## Baseline Security Headers
A new `middleware.ts` applies baseline headers to dynamic routes:
- `Content-Security-Policy` (consolidated template from the Security report)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy: geolocation=(); microphone=(); camera=(); fullscreen=(self); payment=(self)`

## TODO (Future Phases)
- Connect `logError`, `logSecurityEvent`, and `recordAuditEvent` to a persistent log store.
- Implement real rate limiting in `checkRateLimit`.
- Begin using `accessControl` and `sanitizeInput` across routes and API surfaces.
- Plan the `/apps/web` vs `/apps/portal` split when restructuring begins.
