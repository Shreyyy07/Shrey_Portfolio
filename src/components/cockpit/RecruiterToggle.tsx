import { useCockpit } from "@/contexts/CockpitContext";
import { Briefcase, Sparkles } from "lucide-react";

export function RecruiterToggle() {
  const { recruiterMode, setRecruiterMode } = useCockpit();
  return (
    <button
      onClick={() => setRecruiterMode(!recruiterMode)}
      className="group inline-flex items-center gap-2 whitespace-nowrap border border-foreground/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60 transition-all hover:border-foreground/40 hover:text-foreground"
      title="Toggle Recruiter Mode"
    >
      {recruiterMode ? <Sparkles className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
      <span className="hidden sm:inline">{recruiterMode ? "Cockpit" : "Recruiter"} Mode</span>
      <span
        className={`relative ml-1 h-3 w-6 rounded-full border border-foreground/25 transition-colors ${
          recruiterMode ? "bg-foreground" : "bg-transparent"
        }`}
      >
        <span
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-all ${
            recruiterMode ? "left-3 bg-background" : "left-0.5 bg-foreground/60"
          }`}
        />
      </span>
    </button>
  );
}
