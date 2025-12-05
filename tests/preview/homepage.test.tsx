import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToString } from "react-dom/server";
import React from "react";
import Module from "module";

test("/preview/home renders without crashing", async () => {
  const require = Module.createRequire(import.meta.url);
  // Stub CSS module imports used by preview sections.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  require.extensions[".css"] = () => {};

  // Provide React on the global scope for components compiled with the classic runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).React = React;

  const { default: HomePreviewPage } = await import("../../app/preview/(with-shell)/home/page");
  const html = renderToString(<HomePreviewPage />);
  assert.ok(
    html.includes("Luxury Coastal Dentistry") || html.length > 0,
    "preview homepage should render markup",
  );
});
