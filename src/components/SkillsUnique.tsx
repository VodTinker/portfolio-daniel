import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  fadeInUp,
  staggerContainer,
  staggerFastContainer,
  scaleIn
} from "../utils/professionalAnimations";

export default function SkillsUnique() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      category: t.skills.categories.frontend,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      borderColor: "border-blue-200 dark:border-blue-900/30",
      items: ["React", "TypeScript", "Tailwind", "JavaScript", "HTML/CSS"],
    },
    {
      category: t.skills.categories.backend,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      borderColor: "border-green-200 dark:border-green-900/30",
      items: ["Linux (Ubuntu/Arch)", "TCP/IP", "DNS & DHCP", "Apache & Nginx", "VPN"],
    },
    {
      category: t.skills.categories.systems,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
      borderColor: "border-orange-200 dark:border-orange-900/30",
      items: ["Docker", "Proxmox", "Git", "VirtualBox", "CI/CD"],
    },
    {
      category: t.skills.categories.ai,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      borderColor: "border-purple-200 dark:border-purple-900/30",
      items: ["Bash Scripting", "Python", "Node.js", "PowerShell", "PHP"],
    },
  ];

  const learning = ["Protocolo MCP", "n8n", "Next.js", "PostgreSQL", "Seguridad"];

  return (
    <section
      id="skills"
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
              {t.skills.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 dark:to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            {t.skills.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
          >
            {t.skills.subtitle}
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skillSet, index) => (
            <motion.div
              key={skillSet.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${skillSet.bgColor} border ${skillSet.borderColor} hover:shadow-2xl transition-shadow duration-500`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-1 rounded-full bg-gradient-to-r ${skillSet.color}`}
                />
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {skillSet.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skillSet.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group"
                  >
                    <div className={`px-4 py-2.5 rounded-xl bg-gradient-to-br ${skillSet.bgColor} border ${skillSet.borderColor} shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}>
                      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-yellow-500/10 rounded-3xl blur-xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 dark:from-neutral-900/80 dark:via-neutral-900/70 dark:to-neutral-900/80 border-2 border-amber-200/80 dark:border-amber-900/40 shadow-2xl shadow-amber-500/20 backdrop-blur-sm">
            {/* Header with icon */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Animated pulse icon */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping"></div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
                      {t.skills.learning.label}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                    {t.skills.learning.title}
                  </h3>
                </div>
              </div>
              
              {/* Badge indicator */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="hidden sm:block"
              >
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/50">
                  {t.skills.learning.badge}
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm sm:text-base leading-relaxed">
              {t.skills.learning.description}
            </p>

            {/* Technologies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {learning.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/20 group-hover:to-orange-400/20 rounded-2xl blur-xl transition-all duration-300"></div>
                  
                  {/* Card */}
                  <div className="relative px-4 py-3 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-neutral-800/80 dark:to-neutral-800/50 border-2 border-amber-200/50 dark:border-amber-900/30 group-hover:border-amber-400 dark:group-hover:border-amber-600 shadow-md group-hover:shadow-xl group-hover:shadow-amber-500/30 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {tech}
                      </span>
                      {/* Progress indicator */}
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-500/50"></div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-8 pt-6 border-t border-amber-200/50 dark:border-amber-900/30"
            >
              <p className="text-xs text-center text-neutral-500 dark:text-neutral-500 italic">
                {t.skills.learning.note}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
