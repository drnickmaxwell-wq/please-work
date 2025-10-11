'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TreatmentsButtonMenu from '@/components/nav/TreatmentsButtonMenu';

export default function StickyHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 transition ${
        scrolled
          ? 'backdrop-blur bg-white/90 border-b border-black/5 shadow-sm'
          : 'bg-white/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C2185B] to-[#40C4B4]" />
          <div className="leading-tight">
            <div className="text-slate-900 font-semibold">St Mary&apos;s</div>
            <div className="text-slate-500 text-xs -mt-0.5">Dental Care</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm relative">
          <HeaderLink href="/" active={isActive('/')}>Home</HeaderLink>
          <HeaderLink href="/about" active={isActive('/about')}>About</HeaderLink>

          {/* Gradient Treatments dropdown */}
          <TreatmentsButtonMenu />

          <HeaderLink href="/team" active={isActive('/team')}>Team</HeaderLink>
          <HeaderLink href="/patient-stories" active={isActive('/patient-stories')}>
            Patient Stories
          </HeaderLink>
          <HeaderLink href="/blog" active={isActive('/blog')}>Blog</HeaderLink>
          <HeaderLink href="/contact" active={isActive('/contact')}>Contact</HeaderLink>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="tel:01273453109"
            className="rounded-full px-4 py-2 text-sm font-semibold border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Call Now
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37] hover:brightness-110"
          >
            Book Free Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="block w-5 h-[2px] bg-slate-800 rounded" />
            <span className="block w-5 h-[2px] bg-slate-800 rounded" />
            <span className="block w-5 h-[2px] bg-slate-800 rounded" />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <MobileLink href="/" onClick={() => setMobileOpen(false)} active={isActive('/')}>Home</MobileLink>
            <MobileLink href="/about" onClick={() => setMobileOpen(false)} active={isActive('/about')}>About</MobileLink>

            <details className="rounded-lg border border-black/5">
              <summary className="px-3 py-2 cursor-pointer font-semibold
                                  bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                                  bg-clip-text text-transparent">
                Treatments
              </summary>
              <div className="px-3 py-2 text-sm text-slate-700 space-y-2">
                <Link href="/treatments" onClick={() => setMobileOpen(false)} className="block">All Treatments</Link>
                <Link href="/treatments/3d-dentistry" onClick={() => setMobileOpen(false)} className="block">3-D Dentistry</Link>
                <Link href="/treatments/cosmetic" onClick={() => setMobileOpen(false)} className="block">Cosmetic</Link>
                <Link href="/treatments/implants" onClick={() => setMobileOpen(false)} className="block">Implants</Link>
                <Link href="/treatments/orthodontics" onClick={() => setMobileOpen(false)} className="block">Orthodontics</Link>
                <Link href="/treatments/general" onClick={() => setMobileOpen(false)} className="block">General</Link>
                <Link href="/treatments/technology" onClick={() => setMobileOpen(false)} className="block">Technology</Link>
              </div>
            </details>

            <MobileLink href="/team" onClick={() => setMobileOpen(false)} active={isActive('/team')}>Team</MobileLink>
            <MobileLink href="/patient-stories" onClick={() => setMobileOpen(false)} active={isActive('/patient-stories')}>
              Patient Stories
            </MobileLink>
            <MobileLink href="/blog" onClick={() => setMobileOpen(false)} active={isActive('/blog')}>Blog</MobileLink>
            <MobileLink href="/contact" onClick={() => setMobileOpen(false)} active={isActive('/contact')}>Contact</MobileLink>
            <div className="pt-3 flex gap-3">
              <Link href="tel:01273453109" className="rounded-full px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-700">
                Call Now
              </Link>
              <Link href="/contact" className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- subcomponents ---------- */

function HeaderLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative py-1 text-slate-700 hover:text-slate-900 transition group ${
        active ? 'text-slate-900' : ''
      }`}
    >
      <span
        className="relative inline-block bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                   bg-clip-text text-transparent font-medium"
      >
        {children}
        {/* Gold shimmer flash on hover */}
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="block h-full w-8 -translate-x-8 skew-x-12
                       bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent
                       opacity-0 group-hover:opacity-100
                       transition-transform duration-500 group-hover:translate-x-[120%]"
          />
        </span>
      </span>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]" />
      )}
    </Link>
  );
}

function MobileLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-sm ${
        active
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </Link>
  );
}
