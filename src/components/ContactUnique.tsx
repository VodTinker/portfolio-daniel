import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const CONTACT_EMAIL = "danielfonov71@vodtinker.dev";

export default function ContactUnique() {
  const { t } = useLanguage();

  const links = [
    { label: t.contact.email,   href: `mailto:${CONTACT_EMAIL}`,                   external: false },
    { label: t.contact.github,  href: "https://github.com/VodTinker",              external: true  },
    { label: t.contact.linkedin,href: "https://linkedin.com/in/daniel-fonov",      external: true  },
    { label: t.contact.discord, href: "https://discord.com/users/vodtinker",       external: true  },
  ];

  return (
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
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-ink mb-5"
            >
              {t.contact.title}
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

          {/* Links */}
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

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 h-px bg-[hsl(var(--border))] origin-left"
        />
      </div>
    </section>
  );
}
