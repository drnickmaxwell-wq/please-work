import Link from "next/link";

import styles from "./champagne-preview-footer.module.css";

const mainLinks = [
  { label: "Home", href: "/preview/home" },
  { label: "Treatments", href: "/preview/treatments" },
  { label: "Technology", href: "/preview/technology" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Patient stories", href: "/patient-stories" },
  { label: "AI Smile Quiz", href: "/ai-smile-quiz" },
  { label: "Blog", href: "/blog" },
];

const policyLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Terms of Use", href: "/terms" },
];

export default function ChampagnePreviewFooter() {
  return (
    <footer className={styles.cpvFooter}>
      <div className={styles.inner}>
        <div className={`${styles.columns} text-sm`}> 
          <div className={styles.brandIntro}>
            <div>
              <p className="text-lg font-semibold tracking-wide">St Mary&apos;s House Dental</p>
              <p>Calm, contemporary care using precision technology and a lifetime approach to oral health.</p>
            </div>
          </div>

          <div>
            <p className={`${styles.columnTitle} text-base`}>Main</p>
            <div className={styles.linkList}>
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className={`${styles.columnTitle} text-base`}>Resources</p>
            <div className={styles.linkList}>
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className={`${styles.columnTitle} text-base`}>Join our newsletter</p>
            <div className={styles.newsletterForm}>
              <p className="text-sm text-[color-mix(in_srgb,var(--smh-white)_85%,transparent)]">
                Receive calm clinical updates, patient stories, and technology highlights from Shoreham-by-Sea.
              </p>
              <label className="sr-only" htmlFor="cpv-newsletter-email">
                Email address
              </label>
              <input
                id="cpv-newsletter-email"
                type="email"
                placeholder="you@example.com"
                className={`${styles.inputField} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]`}
              />
              <button
                type="button"
                className={`${styles.subscribeButton} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className="text-sm">
          © 2025 St Mary&apos;s House Dental Care. All rights reserved.
        </div>
        <div className={styles.socials} aria-label="Social media">
          <span className={styles.socialBadge} aria-hidden>
            IG
          </span>
          <span className={styles.socialBadge} aria-hidden>
            FB
          </span>
        </div>
        <div className={`${styles.bottomLinks} text-sm`}>
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
