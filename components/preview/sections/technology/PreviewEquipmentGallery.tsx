import styles from "./preview-technology.module.css";

type EquipmentTile = {
  name: string;
  caption: string;
  marker: string;
};

const equipment: EquipmentTile[] = [
  {
    name: "iTero Element 5D",
    caption: "Multispectral scanning for comfort-led diagnostics.",
    marker: "IE",
  },
  {
    name: "CEREC Primescan",
    caption: "Same-visit crowns and onlays with precise fit.",
    marker: "CP",
  },
  {
    name: "Planmeca CBCT",
    caption: "Low-dose 3D imaging for guided surgery and mapping.",
    marker: "CB",
  },
  {
    name: "3D Printing Studio",
    caption: "Guides, splints, and mock-ups printed in-house.",
    marker: "3D",
  },
];

export default function PreviewEquipmentGallery() {
  return (
    <section className={styles.equipmentSection} aria-labelledby="equipment-heading" id="equipment">
      <div className={styles.sectionHeading}>
        <p className="text-eyebrow">Equipment gallery</p>
        <div className="space-y-3">
          <h2 className="text-display-sm" id="equipment-heading">
            Technology that works together
          </h2>
          <p className="text-body">
            Gradient-backed cards keep the Champagne look while we surface the core scanners, printers, and imaging we use daily.
          </p>
        </div>
      </div>

      <div className={styles.equipmentGrid}>
        {equipment.map((item) => (
          <div key={item.name} className={`${styles.equipmentTile} cpv-card`}>
            <span className={styles.equipmentBadge} aria-hidden>
              {item.marker}
            </span>
            <div className={styles.equipmentCopy}>
              <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
              <p className="text-body">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
