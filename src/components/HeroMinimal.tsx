import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";

const HeroMinimal = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto max-w-6xl"
      >
        {/* Minimalista - Sin imagen, todo enfocado en tipografía */}
        <div className="space-y-12">
          
          {/* Etiqueta pequeña arriba */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Disponible para proyectos</span>
            </div>
          </motion.div>

          {/* Título minimalista gigante */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              <span className="block">Daniel</span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Fonov
              </span>
            </h1>
          </motion.div>

          {/* Subtítulo minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <p className="text-2xl md:text-3xl font-light text-foreground/70">
              Administrador de Sistemas & Full Stack Developer
            </p>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed">
              Creando experiencias digitales elegantes y sistemas robustos.
              Estudiante de ASIR con pasión por el código limpio y la innovación.
            </p>
          </motion.div>

          {/* CTAs minimalistas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:gap-4 hover:pr-6"
            >
              Ver trabajos
              <FiArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground/20 rounded-full font-medium transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/5"
            >
              <FiMail className="w-5 h-5" />
              Contacto
            </a>
          </motion.div>

          {/* Redes minimalistas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6 pt-8"
          >
            <span className="text-sm text-foreground/40">Encuéntrame en</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/VodTinker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-fonov-b897a82b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://discord.gg/mszf2A6T"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
                aria-label="Discord"
              >
                <RiDiscordLine size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator minimalista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground/30"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroMinimal;
