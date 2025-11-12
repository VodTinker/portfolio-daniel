import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  fadeInUp,
  staggerContainer,
  cardHoverSubtle,
  buttonHover
} from "../utils/professionalAnimations";

export default function ContactUnique() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: t.contact.methods.email.label,
      value: "danielfonov@vodtinker.dev",
      href: "mailto:danielfonov@vodtinker.dev",
      description: t.contact.methods.email.description,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      borderColor: "border-blue-200 dark:border-blue-900/30",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: t.contact.methods.github.label,
      value: "@VodTinker",
      href: "https://github.com/VodTinker",
      description: t.contact.methods.github.description,
      color: "from-gray-700 to-gray-900 dark:from-gray-400 dark:to-gray-200",
      bgColor: "from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: t.contact.methods.linkedin.label,
      value: "Daniel Fonov",
      href: "https://linkedin.com/in/daniel-fonov",
      description: t.contact.methods.linkedin.description,
      color: "from-blue-600 to-blue-800",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-900/30",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      label: t.contact.methods.discord.label,
      value: "@vodtinker",
      href: "https://discord.com/users/vodtinker",
      description: t.contact.methods.discord.description,
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
      borderColor: "border-indigo-200 dark:border-indigo-900/30",
    },
  ];

  return (
    <section
      id="contact"
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
              {t.contact.number}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 dark:to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        {/* Contact methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`group p-8 rounded-3xl bg-gradient-to-br ${method.bgColor} border ${method.borderColor} shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-r ${method.color} text-white`}
                >
                  {method.icon}
                </div>
                <motion.svg
                  className="w-6 h-6 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 4, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </motion.svg>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {method.label}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                {method.value}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {method.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* CTA section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-neutral-800 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
          
          <div className="relative max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-medium text-white">{t.contact.cta.available}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {t.contact.cta.title}
            </h3>
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto">
              {t.contact.cta.subtitle}
            </p>
            
            {/* Single primary CTA */}
            <div className="pt-4">
              <a
                href="mailto:danielfonov@vodtinker.dev"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-full font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.contact.cta.sendEmail}
              </a>
            </div>
            
            {/* Subtle note */}
            <p className="text-xs text-neutral-400 pt-2">
              {t.contact.cta.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
