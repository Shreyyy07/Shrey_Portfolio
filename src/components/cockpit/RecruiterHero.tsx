import { Download, Mail, MapPin, Phone, Globe } from "lucide-react";
import { EXPERIENCE, PERSONAL_INFO, SKILLS, ALL_CERTIFICATES, PROJECTS } from "@/lib/constants";

/**
 * "Recruiter Mode" — a clean, scannable, classic résumé layout
 * Mirrors the actual resume: Education → Skills → Experience → Projects → Certifications
 */
export function RecruiterHero() {
  return (
    <section id="home" className="relative w-full bg-background pt-28 pb-16 print:pt-4">
      <div className="mx-auto max-w-4xl px-6">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="border-b border-foreground/15 pb-6">
          <h1 className="font-serif-display text-5xl leading-tight md:text-6xl">
            {PERSONAL_INFO.name}
          </h1>
          <p className="mt-1.5 text-base font-medium text-foreground/70">
            Full Stack Developer | Competitive Programmer | Open Source Contributor
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-foreground/60">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" /> {PERSONAL_INFO.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0" /> {PERSONAL_INFO.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {PERSONAL_INFO.location}
            </span>
            <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
              <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
              <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href={PERSONAL_INFO.social.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
              <Globe className="h-3.5 w-3.5 shrink-0" /> LeetCode
            </a>
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 border border-foreground/30 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Résumé PDF
            </a>
          </div>
        </div>

        {/* ── Education ─────────────────────────────────────────── */}
        <div className="mt-7">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/45 border-b border-foreground/10 pb-1.5">Education</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span className="font-semibold text-foreground">SRM Institute of Science and Technology</span>
              <span className="ml-2 text-sm text-foreground/60">— B.Tech in Computer Science Engineering</span>
            </div>
            <span className="text-xs text-foreground/50">2022 – 2026 · Chennai, India</span>
          </div>
          <p className="mt-0.5 text-sm text-foreground/65">CGPA: <span className="font-semibold text-foreground">9.36</span></p>
        </div>

        {/* ── Technical Skills ──────────────────────────────────── */}
        <div className="mt-7">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/45 border-b border-foreground/10 pb-1.5">Technical Skills</h2>
          <div className="space-y-1.5">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <div key={category} className="flex flex-wrap gap-x-1 text-sm">
                <span className="font-semibold text-foreground/80 shrink-0">{category}:</span>
                <span className="text-foreground/65">{skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Work Experience ───────────────────────────────────── */}
        <div className="mt-7">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/45 border-b border-foreground/10 pb-1.5">Work Experience</h2>
          <ul className="space-y-5">
            {EXPERIENCE.map((e) => (
              <li key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-foreground">{e.position}</span>
                    <span className="ml-2 text-sm text-foreground/60">· {e.company}</span>
                    <span className="ml-2 text-xs text-foreground/40">· {e.location} · {e.type}</span>
                  </div>
                  <span className="text-xs text-foreground/50 shrink-0">{e.duration}</span>
                </div>
                <ul className="mt-1.5 space-y-0.5 list-inside list-disc text-sm text-foreground/70 marker:text-foreground/30">
                  {e.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <span key={t} className="border border-foreground/10 px-1.5 py-0.5 font-mono text-[10px] text-foreground/55">{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Projects ──────────────────────────────────────────── */}
        <div className="mt-7">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/45 border-b border-foreground/10 pb-1.5">Projects</h2>
          <ul className="space-y-4">
            {PROJECTS.map((p) => (
              <li key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <a href={p.live ?? p.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
                      {p.title}
                    </a>
                    <span className="ml-2 text-sm text-foreground/55 italic">{p.tagline}</span>
                  </div>
                  <span className="text-xs text-foreground/50 shrink-0">{p.date}</span>
                </div>
                <p className="mt-1 text-sm text-foreground/65 leading-relaxed">{p.description}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-foreground/10 px-1.5 py-0.5 font-mono text-[10px] text-foreground/55">{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Certifications ────────────────────────────────────── */}
        <div className="mt-7">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-foreground/45 border-b border-foreground/10 pb-1.5">Certifications</h2>
          <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 text-sm text-foreground/70">
            {ALL_CERTIFICATES.map((c) => (
              <li key={c.title} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span><span className="text-foreground/90 font-medium">{c.title}</span> — {c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
