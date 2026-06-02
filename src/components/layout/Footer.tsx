import { GitBranch, ExternalLink, ArrowUp, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="GitHub">
              <GitBranch className="h-5 w-5" />
            </a>
            <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary" aria-label="LinkedIn">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full bg-primary/10 p-2 text-primary transition-all hover:bg-primary/20"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
