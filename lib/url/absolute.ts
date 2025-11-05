import { headers } from "next/headers";

export function makeAbsolute(path: string): string {
  // path should start with '/'
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "https";
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}
