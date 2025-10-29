'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MAIN_NAV, TREATMENTS, RESOURCES, type NavLink } from '@/lib/nav';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Clock
} from 'lucide-react';

// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

interface StickyHeaderProps {
  className?: string;
}

export default function StickyHeader({ className = '' }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1.02, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEnabledLinks = (links: NavLink[]) => links.filter((link) => link.enabled !== false);

  const mainNavigation = getEnabledLinks(MAIN_NAV);
  const treatmentLinks = getEnabledLinks(TREATMENTS);
  const resourceLinks = getEnabledLinks(RESOURCES);

  const navigationItems = [
    ...mainNavigation.map((item) => ({
      name: item.label,
      href: item.href,
      dropdown:
        item.href === '/treatments'
          ? treatmentLinks.map((link) => ({ name: link.label, href: link.href }))
          : undefined,
    })),
    ...(resourceLinks.length
      ? [
          {
            name: 'Resources',
            href: resourceLinks[0].href,
            dropdown: resourceLinks.map((link) => ({ name: link.label, href: link.href })),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Emergency Banner */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-[61] bg-white/10 px-4 py-2 text-center text-xs font-medium text-white/90 backdrop-blur-sm md:text-sm"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-white/85">
            <Phone className="h-4 w-4" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>Emergency: 01273 453109</span>
          </div>
          <div className="hidden items-center gap-2 text-white/70 md:flex">
            <MapPin className="h-4 w-4" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>Shoreham-by-Sea, West Sussex</span>
          </div>
          <div className="hidden items-center gap-2 text-white/70 lg:flex">
            <Clock className="h-4 w-4" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>24/7 Emergency Care</span>
          </div>
        </div>
      </motion.div>

      {/* Main Sticky Header */}
      <motion.header
        ref={headerRef}
        style={{
          opacity: headerOpacity,
          scale: headerScale,
        }}
        className={[
          'absolute top-0 left-0 right-0 z-[60] w-full border border-transparent transition-all duration-300',
          isScrolled ? 'backdrop-blur-md bg-ink/40' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              style={{ scale: logoScale }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--smh-gradient)]">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                    SMH
                  </span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    St Mary’s House
                  </h1>
                  <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                    Dental Care
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-white/80 transition-colors duration-200 hover:text-white"
                    style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 z-50 mt-2 w-64 rounded-xl border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/90 py-2 text-white/90 shadow-2xl backdrop-blur-xl"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-sm text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                            style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden items-center space-x-4 md:flex">
              <motion.a
                href="tel:01273453109"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-4 py-2 text-white/90 transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                  Call Now
                </span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-2 font-medium text-[#0b0d0f] transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] shadow-[0_12px_28px_rgba(11,13,15,0.25)]"
              >
                <Calendar className="h-4 w-4" />
                <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                  Book Free Consultation
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/80 p-2 text-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[70] overflow-y-auto bg-[color:var(--champagne-glass-bg)]/92 backdrop-blur-xl lg:hidden"
            >
              <div className="px-6 py-24 space-y-8 text-white/90">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.4em] text-white/60">Menu</span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close navigation</span>
                  </button>
                </div>
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-lg font-medium text-white/85 transition-colors duration-200 hover:text-white"
                      style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2 text-sm text-white/70">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1 transition-colors duration-200 hover:text-white"
                            style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="pt-8 space-y-3">
                  <motion.a
                    href="tel:01273453109"
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                      Call Now
                    </span>
                  </motion.a>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-medium text-[#0b0d0f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] shadow-[0_12px_24px_rgba(11,13,15,0.25)]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                      Book Free Consultation
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-24" />
    </>
  );
}

