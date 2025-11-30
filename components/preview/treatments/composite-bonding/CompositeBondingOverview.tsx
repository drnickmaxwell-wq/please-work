"use client";

import type { KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";

import { Champagne3DViewer } from "@/components/3d/Champagne3DViewer";

import styles from "./composite-bonding-preview.module.css";

type Tab = {
  id: string;
  label: string;
  title: string;
  body: string;
};

const TABS: Tab[] = [
  {
    id: "what",
    label: "What it is",
    title: "Refinement without heavy prep",
    body: "Layered, light-cure composite is sculpted onto enamel to tidy chips, smooth edges, and close micro-gaps without drilling away healthy tooth structure.",
  },
  {
    id: "how",
    label: "How it works",
    title: "Mapped, modelled, and polished",
    body: "Photography, shade mapping, and mock-ups guide each layer. Contours are refined with micro-burs, then polished through a calibrated sequence for glassy lustre.",
  },
  {
    id: "results",
    label: "Results",
    title: "Camera-ready symmetry",
    body: "Guests leave with balanced incisal edges, softened corners, and gloss that mirrors natural translucency—often within a single appointment.",
  },
  {
    id: "aftercare",
    label: "Aftercare",
    title: "Hold the finish longer",
    body: "Gentle hygiene coaching, high-shine maintenance visits, and night-time protection (if needed) keep the bonded edges pristine and photo-ready.",
  },
];

export function CompositeBondingOverview() {
  const [activeId, setActiveId] = useState(TABS[0]?.id ?? "");
  const tabButtonsRef = useRef<HTMLButtonElement[]>([]);

  const activeTab = useMemo(() => TABS.find((tab) => tab.id === activeId) ?? TABS[0], [activeId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!TABS.length) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (index + 1) % TABS.length;
      const nextId = TABS[nextIndex].id;
      setActiveId(nextId);
      tabButtonsRef.current[nextIndex]?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = (index - 1 + TABS.length) % TABS.length;
      const prevId = TABS[prevIndex].id;
      setActiveId(prevId);
      tabButtonsRef.current[prevIndex]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveId(TABS[0].id);
      tabButtonsRef.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveId(TABS[TABS.length - 1].id);
      tabButtonsRef.current[TABS.length - 1]?.focus();
    }
  };

  return (
    <section className={styles.section} aria-labelledby="composite-overview-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Overview</span>
        <h2 id="composite-overview-heading" className={styles.sectionTitle}>
          Composite bonding in four calm steps
        </h2>
        <p className={styles.sectionLead}>
          Two-column canvas pairing the interactive 3D preview slot with tactile, keyboard-friendly tabs covering what bonding
          is, how it works, results, and aftercare.
        </p>
      </div>

      <div className={styles.overviewGrid}>
        <Champagne3DViewer
          title="Composite bonding 3D preview"
          description="Drop in the interactive model or animation that demonstrates layering, contouring, and polish routes."
          placeholderText="Champagne 3D viewer slot — ready for bonding assets"
        />

        <div className={styles.tabShell}>
          <div className={styles.tabList} role="tablist" aria-label="Composite bonding overview">
            {TABS.map((tab, index) => {
              const isActive = tab.id === activeTab?.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  tabIndex={isActive ? 0 : -1}
                  className={styles.tabButton}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(node) => {
                    if (node) tabButtonsRef.current[index] = node;
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab ? (
            <div
              id={`${activeTab.id}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeTab.id}-tab`}
              className={styles.tabPanel}
            >
              <h3>{activeTab.title}</h3>
              <p>{activeTab.body}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
