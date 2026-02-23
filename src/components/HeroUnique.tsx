import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import HeroIllustration from "./ui/illustrations/HeroIllustration";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE } as Transition,
});

export default function HeroUnique() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="dark-grain bg-ink min-h-screen flex items-center px-6 sm:px-10 lg:px-16 pt-28 pb-20"
    >
      <div className="w-full max-w-6xl mx-auto">

        {/* Available badge */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-[hsl(var(--bg))]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
            {t.hero.available}
          </span>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">

          {/* Left: headline + desc + CTAs */}
          <div>
            <motion.h1
              {...fadeUp(0.1)}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] tracking-tight text-[hsl(var(--bg))] mb-6"
            >
              {t.hero.headline1}
              <br />
              <em className="not-italic text-[hsl(var(--bg))]/60">{t.hero.headline2}</em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-base sm:text-lg text-[hsl(var(--bg))]/60 leading-relaxed max-w-md mb-10"
            >
              {t.hero.description}
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center px-5 py-2.5 rounded-sm bg-terracotta text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t.hero.cta}
              </a>
              <a
                href="#thinking"
                className="inline-flex items-center px-5 py-2.5 rounded-sm border border-white/30 text-[hsl(var(--bg))] text-sm font-medium hover:border-white/60 transition-colors"
              >
                {t.hero.ctaAlt}
              </a>
            </motion.div>
          </div>

          {/* Right: SVG illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm lg:max-w-none text-[hsl(var(--bg))]">
              <HeroIllustration />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
