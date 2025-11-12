import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  fadeInUp, 
  fadeIn,
  staggerContainer, 
  buttonHover,
  textReveal,
  scaleIn
} from "../utils/professionalAnimations";

export default function HeroUnique() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax solo en desktop, más suave en móvil
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detectar si es móvil con debounce
    let resizeTimeout: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Madrid",
        })
      );
    };
    updateTime();
    // Actualizar cada minuto en lugar de cada segundo
    const interval = setInterval(updateTime, 60000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <motion.section
      id="home"
      ref={ref}
      style={{ 
        opacity: isMobile ? 1 : opacity,
        y: isMobile ? 0 : y
      }}
      className="relative min-h-screen flex items-center justify-start px-6 sm:px-12 lg:px-24 pt-24 pb-32"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Top meta info */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-16 text-sm font-mono text-neutral-600 dark:text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.hero.available}</span>
          </div>
          {mounted && (
            <>
              <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">
                /
              </span>
              <span>{t.hero.location} ({currentTime})</span>
            </>
          )}
        </motion.div>

        {/* Main content - Asymmetric layout */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Main title */}
          <div className="lg:col-span-7">
            <motion.h1 
              variants={textReveal}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-8"
            >
              <span className="text-neutral-900 dark:text-white">
                {t.hero.title}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.hero.titleGradient}
              </span>
            </motion.h1>

            <div className="space-y-4 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl">
              <p className="leading-relaxed">
                {t.hero.subtitle}{" "}
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t.hero.subtitleBold1}
                </span>{" "}
                {t.hero.subtitleAnd}{" "}
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t.hero.subtitleBold2}
                </span>
                .
              </p>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            {/* CTA buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mt-10"
            >
              <motion.a
                href="#projects"
                variants={buttonHover}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="group px-8 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-medium flex items-center gap-2"
              >
                {t.hero.viewWork}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </motion.a>
              <motion.a
                href="#contact"
                variants={buttonHover}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3.5 border-2 border-neutral-300 dark:border-neutral-700 rounded-full font-medium hover:border-neutral-900 dark:hover:border-white"
              >
                {t.hero.getInTouch}
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Info cards */}
          <motion.div
            variants={scaleIn}
            className="lg:col-span-5 space-y-4"
          >
            {/* Quick stats */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                    2+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {t.hero.stats.yearsLabel}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                    15+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {t.hero.stats.projectsLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Current focus */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-900/30">
              <div className="text-sm font-mono text-blue-700 dark:text-blue-400 mb-2">
                {t.hero.currentFocus.title}
              </div>
              <p className="text-neutral-900 dark:text-white font-medium">
                {t.hero.currentFocus.subtitle}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                {t.hero.currentFocus.description}
              </p>
            </div>

            {/* Tech stack preview */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm font-mono text-neutral-600 dark:text-neutral-400 mb-3">
                {t.hero.stack.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Linux",
                  "Docker",
                  "React",
                  "Python",
                  "Proxmox",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-full bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
            <span className="text-xs font-mono">{t.hero.scroll}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-0.5 h-12 bg-gradient-to-b from-neutral-400 to-transparent dark:from-neutral-600 dark:to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
