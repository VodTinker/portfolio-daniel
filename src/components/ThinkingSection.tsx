import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import ClusterIllustration from "./ui/illustrations/ClusterIllustration";

const clusterSkills = [
  ["Linux", "Docker", "Proxmox", "Nginx", "Caddy", "Tailscale"],
  ["React", "TypeScript", "Python", "Node.js", "Bash", "HTML/CSS"],
  ["n8n", "Selenium", "Git", "CI/CD"],
];

const clusterAccent = [
  "border-terracotta/40",
  "border-sage/40",
  "border-lavender/40",
] as const;

export default function ThinkingSection() {
  const { t } = useLanguage();

  return (
    <section id="thinking" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20">

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
              className="font-serif text-4xl sm:text-5xl font-light text-ink mb-10"
            >
              {t.thinking.title}
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
              className="flex gap-4 mt-10 pt-10 border-t border-[hsl(var(--border))]"
            >
              <span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm">
                {t.thinking.since2022}
              </span>
              <span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm">
                {t.thinking.since2024}
              </span>
            </motion.div>
          </div>

          {/* Right: tech clusters */}
          <div className="space-y-4">
            {(["infra", "dev", "automation"] as const).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className={`border ${clusterAccent[i]} rounded-sm p-5 bg-[hsl(var(--surface))]`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-muted">
                    <ClusterIllustration variant={i as 0 | 1 | 2} />
                  </div>
                  <span className="text-sm font-mono text-ink">
                    {t.thinking.clusters[key]}
                  </span>
                </div>
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
