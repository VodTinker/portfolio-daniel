import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "../utils/projectsData";
import { useLanguage } from "../contexts/LanguageContext";
import BotCommandsModal from "./BotCommandsModal";
import MailDnsModal from "./MailDnsModal";
import { Play, Star } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  imageReveal,
  buttonHover
} from "../utils/professionalAnimations";

export default function ProjectsUnique() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isBotModalOpen, setIsBotModalOpen] = useState(false);
  const [isMailDnsModalOpen, setIsMailDnsModalOpen] = useState(false);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative px-6 sm:px-12 lg:px-24 py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="font-mono text-sm text-neutral-500 dark:text-neutral-500">
              {t.projects.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 dark:to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            {t.projects.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        {/* Projects list */}
        <div className="space-y-8">
          {projects.slice(0, 4).map((project, index) => {
            const isDiscordBot = project.id === 1;
            const isMailDns = project.id === 0;
            const hasModal = isDiscordBot || isMailDns;
            const Component = hasModal ? 'button' : 'a';
            const componentProps = hasModal
              ? { onClick: () => isMailDns ? setIsMailDnsModalOpen(true) : setIsBotModalOpen(true), type: 'button' as const, className: "block w-full text-left" }
              : {
                href: project.liveLink || project.githubLink,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block"
              };

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <Component {...componentProps}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-neutral-900/50 border transition-all duration-500 shadow-lg backdrop-blur-sm cursor-pointer ${project.featured
                    ? 'border-yellow-400 dark:border-yellow-600 hover:border-yellow-500 dark:hover:border-yellow-500 shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/30 ring-2 ring-yellow-400/20'
                    : 'border-slate-200/80 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-neutral-600 shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-neutral-900/50'
                    }`}>
                    {/* Project number */}
                    <div className="hidden lg:block lg:col-span-1">
                      <span className="font-mono text-5xl font-bold text-neutral-200 dark:text-neutral-800 group-hover:text-neutral-400 dark:group-hover:text-neutral-600 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <motion.img
                          src={project.image}
                          alt={project.title[language]}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1, filter: "grayscale(20%)" }}
                          animate={{
                            scale: hoveredId === project.id ? 1.05 : 1,
                            filter:
                              hoveredId === project.id
                                ? "grayscale(0%)"
                                : "grayscale(20%)",
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        {/* Overlay gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Featured Badge */}
                        {project.featured && (
                          <motion.div
                            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Star className="w-4 h-4" fill="white" />
                            <span className="text-sm font-semibold">
                              {language === 'en' ? 'Featured' : 'Destacado'}
                            </span>
                          </motion.div>
                        )}

                        {/* Interactive Demo Badge for Modal Projects */}
                        {hasModal && (
                          <motion.div
                            className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 text-white rounded-lg shadow-lg backdrop-blur-sm ${isMailDns
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                              : 'bg-blue-600'
                              }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                              opacity: 1,
                              scale: hoveredId === project.id ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Play className="w-4 h-4" fill="white" />
                            <span className="text-sm font-semibold">
                              {t.projects.clickToViewDemo}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="lg:hidden font-mono text-sm text-neutral-400 dark:text-neutral-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title[language]}
                        </h3>
                      </div>

                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {project.description[language]}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-700 group-hover:border-blue-400 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 dark:group-hover:border-blue-800 transition-all duration-300 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>


                    </div>
                  </div>
                </Component>
              </motion.article>
            );
          })}
        </div>

        {/* Bot Commands Modal */}
        <BotCommandsModal isOpen={isBotModalOpen} onClose={() => setIsBotModalOpen(false)} />

        {/* Mail & DNS Infrastructure Modal */}
        <MailDnsModal isOpen={isMailDnsModalOpen} onClose={() => setIsMailDnsModalOpen(false)} />

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/VodTinker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 dark:bg-neutral-800 text-white dark:text-white font-medium hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            {t.projects.viewAll}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
