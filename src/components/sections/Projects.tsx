import { PROJECTS } from "@/lib/constants";
import { GitBranch, ExternalLink } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const other = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24">
      <div className="pointer-events-none absolute -right-60 bottom-0 h-80 w-80 rounded-full bg-purple/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {featured.map((project, i) => (
            <FadeIn key={project.id} onView delay={i * 150}>
              <div className="glass-card group rounded-2xl p-6 transition-all hover:shadow-[0_0_25px_oklch(0.55_0.2_290/20%)]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {project.date}
                  </span>
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary">
                    Featured
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{project.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span key={f} className="rounded-full border border-glass-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <GitBranch className="h-4 w-4" /> Code
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {other.map((project, i) => (
            <FadeIn key={project.id} onView delay={i * 100}>
              <div className="glass-card group rounded-2xl p-5 transition-all hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)]">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.date}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="mt-1 text-xs text-primary">{project.tagline}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
