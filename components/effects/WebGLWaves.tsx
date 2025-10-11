'use client';
import React, { useEffect, useRef } from 'react';

export default function WebGLWaves({ className='' }:{ className?: string }){
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return; // fallback handled by caller

    const vert = \`
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    \`;

    const frag = \`
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;
      void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        float wave = 0.03*sin((uv.x*20.0) + u_time*1.5) + 0.02*sin((uv.x*35.0) - u_time*1.2);
        float grad = smoothstep(0.0, 1.0, uv.y + wave);
        vec3 col = mix(vec3(0.76,0.09,0.36), vec3(0.25,0.77,0.71), grad);
        col = mix(col, vec3(0.83,0.68,0.22), 0.15*grad);
        gl_FragColor = vec4(col, 0.35);
      }
    \`;

    function compile(type: number, source: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_res');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const tick = (t: number) => {
      gl.uniform1f(uTime, t*0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true" />;
}
