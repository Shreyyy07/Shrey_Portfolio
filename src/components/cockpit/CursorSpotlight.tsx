import { useEffect, useRef } from "react";

/**
 * A radial spotlight that follows the cursor. Pure CSS variable updates,
 * no React re-renders, GPU-friendly.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={{
        background:
          "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), oklch(1 0 0 / 6%), transparent 60%)",
        transition: "background 80ms linear",
      }}
    />
  );
}
