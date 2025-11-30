import { ChampagneFAQ } from "@/components/faq/ChampagneFAQ";

import styles from "./composite-bonding-preview.module.css";

const FAQ_ITEMS = [
  {
    id: "prep",
    question: "Will my teeth be drilled?",
    answer:
      "Composite bonding typically requires no drilling of healthy enamel. We prepare the surface gently to help the resin bond while keeping your natural tooth intact.",
  },
  {
    id: "time",
    question: "How long does a bonding visit take?",
    answer:
      "Most edge refinements and gap closures happen in a single 60–90 minute visit. Larger transformations may include a planning appointment for photos and shade mapping.",
  },
  {
    id: "durability",
    question: "How long will the finish last?",
    answer:
      "With routine hygiene and gentle habits, bonding can look great for years. We schedule maintenance polishes to refresh gloss and protect the edges from staining.",
  },
  {
    id: "whitening",
    question: "Should I whiten before bonding?",
    answer:
      "If you plan to whiten, we recommend completing it first so we can match the composite shade to your brighter enamel. Our team can pair whitening and bonding in a single roadmap.",
  },
  {
    id: "aftercare",
    question: "What aftercare do I need?",
    answer:
      "Avoid biting hard items on the bonded edges for the first few days. Use a soft brush and attend scheduled polishes or night-time protection checks if we recommend them.",
  },
  {
    id: "sensitivity",
    question: "Will it feel sensitive?",
    answer:
      "Most guests feel little to no sensitivity because we preserve enamel. If you’re prone to sensitivity, we can apply desensitising agents and review your home care routine.",
  },
  {
    id: "fix",
    question: "Can bonding be repaired?",
    answer:
      "Yes. If an edge chips or you want to tweak symmetry, we can add or refine layers without restarting the whole treatment, keeping the visit short and calm.",
  },
];

export function CompositeBondingFaq() {
  return (
    <section className={styles.section} aria-labelledby="composite-faq-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 id="composite-faq-heading" className={styles.sectionTitle}>
          Composite bonding questions, answered
        </h2>
        <p className={styles.sectionLead}>
          Schema-friendly question and answer set covering preparation, timelines, aftercare, and what to do if you need a quick
          refinement.
        </p>
      </div>

      <ChampagneFAQ items={FAQ_ITEMS} />
    </section>
  );
}
