"use client";

import type { KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";

import { Champagne3DViewer } from "@/components/3d/Champagne3DViewer";

import styles from "./whitening-preview.module.css";

type Tab = {
  id: string;
  label: string;
  title: string;
  body: string;
};

const TABS: Tab[] = [
  {
    id: "map",
    label: "Shade mapping",
    title: "Consult & shade plan",
    body: "We capture calibrated photos and shade records, then map how far to lift while protecting enamel.",
  },
  {
    id: "activate",
    label: "Activation",
    title: "Gentle activation",
    body: "Sensitivity-aware whitening protocols activate in-surgery with gels and serums tuned to your comfort.",
  },
  {
    id: "recovery",
    label: "Recovery",
    title: "Calm recovery",
    body: "Aftercare kits and touchpoints help settle any zing while keeping your brightness even across every tooth.",
  },
  {
    id: "future",
    label: "Future pairing",
    title: "Plan the finish",
    body: "We review results, log your shade, and line up any future bonding or veneer work to match the new tone.",
  },
];

export function WhiteningOverview() {
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
    <section className={styles.section} aria-labelledby="whitening-overview-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Overview</span>
        <h2 id="whitening-overview-heading" className={styles.sectionTitle}>
          Whitening mapped for calm, even brightness
        </h2>
        <p className={styles.sectionLead}>
          A two-column canvas pairing a 3D placeholder with tabs that cover mapping, activation, recovery, and how we sync
          whitening with future cosmetic plans.
        </p>
      </div>

      <div className={styles.overviewGrid}>
        <Champagne3DViewer
          title="Whitening 3D preview"
          description="Drop in whitening animations or AR previews that show shade lift and sensitivity-safe protocols."
          placeholderText="Champagne 3D viewer slot — ready for whitening assets"
        />

        <div className={styles.tabShell}>
          <div className={styles.tabList} role="tablist" aria-label="Whitening overview">
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
