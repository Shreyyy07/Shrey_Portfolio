import { SKILLS } from "@/lib/constants";
import { FadeIn } from "@/hooks/use-animations";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Layout, Server, Wrench, Cloud } from "lucide-react";

// Devicon CDN base
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Map skill names to devicon paths
const SKILL_ICONS: Record<string, string> = {
  "C":                  `${DEVICON}/c/c-original.svg`,
  "C++":                `${DEVICON}/cplusplus/cplusplus-original.svg`,
  "Python":             `${DEVICON}/python/python-original.svg`,
  "JavaScript":         `${DEVICON}/javascript/javascript-original.svg`,
  "TypeScript":         `${DEVICON}/typescript/typescript-original.svg`,
  "React.js":           `${DEVICON}/react/react-original.svg`,
  "Next.js":            `${DEVICON}/nextjs/nextjs-original.svg`,
  "HTML5":              `${DEVICON}/html5/html5-original.svg`,
  "CSS3":               `${DEVICON}/css3/css3-original.svg`,
  "Tailwind CSS":       `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  "Shadcn UI":          `${DEVICON}/shadcn/shadcn-original.svg`,
  "jQuery":             `${DEVICON}/jquery/jquery-original.svg`,
  "Node.js":            `${DEVICON}/nodejs/nodejs-original.svg`,
  "Express.js":         `${DEVICON}/express/express-original.svg`,
  "FastAPI":            `${DEVICON}/fastapi/fastapi-original.svg`,
  "Flask":              `${DEVICON}/flask/flask-original.svg`,
  "RESTful APIs":       `${DEVICON}/postman/postman-original.svg`,
  "MongoDB":            `${DEVICON}/mongodb/mongodb-original.svg`,
  "MySQL":              `${DEVICON}/mysql/mysql-original.svg`,
  "PostgreSQL":         `${DEVICON}/postgresql/postgresql-original.svg`,
  "Firebase":           `${DEVICON}/firebase/firebase-original.svg`,
  "Supabase":           `${DEVICON}/supabase/supabase-original.svg`,
  "Docker":             `${DEVICON}/docker/docker-original.svg`,
  "Docker Compose":     `${DEVICON}/docker/docker-original.svg`,
  "Jenkins":            `${DEVICON}/jenkins/jenkins-original.svg`,
  "GitHub Actions":     `${DEVICON}/github/github-original.svg`,
  "AWS EC2":            `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "Linux":              `${DEVICON}/linux/linux-original.svg`,
  "Git/GitHub":         `${DEVICON}/git/git-original.svg`,
  "VS Code":            `${DEVICON}/vscode/vscode-original.svg`,
  "Postman":            `${DEVICON}/postman/postman-original.svg`,
  "NPM/Yarn":           `${DEVICON}/npm/npm-original-wordmark.svg`,
  "CI/CD Pipelines":    `${DEVICON}/github/github-original.svg`,
};

// Category accent colors (oklch)
const CATEGORY_COLORS: Record<string, { glow: string; border: string; bg: string; text: string }> = {
  "Programming Languages": { glow: "rgba(250,204,21,0.15)", border: "rgba(250,204,21,0.3)", bg: "rgba(250,204,21,0.08)", text: "#facc15" },
  "Frontend":              { glow: "rgba(96,165,250,0.15)", border: "rgba(96,165,250,0.3)", bg: "rgba(96,165,250,0.08)", text: "#60a5fa" },
  "Backend":               { glow: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.08)", text: "#34d399" },
  "Databases":             { glow: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)", text: "#a78bfa" },
  "DevOps & Cloud":        { glow: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.3)", bg: "rgba(251,146,60,0.08)", text: "#fb923c" },
  "Tools & Platforms":     { glow: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.3)", bg: "rgba(244,114,182,0.08)", text: "#f472b6" },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="h-4 w-4" />,
  "Frontend":              <Layout className="h-4 w-4" />,
  "Backend":               <Server className="h-4 w-4" />,
  "Databases":             <Database className="h-4 w-4" />,
  "DevOps & Cloud":        <Cloud className="h-4 w-4" />,
  "Tools & Platforms":     <Wrench className="h-4 w-4" />,
};

const categories = Object.keys(SKILLS);

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const skills = SKILLS[activeCategory as keyof typeof SKILLS] || [];
  const colors = CATEGORY_COLORS[activeCategory] || CATEGORY_COLORS["Frontend"];

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Animated background glow that follows active category */}
      <motion.div
        key={activeCategory + "-bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${colors.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <FadeIn onView>
          <div className="mb-14 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
              What I build with
            </p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ background: colors.text, transition: "background 0.5s" }} />
          </div>
        </FadeIn>

        {/* Category Tab Pills */}
        <FadeIn onView delay={100}>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const c = CATEGORY_COLORS[cat];
              const isActive = cat === activeCategory;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300"
                  style={{
                    borderColor: isActive ? c.border : "rgba(255,255,255,0.08)",
                    background: isActive ? c.bg : "rgba(255,255,255,0.02)",
                    color: isActive ? c.text : "rgba(255,255,255,0.45)",
                    boxShadow: isActive ? `0 0 20px ${c.glow}` : "none",
                  }}
                >
                  <span style={{ color: isActive ? c.text : "rgba(255,255,255,0.3)" }}>
                    {CATEGORY_ICONS[cat]}
                  </span>
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${c.border}` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <div
          className="relative rounded-3xl border p-8 md:p-10"
          style={{
            borderColor: colors.border,
            background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, ${colors.bg} 100%)`,
            boxShadow: `0 0 60px ${colors.glow}`,
            backdropFilter: "blur(20px)",
            transition: "border-color 0.5s, box-shadow 0.5s",
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute -top-px left-8 h-px w-32 rounded-full"
            style={{ background: `linear-gradient(90deg, ${colors.text}, transparent)` }}
          />
          <div
            className="absolute -left-px top-8 w-px h-32 rounded-full"
            style={{ background: `linear-gradient(180deg, ${colors.text}, transparent)` }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="group relative flex items-center gap-3 rounded-xl border px-4 py-3 cursor-default transition-all duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.boxShadow = `0 0 20px ${colors.glow}`;
                    e.currentTarget.style.background = colors.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                  }}
                >
                  {/* Skill icon */}
                  {SKILL_ICONS[skill] ? (
                    <img
                      src={SKILL_ICONS[skill]}
                      alt={skill}
                      className="h-6 w-6 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {skill[0]}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Count badge */}
          <div
            className="absolute bottom-4 right-5 font-mono text-xs"
            style={{ color: colors.text, opacity: 0.6 }}
          >
            {skills.length} techs
          </div>
        </div>
      </div>
    </section>
  );
}
