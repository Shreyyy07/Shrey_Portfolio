import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "@/lib/constants";

const categories = ["All", ...Object.keys(SKILLS)];

export function Skills() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? Object.entries(SKILLS).flatMap(([cat, items]) =>
          items.map((item) => ({ item, category: cat }))
        )
      : (SKILLS[active as keyof typeof SKILLS] || []).map((item) => ({
          item,
          category: active,
        }));

  return (
    <section id="skills" className="relative py-24">
      <div className="pointer-events-none absolute -right-60 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl font-bold">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(({ item }) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="glass-card group flex items-center justify-center rounded-xl px-4 py-4 text-center transition-all hover:glow-cyan hover:scale-105"
              >
                <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {item}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
