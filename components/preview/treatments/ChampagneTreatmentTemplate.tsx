import ChampagneTreatmentTemplate, {
  type ChampagneTreatmentTemplateProps,
} from "@/components/treatments/ChampagneTreatmentTemplate";
import { DevHud, shouldShowHud } from "@/components/preview/Hud";
import TreatmentPreviewSchema from "../seo/TreatmentPreviewSchema";

type TemplateProps = ChampagneTreatmentTemplateProps & {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ChampagneTreatmentPreviewTemplate(props: TemplateProps) {
  const { searchParams, ...templateProps } = props;
  const showHud = shouldShowHud(searchParams?.hud);

  return (
    <ChampagneTreatmentTemplate
      {...templateProps}
      renderHud={
        showHud
          ? ({ config, previewContent, schemaSlug, schemaKey, faqKey }) => (
              <DevHud
                className="tl-hud"
                stats={[
                  { label: "Slug", value: templateProps.slug },
                  { label: "Schema key", value: schemaKey ?? "—" },
                  { label: "FAQ key", value: faqKey ?? schemaKey ?? "—" },
                  { label: "Route", value: previewContent.route ?? config.route },
                  { label: "Schemas", value: previewContent.schemaTypes.join(", ") || "—" },
                  { label: "HUD", value: previewContent.hudStatus },
                  { label: "Schema slug", value: schemaSlug },
                ]}
                title="Champagne treatment template HUD"
              />
            )
          : undefined
      }
      renderSchema={({ config }) => <TreatmentPreviewSchema config={config} />}
    />
  );
}
