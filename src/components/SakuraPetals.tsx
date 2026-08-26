import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
}

export const SakuraPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    const isMobile = window.innerWidth < 768;

    // Viewport-based dimensions (much faster & zero memory bloat compared to full document height)
    const updateDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateDimensions();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };

    window.addEventListener('resize', handleResize);

    // Optimized petal colors
    const petalColors = [
      'rgba(235, 25, 35, 0.75)',
      'rgba(255, 45, 55, 0.85)',
      'rgba(190, 15, 25, 0.7)',
      'rgba(255, 75, 75, 0.8)',
      'rgba(160, 10, 20, 0.65)',
    ];

    let width = canvas.width;
    let height = canvas.height;

    // Mobile: 16 petals for max FPS / battery efficiency. Desktop: 36 petals
    const petalCount = isMobile ? 16 : 36;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 3,
        speedX: Math.random() * 0.7 - 0.2,
        speedY: Math.random() * 0.9 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.0,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.4 + 0.4,
        color: petalColors[i % petalColors.length],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(1, Math.sin(p.flip));

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, p.size / 2);
      ctx.bezierCurveTo(p.size, p.size, p.size / 2, p.size * 1.2, 0, p.size);
      ctx.bezierCurveTo(-p.size / 2, p.size * 1.2, -p.size, p.size, -p.size, p.size / 2);
      ctx.bezierCurveTo(-p.size, -p.size / 4, -p.size / 2, -p.size / 2, 0, 0);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      
      // Only use shadow on high-performance desktop displays
      if (!isMobile) {
        ctx.shadowColor = 'rgba(255, 30, 30, 0.4)';
        ctx.shadowBlur = 3;
      }
      
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (!isRunning) return;

      width = canvas.width;
      height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.speedX + Math.sin(p.y * 0.004) * 0.35;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 15) {
          p.y = -15;
          p.x = Math.random() * width;
        }
        if (p.x > width + 15) {
          p.x = -15;
        } else if (p.x < -15) {
          p.x = width + 15;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause animation when tab or screen is backgrounded to save mobile CPU/battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full transform-gpu"
      style={{ opacity: 0.85 }}
    />
  );
};
