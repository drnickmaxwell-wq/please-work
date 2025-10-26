'use client';

import Link from 'next/link';

import { MAIN_NAV, RESOURCES } from '@/lib/nav';

function getEnabledLinks<T extends { enabled?: boolean }>(links: T[]): T[] {
  return links.filter((link) => link.enabled !== false);
}

export function FooterLuxe() {
  const mainLinks = getEnabledLinks(MAIN_NAV);
  const resourceLinks = getEnabledLinks(RESOURCES);

  return (
    <footer className="relative text-slate-200">
      <div className="h-[6px] w-full" style={{ background: 'var(--smh-footer-rim)' }} />
      <div className="relative" style={{ background: 'var(--smh-footer-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-wide text-white/90">St Mary’s House Dental</h3>
              <p className="leading-relaxed text-white/70">
                Calm, contemporary care using precision technology and a lifetime approach to oral health.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Main</h4>
              <ul className="space-y-2">
                {mainLinks.map((item) => (
                  <li key={item.href}>
                    <Link className="transition-colors hover:text-white/90" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Resources</h4>
              <ul className="space-y-2">
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link className="transition-colors hover:text-white/90" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-sm">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">Join Our Newsletter</h4>
              <form className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-white/90 outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-white/25 backdrop-blur"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium text-slate-900"
                  style={{
                    background:
                      'linear-gradient(90deg, color-mix(in oklab, var(--smh-gold-600) 85%, #ffffff 15%), var(--smh-gold-500))',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
            <p>© {new Date().getFullYear()} St Mary’s House Dental Care. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/accessibility">Accessibility</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterLuxe;
