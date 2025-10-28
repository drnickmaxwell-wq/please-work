'use client';

import { useMemo, useState, type CSSProperties } from 'react';
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

  const footerVars = {
    '--footer-text': 'var(--smh-text-strong)',
    '--footer-placeholder': 'color-mix(in srgb, var(--smh-text-strong) 78%, transparent)',
    '--footer-focus-ring': 'color-mix(in srgb, var(--smh-accent-gold) 36%, transparent)',
    '--footer-keyline': 'color-mix(in srgb, var(--smh-accent-gold) 30%, transparent)',
  } as CSSProperties;

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
    <footer className="footer-luxe" data-footer style={footerVars}>
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

          <div className="footer-luxe__newsletter keyline-gold">
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
        .footer-luxe {
          position: relative;
          overflow: hidden;
          padding: clamp(4rem, 8vw, 5.75rem) clamp(1.75rem, 6vw, 4.75rem) clamp(3rem, 5vw, 4rem);
          isolation: isolate;
          background: var(--ink);
          color: var(--footer-text);
          --footer-surface-strong: color-mix(in srgb, var(--ink) 68%, transparent 32%);
          --footer-surface-soft: color-mix(in srgb, var(--ink) 52%, transparent 48%);
          --footer-surface-muted: color-mix(in srgb, var(--ink) 38%, transparent 62%);
        }

        [data-footer] a {
          color: var(--footer-text);
          text-decoration: none;
          transition: color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        [data-footer] a:hover,
        [data-footer] a:focus-visible {
          color: var(--smh-accent-gold);
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }

        .footer-luxe::before {
          content: '';
          position: absolute;
          inset: -12%;
          pointer-events: none;
          background:
            radial-gradient(8px 8px at 18% 24%, color-mix(in srgb, var(--smh-accent-gold) 32%, transparent) 0 60%, transparent 61%) no-repeat,
            radial-gradient(6px 6px at 64% 70%, color-mix(in srgb, var(--smh-accent-gold) 26%, transparent) 0 60%, transparent 61%) no-repeat,
            radial-gradient(4px 4px at 84% 32%, color-mix(in srgb, var(--smh-accent-gold) 22%, transparent) 0 60%, transparent 61%) no-repeat;
          filter: blur(0.4px);
          opacity: 0.12;
          z-index: 0;
        }

        .footer-luxe__rim {
          height: 0;
          width: 100%;
          border-top: 1px solid var(--footer-keyline);
          margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
          position: relative;
          z-index: 2;
        }

        .footer-luxe__inner {
          position: relative;
          z-index: 2;
          max-width: min(1180px, 94vw);
          margin: 0 auto;
          display: grid;
          gap: clamp(3rem, 5vw, 4rem);
        }

        .footer-luxe__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: clamp(2.5rem, 5vw, 3.75rem);
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
          color: var(--footer-text);
        }

        h4 {
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.85rem;
          color: color-mix(in srgb, var(--smh-text-strong) 68%, transparent 32%);
        }

        p {
          margin: 0;
          color: color-mix(in srgb, var(--smh-text-strong) 88%, transparent 12%);
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
          background: var(--footer-surface-strong);
          box-shadow: inset 0 0 0 1px var(--footer-keyline);
        }

        .footer-luxe__field::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: inherit;
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 38%, transparent 62%);
          pointer-events: none;
        }

        .footer-luxe__input {
          width: 100%;
          padding: 1rem 1.2rem;
          border: none;
          outline: none;
          border-radius: inherit;
          background: var(--footer-surface-soft);
          color: var(--smh-text-strong);
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        .footer-luxe__input::placeholder {
          color: var(--footer-placeholder);
          opacity: 1;
        }

        .footer-luxe__input:focus-visible {
          outline: 2px solid var(--footer-focus-ring);
          outline-offset: 2px;
        }

        .footer-luxe__button {
          width: fit-content;
          justify-content: center;
        }

        .footer-luxe__button:focus-visible {
          outline: 2px solid var(--footer-focus-ring);
          outline-offset: 2px;
        }

        .footer-luxe__feedback {
          font-size: 0.9rem;
          min-height: 1.2rem;
          color: color-mix(in srgb, var(--smh-text-strong) 86%, transparent 14%);
        }

        .footer-luxe__feedback[data-status='error'] {
          color: var(--smh-primary-magenta);
        }

        .footer-luxe__feedback[data-status='success'] {
          color: var(--smh-primary-teal);
        }

        .footer-luxe__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem 2.5rem;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--footer-keyline);
          padding-top: clamp(2rem, 4vw, 3rem);
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
          box-shadow: inset 0 0 0 1px var(--footer-keyline);
          color: color-mix(in srgb, var(--smh-accent-gold) 82%, transparent 18%);
          transition: background-color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease),
            color var(--motion-duration-normal, 160ms) var(--motion-easing-smooth, ease);
        }

        .footer-luxe__social a:hover,
        .footer-luxe__social a:focus-visible {
          background: color-mix(in srgb, var(--smh-accent-gold) 24%, transparent 76%);
          color: var(--smh-text-strong);
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
