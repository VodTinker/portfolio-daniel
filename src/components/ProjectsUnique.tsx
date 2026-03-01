import { motion } from "framer-motion";
import { projects } from "../utils/projectsData";
import { useLanguage } from "../contexts/LanguageContext";

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
            <br />
            <em className="italic text-coral">{(t.work as any).titleAccent ?? "built."}</em>
          </motion.h2>
        </div>

        {/* Numbered rows */}
        <div>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              {/* Top separator */}
              <div className="h-px bg-[hsl(var(--border))]" />

              <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr_auto] gap-x-6 sm:gap-x-10 py-8 items-start group">

                {/* Number */}
                <span className="font-mono text-xs text-muted pt-1 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-ink mb-3 leading-snug group-hover:text-coral transition-colors duration-300">
                    {project.title[language]}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xl">
                    {project.description[language]}
                  </p>
                  <p className="mt-3 text-xs font-mono text-coral uppercase tracking-wide">
                    {project.tags.slice(0, 3).join(" · ")}
                  </p>
                </div>

                {/* Links */}
                <div className="hidden sm:flex flex-col items-end gap-2 pt-1">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-muted hover:text-ink transition-colors"
                    >
                      {t.work.viewDemo} ↗
                    </a>
                  )}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-ink transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
          {/* Bottom separator */}
          <div className="h-px bg-[hsl(var(--border))]" />
        </div>
      </div>
    </section>
  );
}
