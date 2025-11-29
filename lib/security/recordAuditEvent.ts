import { AuditEvent } from './types/audit';

export function recordAuditEvent(event: AuditEvent): void {
  // eslint-disable-next-line no-console
  console.info('[security:audit]', { ...event, timestamp: event.timestamp ?? new Date() });
}
