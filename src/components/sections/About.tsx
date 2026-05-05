import { useEffect, useRef, useState } from "react";
import { PERSONAL_INFO, STATS, CURRENT_FOCUS } from "@/lib/constants";
import { Target } from "lucide-react";
import { FadeIn, useAnimateOnView } from "@/hooks/use-animations";

function AnimatedCounter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: viewRef, visible } = useAnimateOnView();

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  return (
    <span ref={(el) => { (viewRef as React.MutableRefObject<HTMLDivElement | null>).current = el as unknown as HTMLDivElement; ref.current = el; }}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn onView>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn onView direction="left">
            <div className="space-y-5">
              {PERSONAL_INFO.aboutBio.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
              ))}
              <div className="mt-8">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
                  <Target className="h-5 w-5 text-primary" /> Current Focus
                </h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CURRENT_FOCUS.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn onView direction="right">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card group rounded-2xl p-5 text-center transition-all hover:shadow-[0_0_20px_oklch(0.82_0.15_195/20%)]"
                >
                  <div className="font-heading text-2xl font-bold text-primary">
                    <AnimatedCounter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
