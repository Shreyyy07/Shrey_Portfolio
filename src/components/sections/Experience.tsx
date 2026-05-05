import { EXPERIENCE } from "@/lib/constants";
import { Briefcase, MapPin } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="pointer-events-none absolute -left-60 top-1/2 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:block" />
          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.id} onView direction={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
                <div className="relative md:pl-16">
                  <div className="absolute left-4 top-2 hidden h-5 w-5 rounded-full border-2 border-primary bg-background md:block" />
                  <div className="glass-card rounded-2xl p-6 transition-all hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)]">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {exp.duration}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        {exp.type}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">{exp.position}</h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {exp.location}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
