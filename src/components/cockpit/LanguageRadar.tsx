import { useEffect, useMemo, useState } from "react";

/**
 * Radar chart of language / format proficiency.
 * Two overlapping polygons: primary stack (white) + content stack (muted),
 * inspired by the user's reference screenshot.
 */
type Axis = { label: string; value: number; group: "code" | "content" };

const AXES: Axis[] = [
  { label: "TS/JS", value: 0.95, group: "code" },
  { label: "Python", value: 0.9, group: "code" },
  { label: "C/C++", value: 0.85, group: "code" },
  { label: "Java", value: 0.55, group: "code" },
  { label: "Go", value: 0.35, group: "code" },
  { label: "Rust", value: 0.25, group: "code" },
  { label: "SQL", value: 0.8, group: "code" },
  { label: "Bash", value: 0.7, group: "code" },
  { label: "Docker", value: 0.85, group: "content" },
  { label: "React", value: 0.95, group: "content" },
  { label: "Next.js", value: 0.9, group: "content" },
  { label: "Flask", value: 0.75, group: "content" },
  { label: "FastAPI", value: 0.7, group: "content" },
  { label: "Mongo", value: 0.65, group: "content" },
  { label: "Postgres", value: 0.7, group: "content" },
  { label: "AWS", value: 0.6, group: "content" },
];

function polar(cx: number, cy: number, r: number, angle: number) {
  return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r] as const;
}

export function LanguageRadar() {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 130;
  const rings = 4;
  const n = AXES.length;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const points = useMemo(() => {
    return AXES.map((a, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const [x, y] = polar(cx, cy, radius * a.value * progress, angle);
      const [lx, ly] = polar(cx, cy, radius + 22, angle);
      return { ...a, angle, x, y, lx, ly };
    });
  }, [progress, n]);

  const polyFor = (group: "code" | "content") =>
    points
      .map((p) => {
        const angle = p.angle;
        const isOn = p.group === group;
        const r = radius * (isOn ? p.value : 0.05) * progress;
        const [x, y] = polar(cx, cy, r, angle);
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div className="flex flex-col gap-3 border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span>// stack.surface</span>
        <span className="font-mono text-foreground/55">{AXES.length} axes</span>
      </div>

      <div className="flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-[320px] w-full max-w-[360px]">
          {/* Concentric rings */}
          {Array.from({ length: rings }).map((_, i) => {
            const r = (radius / rings) * (i + 1);
            const poly = Array.from({ length: n })
              .map((_, j) => {
                const a = (j / n) * Math.PI * 2 - Math.PI / 2;
                const [x, y] = polar(cx, cy, r, a);
                return `${x},${y}`;
              })
              .join(" ");
            return (
              <polygon
                key={i}
                points={poly}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={1}
              />
            );
          })}

          {/* Spokes */}
          {points.map((p, i) => {
            const [x, y] = polar(cx, cy, radius, p.angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.08}
              />
            );
          })}

          {/* Content polygon (muted, dashed) */}
          <polygon
            points={polyFor("content")}
            fill="currentColor"
            fillOpacity={0.05}
            stroke="currentColor"
            strokeOpacity={0.55}
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          {/* Code polygon (solid white) */}
          <polygon
            points={polyFor("code")}
            fill="currentColor"
            fillOpacity={0.12}
            stroke="currentColor"
            strokeOpacity={0.9}
            strokeWidth={1.25}
          />

          {/* Points + labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={2.4} fill="currentColor" fillOpacity={0.9} />
              <text
                x={p.lx}
                y={p.ly}
                fill="currentColor"
                fillOpacity={0.55}
                fontSize={9}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing="0.08em"
              >
                {p.label.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r={2} fill="currentColor" fillOpacity={0.9} />
        </svg>
      </div>

      <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-foreground/45">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[6px] w-3 bg-foreground/80" /> code
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-[6px] w-3 border border-foreground/50"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px)" }}
          />{" "}
          stack
        </span>
      </div>
    </div>
  );
}
