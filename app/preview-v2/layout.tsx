import "@/components/preview/preview-layout.css";
import "@/styles/preview/preview-v2-treatments.css";

export default function PreviewV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="cpv-v2-shell cpv-v2-shell--champagne-dark"
      data-preview-v2="true"
    >
      {children}
    </div>
  );
}
