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
    <footer
      className="footer-luxe"
      style={{
        background: `linear-gradient(180deg,var(--smh-navy-1),var(--smh-navy-2))`,
        borderTop: `2px solid var(--smh-gold-ink)`,
        color: 'rgba(255,255,255,.92)',
      }}
    >
      <div className="footer-luxe__rim" aria-hidden="true" />
      <div className="footer-luxe__inner">
        <div className="footer-luxe__grid">
          <div className="footer-luxe__brand">
            <h3>St Mary’s House Dental</h3>
            <p>
              Calm, contemporary care using precision technology and a lifetime approach to oral health.
            </p>
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
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
              >
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
          padding: clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4.5rem) clamp(2.5rem, 4vw, 3.5rem);
        }

        .footer-luxe__rim {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, var(--smh-keyline), transparent);
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }

        .footer-luxe__inner {
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
        }

        h3 {
          margin: 0;
          font-size: 1.6rem;
          color: var(--smh-gold-ink);
        }

        h4 {
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.85rem;
          color: rgba(249, 232, 195, 0.7);
        }

        p {
          margin: 0;
          color: rgba(217, 226, 234, 0.78);
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }

        a {
          color: rgba(237, 241, 246, 0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        a:hover,
        a:focus-visible {
          color: var(--smh-gold);
        }

        .footer-luxe__newsletter p {
          max-width: 38ch;
        }

        .footer-luxe__form {
          margin-top: 1rem;
          display: grid;
          gap: 0.75rem;
        }

        .footer-luxe__input {
          background: var(--smh-glass);
          border: 1px solid var(--smh-keyline);
          border-radius: 999px;
          padding: 0.85rem 1.1rem;
          color: rgba(244, 247, 252, 0.92);
          font-family: var(--font-inter, system-ui, sans-serif);
        }

        .footer-luxe__input::placeholder {
          color: rgba(180, 195, 210, 0.6);
        }

        .footer-luxe__input:focus {
          outline: 2px solid var(--smh-gold);
          outline-offset: 2px;
        }

        .footer-luxe__button {
          width: fit-content;
        }

        .footer-luxe__feedback {
          font-size: 0.9rem;
          min-height: 1.2rem;
          color: rgba(217, 226, 234, 0.75);
        }

        .footer-luxe__feedback[data-status='error'] {
          color: #fca5a5;
        }

        .footer-luxe__feedback[data-status='success'] {
          color: #86efac;
        }

        .footer-luxe__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 2rem;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--smh-keyline);
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
          border: 1px solid var(--smh-keyline);
          color: var(--smh-gold-ink);
        }

        .footer-luxe__social a:hover,
        .footer-luxe__social a:focus-visible {
          background: var(--smh-glass-soft);
          color: var(--smh-gold);
        }

        .footer-luxe__links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
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
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterLuxe;
