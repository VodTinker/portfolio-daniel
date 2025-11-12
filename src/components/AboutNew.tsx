import { motion } from "framer-motion";
import { 
  FiUser, FiHeart, FiCode, FiTrendingUp, 
  FiTarget, FiBookOpen, FiCpu, FiZap 
} from "react-icons/fi";

const features = [
  {
    icon: FiUser,
    title: "Quién Soy",
    description: "Estudiante de ASIR apasionado por la tecnología y la innovación. Me encanta resolver problemas complejos y crear soluciones elegantes.",
    gradient: "from-blue-500 to-cyan-500",
    size: "large", // ocupa 2 columnas
  },
  {
    icon: FiHeart,
    title: "Mis Pasiones",
    description: "Desarrollo web, IA, sistemas, automatización y aprendizaje continuo.",
    gradient: "from-red-500 to-pink-500",
    size: "small",
  },
  {
    icon: FiCode,
    title: "Stack Favorito",
    description: "React, TypeScript, Node.js, Python y tecnologías cloud.",
    gradient: "from-purple-500 to-indigo-500",
    size: "small",
  },
  {
    icon: FiTarget,
    title: "Mi Objetivo",
    description: "Convertirme en un profesional versátil capaz de desarrollar soluciones completas desde el backend hasta el frontend, con un enfoque especial en IA.",
    gradient: "from-orange-500 to-amber-500",
    size: "large",
  },
  {
    icon: FiBookOpen,
    title: "Aprendiendo",
    description: "Machine Learning, Cloud Architecture y DevOps.",
    gradient: "from-green-500 to-emerald-500",
    size: "small",
  },
  {
    icon: FiCpu,
    title: "Especialización",
    description: "Administración de Sistemas e Infraestructura IT.",
    gradient: "from-violet-500 to-purple-500",
    size: "small",
  },
];

const AboutNew = () => {
  return (
    <section id="about" className="relative px-4 py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <FiUser className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sobre Mí</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              Conoce mi Historia
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soy Daniel, un estudiante apasionado por crear experiencias digitales 
            innovadoras y sistemas robustos que marquen la diferencia.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative ${
                feature.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              {/* Card */}
              <div className="card h-full p-8 relative overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icono decorativo grande en el fondo */}
                <div className={`absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500`}>
                  <feature.icon className="w-40 h-40" />
                </div>

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icono del título */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 w-fit`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Título */}
                  <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-foreground/70 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Decorative line */}
                  <div className={`mt-6 h-1 w-20 bg-gradient-to-r ${feature.gradient} rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA para descargar CV */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
          >
            <FiZap className="w-5 h-5" />
            Descargar CV
            <FiTrendingUp className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutNew;
