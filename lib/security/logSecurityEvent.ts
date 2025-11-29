import { SecurityEvent } from './types/securityEvents';

export function logSecurityEvent(event: SecurityEvent): void {
  // eslint-disable-next-line no-console
  console.warn('[security:event]', { ...event, timestamp: event.timestamp ?? new Date() });
}
