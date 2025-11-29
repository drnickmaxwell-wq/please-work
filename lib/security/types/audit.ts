export interface AuditEvent {
  action: string;
  actorId?: string;
  targetId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  timestamp?: Date;
}
