import { createFileRoute } from "@tanstack/react-router";
import { Achievements } from "@/components/sections/Achievements";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Shrey Joshi" },
      { name: "description", content: "Awards, recognitions, and milestones." },
      { property: "og:title", content: "Achievements — Shrey Joshi" },
      { property: "og:description", content: "Awards, recognitions, and milestones." },
    ],
  }),
  component: () => <div className="pt-24"><Achievements /></div>,
});
