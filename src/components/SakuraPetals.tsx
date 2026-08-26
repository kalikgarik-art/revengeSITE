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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const updateDimensions = () => {
      if (!canvas) return;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 2
      );
      canvas.width = window.innerWidth;
      canvas.height = docHeight;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Array of dark red, crimson, and neon-tinged rose petals
    const petalColors = [
      'rgba(235, 25, 35, 0.75)',
      'rgba(255, 45, 55, 0.85)',
      'rgba(190, 15, 25, 0.7)',
      'rgba(255, 80, 80, 0.8)',
      'rgba(150, 8, 18, 0.65)',
    ];

    let width = canvas.width;
    let height = canvas.height;

    // Smaller petals as requested (size 3 - 7px) and distributed across the whole document
    const petalCount = Math.min(Math.floor((width * height) / 38000), 90);
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 3.5, // Smaller delicate petals
        speedX: Math.random() * 0.9 - 0.2,
        speedY: Math.random() * 1.1 + 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        flip: Math.random(),
        flipSpeed: Math.random() * 0.025 + 0.01,
        opacity: Math.random() * 0.5 + 0.35,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(1, Math.sin(p.flip));

      ctx.beginPath();
      // Delicate organic curved petal path
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, p.size / 2);
      ctx.bezierCurveTo(p.size, p.size, p.size / 2, p.size * 1.2, 0, p.size);
      ctx.bezierCurveTo(-p.size / 2, p.size * 1.2, -p.size, p.size, -p.size, p.size / 2);
      ctx.bezierCurveTo(-p.size, -p.size / 4, -p.size / 2, -p.size / 2, 0, 0);
      ctx.closePath();

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = 'rgba(255, 30, 30, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      width = canvas.width;
      height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.speedX + Math.sin(p.y * 0.003) * 0.4;
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

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none z-10 w-full"
      style={{ opacity: 0.88 }}
    />
  );
};
