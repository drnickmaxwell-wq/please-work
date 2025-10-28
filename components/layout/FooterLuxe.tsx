'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { MAIN_NAV, RESOURCES } from '@/lib/nav';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/stmaryshousedental', label: 'Instagram', short: 'IG' },
  { href: 'https://www.facebook.com/stmaryshousedental', label: 'Facebook', short: 'FB' },
];

type FormStatus = 'idle' | 'success' | 'error';

function getEnabledLinks<T extends { enabled?: boolean }>(links: T[]): T[] {
  return links.filter((link) => link.enabled !== false);
}

const FooterLuxe = () => {
  const mainLinks = getEnabledLinks(MAIN_NAV);
  const resourceLinks = getEnabledLinks(RESOURCES);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const feedbackId = useMemo(() => 'newsletter-feedback', []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email to join the newsletter.');
      return;
    }

    setStatus('success');
    setMessage('Thank you! You’re on the list for future updates.');
    setEmail('');
  };

  return (
    <footer className="footer-luxe" data-footer>
      <div className="footer-luxe__rim" aria-hidden="true" />
      <div className="footer-luxe__inner">
        <div className="footer-luxe__grid">
          <div className="footer-luxe__brand">
            <h3>St Mary’s House Dental</h3>
            <p>Calm, contemporary care using precision technology and a lifetime approach to oral health.</p>
          </div>

          <div>
            <h4>Main</h4>
            <ul>
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-luxe__newsletter">
            <h4>Join our newsletter</h4>
            <p>Receive quarterly stories and gentle reminders curated by our clinical team.</p>
            <form className="footer-luxe__form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <div className="footer-luxe__field">
                <input
                  id="footer-email"
                  className="footer-luxe__input"
                  type="email"
                  inputMode="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== 'idle') {
                      setStatus('idle');
                      setMessage('');
                    }
                  }}
                  aria-invalid={status === 'error'}
                  aria-describedby={message ? feedbackId : undefined}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button type="submit" className="smh-btn footer-luxe__button">
                Subscribe
              </button>
              <p className="footer-luxe__feedback" data-status={status} id={feedbackId} aria-live="polite">
                {message}
              </p>
            </form>
          </div>
        </div>

        <div className="footer-luxe__meta">
          <p>© {new Date().getFullYear()} St Mary’s House Dental Care. All rights reserved.</p>
          <div className="footer-luxe__social">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noreferrer noopener" aria-label={social.label}>
                <span aria-hidden="true">{social.short}</span>
              </a>
            ))}
          </div>
          <div className="footer-luxe__links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        [data-footer] {
          background: var(--footer-ink-grad);
          color: var(--smh-text);
        }

        [data-footer] a {
          color: var(--smh-text);
          opacity: 0.92;
          text-decoration: none;
          transition: opacity var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        [data-footer] a:hover,
        [data-footer] a:focus-visible {
          opacity: 1;
        }

        .footer-luxe {
          position: relative;
          overflow: hidden;
          padding: clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4.5rem) clamp(2.5rem, 4vw, 3.5rem);
          isolation: isolate;
        }

        .footer-luxe::before {
          content: '';
          position: absolute;
          inset: -12%;
          pointer-events: none;
          background:
            radial-gradient(8px 8px at 18% 24%, color-mix(in srgb, var(--brand-gold) 32%, transparent) 0 60%, transparent 61%) no-repeat,
            radial-gradient(6px 6px at 64% 70%, color-mix(in srgb, var(--brand-gold) 26%, transparent) 0 60%, transparent 61%) no-repeat,
            radial-gradient(4px 4px at 84% 32%, color-mix(in srgb, var(--brand-gold) 22%, transparent) 0 60%, transparent 61%) no-repeat;
          filter: blur(0.4px);
          opacity: 0.12;
          z-index: 0;
        }

        .footer-luxe__rim {
          height: 1px;
          width: 100%;
          background: var(--footer-keyline);
          margin-bottom: clamp(2rem, 4vw, 3rem);
          position: relative;
          z-index: 2;
        }

        .footer-luxe__inner {
          position: relative;
          z-index: 2;
          max-width: min(1180px, 94vw);
          margin: 0 auto;
          display: grid;
          gap: clamp(2.5rem, 4vw, 3.5rem);
        }

        .footer-luxe__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: clamp(2rem, 4vw, 3rem);
        }

        .footer-luxe__brand {
          display: grid;
          gap: 1rem;
          max-width: 42ch;
        }

        h3 {
          margin: 0;
          font-size: 1.6rem;
          font-family: var(--font-display, 'Playfair Display', serif);
          color: var(--smh-text);
        }

        h4 {
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.85rem;
          color: color-mix(in srgb, var(--brand-gold) 62%, var(--smh-text) 38%);
        }

        p {
          margin: 0;
          color: color-mix(in srgb, var(--smh-text) 90%, transparent);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }

        .footer-luxe__newsletter p {
          max-width: 38ch;
        }

        .footer-luxe__form {
          margin-top: 1rem;
          display: grid;
          gap: 0.75rem;
        }

        .footer-luxe__field {
          position: relative;
          border-radius: 14px;
          background: color-mix(in srgb, var(--footer-ink) 68%, transparent 32%);
          box-shadow: 0 0 0 1px var(--footer-keyline) inset;
        }

        .footer-luxe__field::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: inherit;
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--footer-keyline) 70%, transparent);
          pointer-events: none;
        }

        .footer-luxe__input {
          width: 100%;
          padding: 0.9rem 1.15rem;
          border: none;
          outline: none;
          border-radius: inherit;
          background: color-mix(in srgb, var(--footer-ink) 45%, transparent 55%);
          color: var(--smh-text);
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        .footer-luxe__input::placeholder {
          color: var(--smh-text);
          opacity: 0.54;
        }

        .footer-luxe__input:focus-visible {
          outline: 2px solid var(--footer-keyline);
          outline-offset: 2px;
        }

        .footer-luxe__button {
          width: fit-content;
          justify-content: center;
        }

        .footer-luxe__button:focus-visible {
          outline: 2px solid var(--footer-keyline);
          outline-offset: 2px;
        }

        .footer-luxe__feedback {
          font-size: 0.9rem;
          min-height: 1.2rem;
          color: var(--smh-text-muted);
        }

        .footer-luxe__feedback[data-status='error'] {
          color: var(--smh-primary-magenta);
          opacity: 0.9;
        }

        .footer-luxe__feedback[data-status='success'] {
          color: var(--smh-primary-teal);
          opacity: 0.9;
        }

        .footer-luxe__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 2rem;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid color-mix(in srgb, var(--footer-keyline) 80%, transparent);
          padding-top: clamp(1.5rem, 3vw, 2.5rem);
        }

        .footer-luxe__social {
          display: flex;
          gap: 0.75rem;
        }

        .footer-luxe__social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 999px;
          box-shadow: 0 0 0 1px var(--footer-keyline) inset;
          color: color-mix(in srgb, var(--brand-gold) 68%, var(--smh-text) 32%);
          transition: background-color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease),
            color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        .footer-luxe__social a:hover,
        .footer-luxe__social a:focus-visible {
          background: color-mix(in srgb, var(--brand-gold) 16%, transparent 84%);
          color: var(--smh-text);
        }

        .footer-luxe__links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-luxe__links a {
          font-size: 0.9rem;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 720px) {
          .footer-luxe__meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-luxe__button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-luxe::before {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterLuxe;
