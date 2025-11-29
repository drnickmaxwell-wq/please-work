import Link from "next/link";

import type { PreviewBreadcrumb } from "@/lib/treatments/previewTreatmentConfig";

export default function PreviewBreadcrumbs({
  breadcrumbs,
  fallbackLabel,
}: {
  breadcrumbs?: PreviewBreadcrumb[];
  fallbackLabel?: string;
}) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Preview breadcrumbs" className="cpv-breadcrumbs">
      <ol>
        {breadcrumbs.map((crumb) => (
          <li key={`${crumb.item}-${crumb.position}`}>
            <Link href={crumb.item || "#"}>{crumb.name || fallbackLabel}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
