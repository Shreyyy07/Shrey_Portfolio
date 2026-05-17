import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shrey Joshi — Full Stack Developer" },
      { name: "description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor based in Chennai, India." },
      { property: "og:title", content: "Shrey Joshi — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Shrey Joshi — Full Stack Developer, Competitive Programmer, and Open Source Contributor." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <Hero />,
});
