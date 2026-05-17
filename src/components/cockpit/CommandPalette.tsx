import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCockpit } from "@/contexts/CockpitContext";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import {
  ArrowRight, BookOpen, Briefcase, Code2, Copy, Download, FolderGit2, Home,
  Mail, Search, Sparkles, Star, ToggleRight, User2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Modes";
  icon: LucideIcon;
  run: () => void;
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/about": User2,
  "/skills": Code2,
  "/experience": Briefcase,
  "/projects": FolderGit2,
  "/achievements": Star,
  "/brand": Sparkles,
  "/blog": BookOpen,
  "/contact": Mail,
};

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, recruiterMode, setRecruiterMode } = useCockpit();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open
  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  const goto = (to: string) => {
    setPaletteOpen(false);
    navigate({ to });
  };

  const actions: Action[] = useMemo(
    () => [
      ...NAV_LINKS.map((l) => ({
        id: `nav:${l.to}`,
        label: `Go to ${l.label}`,
        group: "Navigate" as const,
        icon: SECTION_ICONS[l.to] ?? ArrowRight,
        run: () => goto(l.to),
      })),
      {
        id: "act:resume",
        label: "Download résumé",
        hint: "PDF",
        group: "Actions",
        icon: Download,
        run: () => { window.open(PERSONAL_INFO.resume, "_blank"); setPaletteOpen(false); },
      },
      {
        id: "act:email",
        label: "Copy email address",
        hint: PERSONAL_INFO.email,
        group: "Actions",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(PERSONAL_INFO.email);
          setPaletteOpen(false);
        },
      },
      {
        id: "act:github",
        label: "Open GitHub",
        group: "Actions",
        icon: FolderGit2,
        run: () => { window.open(PERSONAL_INFO.social.github, "_blank"); setPaletteOpen(false); },
      },
      {
        id: "mode:recruiter",
        label: recruiterMode ? "Disable Recruiter Mode" : "Enable Recruiter Mode",
        hint: "Re-skin to a clean classic résumé",
        group: "Modes",
        icon: ToggleRight,
        run: () => { setRecruiterMode(!recruiterMode); setPaletteOpen(false); },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recruiterMode],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q) || a.hint?.toLowerCase().includes(q));
  }, [actions, query]);

  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = {};
    filtered.forEach((a) => {
      g[a.group] = g[a.group] ?? [];
      g[a.group].push(a);
    });
    return g;
  }, [filtered]);

  // Keyboard nav inside palette
  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, filtered, active]);

  if (!paletteOpen) return null;

  let runningIndex = -1;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setPaletteOpen(false)}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden border border-foreground/15 bg-[#0d0d0d] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
          <Search className="h-4 w-4 text-foreground/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Type a command or search…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/30"
          />
          <kbd className="border border-foreground/15 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-foreground/40">
            esc
          </kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto py-2">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-1">
              <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/35">
                {group}
              </div>
              {items.map((a) => {
                runningIndex += 1;
                const isActive = runningIndex === active;
                return (
                  <button
                    key={a.id}
                    onClick={() => a.run()}
                    onMouseEnter={() => setActive(runningIndex)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive ? "bg-foreground/8 text-foreground" : "text-foreground/70"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <a.icon className="h-4 w-4 opacity-70" />
                      {a.label}
                    </span>
                    {a.hint && <span className="text-[11px] text-foreground/40">{a.hint}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-foreground/40">No matches.</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-foreground/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-foreground/35">
          <span>↑ ↓ navigate · ↵ run</span>
          <span>⌘ K</span>
        </div>
      </div>
    </div>
  );
}
