import { useEffect, useRef } from "react";

/**
 * Global click effect inspired by graphifylabs.ai —
 * radiating node + line burst from the click point.
 * Renders on a fixed canvas above all content but ignores pointer events.
 */
type Burst = {
  x: number;
  y: number;
  t0: number;
  rays: { angle: number; length: number; speed: number }[];
};

export function ClickBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef<Burst[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      const count = 4;
      const rays = Array.from({ length: count }).map((_, i) => ({
        angle: (i / count) * Math.PI * 2 + Math.random() * 0.3,
        length: 28 + Math.random() * 18,
        speed: 0.9 + Math.random() * 0.2,
      }));
      burstsRef.current.push({ x: e.clientX, y: e.clientY, t0: performance.now(), rays });
    };
    window.addEventListener("click", onClick);

    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const LIFE = 600;
      burstsRef.current = burstsRef.current.filter((b) => now - b.t0 < LIFE);

      for (const b of burstsRef.current) {
        const age = (now - b.t0) / LIFE;
        const ease = 1 - Math.pow(1 - age, 3);
        const alpha = 1 - age;

        ctx.lineWidth = 1;
        for (const r of b.rays) {
          const len = r.length * ease * r.speed;
          const ex = b.x + Math.cos(r.angle) * len;
          const ey = b.y + Math.sin(r.angle) * len;

          ctx.strokeStyle = `rgba(255,255,255,${0.35 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          ctx.fillStyle = `rgba(255,255,255,${0.7 * alpha})`;
          ctx.beginPath();
          ctx.arc(ex, ey, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255,255,255,${0.8 * alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
