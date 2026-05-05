import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, ChevronDown } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.substring(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(current.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}

export function Hero() {
  const rotatingText = useTypewriter(PERSONAL_INFO.rotatingKeywords);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm font-medium tracking-wider text-primary uppercase"
          >
            Hello, World! 👋
          </motion.p>

          <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">
            I&apos;m{" "}
            <span className="text-gradient">{PERSONAL_INFO.name}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg text-muted-foreground md:text-xl"
          >
            {PERSONAL_INFO.subtitle}
          </motion.p>

          <div className="mt-3 h-8">
            <span className="font-mono text-lg text-primary">
              {rotatingText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-muted-foreground"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:glow-cyan hover:scale-105"
            >
              View My Work
            </a>
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl px-6 py-3 font-medium text-foreground transition-all hover:bg-glass-border"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:glow-purple hover:bg-secondary/10"
            >
              Let&apos;s Connect
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex items-center justify-center gap-5"
          >
            {[
              { href: PERSONAL_INFO.social.github, icon: Github, label: "GitHub" },
              { href: PERSONAL_INFO.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: PERSONAL_INFO.social.leetcode, icon: ExternalLink, label: "LeetCode" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-3 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
