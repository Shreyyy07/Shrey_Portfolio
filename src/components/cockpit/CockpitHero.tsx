import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, Circle, Cloud, Command, MapPin, Sparkles, Terminal, Zap,
} from "lucide-react";
import { CODING_STATS, PERSONAL_INFO, PROJECTS, SKILLS, STATS } from "@/lib/constants";
import { useCockpit } from "@/contexts/CockpitContext";
import { LiveClock } from "./LiveClock";
import { GithubHeatmap } from "./GithubHeatmap";
import { LiveFeed } from "./LiveFeed";
import { LanguageRadar } from "./LanguageRadar";

const ALL_SKILLS = Object.values(SKILLS).flat();

// ----------------------- Helpers -----------------------

function useRotator<T>(items: T[], delay = 2400): T {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), delay);
    return () => clearInterval(id);
  }, [items.length, delay]);
  return items[i];
}

function useCounter(target: number, decimals = 0, durationMs = 1600) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return { v: v.toFixed(decimals), ref };
}

// ----------------------- Sub-cards -----------------------

function StatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-foreground/10 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50">
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Available
      </span>
      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Chennai, IN</span>
      <span className="flex items-center gap-1.5"><Cloud className="h-3 w-3" /> 31°C · clear</span>
      <span className="ml-auto flex items-center gap-1.5"><LiveClock /></span>
    </div>
  );
}

function IdentityCard() {
  const role = useRotator(PERSONAL_INFO.rotatingKeywords, 2200);
  return (
    <div className="relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-7 lg:p-9">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/40">
          Identity · 01
        </span>
        <h1 className="font-serif-display mt-4 text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
          Shrey
          <br />
          <span className="font-light italic text-foreground/90">Joshi</span>
          <span className="ml-2 inline-block h-2 w-2 translate-y-[-12px] rounded-full bg-foreground/90" />
        </h1>
      </div>
      <div className="mt-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/35">Currently</div>
        <div key={role} className="mt-1 font-mono text-sm text-foreground/80 animate-in fade-in slide-in-from-bottom-1 duration-300">
          {role}
        </div>
      </div>
      <div className="font-serif-display pointer-events-none absolute -bottom-12 -right-6 select-none text-[18rem] italic leading-none text-foreground/[0.025]">
        S
      </div>
    </div>
  );
}

function MetricsCard() {
  const loc = useCounter(STATS.find((s) => s.label === "Lines of Code")!.value, 2);
  const cgpa = useCounter(STATS.find((s) => s.label === "CGPA")!.value, 2);
  const repos = useCounter(STATS.find((s) => s.label === "GitHub Repos")!.value, 0);
  const lc = useCounter(STATS.find((s) => s.label === "LeetCode Problems")!.value, 0);
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-foreground/10 bg-foreground/10">
      {[
        { l: "Lines of Code", v: loc.v, suf: "M+" },
        { l: "CGPA", v: cgpa.v, suf: "" },
        { l: "GitHub Repos", v: repos.v, suf: "" },
        { l: "LeetCode", v: lc.v, suf: "+" },
      ].map((m) => (
        <div key={m.l} className="bg-background p-5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/35">{m.l}</div>
          <div className="font-serif-display mt-2 text-3xl tabular-nums md:text-4xl">
            {m.v}
            <span className="text-foreground/50">{m.suf}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityCard() {
  const featured = PROJECTS.filter((p) => p.featured);
  const project = useRotator(featured, 3200);
  return (
    <div className="flex flex-col justify-between gap-4 border border-foreground/10 bg-foreground/[0.02] p-6">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span className="flex items-center gap-2"><Terminal className="h-3 w-3" /> commit · main</span>
        <span className="flex items-center gap-1.5">
          <Circle className="h-1.5 w-1.5 animate-pulse fill-amber-400 text-amber-400" />
          building
        </span>
      </div>
      <div key={project.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
        <div className="font-mono text-[11px] text-foreground/40">~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}</div>
        <div className="font-serif-display mt-1 text-2xl">{project.title}</div>
        <div className="mt-1 text-sm text-foreground/55">{project.tagline}</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-foreground/60">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function StackTicker() {
  // Doubled list for seamless infinite marquee
  const list = useMemo(() => [...ALL_SKILLS, ...ALL_SKILLS], []);
  return (
    <div className="relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] py-3">
      <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-4 font-mono text-[12px] text-foreground/55">
        {list.map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-center gap-3">
            <span className="text-foreground/25">·</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CTACard() {
  const { togglePalette } = useCockpit();
  return (
    <div className="flex flex-col justify-between gap-4 border border-foreground/10 bg-foreground/[0.02] p-6">
      <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Make a move</div>
      <div className="flex flex-col gap-2">
        <a href="#projects" className="group flex items-center justify-between bg-foreground px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:gap-1">
          View Work
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
        <a href={PERSONAL_INFO.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border border-foreground/15 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground/40">
          Download CV <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
        </a>
        <button onClick={togglePalette} className="flex items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground">
          <span className="flex items-center gap-2"><Command className="h-3.5 w-3.5" /> Command Palette</span>
          <kbd className="border border-foreground/15 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-foreground/50">⌘K</kbd>
        </button>
      </div>
    </div>
  );
}

// HeatmapCard removed — replaced by <GithubHeatmap /> with real contribution data.

function FocusCard() {
  return (
    <div className="flex flex-col justify-between gap-3 border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> now playing</span>
        <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-300" /> deep work</span>
      </div>
      <div>
        <div className="font-serif-display text-xl italic">building Vocalyst v2</div>
        <div className="mt-1 text-xs text-foreground/50">whisper · mediapipe · docker · next.js</div>
      </div>
      <div className="h-1 w-full overflow-hidden bg-foreground/10">
        <div className="h-full w-2/3 animate-pulse bg-foreground/60" />
      </div>
    </div>
  );
}

// ----------------------- Cockpit -----------------------

export function CockpitHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background pt-28 pb-12"
    >
      {/* dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / 7%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Status bar */}
        <div className="mb-6 border border-foreground/10 bg-foreground/[0.02]">
          <StatusBar />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-min">
          {/* Identity — large */}
          <div className="md:col-span-4 md:row-span-2">
            <IdentityCard />
          </div>

          {/* Metrics — top right */}
          <div className="md:col-span-2">
            <MetricsCard />
          </div>

          {/* Activity */}
          <div className="md:col-span-2">
            <ActivityCard />
          </div>

          {/* Live feed — real-time event ticker */}
          <div className="md:col-span-4">
            <LiveFeed />
          </div>

          {/* Stack ticker — full width */}
          <div className="md:col-span-6">
            <StackTicker />
          </div>

          {/* Language radar — large */}
          <div className="md:col-span-3 md:row-span-2">
            <LanguageRadar />
          </div>

          {/* GitHub heatmap */}
          <div className="md:col-span-3">
            <GithubHeatmap weeks={26} />
          </div>

          {/* Focus + CTA share the row */}
          <div className="md:col-span-2">
            <FocusCard />
          </div>
          <div className="md:col-span-1 md:col-start-6">
            <CTACard />
          </div>
        </div>


        {/* footer hint */}
        <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/35">
          <span>↓ scroll for the long form</span>
          <span>shrey-joshi · cockpit v1.0</span>
        </div>
      </div>
    </section>
  );
}
