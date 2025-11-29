import { NextRequest, NextResponse } from 'next/server';

const CONTENT_SECURITY_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self' https://api.openai.com https://*.vercel.app;
  frame-ancestors 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders: Record<string, string> = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Permissions-Policy':
    'geolocation=(); microphone=(); camera=(); fullscreen=(self); payment=(self)',
};

export function middleware(_request: NextRequest): NextResponse {
  const response = NextResponse.next();

  Object.entries(securityHeaders).forEach(([header, value]) => {
    response.headers.set(header, value);
  });

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
};
