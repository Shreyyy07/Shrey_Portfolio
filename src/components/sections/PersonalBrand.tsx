import { ArrowUpRight, BookOpen, Camera, Sparkles } from "lucide-react";

const BRAND = {
  handle: "learn.with.Shrey",
  tagline: "Breaking down complex concepts with clarity and context.",
  philosophy:
    "Most tutorials teach how. I teach why. Every piece starts with the problem a technology was built to solve — so the solution feels natural, not memorized.",
  medium: "https://medium.com/@learnwithshrey",
  instagram: "https://www.instagram.com/learn.with.shrey/",
};

const TOPICS = [
  "APIs", "Webhooks", "Auth", "HTTP", "CORS", "Middleware",
  "Docker", "Git", "GraphQL", "DevOps", "Linux", "System Design",
];

export function PersonalBrand() {
  return (
    <section id="brand" className="relative w-full bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 flex items-end justify-between border-b border-foreground/10 pb-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/40">
              Personal Brand · 07
            </div>
            <h2 className="font-serif-display mt-3 text-4xl md:text-5xl">
              learn<span className="text-foreground/40">.</span>with
              <span className="text-foreground/40">.</span>
              <span className="italic">Shrey</span>
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/45 md:block">
            why before how
          </div>
        </div>

        {/* Manifesto */}
        <div className="grid gap-4 md:grid-cols-6">
          <div className="md:col-span-4 border border-foreground/10 bg-foreground/[0.02] p-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              <Sparkles className="h-3 w-3" /> manifesto
            </div>
            <p className="font-serif-display mt-4 text-2xl leading-snug italic text-foreground/90 md:text-3xl">
              "{BRAND.tagline}"
            </p>
            <p className="mt-5 text-sm leading-relaxed text-foreground/65 md:text-base">
              {BRAND.philosophy}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="border border-foreground/10 p-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Instagram</div>
                <div className="mt-1 text-sm text-foreground/80">Creates the curiosity.</div>
                <div className="mt-0.5 font-mono text-[11px] text-foreground/45">30–60s reels · hook + problem + insight</div>
              </div>
              <div className="border border-foreground/10 p-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Medium</div>
                <div className="mt-1 text-sm text-foreground/80">Satisfies it, in depth.</div>
                <div className="mt-0.5 font-mono text-[11px] text-foreground/45">long-form · problem → alternatives → mental model</div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="md:col-span-2 grid gap-4">
            <a
              href={BRAND.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:bg-foreground/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  <BookOpen className="h-3 w-3" /> the blog
                </div>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="mt-6">
                <div className="font-serif-display text-2xl">Medium</div>
                <div className="mt-1 font-mono text-[11px] text-foreground/55">@learnwithshrey</div>
                <div className="mt-3 text-xs text-foreground/55">Full articles. Built layer by layer until the concept clicks.</div>
              </div>
            </a>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:bg-foreground/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  <Camera className="h-3 w-3" /> the reels
                </div>
                <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="mt-6">
                <div className="font-serif-display text-2xl">Instagram</div>
                <div className="mt-1 font-mono text-[11px] text-foreground/55">@learn.with.shrey</div>
                <div className="mt-3 text-xs text-foreground/55">Short reels. Entry points that make the hard stuff feel approachable.</div>
              </div>
            </a>
          </div>

          {/* Topics ribbon */}
          <div className="md:col-span-6 border border-foreground/10 bg-foreground/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">Topics in rotation</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <span
                  key={t}
                  className="border border-foreground/10 px-3 py-1 font-mono text-[11px] text-foreground/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
