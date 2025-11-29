import { Role } from './types/roles';

export interface AccessContext {
  userId?: string;
  roles: Role[];
  resource?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export function assertHasRole(context: AccessContext, requiredRoles: Role | Role[]): void {
  const allowedRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const hasRole = context.roles.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    // eslint-disable-next-line no-console
    console.warn('Access check failed', { context, requiredRoles: allowedRoles });
  }
}

export function canAccessResource(
  context: AccessContext,
  options: { requiredRoles?: Role[]; resource?: string; action?: string } = {},
): boolean {
  const { requiredRoles = [], resource, action } = options;

  const isAllowed =
    requiredRoles.length === 0 || requiredRoles.some((role) => context.roles.includes(role));

  if (!isAllowed) {
    // eslint-disable-next-line no-console
    console.warn('Access denied', { context, resource, action, requiredRoles });
  }

  return isAllowed;
}

export { Role };
