import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shrey Joshi" },
      { name: "description", content: "About Shrey Joshi — background, bio, skills, and current focus areas." },
      { property: "og:title", content: "About — Shrey Joshi" },
      { property: "og:description", content: "Background, bio, skills, and current focus." },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <About />
      <Skills />
      <Certifications />
    </div>
  ),
});
