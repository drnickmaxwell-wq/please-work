'use client';
import React from 'react';

export default function CoastalWaves({ className='' }:{ className?: string }){
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none"
           className="absolute bottom-0 left-0 w-full h-[30vh] opacity-50">
        <path fill="url(#grad)" fillOpacity="1"
          d="M0,256L40,245.3C80,235,160,213,240,202.7C320,192,400,192,480,213.3C560,235,640,277,720,282.7C800,288,880,256,960,213.3C1040,171,1120,117,1200,112C1280,107,1360,149,1400,170.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
        </path>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C2185B" stopOpacity="0.6"/>
            <stop offset="60%" stopColor="#40C4B4" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
