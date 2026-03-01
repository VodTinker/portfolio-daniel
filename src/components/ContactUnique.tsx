import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const CONTACT_EMAIL = "danielfonov71@vodtinker.dev";

const STATS = [
  { value: "3+",    label: "años de experiencia" },
  { value: "10+",   label: "proyectos construidos" },
  { value: "100%",  label: "self-hosted & open source" },
] as const;

export default function ContactUnique() {
  const { t } = useLanguage();

  const links = [
    { label: "Email",    href: `mailto:${CONTACT_EMAIL}`,               external: false },
    { label: "GitHub",   href: "https://github.com/VodTinker",          external: true  },
    { label: "LinkedIn", href: "https://linkedin.com/in/daniel-fonov",  external: true  },
    { label: "Discord",  href: "https://discord.com/users/vodtinker",   external: true  },
  ];

  return (
    <>
      {/* Stats band */}
      <div className="bg-[#0D0D0D] px-6 sm:px-10 lg:px-16 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-8 sm:py-0"
            >
              <span className="font-serif italic text-5xl sm:text-6xl text-[hsl(var(--bg))]/90 mb-2">
                {stat.value}
              </span>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA section */}
      <section id="contact" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono text-muted tracking-widest uppercase mb-4"
          >
            {t.contact.label}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-ink mb-4 leading-[1.05]"
              >
                {t.contact.title}
                <br />
                <em className="italic text-coral">{(t.contact as any).titleAccent ?? "let's talk."}</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-base text-muted leading-relaxed max-w-md"
              >
                {t.contact.subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-start lg:items-end gap-3"
            >
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-ink transition-colors duration-200"
                >
                  {link.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 h-px bg-[hsl(var(--border))] origin-left"
          />
        </div>
      </section>
    </>
  );
}
