import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/components/sections/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Shrey Joshi" },
      { name: "description", content: "Languages, frameworks, and tooling Shrey works with." },
      { property: "og:title", content: "Skills — Shrey Joshi" },
      { property: "og:description", content: "Languages, frameworks, and tooling." },
    ],
  }),
  component: () => <div className="pt-24"><Skills /></div>,
});
