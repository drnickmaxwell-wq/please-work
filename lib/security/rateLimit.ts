export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt?: Date;
  reason?: string;
}

export function checkRateLimit(bucket: string, key: string): RateLimitResult {
  // eslint-disable-next-line no-console
  console.info('[security:rate-limit]', { bucket, key, allowed: true });

  return {
    allowed: true,
    remaining: Number.POSITIVE_INFINITY,
  };
}
