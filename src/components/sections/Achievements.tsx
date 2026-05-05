import { CERTIFICATIONS, GITHUB_ACHIEVEMENTS, CODING_STATS } from "@/lib/constants";
import { Award, Trophy, Code2 } from "lucide-react";
import { FadeIn, useAnimateOnView } from "@/hooks/use-animations";

export function Achievements() {
  const { ref: statsRef, visible: statsVisible } = useAnimateOnView();

  return (
    <section id="achievements" className="relative py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-neon/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold">
              Achievements & <span className="text-gradient">Certifications</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn onView>
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Certifications</h3>
              </div>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.title} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{cert.title}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn onView delay={100}>
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-secondary/10 p-2.5">
                  <Code2 className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">GitHub Badges</h3>
              </div>
              <div className="space-y-3">
                {GITHUB_ACHIEVEMENTS.map((ach) => (
                  <div key={ach.title} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary">
                      🏅
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{ach.title}</p>
                      {ach.detail && <p className="text-xs text-muted-foreground">{ach.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn onView delay={200}>
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-neon/10 p-2.5">
                  <Code2 className="h-5 w-5 text-neon" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Coding Stats</h3>
              </div>
              <div ref={statsRef} className="grid grid-cols-2 gap-3">
                {CODING_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`rounded-lg bg-muted/50 p-3 text-center transition-all duration-500 ${
                      statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                    style={{ transitionDelay: statsVisible ? `${i * 80}ms` : "0ms" }}
                  >
                    <p className="text-sm font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
