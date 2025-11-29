import Treatment3DViewerSlot from "@/components/preview/sections/treatments/Treatment3DViewerSlot";

import styles from "./preview-technology.module.css";

const chips = ["Predictive simulations", "Guided surgery and splints", "Real-time tracking"];

export default function PreviewAiAnd3D() {
  return (
    <section className={styles.ai3dSection} aria-labelledby="ai-3d-heading">
      <div className={styles.ai3dLayout}>
        <div className={styles.ai3dCopy}>
          <p className="text-eyebrow">AI &amp; 3D innovation</p>
          <div className="space-y-3">
            <h2 className="text-display-sm" id="ai-3d-heading">
              Planning with clarity. Delivery with precision.
            </h2>
            <p className="text-body">
              AI planning tools, CBCT overlays, and 3D-printed guides keep every step measured. Patients stay informed with calm visuals and timelines.
            </p>
          </div>
          <div className={styles.ai3dChips}>
            {chips.map((chip) => (
              <span key={chip} className={styles.ai3dChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.viewerWrap}>
          <Treatment3DViewerSlot
            treatmentName="Technology"
            slug="technology-preview"
            description="Reserved slot for the 3D viewer; the shell stays static and PRM-safe until the interactive embed arrives."
          />
        </div>
      </div>
    </section>
  );
}
