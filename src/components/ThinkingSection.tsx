import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const clusterSkills = [
  ["Linux", "Docker", "Proxmox", "Nginx", "Caddy", "Tailscale"],
  ["React", "TypeScript", "Python", "Node.js", "Bash", "HTML/CSS"],
  ["n8n", "Selenium", "Git", "CI/CD"],
];

const clusterLabels = ["infra", "dev", "automation"] as const;

export default function ThinkingSection() {
  const { t } = useLanguage();

  return (
    <section id="thinking" className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 sm:gap-16 lg:gap-20">

          {/* Left: prose */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-muted tracking-widest uppercase mb-4"
            >
              {t.thinking.label}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mb-10"
            >
              {t.thinking.title}
              <br />
              <em className="italic text-coral">{(t.thinking as any).titleAccent ?? "seriously."}</em>
            </motion.h2>

            <div className="space-y-6">
              {t.thinking.prose.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                  className="text-base text-muted leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Timeline badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3 mt-8 sm:mt-10 pt-10 border-t border-[hsl(var(--border))]"
            >
              <span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm">
                {t.thinking.since2022}
              </span>
              <span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm">
                {t.thinking.since2024}
              </span>
            </motion.div>
          </div>

          {/* Right: tech clusters — estilo card claro */}
          <div className="space-y-4">
            {clusterLabels.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="border border-[hsl(var(--border))] rounded-sm p-5 bg-[hsl(var(--surface))]"
              >
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-3">
                  {t.thinking.clusters[key]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {clusterSkills[i].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs font-mono text-muted border border-[hsl(var(--border))] rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
