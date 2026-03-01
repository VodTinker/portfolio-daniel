import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

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
      className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center relative overflow-hidden"
    >
      {/* Soft rose gradient corner — como kioku */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(4 65% 80% / 0.4) 0%, transparent 70%)" }}
      />

      {/* Available badge */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted border border-[hsl(var(--border))] px-3 py-1.5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(114_30%_55%)] inline-block" />
          {t.hero.available}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light leading-[1.08] tracking-tight text-ink mb-6 max-w-4xl"
      >
        {t.hero.headline1}
        <br />
        <em className="italic text-coral">{t.hero.headline2}</em>
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="text-base sm:text-lg text-muted leading-relaxed max-w-md mb-10"
      >
        {t.hero.description}
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-[hsl(var(--bg))] text-sm font-medium rounded-lg hover:opacity-85 transition-opacity"
        >
          {t.hero.cta} →
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-ink text-sm font-medium rounded-lg hover:border-muted transition-colors"
        >
          {(t.hero as any).ctaSecondary ?? "Contact"}
        </a>
      </motion.div>
    </section>
  );
}
