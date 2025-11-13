import React from 'react';

export default function WaveFXPreview() {
  return (
    <div aria-hidden className="cpv-wavefx">
      <div className="cpv-wavefx__waves" />
      <div className="cpv-wavefx__shimmer" />
      <div className="cpv-wavefx__particles" />
      <div className="cpv-wavefx__grain" />
    </div>
  );
}
