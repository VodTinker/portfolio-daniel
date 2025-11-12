import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  fadeInUp,
  staggerContainer,
  cardHoverSubtle,
  textReveal
} from "../utils/professionalAnimations";

export default function AboutUnique() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 sm:px-12 lg:px-24 py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-sm text-neutral-500 dark:text-neutral-500">
            {t.about.number}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 dark:to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left: Main content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
            >
              <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 font-light">
                {t.about.paragraph1}{" "}
                <span className="text-neutral-900 dark:text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {t.about.paragraph1Bold}
                </span>{" "}
                {t.about.paragraph1Continue}
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                {t.about.paragraph2}{" "}
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t.about.paragraph2Bold}
                </span>{" "}
                {t.about.paragraph2Continue}
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                {t.about.paragraph3}{" "}
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t.about.paragraph3Bold1}
                </span>{" "}
                {t.about.paragraph3And}{" "}
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t.about.paragraph3Bold2}
                </span>
                {t.about.paragraph3Continue}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-500 italic">
                  {t.about.paragraph4}
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants} className="pt-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                  {t.about.journey}
                </h3>
              </div>
              <div className="space-y-0 relative">
                {/* Vertical line */}
                <div className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent dark:from-blue-400/20 dark:via-purple-400/20"></div>
                
                {t.about.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-6 group relative"
                  >
                    {/* Year badge */}
                    <div className="flex-shrink-0 w-16 pt-1.5">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-12">
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-500 mb-2">
                        {item.year}
                      </div>
                      <div className="p-4 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 group-hover:border-blue-300/50 dark:group-hover:border-blue-700/50 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300">
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Expertise cards */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 space-y-4"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                {t.about.whatIDo}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Sistemas */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50/50 to-white dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/80 dark:border-blue-900/30 hover:border-blue-400 dark:hover:border-blue-700 shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                      {t.about.expertise[0].emoji}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.about.expertise[0].title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {t.about.expertise[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Linux", "Proxmox", "Docker", "SSH"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 dark:bg-neutral-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Redes */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50/50 to-white dark:from-green-950/20 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-green-900/30 hover:border-emerald-400 dark:hover:border-emerald-700 shadow-lg shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                      {t.about.expertise[1].emoji}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t.about.expertise[1].title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {t.about.expertise[1].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TCP/IP", "Nginx", "DNS", "VPN"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 dark:bg-neutral-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Desarrollo */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50/50 to-white dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/80 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-700 shadow-lg shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
                      {t.about.expertise[2].emoji}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {t.about.expertise[2].title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {t.about.expertise[2].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Python", "Bash"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/80 dark:bg-neutral-900/50 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick stats */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50/50 dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/50 border border-slate-200/80 dark:border-neutral-800/80 shadow-xl shadow-slate-500/10 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                    20+
                  </div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-500 mt-2 font-medium">
                    {t.about.quickStats.tech}
                  </div>
                </div>
                <div className="group border-x border-slate-200/50 dark:border-neutral-800/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                    15+
                  </div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-500 mt-2 font-medium">
                    {t.about.quickStats.projects}
                  </div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                    2+
                  </div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-500 mt-2 font-medium">
                    {t.about.quickStats.years}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
