'use client';
import React from 'react';

export default function CoastalParticles({ count=18, className='' }:{count?:number; className?:string}){
  const dots = Array.from({length: count});
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {dots.map((_, i) => {
        const left = Math.random()*100;
        const top = Math.random()*100;
        const size = 3 + Math.random()*4;
        const delay = Math.random()*3;
        return (
          <span key={i}
            className="absolute rounded-full bg-white/60 dark:bg-white/30"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size,
                     animation: `float_${i} 6s ease-in-out ${delay}s infinite`}}/>
        );
      })}
      <style jsx>{`
        ${dots.map((_, i) => `
          @keyframes float_${i} {
            0%,100% { transform: translateY(0px) }
            50%     { transform: translateY(-12px) }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}
