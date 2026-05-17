import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shrey Joshi" },
      { name: "description", content: "Get in touch with Shrey Joshi." },
      { property: "og:title", content: "Contact — Shrey Joshi" },
      { property: "og:description", content: "Get in touch with Shrey." },
    ],
  }),
  component: () => <div className="pt-24"><Contact /></div>,
});
