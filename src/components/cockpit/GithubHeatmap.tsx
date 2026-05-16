import { useEffect, useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

/**
 * Real GitHub contributions heatmap (last ~26 weeks).
 * Uses the free github-contributions API. Falls back to deterministic
 * pseudo-data if the request fails (offline / rate-limited).
 */
type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const USERNAME = (PERSONAL_INFO.social.github.split("/").filter(Boolean).pop() || "Shreyyy07").trim();

function fallback(weeks: number): Contribution[] {
  const out: Contribution[] = [];
  let seed = 11;
  const today = new Date();
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const lvl = r < 0.4 ? 0 : r < 0.65 ? 1 : r < 0.85 ? 2 : r < 0.96 ? 3 : 4;
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push({ date: d.toISOString().slice(0, 10), count: lvl * 3, level: lvl as 0 | 1 | 2 | 3 | 4 });
  }
  return out;
}

const LEVEL_BG = ["bg-foreground/[0.06]", "bg-foreground/20", "bg-foreground/40", "bg-foreground/65", "bg-foreground/90"];

export function GithubHeatmap({ weeks = 26 }: { weeks?: number }) {
  const [data, setData] = useState<Contribution[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((json: { contributions: Contribution[] }) => {
        if (cancelled) return;
        const tail = json.contributions.slice(-weeks * 7);
        setData(tail);
      })
      .catch(() => {
        if (!cancelled) {
          setData(fallback(weeks));
          setError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [weeks]);

  const { grid, total, streak } = useMemo(() => {
    const d = data ?? fallback(weeks);
    const cols: Contribution[][] = [];
    for (let i = 0; i < d.length; i += 7) cols.push(d.slice(i, i + 7));
    const total = d.reduce((s, x) => s + x.count, 0);
    let streak = 0;
    for (let i = d.length - 1; i >= 0; i--) {
      if (d[i].count > 0) streak++;
      else break;
    }
    return { grid: cols, total, streak };
  }, [data, weeks]);

  return (
    <div className="border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span className="flex items-center gap-2">
          <FolderGit2 className="h-3 w-3" /> github · @{USERNAME}
        </span>
        <span className="font-mono text-foreground/55">{weeks}w</span>
      </div>

      <div className="mt-4 flex gap-[3px] overflow-hidden">
        {grid.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((cell, ri) => (
              <span
                key={ri}
                title={`${cell.date}: ${cell.count} contributions`}
                className={`h-[10px] w-[10px] rounded-[2px] transition-colors ${LEVEL_BG[cell.level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/45">
        <div className="flex gap-4">
          <span>
            <span className="font-mono text-foreground/80">{total}</span> commits
          </span>
          <span>
            <span className="font-mono text-foreground/80">{streak}d</span> streak
          </span>
          {error && <span className="text-amber-300/70">offline · sample</span>}
        </div>
        <div className="flex items-center gap-1">
          <span>less</span>
          {LEVEL_BG.map((c, i) => (
            <span key={i} className={`h-2 w-2 ${c}`} />
          ))}
          <span>more</span>
        </div>
      </div>
    </div>
  );
}
