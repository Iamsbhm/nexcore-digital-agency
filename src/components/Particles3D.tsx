/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export default function Particles3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 90;
    const colors = ['#3b82f6', '#4f46e5', '#60a5fa', '#a5b4fc', '#818cf8'];

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };

    // Initialize resize observer to correctly get width/height without window issues
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    handleResize();

    // Create particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 400 - 200, // Depth
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera rotation/tilt parameters based on time
      const time = Date.now() * 0.0001;
      const cosTime = Math.cos(time * 0.5);
      const sinTime = Math.sin(time * 0.5);

      // Draw lines first (connective neural tissue)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // 3D rotation projection transform (z-axis rotation)
        const rotX1 = p1.x - canvas.width / 2;
        const rotY1 = p1.y - canvas.height / 2;
        const x3d1 = (rotX1 * cosTime - rotY1 * sinTime) + canvas.width / 2;
        const y3d1 = (rotX1 * sinTime + rotY1 * cosTime) + canvas.height / 2;
        const zValue1 = p1.z;

        // Apply visual perspective factors
        const scaleFactor1 = 400 / (400 + zValue1);
        const finalX1 = (x3d1 - canvas.width / 2) * scaleFactor1 + canvas.width / 2;
        const finalY1 = (y3d1 - canvas.height / 2) * scaleFactor1 + canvas.height / 2;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distSq = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2);

          // Connection radius
          if (distSq < 15000) {
            const rotX2 = p2.x - canvas.width / 2;
            const rotY2 = p2.y - canvas.height / 2;
            const x3d2 = (rotX2 * cosTime - rotY2 * sinTime) + canvas.width / 2;
            const y3d2 = (rotX2 * sinTime + rotY2 * cosTime) + canvas.height / 2;
            const zValue2 = p2.z;

            const scaleFactor2 = 400 / (400 + zValue2);
            const finalX2 = (x3d2 - canvas.width / 2) * scaleFactor2 + canvas.width / 2;
            const finalY2 = (y3d2 - canvas.height / 2) * scaleFactor2 + canvas.height / 2;

            const opacity = (1 - Math.sqrt(distSq) / 122) * 0.13;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = 0.5 * scaleFactor1;
            ctx.moveTo(finalX1, finalY1);
            ctx.lineTo(finalX2, finalY2);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouse.active) {
          const mDistSq = Math.pow(finalX1 - mouse.x, 2) + Math.pow(finalY1 - mouse.y, 2);
          if (mDistSq < 25000) {
            const opacity = (1 - Math.sqrt(mDistSq) / 158) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(finalX1, finalY1);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Attract/Repel particles to mouse slightly if interactive
            if (interactiveMode) {
              const dx = mouse.x - finalX1;
              const dy = mouse.y - finalY1;
              p1.vx += dx * 0.0001;
              p1.vy += dy * 0.0001;
            }
          }
        }
      }

      // Draw nodes (glowing particles)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply motion vectors
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.z < -200 || p.z > 200) p.vz *= -1;

        // Soft Speed limit dampening
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vz *= 0.98;

        // Add ambient drift
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.vz += (Math.random() - 0.5) * 0.015;

        // 3D rotation projection transform
        const rotX = p.x - canvas.width / 2;
        const rotY = p.y - canvas.height / 2;
        const x3d = (rotX * cosTime - rotY * sinTime) + canvas.width / 2;
        const y3d = (rotX * sinTime + rotY * cosTime) + canvas.height / 2;

        const scaleFactor = 400 / (400 + p.z);
        const finalX = (x3d - canvas.width / 2) * scaleFactor + canvas.width / 2;
        const finalY = (y3d - canvas.height / 2) * scaleFactor + canvas.height / 2;
        const finalRadius = Math.max(0.2, p.radius * scaleFactor);

        // Particle Glow
        ctx.beginPath();
        ctx.arc(finalX, finalY, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, scaleFactor * 0.6);
        ctx.fill();

        if (p.radius > 2.0 && scaleFactor > 0.8) {
          ctx.beginPath();
          ctx.arc(finalX, finalY, finalRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.08 * scaleFactor;
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactiveMode]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-none block opacity-75" />
    </div>
  );
}
