import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/sections/Experience";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Shrey Joshi" },
      { name: "description", content: "Work experience and roles." },
      { property: "og:title", content: "Experience — Shrey Joshi" },
      { property: "og:description", content: "Work experience and roles." },
    ],
  }),
  component: () => <div className="pt-24"><Experience /></div>,
});
