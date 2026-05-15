import { useState, useEffect } from "react";
import { Command, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { useMountAnimation } from "@/hooks/use-animations";
import { useCockpit } from "@/contexts/CockpitContext";
import { RecruiterToggle } from "@/components/cockpit/RecruiterToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const show = useMountAnimation(100);
  const { togglePalette } = useCockpit();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      } ${
        scrolled
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-5">
        <a
          href="#home"
          className="shrink-0 text-xl font-bold tracking-tighter text-foreground"
        >
          SJ
        </a>

        <div className="hidden flex-1 items-center justify-center gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={togglePalette}
            className="inline-flex items-center gap-2 whitespace-nowrap border border-foreground/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/55 transition-all hover:border-foreground/40 hover:text-foreground"
          >
            <Command className="h-3 w-3" />
            <kbd className="border border-foreground/15 px-1 font-mono text-[9px] tracking-widest">⌘K</kbd>
          </button>
          <RecruiterToggle />
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap border border-foreground/20 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Resume
          </a>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-foreground/10 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5 px-8 py-6 text-[11px] font-medium uppercase tracking-[0.2em]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block border border-foreground/20 px-6 py-2 text-center text-foreground"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
