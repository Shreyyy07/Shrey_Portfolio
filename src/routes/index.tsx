import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { CockpitProvider } from "@/contexts/CockpitContext";
import { CursorSpotlight } from "@/components/cockpit/CursorSpotlight";
import { CommandPalette } from "@/components/cockpit/CommandPalette";
import { BootSequence } from "@/components/cockpit/BootSequence";
import { ThreeBackground } from "@/components/cockpit/ThreeBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shrey Joshi — Full Stack Developer" },
      { name: "description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor based in Chennai, India." },
      { property: "og:title", content: "Shrey Joshi — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CockpitProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <BootSequence />
        <ThreeBackground />
        <CursorSpotlight />
        <CommandPalette />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </CockpitProvider>
  );
}
