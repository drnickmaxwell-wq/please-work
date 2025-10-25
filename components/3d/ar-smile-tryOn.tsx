'use client';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';
export type ARSmileTryOnProps = { className?: string; posterSrc?: string };
export default function ARSmileTryOn({ className, posterSrc }: ARSmileTryOnProps) {
  return (
    <img
      className={className}
      src={posterSrc ?? TOOTH_FALLBACK_DATA_URL}
      alt="AR smile try-on"
    />
  );
}
