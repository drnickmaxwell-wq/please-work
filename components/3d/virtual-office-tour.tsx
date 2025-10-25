'use client';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';
export type VirtualOfficeTourProps = { className?: string; posterSrc?: string };
export default function VirtualOfficeTour({ className, posterSrc }: VirtualOfficeTourProps) {
  return (
    <img
      className={className}
      src={posterSrc ?? TOOTH_FALLBACK_DATA_URL}
      alt="Virtual office tour"
    />
  );
}
