"use client";

import React from "react";
import "@/styles/preview/preview-lab-shell.css";

type PreviewLabShellProps = {
  children: React.ReactNode;
};

export function PreviewLabShell({ children }: PreviewLabShellProps) {
  return (
    <div className="plab-shell" data-theme="preview-lab">
      <div className="plab-shell__backdrop" />
      <main className="plab-shell__main">{children}</main>
    </div>
  );
}
