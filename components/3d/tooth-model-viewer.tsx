'use client';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';
export type ToothModelViewerProps = { className?: string; posterSrc?: string };
export default function ToothModelViewer({ className, posterSrc }: ToothModelViewerProps) {
  return (
    <img
      className={className}
      src={posterSrc ?? TOOTH_FALLBACK_DATA_URL}
      alt="Tooth model"
    />
  );
}
