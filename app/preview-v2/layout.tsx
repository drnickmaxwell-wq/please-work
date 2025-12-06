// LEGACY V2 PREVIEW SHELL
// Do not use for current Champagne preview flows.
// Canonical stack is /app/preview/treatments with PreviewShell + cpv-page.
import PreviewShell from "@/components/preview/layout/PreviewShell";
import "@/styles/preview/dusk.css";
import "@/styles/champagne/theme.css";
import "@/styles/preview/champagne-preview.css";
import "@/styles/preview/preview-v2-treatments.css";

export default function PreviewV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreviewShell scope="treatments">
      <div
        className="cpv-page cpv-page--champagne-dark cpv-page--treatments"
        data-preview-scope="treatments"
        data-preview-v2="true"
      >
        {children}
      </div>
    </PreviewShell>
  );
}
