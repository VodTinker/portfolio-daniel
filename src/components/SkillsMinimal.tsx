import { motion } from "framer-motion";
import { FiCode, FiLayers, FiDatabase, FiCpu, FiGlobe, FiZap } from "react-icons/fi";

const skills = {
  frontend: {
    title: "Frontend",
    icon: FiCode,
    color: "from-purple-500 to-pink-500",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"]
  },
  backend: {
    title: "Backend",
    icon: FiDatabase,
    color: "from-blue-500 to-cyan-500",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
  },
  systems: {
    title: "Sistemas",
    icon: FiCpu,
    color: "from-orange-500 to-red-500",
    items: ["Linux", "Docker", "Bash", "Redes", "Seguridad"]
  },
  tools: {
    title: "Herramientas",
    icon: FiZap,
    color: "from-green-500 to-emerald-500",
    items: ["Git", "VS Code", "Figma", "Vite", "npm/pnpm"]
  },
};

const SkillsMinimal = () => {
  return (
    <section id="skills" className="relative px-6 py-32 md:py-40">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <FiLayers className="w-4 h-4" />
            <span className="text-sm font-medium">Stack técnico</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Tecnologías que domino
          </h2>
          
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Un conjunto versátil de herramientas para crear soluciones completas
          </p>
        </motion.div>

        {/* Grid minimalista de skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(skills).map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500"
            >
              {/* Header de categoría */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              {/* Lista de skills */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium hover:border-foreground/20 hover:bg-foreground/10 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 text-center"
        >
          <FiGlobe className="w-8 h-8 mx-auto mb-4 text-foreground/60" />
          <h3 className="text-xl font-bold mb-2">Siempre aprendiendo</h3>
          <p className="text-foreground/60">
            Actualmente explorando: Machine Learning, Cloud Architecture y DevOps
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMinimal;
