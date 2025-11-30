import ChampagneTreatmentTemplate from "@/components/treatments/ChampagneTreatmentTemplate";
import TreatmentPreviewSchema from "@/components/preview/seo/TreatmentPreviewSchema";

export default function ImplantsPage() {
  return (
    <ChampagneTreatmentTemplate
      slug="implants"
      schemaKey="implant-process"
      treatmentName="Dental implants"
      category="Implants"
      has3DViewer
      financePlanGroup="implants"
      galleryEnabled
      faqKey="implants"
      renderSchema={({ config }) => <TreatmentPreviewSchema config={config} />}
    />
  );
}
