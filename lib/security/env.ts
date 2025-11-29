export type EnvKey = 'NEXT_PUBLIC_APP_URL';

export const env: Record<EnvKey, string | undefined> = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

export function getEnv(key: EnvKey | string): string {
  const value = env[key as EnvKey] ?? process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
