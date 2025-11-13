import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import { animationProps } from "../utils/styleUtils";

// Hook para detectar móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const Hero = () => {
  const isMobile = useIsMobile();
  const baseDuration = isMobile ? 1.2 : 0.8;
  const delayStep = isMobile ? 0.5 : 0.2;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);
  const animProps = (delayMultiplier: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delayMultiplier * delayStep, duration: baseDuration, ease: "easeOut" },
  });

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-16 pr-6 pl-6 relative overflow-hidden"
      style={{ position: 'relative' }}
    >
      <div className="relative z-10 w-full">
        {/* Contenido original Hero */}
        <div className="container relative z-10 mx-auto grid gap-10 md:gap-16 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="mb-4 md:mb-6 h-1 bg-primary w-10 md:w-16" style={{ width: 60 }}></div>
            <p className="mb-2 md:mb-4 text-base md:text-lg font-medium text-primary text-center md:text-left" style={{ opacity: 1 }}>Hola, soy</p>
            <h1 className="mb-2 md:mb-4 relative z-30 max-w-[90vw] md:max-w-[616px] bg-gradient-to-br from-[#1e3a8a] from-30% via-[#3b82f6] via-80% to-[#a5b4fc] bg-clip-text font-title text-4xl sm:text-4xl md:text-[2.6rem] lg:text-[2.8rem] font-semibold leading-[1.15] tracking-tight text-transparent dark:from-[#e0e0e0] dark:via-[#5f4b8b] dark:to-[#b5a7d9] text-center md:text-left whitespace-nowrap overflow-hidden text-ellipsis"><span style={{ opacity: 1 }}>Daniel Fonov García</span></h1>
            <div className="custom-title mt-1 mb-2 md:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-200 text-center md:text-left" style={{ opacity: 1 }}>
              <div className="overflow-hidden"><h2 className="font-satoshi text-gradient">Técnico en Administración</h2></div>
              <div className="overflow-hidden"><h2 className="font-satoshi text-gradient">de Sistemas Informáticos</h2></div>
              <div className="overflow-hidden"><h2 className="font-satoshi text-gradient">en Red (ASIR)</h2></div>
            </div>
            <p className="mt-4 md:mt-6 max-w-xs sm:max-w-md text-base md:text-lg text-muted-foreground leading-relaxed text-center md:text-left" style={{ opacity: 1 }}>Estudiante de segundo año de <span className="font-medium text-primary">ASIR</span>, especializado en <span className="font-medium text-primary">administración de sistemas Linux</span>, <span className="font-medium text-primary">redes</span> y <span className="font-medium text-primary">virtualización</span>. Apasionado por la automatización y la tecnología.<p></p>¡Bienvenido a mi portfolio!</p>
            <div className="mt-6 md:mt-8 flex flex-col md:flex-row flex-wrap gap-4 md:gap-5 items-center md:items-start justify-center md:justify-start w-full">
              {/* Botón Ver proyectos adaptado */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium px-6 py-3 shadow-md transition-all duration-300 hover:bg-primary/80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <FiArrowRight className="w-4 h-4" />
                Ver proyectos
              </a>
              {/* Botón Contacta conmigo adaptado */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary font-medium px-6 py-3 bg-transparent transition-all duration-300 hover:bg-primary/10 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <FiArrowRight className="w-4 h-4" />
                Contacta conmigo
              </a>
            </div>
            <div className="mt-8 md:mt-12 flex space-x-4 md:space-x-6 justify-center md:justify-start" style={{ opacity: 1 }}>
              {/* GitHub */}
              <div className="inline-block" style={{ opacity: 1 }}>
                <a
                  href="https://github.com/VodTinker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-muted/60 p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-md dark:bg-white/5 dark:text-[#a78bfa] dark:hover:text-white inline-flex"
                  aria-label="GitHub"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"></span>
                  <FiGithub size={24} className="relative z-10" />
                </a>
              </div>
              {/* LinkedIn */}
              <div className="inline-block" style={{ opacity: 1 }}>
                <a
                  href="https://www.linkedin.com/in/daniel-fonov-b897a82b3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-muted/60 p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-md dark:bg-white/5 dark:text-[#a78bfa] dark:hover:text-white inline-flex"
                  aria-label="LinkedIn"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"></span>
                  <FiLinkedin size={24} className="relative z-10" />
                </a>
              </div>
              {/* Discord */}
              <div className="inline-block" style={{ opacity: 1 }}>
                <a
                  href="https://discord.gg/mszf2A6T"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-muted/60 p-3 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-md dark:bg-white/5 dark:text-[#a78bfa] dark:hover:text-white inline-flex"
                  aria-label="Discord"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"></span>
                  <RiDiscordLine size={24} className="relative z-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 md:mt-0" style={{ opacity: 1 }}>
            <div className="group relative animate-float">
              {/* Resplandor pulsante de fondo */}
              <div className="absolute inset-0 rounded-full animate-glow" style={{ boxShadow: 'rgba(139, 92, 246, 0.3) 0px 0px 60px 30px' }}></div>
              
              {/* Anillo exterior animado */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-pink-500/30 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
              
              {/* Imagen de perfil */}
              <div className="relative h-40 w-40 md:h-64 md:w-64 overflow-hidden rounded-full border-4 border-primary/60 backdrop-blur-sm dark:border-purple-500/60 bg-gradient-to-br from-white/10 to-white/20 dark:from-black/10 dark:to-black/30 shadow-2xl z-10 group-hover:border-purple-400/80 transition-all duration-500">
                <img src="Menhera-removebg-preview.webp" alt="Imagen de Perfil" className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              {/* Resplandor hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/30 via-blue-500/20 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
