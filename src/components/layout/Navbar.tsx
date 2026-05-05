import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import { useMountAnimation } from "@/hooks/use-animations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const show = useMountAnimation(100);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${scrolled ? "glass-card shadow-lg" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-heading text-xl font-bold text-gradient">
          SJ
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_15px_oklch(0.82_0.15_195/30%)]"
          >
            <Download className="h-4 w-4" />
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
        <div className="glass-card border-t border-glass-border md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
