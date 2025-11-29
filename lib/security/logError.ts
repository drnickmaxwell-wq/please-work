export interface LogErrorOptions {
  message: string;
  error?: unknown;
  context?: Record<string, unknown>;
}

export function logError({ message, error, context }: LogErrorOptions): void {
  // eslint-disable-next-line no-console
  console.error('[security:error]', { message, error, context });
}
