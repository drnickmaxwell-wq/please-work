import React from "react";

export default function WaveFXPreview() {
  // Use CSS variables already set by tokens & manifests
  // Layer order: gradient(base) → wave(mask/lines) → optional caustics → grain → content
  return (
    <div aria-hidden="true" className="cpv-wavefx" />
  );
}
