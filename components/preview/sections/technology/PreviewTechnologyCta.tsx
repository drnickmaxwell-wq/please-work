import Link from "next/link";

import styles from "./preview-technology.module.css";

export default function PreviewTechnologyCta() {
  return (
    <section className={styles.closingCta} aria-labelledby="technology-cta-heading">
      <div className={styles.closingCopy}>
        <p className="text-eyebrow">Ready when you are</p>
        <div className="space-y-3">
          <h2 className="text-display-sm" id="technology-cta-heading">
            Experience Tomorrow’s Dentistry Today.
          </h2>
          <p className="text-body">
            Book a calm consultation or tour the clinic to see the Champagne preview canvas come to life with live technology.
          </p>
        </div>
      </div>
      <div className={styles.closingActions}>
        <Link className="cpv-btn cpv-btn-solid text-eyebrow" href="/contact">
          Book consultation
        </Link>
        <Link className="cpv-btn cpv-btn-outline text-eyebrow" href="/clinic-tour">
          Tour our clinic
        </Link>
      </div>
    </section>
  );
}
