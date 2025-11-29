import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

export default function PortalTeaser() {
  return (
    <SectionShell tone="paper" ariaLabelledby="portal-title">
      <div className={`${styles.glassCard} ${styles.interactiveGlow} mx-auto flex flex-col gap-5 rounded-3xl border-[var(--brand-teal)]/25 p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="space-y-3">
          <span className={styles.chip}>Already a patient?</span>
          <h2 id="portal-title" className={`${styles.displayHeading} text-2xl font-semibold leading-tight sm:text-3xl`}>
            Manage your visits in the patient portal
          </h2>
          <p className={`text-base leading-relaxed ${styles.mutedText}`}>
            Access secure messages, treatment plans, and convenient payment options wherever you are.
          </p>
        </div>
        <a href="/portal" className={styles.pillCtaGhost}>
          Go to portal
        </a>
      </div>
    </SectionShell>
  );
}
