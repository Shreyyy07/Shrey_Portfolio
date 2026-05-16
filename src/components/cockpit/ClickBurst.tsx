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
      // Skip clicks on interactive elements that need their own feedback (still allow burst).
      const rays = Array.from({ length: 7 + Math.floor(Math.random() * 4) }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        length: 120 + Math.random() * 180,
        speed: 0.9 + Math.random() * 0.6,
      }));
      burstsRef.current.push({ x: e.clientX, y: e.clientY, t0: performance.now(), rays });
    };
    window.addEventListener("click", onClick);

    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      burstsRef.current = burstsRef.current.filter((b) => now - b.t0 < 1400);

      for (const b of burstsRef.current) {
        const age = (now - b.t0) / 1400; // 0 → 1
        const ease = 1 - Math.pow(1 - age, 3);
        const alpha = 1 - age;

        // Core glow
        const coreR = 4 + age * 22;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, coreR * 3);
        grad.addColorStop(0, `rgba(255,255,255,${0.7 * alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, coreR * 3, 0, Math.PI * 2);
        ctx.fill();

        // Rays + nodes
        ctx.lineWidth = 1;
        for (const r of b.rays) {
          const len = r.length * ease * r.speed;
          const ex = b.x + Math.cos(r.angle) * len;
          const ey = b.y + Math.sin(r.angle) * len;

          ctx.strokeStyle = `rgba(255,255,255,${0.45 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Node at the tip
          ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
          ctx.beginPath();
          ctx.arc(ex, ey, 2.4, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring on node
          ctx.strokeStyle = `rgba(255,255,255,${0.3 * alpha})`;
          ctx.beginPath();
          ctx.arc(ex, ey, 5 + age * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Expanding ring
        ctx.strokeStyle = `rgba(255,255,255,${0.25 * alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 20 + ease * 90, 0, Math.PI * 2);
        ctx.stroke();
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
