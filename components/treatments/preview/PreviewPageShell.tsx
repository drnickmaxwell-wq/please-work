import type { HTMLAttributes, ReactNode } from "react";

import styles from "./PreviewLayout.module.css";

const join = (...tokens: Array<string | false | null | undefined>) =>
  tokens.filter(Boolean).join(" ");

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
  return (
    <main {...rest} role={role} className={join(styles.main, className)}>
      {children}
    </main>
  );
}
