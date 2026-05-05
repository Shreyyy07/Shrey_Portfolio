import { useState, useEffect, useRef, type ReactNode } from "react";

export function useAnimateOnView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true); // SSR: visible by default

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function useMountAnimation(delay = 0) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true); // SSR: visible by default
  useEffect(() => {
    setMounted(true);
    setVisible(false); // client: hide then animate
    const t = setTimeout(() => setVisible(true), delay + 50);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  onView = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  onView?: boolean;
}) {
  const viewHook = useAnimateOnView();
  const mountVisible = useMountAnimation(delay);
  const visible = onView ? viewHook.visible : mountVisible;
  const ref = onView ? viewHook.ref : undefined;

  const directionMap = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionMap[direction]}`
      } ${className}`}
      style={{ transitionDelay: onView ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  stagger = 100,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const { ref, visible } = useAnimateOnView();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: visible ? `${i * stagger}ms` : "0ms" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
