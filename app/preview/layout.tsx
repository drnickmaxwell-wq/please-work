import type { ReactNode } from "react";
import { headers } from "next/headers";

import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";
import { resolveChampagneTheme } from '@/lib/champagne/theme';

export default function PreviewLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const resolvedPath =
    headersList.get("x-matched-path") ??
    headersList.get("x-invoke-path") ??
    headersList.get("next-url") ??
    "";
  const theme = resolveChampagneTheme(resolvedPath);

  return <PreviewShell theme={theme}>{children}</PreviewShell>;
}
