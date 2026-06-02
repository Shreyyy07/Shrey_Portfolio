import { ALL_CERTIFICATES } from "@/lib/constants";
import { Award, ExternalLink } from "lucide-react";
import { FadeIn } from "@/hooks/use-animations";
import { motion } from "framer-motion";

function CertificateMarquee() {
  const duplicatedCerts = [...ALL_CERTIFICATES, ...ALL_CERTIFICATES];
  
  return (
    <div className="relative flex overflow-hidden py-10">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 120,
          repeat: Infinity,
        }}
        className="flex w-max gap-6 px-6 hover:[animation-play-state:paused]"
      >
        {duplicatedCerts.map((cert, idx) => (
          <div key={`${cert.title}-${idx}`} className="group relative w-72 shrink-0">
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-[0_0_25px_oklch(0.82_0.15_195/25%)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-heading text-lg font-bold text-foreground">{cert.title}</h4>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{cert.issuer}</p>
              </div>
              
              {cert.file && (
                <div className="relative z-10 mt-6">
                  <a
                    href={`/experience/certificates/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors group-hover:bg-primary group-hover:text-background"
                  >
                    View Credential <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground">Certifications</h3>
        </div>

        <FadeIn onView>
          <CertificateMarquee />
        </FadeIn>
      </div>
    </section>
  );
}
