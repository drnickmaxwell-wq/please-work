import type { ReactNode } from "react";

import ChampagnePreviewFooter from "@/components/preview/layout/ChampagnePreviewFooter";
import ChampagnePreviewHeader from "@/components/preview/layout/ChampagnePreviewHeader";
import styles from "./preview-shell.module.css";

type PreviewShellScope = "default" | "treatments";

interface PreviewShellProps {
  children: ReactNode;
  scope?: PreviewShellScope;
}

export default function PreviewShell({
  children,
  scope = "default",
}: PreviewShellProps) {
  const scopeClass = scope === "treatments" ? styles.cpvShellTreatments : "";

  return (
    <div
      className={`${styles.cpvShell} ${scopeClass} text-[var(--smh-white)]`}
      data-theme="preview-dusk"
      data-preview-scope={scope}
    >
      <div className={styles.cpvBackdrop} aria-hidden />
      <div className={styles.cpvParticles} aria-hidden />
      <div className={`${styles.cpvInner} flex min-h-screen flex-col`}>
        <ChampagnePreviewHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <ChampagnePreviewFooter />
      </div>
    </div>
  );
}
