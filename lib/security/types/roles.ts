export type Role =
  | 'guest'
  | 'user'
  | 'staff'
  | 'admin'
  | 'super_admin';

export const DEFAULT_ROLES: Role[] = ['guest', 'user', 'staff', 'admin', 'super_admin'];
