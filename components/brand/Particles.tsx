'use client';

import { useEffect, useRef } from 'react';
import type { CanvasHTMLAttributes } from 'react';

type ParticlesProps = CanvasHTMLAttributes<HTMLCanvasElement>;

type Particle = {
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  alpha: number;
};

const PARTICLE_COUNT = 20;
const SPEED = 0.18;

function parseHexToRgb(input: string) {
  const hex = input.trim().replace('#', '');
  if (hex.length === 6) {
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }
  return { r: 212, g: 175, b: 55 };
}

export default function Particles({ className, style, ...rest }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rootStyles = getComputedStyle(document.documentElement);
    const gold = parseHexToRgb(rootStyles.getPropertyValue('--smh-accent-gold'));

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles: Particle[] = [];
    let rafId: number | null = null;
    let active = false;

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.6 + Math.random() * 1.4,
      velocityX: (Math.random() - 0.5) * SPEED,
      velocityY: (Math.random() - 0.5) * SPEED,
      alpha: 0.15 + Math.random() * 0.3,
    });

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      width = clientWidth;
      height = clientHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    };

    const step = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      for (const particle of particles) {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.y > height + 4) particle.y = -4;

        context.beginPath();
        context.fillStyle = `rgba(${gold.r}, ${gold.g}, ${gold.b}, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalCompositeOperation = 'source-over';
    };

    const render = () => {
      if (!active) return;
      step();
      rafId = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (active) return;
      resize();
      initParticles();
      active = true;
      render();
    };

    const stop = () => {
      active = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      context.clearRect(0, 0, width, height);
    };

    const handleResize = () => {
      if (!active) return;
      resize();
      initParticles();
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        stop();
      } else {
        start();
      }
    };

    window.addEventListener('resize', handleResize);
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    if (!motionQuery.matches) {
      start();
    }

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  const mergedStyle = { ...(style ?? {}), pointerEvents: 'none' as const };

  return <canvas ref={canvasRef} aria-hidden className={className} style={mergedStyle} {...rest} />;
}
