import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Wraps route content with a choreographed enter/exit transition.
 * On pathname change we play a brief exit (fade + slight upward shift),
 * then swap the children and play an enter (fade + slide-up + subtle blur clear).
 * Pure CSS — no extra deps.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [displayedKey, setDisplayedKey] = useState(pathname);
  const [stage, setStage] = useState<"idle" | "out" | "in">("idle");
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setDisplayed(children);
      setDisplayedKey(pathname);
      return;
    }
    if (pathname === displayedKey) {
      // same route, content updates: just swap silently
      setDisplayed(children);
      return;
    }
    setStage("out");
    const t1 = setTimeout(() => {
      setDisplayed(children);
      setDisplayedKey(pathname);
      setStage("in");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      const t2 = setTimeout(() => setStage("idle"), 500);
      return () => clearTimeout(t2);
    }, 220);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, children]);

  const cls =
    stage === "out"
      ? "opacity-0 translate-y-2 blur-[2px] transition-all duration-200 ease-in"
      : stage === "in"
        ? "opacity-100 translate-y-0 blur-0 transition-all duration-500 ease-out"
        : "opacity-100 translate-y-0 blur-0";

  return (
    <>
      {/* Top progress bar */}
      <RouteProgress active={stage !== "idle"} />
      <div key={displayedKey} className={cls}>
        {displayed}
      </div>
    </>
  );
}

function RouteProgress({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] overflow-hidden"
    >
      <div
        className={`h-full bg-gradient-to-r from-transparent via-foreground to-transparent transition-all ease-out ${
          active
            ? "w-full opacity-100 duration-[700ms]"
            : "w-0 opacity-0 duration-200"
        }`}
      />
    </div>
  );
}
