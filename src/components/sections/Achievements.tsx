import { motion } from "framer-motion";
import { CERTIFICATIONS, GITHUB_ACHIEVEMENTS, CODING_STATS } from "@/lib/constants";
import { Award, Trophy, Code2 } from "lucide-react";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-neon/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-4xl font-bold">
            Achievements & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Certifications</h3>
            </div>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                >
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* GitHub Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-secondary/10 p-2.5">
                <Code2 className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">GitHub Badges</h3>
            </div>
            <div className="space-y-3">
              {GITHUB_ACHIEVEMENTS.map((ach, i) => (
                <motion.div
                  key={ach.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-sm font-bold text-secondary">
                    🏅
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{ach.title}</p>
                    {ach.detail && <p className="text-xs text-muted-foreground">{ach.detail}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coding Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-neon/10 p-2.5">
                <Code2 className="h-5 w-5 text-neon" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Coding Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CODING_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-lg bg-muted/50 p-3 text-center"
                >
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
