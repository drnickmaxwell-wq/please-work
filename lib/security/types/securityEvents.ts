import { Role } from './roles';

export type SecurityEventType =
  | 'login_attempt'
  | 'authentication'
  | 'access_denied'
  | 'rate_limit'
  | 'data_access'
  | 'system_alert';

export interface SecurityEvent {
  type: SecurityEventType;
  message?: string;
  actorId?: string;
  roles?: Role[];
  metadata?: Record<string, unknown>;
  timestamp?: Date;
}
