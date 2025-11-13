import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";

const HeroNew = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Layout centrado */}
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Imagen de perfil grande y llamativa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-glow" style={{ boxShadow: 'rgba(139, 92, 246, 0.4) 0px 0px 80px 40px' }}></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full border-4 border-purple-500/60 dark:border-purple-400/60 bg-gradient-to-br from-white/10 to-white/20 dark:from-black/20 dark:to-black/40 shadow-2xl group-hover:border-purple-400/80 transition-all duration-500">
                <img 
                  src="Menhera-removebg-preview.webp" 
                  alt="Daniel Fonov García" 
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Título principal más grande */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl font-medium text-primary">
              Hola, soy
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#a5b4fc] dark:from-[#e0e0e0] dark:via-[#a78bfa] dark:to-[#c084fc] bg-clip-text text-transparent hero-title leading-tight">
              Daniel Fonov García
            </h1>
          </motion.div>

          {/* Subtítulos con mejor espaciado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gradient">
              Administrador de Sistemas
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gradient">
              Desarrollador Web Full Stack
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gradient">
              Entusiasta de IA
            </h2>
          </motion.div>

          {/* Descripción más concisa */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            Estudiante de <span className="font-semibold text-primary">ASIR</span> apasionado por la tecnología, 
            el desarrollo web y la inteligencia artificial. Creando soluciones innovadoras y 
            aprendiendo constantemente.
          </motion.p>

          {/* Botones de acción grandes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <a
              href="#projects"
              className="button-primary px-8 py-4 text-lg font-semibold inline-flex items-center gap-3"
            >
              Ver mis proyectos
              <FiArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="button-secondary px-8 py-4 text-lg font-semibold inline-flex items-center gap-3"
            >
              Contactar
              <FiMail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Redes sociales con iconos más grandes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex gap-6 mt-8"
          >
            <a
              href="https://github.com/VodTinker"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm p-4 text-foreground/80 transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:text-primary border border-white/20 dark:border-white/10"
              aria-label="GitHub"
            >
              <FiGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-fonov-b897a82b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm p-4 text-foreground/80 transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:text-primary border border-white/20 dark:border-white/10"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={28} />
            </a>
            <a
              href="https://discord.gg/mszf2A6T"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm p-4 text-foreground/80 transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:text-primary border border-white/20 dark:border-white/10"
              aria-label="Discord"
            >
              <RiDiscordLine size={28} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroNew;
