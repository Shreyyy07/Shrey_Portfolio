import { useState } from "react";
import { SKILLS } from "@/lib/constants";
import { FadeIn, useAnimateOnView } from "@/hooks/use-animations";

const categories = ["All", ...Object.keys(SKILLS)];

export function Skills() {
  const [active, setActive] = useState("All");
  const { ref, visible } = useAnimateOnView();

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
        <FadeIn onView>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl font-bold">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_oklch(0.82_0.15_195/25%)]"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map(({ item }, i) => (
            <div
              key={item}
              className={`glass-card group flex items-center justify-center rounded-xl px-4 py-4 text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: visible ? `${i * 30}ms` : "0ms" }}
            >
              <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
