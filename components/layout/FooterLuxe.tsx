'use client';

import Link from 'next/link';

import { footer as footerNavigation } from '@/config/navigation.mirrored';

import styles from './footer-luxe.module.css';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
];

type FooterNavItem = { label: string; path: string };
type FooterNavSection = { section: string; key: string; items: FooterNavItem[] };

const sections = footerNavigation as FooterNavSection[];

const getSection = (key: string) => sections.find((section) => section.key === key);

const servicesSection = getSection('services');
const patientSection = getSection('patient');
const practiceSection = getSection('practice');
const legalSection = getSection('legal');

export default function FooterLuxe() {
  const currentYear = new Date().getFullYear();

  const renderLinks = (items: FooterNavItem[] = []) =>
    items.map((item) => (
      <li key={item.path}>
        <Link href={item.path}>{item.label}</Link>
      </li>
    ));

  return (
    <footer className={styles.footerLuxe}>
      <div className={`${styles.footerAccent} smh-gradient-bg`} aria-hidden="true" />
      <div className={styles.footerBackdrop} aria-hidden="true" />
      <div className={styles.footerGrain} aria-hidden="true" />

      <div className={styles.footerInner}>
        <div className={styles.columns}>
          <section className={styles.about} aria-label="About St Mary’s House Dental Care">
            <h3>St Mary’s House Dental Care</h3>
            <p>
              Calm, contemporary care using precision technology and a lifetime approach to oral health. We welcome
              patients to a restorative, coastal retreat in Shoreham-by-Sea.
            </p>
            <ul className={styles.socialList} aria-label="Follow St Mary’s House Dental Care">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a className={styles.socialLink} href={link.href} target="_blank" rel="noreferrer noopener">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Services" className={styles.linksColumn}>
            <p className={styles.columnTitle}>Our Services</p>
            <ul className={styles.linkList}>{renderLinks(servicesSection?.items)}</ul>
            {patientSection && (
              <>
                <p className={styles.columnTitle}>{patientSection.section}</p>
                <ul className={styles.linkList}>{renderLinks(patientSection.items)}</ul>
              </>
            )}
            {practiceSection && (
              <>
                <p className={styles.columnTitle}>{practiceSection.section}</p>
                <ul className={styles.linkList}>{renderLinks(practiceSection.items)}</ul>
              </>
            )}
          </nav>

          <section aria-label="Contact details" className={styles.linksColumn}>
            <p className={styles.columnTitle}>Visit &amp; Contact</p>
            <ul className={`${styles.linkList} ${styles.contactList}`}>
              <li>
                <a href="tel:01273453109">
                  <span>Call:</span>
                  <span>01273 453109</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@stmaryshousedental.co.uk">
                  <span>Email:</span>
                  <span>info@stmaryshousedental.co.uk</span>
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Shoreham-by-Sea+Dental+Practice">
                  <span>Visit:</span>
                  <span>1 St Mary’s House, Shoreham-by-Sea, West Sussex BN43 5ZA</span>
                </a>
              </li>
              <li>
                <span>Hours:</span>
                <span>Mon–Thu 9am–5pm · Fri 9am–4pm</span>
              </li>
            </ul>
          </section>

          <section className={styles.newsletter} aria-label="Newsletter">
            <p className={styles.columnTitle}>Newsletter</p>
            <p>Occasional news, no spam. Unsubscribe anytime.</p>
            <form action="/api/subscribe" method="post" className={styles.formGroup}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={styles.input}
              />
              <button type="submit" className={styles.submit}>
                Subscribe
              </button>
            </form>
          </section>
        </div>

        <div className={styles.bottomRow}>
          <small>© {currentYear} St Mary’s House Dental Care. All rights reserved.</small>
          <ul className={styles.legalList} aria-label="Legal links">
            {renderLinks(legalSection?.items)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
