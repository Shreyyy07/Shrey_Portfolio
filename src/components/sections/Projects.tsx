import { PROJECTS } from "@/lib/constants";
import { GitBranch, ExternalLink, Sparkles, ArrowRight, Terminal, X, Network, Play } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Project = typeof PROJECTS[0];

// Unique gradient mesh per project id
const PROJECT_STYLES: Record<number, { mesh: string; glow: string; accent: string; tag: string }> = {
  1: { mesh: "from-violet-500/20 via-cyan-500/10 to-transparent",  glow: "rgba(139,92,246,0.3)",  accent: "#a78bfa", tag: "AI · Multimodal" },
  2: { mesh: "from-rose-500/20 via-pink-500/10 to-transparent",     glow: "rgba(244,63,94,0.3)",   accent: "#fb7185", tag: "AI · Recruitment" },
  3: { mesh: "from-emerald-500/20 via-teal-500/10 to-transparent",  glow: "rgba(52,211,153,0.3)",  accent: "#34d399", tag: "AI · EdTech" },
  4: { mesh: "from-orange-500/20 via-amber-500/10 to-transparent",  glow: "rgba(249,115,22,0.3)",  accent: "#fb923c", tag: "DevOps · Cloud" },
};

// ─── Architecture Diagram Lightbox ─────────────────────────────────────────
function ArchModal({ project, accent, onClose }: { project: Project; accent: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-w-4xl w-full rounded-2xl border overflow-hidden"
        style={{ borderColor: `${accent}40`, background: "rgba(0,0,0,0.95)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: `${accent}20` }}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2" style={{ background: `${accent}15` }}>
              <Network className="h-4 w-4" style={{ color: accent }} />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-white">{project.title}</p>
              <p className="text-xs text-white/40">Architecture Overview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* Diagram */}
        <div className="p-6">
          <img
            src={(project as any).arch}
            alt={`${project.title} architecture`}
            className="w-full h-auto rounded-xl object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured project card ──────────────────────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const style = PROJECT_STYLES[project.id] ?? PROJECT_STYLES[1];
  const [archOpen, setArchOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <>
      <AnimatePresence>
        {archOpen && (project as any).arch && (
          <ArchModal project={project} accent={style.accent} onClose={() => setArchOpen(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "none" }}
        onHoverStart={(e) => {
          const el = (e.target as HTMLElement).closest?.(".group") as HTMLElement | null;
          if (el) el.style.boxShadow = `0 0 80px ${style.glow}`;
        }}
        onHoverEnd={(e) => {
          const el = (e.target as HTMLElement).closest?.(".group") as HTMLElement | null;
          if (el) el.style.boxShadow = "none";
        }}
      >
        {/* Gradient mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.mesh} opacity-60`} />
        {/* Corner number */}
        <div className="absolute top-6 right-6 font-mono text-6xl font-black opacity-[0.04] select-none" style={{ color: style.accent }}>
          0{index + 1}
        </div>

        <div className={`relative z-10 grid gap-8 p-8 md:p-10 lg:grid-cols-2 lg:gap-12 ${isEven ? "" : "lg:grid-flow-dense"}`}>
          {/* Info panel */}
          <div className={`flex flex-col justify-center ${isEven ? "" : "lg:col-start-2"}`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ background: `${style.accent}18`, color: style.accent, border: `1px solid ${style.accent}35` }}
              >
                <Sparkles className="h-2.5 w-2.5" /> Featured
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                {style.tag}
              </span>
              <span className="ml-auto font-mono text-xs text-white/30">{project.date}</span>
            </div>

            <h3 className="font-heading text-3xl font-black text-white md:text-4xl">{project.title}</h3>
            <p className="mt-2 text-base font-semibold" style={{ color: style.accent }}>{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{project.description}</p>

            {/* Feature list */}
            <div className="mt-6 space-y-2">
              {project.features.map((feat, fi) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: fi * 0.07 }}
                  className="flex items-center gap-3 text-sm text-white/70"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: style.accent, boxShadow: `0 0 8px ${style.accent}` }} />
                  {feat}
                </motion.div>
              ))}
            </div>

            {/* Tech chips */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: `${style.accent}15`, color: style.accent, border: `1px solid ${style.accent}30` }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40"
              >
                <GitBranch className="h-4 w-4" /> View Code
              </a>
              {(project as any).live && (
                <a
                  href={(project as any).live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${style.accent}, ${style.accent}aa)`, color: "#000", boxShadow: `0 4px 20px ${style.glow}` }}
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
              {(project as any).arch && (
                <button
                  onClick={() => setArchOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90"
                  style={{ borderColor: `${style.accent}50`, color: style.accent, background: `${style.accent}10` }}
                >
                  <Network className="h-4 w-4" /> Architecture
                </button>
              )}
            </div>
          </div>

          {/* GIF Preview panel */}
          <div className={`flex items-center ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl border"
              style={{ borderColor: `${style.accent}25` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Browser chrome top bar */}
              <div className="flex items-center gap-2 border-b px-4 py-3 bg-black/60" style={{ borderColor: `${style.accent}20` }}>
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="mx-auto rounded-md border border-white/10 bg-white/5 px-4 py-0.5 font-mono text-[10px] text-white/30">
                  {project.title.toLowerCase().replace(/\s+/g, "-")}.vercel.app
                </span>
              </div>

              {(project as any).preview ? (
                <a href={(project as any).live ?? project.github} target="_blank" rel="noopener noreferrer" className="group/gif block">
                  <div className="relative">
                    <img
                      src={(project as any).preview}
                      alt={`${project.title} preview`}
                      className="w-full object-cover"
                      style={{ maxHeight: "320px" }}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover/gif:bg-black/30">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover/gif:opacity-100 border border-white/20">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                /* No gif — show arch diagram or terminal placeholder */
                <div className="flex items-center justify-center bg-black/50 p-6" style={{ minHeight: "240px" }}>
                  {(project as any).arch ? (
                    <img src={(project as any).arch} alt="Architecture" className="w-full max-h-[240px] object-contain rounded-lg opacity-80" />
                  ) : (
                    <div className="text-center text-white/20">
                      <Terminal className="mx-auto h-12 w-12 mb-2" />
                      <p className="text-sm font-mono">No preview available</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Secondary project card ─────────────────────────────────────────────────
function SecondaryCard({ project }: { project: Project }) {
  const style = PROJECT_STYLES[project.id] ?? PROJECT_STYLES[3];
  const [archOpen, setArchOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {archOpen && (project as any).arch && (
          <ArchModal project={project} accent={style.accent} onClose={() => setArchOpen(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle mesh on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.mesh} opacity-0 transition-opacity duration-300 group-hover:opacity-40`} />

        {/* GIF / Arch preview thumbnail */}
        {((project as any).preview || (project as any).arch) && (
          <div className="relative overflow-hidden" style={{ height: "160px" }}>
            <img
              src={(project as any).preview ?? (project as any).arch}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)` }} />
            {/* Play button if has gif */}
            {(project as any).preview && (
              <a href={(project as any).live ?? project.github} target="_blank" rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                  <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
                </div>
              </a>
            )}
          </div>
        )}

        <div className="relative z-10 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: `${style.accent}15`, color: style.accent }}>
              {style.tag}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-white/30">{project.date}</span>
              {(project as any).arch && (
                <button onClick={() => setArchOpen(true)} className="text-white/30 hover:text-white transition-colors" title="View Architecture">
                  <Network className="h-3.5 w-3.5" />
                </button>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <h3 className="font-heading text-xl font-bold text-white">{project.title}</h3>
          <p className="mt-1 text-xs font-semibold" style={{ color: style.accent }}>{project.tagline}</p>
          <p className="mt-2 text-sm text-white/50 line-clamp-2">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded px-2 py-0.5 text-[10px] font-medium"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────
export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const other = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Global ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeIn onView>
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">
              <Sparkles className="h-3 w-3" /> Selected Work
            </div>
            <h2 className="font-heading text-4xl font-bold md:text-6xl">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-secondary to-transparent" />
          </div>
        </FadeIn>

        {/* Featured */}
        <div className="mb-20 space-y-10">
          {featured.map((project, i) => (
            <FadeIn key={project.id} onView delay={i * 150}>
              <FeaturedCard project={project} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* More Projects */}
        <FadeIn onView>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-white/5 p-2">
                <GitBranch className="h-5 w-5 text-white/50" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">More Projects</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          {other.map((project, i) => (
            <FadeIn key={project.id} onView delay={i * 100}>
              <SecondaryCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
