import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CockpitState = {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  togglePalette: () => void;
};

const CockpitCtx = createContext<CockpitState | null>(null);

export function CockpitProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterModeState] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Hydrate persisted recruiter mode
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("recruiterMode") : null;
    if (stored === "1") setRecruiterModeState(true);
  }, []);

  const setRecruiterMode = useCallback((v: boolean) => {
    setRecruiterModeState(v);
    if (typeof window !== "undefined") localStorage.setItem("recruiterMode", v ? "1" : "0");
  }, []);

  const togglePalette = useCallback(() => setPaletteOpen((v) => !v), []);

  // Global keybindings: ⌘K / Ctrl+K, ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CockpitCtx.Provider value={{ recruiterMode, setRecruiterMode, paletteOpen, setPaletteOpen, togglePalette }}>
      {children}
    </CockpitCtx.Provider>
  );
}

export function useCockpit() {
  const ctx = useContext(CockpitCtx);
  if (!ctx) throw new Error("useCockpit must be used within CockpitProvider");
  return ctx;
}
