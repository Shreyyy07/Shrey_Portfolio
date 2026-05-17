import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Shrey Joshi" },
      { name: "description", content: "Selected projects by Shrey Joshi." },
      { property: "og:title", content: "Projects — Shrey Joshi" },
      { property: "og:description", content: "Selected projects." },
    ],
  }),
  component: () => <div className="pt-24"><Projects /></div>,
});
