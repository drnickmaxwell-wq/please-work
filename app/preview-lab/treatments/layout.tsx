import "@/styles/preview/preview-lab-treatments.css";

export default function PreviewLabTreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="plab-page plab-page--treatments"
      data-preview-scope="preview-lab-treatments"
    >
      {children}
    </div>
  );
}
