import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shrey Joshi" },
      { name: "description", content: "About Shrey Joshi — background, bio, and current focus areas." },
      { property: "og:title", content: "About — Shrey Joshi" },
      { property: "og:description", content: "Background, bio, and current focus." },
    ],
  }),
  component: () => <div className="pt-24"><About /></div>,
});
