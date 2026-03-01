import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";
import { projects } from "../utils/projectsData";
import { useLanguage } from "../contexts/LanguageContext";

// ─── Easing ──────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_SOFT: [number, number, number, number] = [0.33, 1, 0.68, 1];

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

// Row entrance: clip-path sweep upward
const rowVariants: Variants = {
  hidden: { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    opacity: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

const separatorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headerAccentVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.08 } },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectsUnique() {
  const { t, language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={shouldReduceMotion ? {} : headerVariants}
            className="text-xs font-mono text-muted tracking-widest uppercase mb-4"
          >
            {t.work.label}
          </motion.p>
          <motion.h2
            variants={shouldReduceMotion ? {} : headerAccentVariants}
            className="font-serif text-5xl sm:text-6xl font-light text-ink"
          >
            {t.work.title}
            <br />
            <em className="italic text-coral">{(t.work as any).titleAccent ?? "built."}</em>
          </motion.h2>
        </motion.div>

        {/* Project rows */}
        <motion.div
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <motion.article
                key={project.id}
                variants={shouldReduceMotion ? {} : rowVariants}
                style={{ transformOrigin: "bottom left" }}
              >
                {/* Top separator */}
                <motion.div
                  variants={shouldReduceMotion ? {} : separatorVariants}
                  className="h-px bg-[hsl(var(--border))] origin-left"
                />

                {/* Row container — fixed height so image has room */}
                <motion.div
                  className="relative overflow-hidden"
                  animate={{ opacity: isDimmed ? 0.42 : 1 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* ── Image panel — slides in from right on hover ── */}
                  <motion.div
                    className="absolute inset-y-3 right-0 w-1/2 sm:w-2/5 overflow-hidden pointer-events-none rounded-sm"
                    style={{
                      boxShadow: isHovered
                        ? "0 4px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)"
                        : "none",
                    }}
                    animate={{
                      clipPath: isHovered
                        ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                        : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                    }}
                    transition={{ duration: 0.55, ease: EASE_SOFT }}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title[language]}
                      className="w-full h-full object-cover"
                      animate={{ scale: isHovered ? 1 : 1.08 }}
                      transition={{ duration: 0.65, ease: EASE_SOFT }}
                      style={{ filter: "saturate(1.05)" }}
                    />
                    {/* Left-edge fade: blends image into page background — works in both themes */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to right, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.6) 18%, transparent 45%)",
                      }}
                    />
                  </motion.div>

                  {/* ── Text content ── */}
                  <div className="relative grid grid-cols-[40px_1fr] sm:grid-cols-[64px_1fr] gap-x-4 sm:gap-x-10 py-6 sm:py-9 pr-4 sm:pr-8 items-start z-10">

                    {/* Number */}
                    <motion.span
                      animate={{ color: isHovered ? "hsl(var(--coral))" : "hsl(var(--muted))" }}
                      transition={{ duration: 0.25 }}
                      className="font-mono text-xs pt-1 tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>

                    {/* Info */}
                    <div>
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-1">
                        {project.category}
                      </span>

                      {/* Title — slides slightly left on hover */}
                      <motion.h3
                        animate={{
                          x: isHovered ? -6 : 0,
                          color: isHovered ? "hsl(var(--coral))" : "hsl(var(--ink))",
                        }}
                        transition={{ duration: 0.35, ease: EASE_SOFT }}
                        className="font-serif text-2xl sm:text-3xl font-light mb-3 leading-snug"
                      >
                        {project.title[language]}
                      </motion.h3>

                      {/* Description — fades up on hover */}
                      <motion.p
                        animate={{
                          opacity: isHovered ? 1 : 0.7,
                          y: isHovered ? 0 : 2,
                        }}
                        transition={{ duration: 0.35, ease: EASE_SOFT }}
                        className="text-sm leading-relaxed max-w-md text-muted"
                      >
                        {project.description[language]}
                      </motion.p>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <span
                            key={`${project.id}-${i}`}
                            className="text-xs font-mono uppercase tracking-wide"
                            style={{ color: "hsl(var(--coral))" }}
                          >
                            {i > 0 && (
                              <span className="mr-2 text-muted opacity-50">·</span>
                            )}
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links — siempre visibles en móvil, revelan en hover en desktop */}
                      <motion.div
                        animate={{ opacity: isHovered ? 1 : 0.55, y: isHovered ? 0 : 0 }}
                        transition={{ duration: 0.3, ease: EASE_SOFT, delay: isHovered ? 0.1 : 0 }}
                        className="mt-5 flex gap-5"
                      >
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
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}

          {/* Bottom separator */}
          <motion.div
            variants={shouldReduceMotion ? {} : separatorVariants}
            className="h-px bg-[hsl(var(--border))] origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
}
