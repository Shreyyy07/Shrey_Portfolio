import { useRef } from "react";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase, MapPin, ExternalLink, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-heading text-4xl font-bold md:text-5xl">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-transparent" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <motion.div 
            style={{ height }}
            className="absolute left-6 md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-primary to-transparent -translate-x-1/2 rounded-full" 
          />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={exp.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center z-20 shadow-[0_0_15px_oklch(0.82_0.15_195/50%)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-full md:w-1/2 pl-16 pr-0 md:px-10"
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background/50 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-[0_0_30px_oklch(0.82_0.15_195/15%)] hover:-translate-y-1">
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* ALWAYS LEFT ALIGNED CONTENT */}
                      <div className="relative z-10 flex flex-col items-start text-left">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Calendar className="w-3 h-3" /> {exp.duration}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            {exp.type}
                          </span>
                        </div>
                        
                        <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.position}</h3>
                        
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground justify-start">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" /> {exp.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {exp.location}
                          </span>
                        </div>
                        
                        <ul className="mt-5 space-y-2 text-sm text-foreground/70 text-left">
                          {exp.responsibilities.map((r, j) => (
                            <li key={j} className="flex items-start gap-2 flex-row">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                              <span className="flex-1">{r}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 flex flex-wrap gap-2 justify-start">
                          {exp.tech.map((t) => (
                            <span key={t} className="rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                              {t}
                            </span>
                          ))}
                        </div>
                        
                        {/* @ts-ignore */}
                        {exp.certificate && (
                          <div className="mt-6 flex w-full justify-start">
                            <a
                              href={exp.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-background hover:shadow-[0_0_15px_oklch(0.82_0.15_195/40%)]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" /> View Certificate
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
