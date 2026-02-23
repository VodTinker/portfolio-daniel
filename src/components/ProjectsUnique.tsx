import { motion } from "framer-motion";
import { projects } from "../utils/projectsData";
import { useLanguage } from "../contexts/LanguageContext";
import ProjectIllustration from "./ui/illustrations/ProjectIllustration";

// Color accent per project (matches illustration variants)
const accents = [
  "bg-terracotta",   // 0 — Mail/DNS
  "bg-lavender",     // 1 — Discord bot
  "bg-sage",         // 2 — Web scraping
  "bg-slate-blue",   // 3 — Automation/n8n
] as const;

const textAccents = [
  "text-terracotta",
  "text-[hsl(var(--lavender))]",
  "text-[hsl(var(--sage))]",
  "text-slate-blue",
] as const;

export default function ProjectsUnique() {
  const { t, language } = useLanguage();

  return (
    <section id="work" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono text-muted tracking-widest uppercase mb-4"
          >
            {t.work.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-serif text-4xl sm:text-5xl font-light text-ink"
          >
            {t.work.title}
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group border border-[hsl(var(--border))] rounded-sm overflow-hidden bg-[hsl(var(--surface))] hover:border-[hsl(var(--muted))] transition-colors duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[180px]">

                {/* Color block with illustration */}
                <div
                  className={`${accents[index as keyof typeof accents] ?? "bg-sage"} flex items-center justify-center p-10 opacity-80`}
                >
                  <div className="text-white opacity-70">
                    <ProjectIllustration variant={(index % 4) as 0 | 1 | 2 | 3} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 sm:p-8">
                  <div>
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-ink mt-2 mb-3 leading-snug">
                      {project.title[language]}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2 max-w-lg">
                      {project.description[language]}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4 mt-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono rounded-sm border border-[hsl(var(--border))] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 shrink-0">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-mono ${textAccents[index as keyof typeof textAccents] ?? "text-muted"} hover:opacity-70 transition-opacity`}
                        >
                          {t.work.viewDemo}
                        </a>
                      )}
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-muted hover:text-ink transition-colors"
                      >
                        {t.work.github}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
