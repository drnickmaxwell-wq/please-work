"use client";

import Link from "next/link";
import FooterRibbon from "./FooterRibbon";
import "./footer.css";

type SimpleLink = { label: string; path: string };
type Section = { title: string; links: SimpleLink[] };

const services: Section = {
  title: "Services",
  links: [
    { label: "Dental Implants", path: "/treatments/implants" },
    { label: "Composite Bonding", path: "/treatments/cosmetic/composite-bonding" },
    { label: "Teeth Whitening", path: "/treatments/cosmetic/teeth-whitening" },
    { label: "3D Dentistry", path: "/treatments/3d-dentistry" },
  ],
};

const practice: Section = {
  title: "Practice",
  links: [
    { label: "About", path: "/about" },
    { label: "Team", path: "/team" },
    { label: "Technology", path: "/treatments/technology" },
    { label: "Contact", path: "/contact" },
  ],
};

const legal: Section = {
  title: "Legal",
  links: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    { label: "Cookies", path: "/cookies" },
    { label: "Accessibility", path: "/accessibility" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <FooterRibbon />
      <div className="footer-inner">
        <div className="footer-grid">
          <section>
            <h4>St Mary’s House Dental</h4>
            <div className="rail" />
            <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
              Calm, contemporary care using precision technology and a lifetime approach to oral health.
            </p>
            <div className="social" style={{ marginTop: 12 }}>
              <a href="https://www.instagram.com" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com" aria-label="Facebook">FB</a>
              <a href="https://www.linkedin.com" aria-label="LinkedIn">IN</a>
            </div>
          </section>

          <nav aria-label="Services">
            <h4>Our Services</h4>
            <div className="rail" />
            <ul>
              {services.links.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Practice">
            <h4>Practice</h4>
            <div className="rail" />
            <ul>
              {practice.links.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Newsletter" className="glass">
            <h4>Stay in the loop</h4>
            <div className="rail" />
            <p style={{ opacity: 0.85, marginBottom: 12 }}>Occasional news, no spam. Unsubscribe anytime.</p>
            <form action="/api/subscribe" method="post">
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="footer-input" />
              <div style={{ height: 10 }} />
              <button type="submit" className="cta">Subscribe</button>
            </form>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} St Mary’s House Dental Care</span>
          <span aria-hidden="true" style={{ opacity: 0.4 }}>•</span>
          <ul style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {legal.links.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
