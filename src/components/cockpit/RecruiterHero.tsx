import { Download, Mail, MapPin, Phone } from "lucide-react";
import { ALL_CERTIFICATES, EXPERIENCE, PERSONAL_INFO, SKILLS, STATS } from "@/lib/constants";

/**
 * "Recruiter Mode" — a clean, scannable, classic résumé hero.
 * High contrast, no animation noise, prints/scans well.
 */
export function RecruiterHero() {
  const allSkills = Object.values(SKILLS).flat();
  return (
    <section id="home" className="relative w-full bg-background pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="border-b border-foreground/15 pb-6">
          <h1 className="font-serif-display text-5xl leading-tight md:text-6xl">
            {PERSONAL_INFO.name}
          </h1>
          <p className="mt-2 text-lg text-foreground/70">{PERSONAL_INFO.title}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/65">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> {PERSONAL_INFO.email}</a>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {PERSONAL_INFO.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {PERSONAL_INFO.location}</span>
            <a href={PERSONAL_INFO.resume} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 border border-foreground/30 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] hover:bg-foreground hover:text-background">
              <Download className="h-3.5 w-3.5" /> Résumé PDF
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/45">Summary</h2>
            <p className="mt-2 leading-relaxed text-foreground/80">
              {PERSONAL_INFO.bio}
            </p>

            <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/45">Experience</h2>
            <ul className="mt-3 space-y-5">
              {EXPERIENCE.map((e) => (
                <li key={e.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-medium text-foreground">{e.position} · {e.company}</div>
                    <div className="text-xs text-foreground/50">{e.duration}</div>
                  </div>
                  <ul className="mt-1.5 list-inside list-disc text-sm text-foreground/70 marker:text-foreground/30">
                    {e.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/45">Highlights</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
              {STATS.map((s) => (
                <li key={s.label} className="flex items-baseline justify-between border-b border-foreground/10 py-1">
                  <span className="text-foreground/65">{s.label}</span>
                  <span className="font-mono">{s.value}{s.suffix}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/45">Stack</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">
              {allSkills.join(" · ")}
            </p>

            <h2 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/45">Certifications</h2>
            <ul className="mt-2 space-y-1 text-sm text-foreground/75">
              {ALL_CERTIFICATES.map((c) => (
                <li key={c.title}><span className="text-foreground">{c.title}</span> — {c.issuer}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
