import { ALL_CERTIFICATES, GITHUB_ACHIEVEMENTS, CODING_STATS } from "@/lib/constants";
import { Award, Trophy, Code2, ExternalLink, Activity, GitBranch } from "lucide-react";
import { FadeIn, useAnimateOnView } from "@/hooks/use-animations";
import { motion } from "framer-motion";

// Helper component for Marquee
function CertificateMarquee() {
  const duplicatedCerts = [...ALL_CERTIFICATES, ...ALL_CERTIFICATES];
  
  return (
    <div className="relative flex overflow-hidden py-10">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 120, // Slowed down from 40 to 120 for a much more relaxed pace
          repeat: Infinity,
        }}
        className="flex w-max gap-6 px-6 hover:[animation-play-state:paused]"
      >
        {duplicatedCerts.map((cert, idx) => (
          <div key={`${cert.title}-${idx}`} className="group relative w-72 shrink-0">
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-[0_0_25px_oklch(0.82_0.15_195/25%)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground">{cert.title}</h4>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{cert.issuer}</p>
              </div>
              
              {cert.file && (
                <div className="relative z-10 mt-6">
                  <a
                    href={`/experience/certificates/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-background"
                  >
                    View Credential <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Achievements() {
  const { ref: statsRef, visible: statsVisible } = useAnimateOnView();

  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[800px] w-[800px] rounded-full bg-neon/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <FadeIn onView>
          <div className="mb-20 text-center">
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              Achievements & <span className="text-gradient">Certifications</span>
            </h2>
            <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-transparent" />
          </div>
        </FadeIn>

        {/* Certificates Section */}
        <div className="mb-24">
          <FadeIn onView>
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Wall of Fame</h3>
            </div>
          </FadeIn>

          <FadeIn onView delay={100}>
            <CertificateMarquee />
          </FadeIn>
        </div>

        {/* Live Coding Stats (GitHub + LeetCode) */}
        <div className="mb-24">
          <FadeIn onView>
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-neon/10 p-2.5">
                <Activity className="h-6 w-6 text-neon" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Live Activity</h3>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {/* GitHub Stats */}
            <FadeIn onView delay={100}>
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_0_40px_oklch(0.65_0.2_300/15%)] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img 
                  src="https://github-readme-stats-anuraghazra1.vercel.app/api?username=Shreyyy07&show_icons=true&bg_color=00000000&hide_border=true&title_color=00D9FF&text_color=a1a1aa&icon_color=00D9FF" 
                  alt="GitHub Stats" 
                  className="relative z-10 w-full max-w-[450px] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </FadeIn>

            {/* GitHub Streak */}
            <FadeIn onView delay={200}>
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-neon/30 hover:shadow-[0_0_40px_oklch(0.7_0.2_160/15%)] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img 
                  src="https://github-readme-streak-stats.herokuapp.com/?user=Shreyyy07&background=00000000&hide_border=true&ring=00D9FF&fire=00D9FF&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=a1a1aa&sideLabels=a1a1aa&dates=a1a1aa" 
                  alt="GitHub Streak" 
                  className="relative z-10 w-full max-w-[450px] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </FadeIn>

            {/* GitHub Top Languages */}
            <FadeIn onView delay={300}>
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_oklch(0.82_0.15_195/15%)] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img 
                  src="https://github-readme-stats-anuraghazra1.vercel.app/api/top-langs/?username=Shreyyy07&layout=compact&bg_color=00000000&hide_border=true&title_color=00D9FF&text_color=a1a1aa" 
                  alt="Top Languages" 
                  className="relative z-10 w-full max-w-[350px] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </FadeIn>

            {/* LeetCode Stats */}
            <FadeIn onView delay={400}>
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <img 
                  src="https://leetcard.jacoblin.cool/shreyyy___07?theme=dark&font=Fira%20Code&ext=activity" 
                  alt="LeetCode Stats" 
                  className="relative z-10 w-full max-w-[400px] h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Stats & Badges Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* GitHub Badges */}
          <FadeIn onView delay={200} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_0_40px_oklch(0.65_0.2_300/15%)]">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="rounded-2xl bg-secondary/10 p-3 shadow-inner">
                    <GitBranch className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">GitHub Badges</h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">Open Source Milestones</p>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {GITHUB_ACHIEVEMENTS.map((ach) => (
                    <motion.div 
                      key={ach.title}
                      whileHover={{ scale: 1.05, rotateZ: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-4 rounded-xl border border-foreground/5 bg-background/60 p-4 shadow-sm transition-colors hover:border-secondary/40 hover:bg-secondary/5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-xl font-bold shadow-[0_0_15px_oklch(0.65_0.2_300/40%)]">
                        🏅
                      </div>
                      <div>
                        <p className="font-heading text-base font-bold text-foreground">{ach.title}</p>
                        {ach.detail && <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{ach.detail}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Coding Stats */}
          <FadeIn onView delay={300} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-background/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-neon/30 hover:shadow-[0_0_40px_oklch(0.7_0.2_160/15%)]">
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="rounded-2xl bg-neon/10 p-3 shadow-inner">
                    <Code2 className="h-8 w-8 text-neon" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">Coding Highlights</h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">Activity Highlights</p>
                  </div>
                </div>
                
                <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {CODING_STATS.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`flex flex-col items-center justify-center rounded-xl border border-foreground/5 bg-background/60 p-4 text-center shadow-sm transition-all duration-700 hover:-translate-y-1 hover:border-neon/40 hover:bg-neon/5 ${
                        statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: statsVisible ? `${i * 100}ms` : "0ms" }}
                    >
                      <p className="font-heading text-xl font-black text-foreground drop-shadow-sm">{stat.value}</p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
