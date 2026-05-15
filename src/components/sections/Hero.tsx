import { CockpitHero } from "@/components/cockpit/CockpitHero";
import { RecruiterHero } from "@/components/cockpit/RecruiterHero";
import { useCockpit } from "@/contexts/CockpitContext";

export function Hero() {
  const { recruiterMode } = useCockpit();
  return recruiterMode ? <RecruiterHero /> : <CockpitHero />;
}
