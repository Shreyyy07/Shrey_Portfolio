import { createFileRoute } from "@tanstack/react-router";
import { PersonalBrand } from "@/components/sections/PersonalBrand";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Personal Brand — learn.with.Shrey" },
      { name: "description", content: "learn.with.Shrey — Medium blog and Instagram reels that break down complex tech with clarity." },
      { property: "og:title", content: "learn.with.Shrey" },
      { property: "og:description", content: "Medium blog + Instagram reels — why before how." },
    ],
  }),
  component: () => <div className="pt-24"><PersonalBrand /></div>,
});
