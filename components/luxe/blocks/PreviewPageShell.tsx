import type { HTMLAttributes, ReactNode } from "react";

import styles from "@/styles/champagne/luxe/preview-shell.module.css";

type PreviewPageShellProps = {
  children: ReactNode;
};

export function PreviewPageShell({ children }: PreviewPageShellProps) {
  return <div className={styles.surface}>{children}</div>;
}

type PreviewMainProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function PreviewMain({ children, className, role = "main", ...rest }: PreviewMainProps) {
  const classes = [styles.main, className].filter(Boolean).join(" ");

  return (
    <main {...rest} className={classes} role={role}>
      {children}
    </main>
  );
}
