import { SKILLS } from "@/lib/constants";
import { FadeIn, useAnimateOnView } from "@/hooks/use-animations";
import { Code2, Database, Layout, Server, Wrench, Cloud } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="h-6 w-6" />,
  "Frontend": <Layout className="h-6 w-6" />,
  "Backend": <Server className="h-6 w-6" />,
  "Databases": <Database className="h-6 w-6" />,
  "DevOps & Cloud": <Cloud className="h-6 w-6" />,
  "Tools & Platforms": <Wrench className="h-6 w-6" />,
};

export function Skills() {
  const { ref, visible } = useAnimateOnView();

  return (
    <section id="skills" className="relative py-24">
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A comprehensive overview of the technologies, frameworks, and tools I use to build robust, scalable, and high-performance applications.
            </p>
            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILLS).map(([category, items], idx) => (
            <div
              key={category}
              className={`glass-card group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.82_0.15_195/15%)] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${idx * 100}ms` : "0ms" }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                  {categoryIcons[category] || <Code2 className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-md border border-foreground/10 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground/80 shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
