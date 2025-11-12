import { motion } from "framer-motion";
import { FiCode, FiFolder, FiAward, FiZap, FiHeart, FiTrendingUp } from "react-icons/fi";

const stats = [
  {
    icon: FiCode,
    value: "20+",
    label: "Tecnologías",
    description: "Dominadas",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FiFolder,
    value: "15+",
    label: "Proyectos",
    description: "Completados",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FiAward,
    value: "ASIR",
    label: "Estudiante",
    description: "1er Año",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: FiZap,
    value: "2+",
    label: "Años",
    description: "Experiencia",
    gradient: "from-green-500 to-emerald-500",
  },
];

const StatsSection = () => {
  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              En Números
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria hasta ahora, medida en experiencias y logros
          </p>
        </motion.div>

        {/* Grid de estadísticas - Bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card con glassmorphism */}
              <div className="card relative h-full p-8 overflow-hidden">
                {/* Gradient background animado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icono grande */}
                <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                  <stat.icon className={`w-8 h-8 text-transparent bg-gradient-to-br ${stat.gradient} bg-clip-text`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                </div>

                {/* Contenido */}
                <div className="relative z-10">
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-tl ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
            <FiHeart className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-foreground/80">Apasionado por aprender y crecer cada día</span>
            <FiTrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
