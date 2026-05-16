import { useEffect, useRef, useState } from "react";
import { Radio } from "lucide-react";

/**
 * Real-time event ticker — simulates a live activity feed updating as new
 * "events" arrive. Gives the cockpit a true real-time dashboard feel.
 */
const SOURCES = [
  { tag: "git", verb: "push", target: "vocalyst/main", suffix: "+128 -34" },
  { tag: "deploy", verb: "ship", target: "vocalyst-api v2.4.1", suffix: "200 OK · 312ms" },
  { tag: "leet", verb: "solve", target: "1268. Search Suggestions", suffix: "trie · O(n)" },
  { tag: "docker", verb: "build", target: "tayyari-ai:edge", suffix: "1.2GB · 84s" },
  { tag: "ci", verb: "pass", target: "two-tier-app#218", suffix: "12 checks ✓" },
  { tag: "study", verb: "note", target: "Designing Data-Intensive Apps", suffix: "ch.7 · transactions" },
  { tag: "git", verb: "merge", target: "feat/realtime-cockpit → main", suffix: "no conflicts" },
  { tag: "ai", verb: "infer", target: "whisper-large-v3", suffix: "rt-factor 0.18" },
  { tag: "open-src", verb: "PR", target: "shadcn-ui#4421", suffix: "merged" },
  { tag: "design", verb: "iter", target: "portfolio · v9", suffix: "+radar +burst" },
];

const COLORS: Record<string, string> = {
  git: "text-emerald-300",
  deploy: "text-sky-300",
  leet: "text-amber-300",
  docker: "text-cyan-300",
  ci: "text-violet-300",
  study: "text-rose-300",
  ai: "text-fuchsia-300",
  "open-src": "text-lime-300",
  design: "text-orange-300",
};

type Event = { id: number; t: string; tag: string; verb: string; target: string; suffix: string };

function nowStamp() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}

export function LiveFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    // Seed with a couple of events so it doesn't load empty
    const seed: Event[] = Array.from({ length: 3 }).map(() => {
      const s = SOURCES[Math.floor(Math.random() * SOURCES.length)];
      return { id: idRef.current++, t: nowStamp(), ...s };
    });
    setEvents(seed);

    const id = setInterval(() => {
      const s = SOURCES[Math.floor(Math.random() * SOURCES.length)];
      setEvents((prev) => [{ id: idRef.current++, t: nowStamp(), ...s }, ...prev].slice(0, 6));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span className="flex items-center gap-2">
          <Radio className="h-3 w-3 animate-pulse text-emerald-400" /> live · /events
        </span>
        <span className="font-mono text-foreground/55">{events.length}/6</span>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5 font-mono text-[11.5px]">
        {events.map((e, i) => (
          <li
            key={e.id}
            className={`flex items-baseline gap-3 transition-opacity duration-500 ${i === 0 ? "animate-in fade-in slide-in-from-top-1" : ""}`}
            style={{ opacity: 1 - i * 0.13 }}
          >
            <span className="tabular-nums text-foreground/30">{e.t}</span>
            <span className={`min-w-[60px] uppercase tracking-wider ${COLORS[e.tag] ?? "text-foreground/60"}`}>
              {e.tag}
            </span>
            <span className="text-foreground/55">{e.verb}</span>
            <span className="truncate text-foreground/85">{e.target}</span>
            <span className="ml-auto hidden text-foreground/35 md:inline">{e.suffix}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
