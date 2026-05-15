import { GitBranch, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { FadeIn } from "@/hooks/use-animations";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-foreground"
    >
      {/* Noise texture */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]" />

      {/* Oversized background serif lettering */}
      <div className="font-serif-display pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 select-none text-[40vh] italic leading-none text-foreground/[0.025]">
        S
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <FadeIn delay={100}>
          <span className="mb-8 block text-[10px] font-medium uppercase tracking-[0.5em] text-foreground/40">
            Portfolio — 2026 Edition
          </span>
        </FadeIn>

        <FadeIn delay={200}>
          <h1 className="font-serif-display mb-8 text-6xl font-normal leading-[0.95] tracking-tight md:text-8xl lg:text-[8rem]">
            I am{" "}
            <span className="font-light italic">{PERSONAL_INFO.name}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mb-12 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-light tracking-wide text-foreground/60 md:text-base">
            <span>Full Stack Developer</span>
            <span className="opacity-20">/</span>
            <span>Competitive Programmer</span>
            <span className="opacity-20">/</span>
            <span>Open Source Contributor</span>
          </div>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="mb-16 max-w-2xl text-lg font-light leading-relaxed text-foreground/45 md:text-xl">
            {PERSONAL_INFO.bio.replace("1.25M+ lines of code written.", "")}
            <span className="text-foreground/85">1.25M+ lines of code</span>{" "}
            written.
          </p>
        </FadeIn>

        <FadeIn delay={700}>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <a
              href="#projects"
              className="group relative inline-flex items-center overflow-hidden bg-foreground px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:pr-14"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute right-4 opacity-0 transition-all group-hover:opacity-100">
                →
              </span>
            </a>
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/10 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground/40"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="text-xs font-bold uppercase tracking-[0.2em] text-foreground underline-offset-8 transition-all hover:underline"
            >
              Let&apos;s Connect
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Bottom-left socials */}
      <div className="absolute bottom-12 left-12 hidden flex-col gap-6 lg:flex">
        {[
          { href: PERSONAL_INFO.social.github, icon: GitBranch, label: "GitHub" },
          { href: PERSONAL_INFO.social.linkedin, icon: ExternalLink, label: "LinkedIn" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="opacity-30 transition-opacity hover:opacity-100"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      {/* Bottom-right scroll cue */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <a href="#about" className="group flex items-center gap-4">
          <div className="h-px w-12 bg-foreground/20 transition-all duration-500 group-hover:w-20" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 transition-colors group-hover:text-foreground">
            Scroll to explore
          </span>
        </a>
      </div>
    </section>
  );
}
