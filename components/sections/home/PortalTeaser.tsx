import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

export default function PortalTeaser() {
  return (
    <SectionShell tone="paper" ariaLabelledby="portal-title">
      <div className={`${styles.glassCard} ${styles.interactiveGlow} mx-auto flex flex-col gap-6 rounded-3xl border-[var(--brand-teal)]/25 p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="space-y-3">
          <span className={`${styles.chip} text-eyebrow`}>Already a patient?</span>
          <h2 id="portal-title" className={`${styles.displayHeading} text-display-sm`}>
            Manage your visits in the patient portal
          </h2>
          <p className={`text-body ${styles.mutedText}`}>
            Access secure messages, treatment plans, and convenient payment options wherever you are.
          </p>
        </div>
        <a href="/portal" className={`${styles.pillCtaGhost} text-eyebrow`}>
          Go to portal
        </a>
      </div>
    </SectionShell>
  );
}
