import styles from "./preview-technology.module.css";

type WorkflowStep = {
  title: string;
  body: string;
  icon: string;
};

const steps: WorkflowStep[] = [
  {
    title: "Scan",
    body: "Comfort-first intraoral scans map every surface without trays, ready for CBCT overlays.",
    icon: "🧭",
  },
  {
    title: "Design",
    body: "Digital planning blends AI previews with clinician guidance so decisions stay calm and clear.",
    icon: "🛠️",
  },
  {
    title: "Make",
    body: "In-house milling and 3D printing craft guides, splints, and restorations with fewer appointments.",
    icon: "🪄",
  },
];

export default function PreviewWorkflow() {
  return (
    <section className={`${styles.workflowSection} cpv-card cpv-card--soft`} aria-labelledby="workflow-heading">
      <div className={styles.sectionHeading}>
        <p className="text-eyebrow">Our digital workflow</p>
        <div className="space-y-3">
          <h2 className="text-display-sm" id="workflow-heading">
            Designed for harmony
          </h2>
          <p className="text-body">
            We pair guided planning with gentle delivery so every Shoreham visit feels precise, calm, and predictable.
          </p>
        </div>
      </div>

      <div className={styles.workflowGrid} id="workflow">
        {steps.map((step) => (
          <div key={step.title} className={`${styles.workflowCard} cpv-card cpv-card--soft`}>
            <span className={styles.workflowIcon} aria-hidden>
              {step.icon}
            </span>
            <div className={styles.workflowCopy}>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-body">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
