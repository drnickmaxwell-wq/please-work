import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

const treatments = [
  {
    name: "Porcelain veneers",
    description: "Refine shape, shade, and symmetry with handcrafted porcelain guided by digital mock-ups.",
    href: "/treatments/veneers",
    highlight: "Smile design",
  },
  {
    name: "Dental implants",
    description: "3D guided placement with same-day provisional smiles and calming sedation available.",
    href: "/treatments/implants",
    highlight: "3D guided",
  },
  {
    name: "Orthodontics",
    description: "Spark aligners and discreet fixed options with AI-tracked progress for predictable results.",
    href: "/treatments/orthodontics",
    highlight: "Aligner-first",
  },
  {
    name: "Teeth whitening",
    description: "Tailored whitening plans with sensitivity protocols and glow-maintenance tips from our hygiene team.",
    href: "/treatments/whitening",
    highlight: "Low-sensitivity",
  },
];

export default function MostRequestedTreatments() {
  return (
    <SectionShell tone="paper" ariaLabelledby="treatments-title">
      <div className="flex flex-col gap-10">
        <div className="space-y-3">
          <span className={styles.chip}>Most requested treatments</span>
          <h2 id="treatments-title" className={`${styles.displayHeading} text-3xl font-semibold leading-tight md:text-4xl`}>
            Crafted smiles, guided by Champagne precision
          </h2>
          <p className={`max-w-3xl text-lg leading-relaxed ${styles.mutedText}`}>
            Explore our signature cosmetic, restorative, and orthodontic treatments. Each plan is personalised with digital
            previews, finance-friendly options, and a calm, coastal setting minutes from the beach.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {treatments.map((treatment) => (
            <a
              key={treatment.name}
              href={treatment.href}
              className={`${styles.glassCard} ${styles.interactiveGlow} group relative flex h-full flex-col justify-between gap-4 rounded-3xl p-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`${styles.displayHeading} text-xl font-semibold text-[var(--ink)]`}>{treatment.name}</h3>
                  <span className="rounded-full border border-[var(--champagne-keyline-gold)] bg-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">
                    {treatment.highlight}
                  </span>
                </div>
                <p className={`text-base leading-relaxed ${styles.mutedText}`}>{treatment.description}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-magenta)] transition group-hover:translate-x-1">
                View {treatment.name.toLowerCase()} <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
