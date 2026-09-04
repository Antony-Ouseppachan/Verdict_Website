import React, { useEffect, useRef } from 'react';

export const CyberBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string;
      pulseSpeed: number;
      pulsePhase: number;
      isThreatNode: boolean;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isThreatNode = Math.random() < 0.12;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        baseColor: isThreatNode ? '239, 68, 68' : Math.random() < 0.3 ? '6, 182, 212' : '16, 185, 129',
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        isThreatNode,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let tick = 0;
    const render = () => {
      tick += 1;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle radial dark gradient follow mouse
      const radialGrad = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, Math.max(width, height) * 0.75);
      radialGrad.addColorStop(0, 'rgba(16, 185, 129, 0.025)');
      radialGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.01)');
      radialGrad.addColorStop(1, 'rgba(6, 8, 13, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = 0.3 + Math.sin(p.pulsePhase) * 0.25;

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor}, ${currentAlpha * 0.25})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor}, ${currentAlpha + 0.3})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
