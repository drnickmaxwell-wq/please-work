export default function PreviewLabDebugDarkCanvas() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "4rem",
        backgroundColor: "var(--bg-ink)",
        color: "var(--smh-white)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <h1>Preview Lab Debug — Dark Canvas</h1>
      <p>
        This page uses inline styles only (no CSS modules) with var(--bg-ink) + var(--smh-white).
      </p>
      <p>
        If this page does NOT look clearly dark with readable white text, something is overriding or
        mis-routing preview-lab.
      </p>
    </div>
  );
}
