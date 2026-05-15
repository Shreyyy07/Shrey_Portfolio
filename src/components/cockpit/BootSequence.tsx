import { useEffect, useState } from "react";

const LINES = [
  "$ ./initialize portfolio --user=shrey-joshi",
  "→ booting cockpit kernel ...............  [ OK ]",
  "→ syncing github://Shreyyy07 .............  [ OK ]",
  "→ mounting /experience /projects /skills .  [ OK ]",
  "→ priming command palette (⌘K) ...........  [ OK ]",
  "✓ ready. welcome.",
];

export function BootSequence() {
  const [shown, setShown] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("booted");
    if (seen) return;
    sessionStorage.setItem("booted", "1");
    setShown(true);

    const stepDelay = 180;
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), stepDelay * (i + 1)));
    });
    timers.push(window.setTimeout(() => setDone(true), stepDelay * (LINES.length + 2)));
    timers.push(window.setTimeout(() => setShown(false), stepDelay * (LINES.length + 4)));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!shown) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-[12px] leading-relaxed text-foreground/80 md:text-sm">
        {LINES.slice(0, step).map((line, i) => (
          <div key={i} className="flex">
            <span>{line}</span>
          </div>
        ))}
        {step < LINES.length && (
          <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-foreground/60 align-middle" />
        )}
      </div>
    </div>
  );
}
