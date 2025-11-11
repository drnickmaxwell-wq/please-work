export type Viewer3DSlotProps = {
  posterSrc?: string;
  modelSrc?: string;
  caption?: string;
};

export default function Viewer3DSlot({
  posterSrc = '/brand/posters/placeholder.webp',
  modelSrc,
  caption = '3D viewer placeholder ready for <model-viewer> mount.',
}: Viewer3DSlotProps) {
  return (
    <section aria-labelledby="tp-viewer-title" className="tp-section tp-viewer">
      <div className="tp-section__heading">
        <p className="tp-kicker">Immersive slot</p>
        <h2 className="tp-title" id="tp-viewer-title">
          3D preview
        </h2>
      </div>
      <figure className="tp-viewer__frame">
        {modelSrc ? (
          <div className="tp-viewer__model" data-placeholder>
            <p>model-viewer mount reserved</p>
          </div>
        ) : (
          <img
            alt="Preview poster for 3D treatment viewer"
            className="tp-viewer__poster"
            loading="lazy"
            src={posterSrc}
          />
        )}
        <figcaption>{caption}</figcaption>
      </figure>
    </section>
  );
}
