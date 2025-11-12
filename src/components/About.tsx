import { motion } from "framer-motion";
import { FiDownload, FiUser, FiBriefcase, FiAward, FiHeart, FiCode, FiStar, FiArrowRight } from "react-icons/fi";
import { animationProps } from "../utils/styleUtils";
import { SectionTitle, ContentCard, DecorativeEffects } from "./ui/SectionElements";
import DecorativeGrid from "./ui/DecorativeGrid";

const About = () => {
  return (
    <section
      id="about"
      className="relative px-4 py-32 bg-gradient-to-b from-background to-muted/10 dark:from-background dark:to-muted/5 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorativeEffects
          positions={[
            { top: "33%", right: "-10rem" }, // -right-40
            { bottom: "-5rem", left: "-5rem" }, // -bottom-20 -left-20
          ]}
        />
        <DecorativeGrid />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionTitle 
          badge="Descubre"
          subtitle="Conoce mi trayectoria profesional, mis pasiones y las experiencias que han dado forma a mi carrera."
        >
          Sobre Mí
        </SectionTitle>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            {...animationProps.fadeInLeft(0.2)}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 dark:border-purple-900/10 shadow-lg dark:shadow-purple-900/10 hover:shadow-xl transition-all duration-500"
          >
            {/* Background gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"
            />
            
            <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-transparent to-primary/20 rounded-tl-3xl transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-primary/15 p-4 text-primary shadow-inner group-hover:bg-primary/20 transition-all duration-500">
                  <FiUser size={24} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
                  Quién Soy
                </h3>
              </div>

              <div className="mb-8">
                <p className="mb-4 text-muted-foreground/90 leading-relaxed group-hover:text-muted-foreground transition-colors duration-500">
                  Soy estudiante de primer año de <span className="font-medium text-primary">ASIR</span> con una creciente pasión por la <span className="font-medium text-primary">Administración de Sistemas</span> y el <span className="font-medium text-primary">Desarrollo Web</span>. Aunque todavía estoy aprendiendo, ya he explorado tecnologías como <span className="font-medium text-primary">HTML</span>, <span className="font-medium text-primary">CSS</span> y <span className="font-medium text-primary">React</span>, y estoy ansioso por profundizar en el <span className="font-medium text-primary">desarrollo backend</span>.
                </p>
                <p className="mb-4 text-muted-foreground/90 leading-relaxed group-hover:text-muted-foreground transition-colors duration-500">
                  Mi viaje comenzó cuando empecé a experimentar con <span className="font-medium text-primary">HTML</span> y <span className="font-medium text-primary">CSS</span> en mi tiempo libre. Ahora, mientras continúo mis estudios, estoy particularmente entusiasmado por explorar la <span className="font-medium text-primary">Inteligencia Artificial</span> y cómo puede transformar el mundo de la tecnología.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <h4 className="mb-4 font-bold text-foreground">Mis Pasiones</h4>
                <motion.div 
                  {...animationProps.staggerContainer(0.1, 0)}
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.div 
                    {...animationProps.staggerItem()}
                    className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <FiCode size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Desarrollo Web</span>
                  </motion.div>
                  <motion.div 
                    {...animationProps.staggerItem()}
                    className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <FiHeart size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Videojuegos</span>
                  </motion.div>
                  <motion.div 
                    {...animationProps.staggerItem()}
                    className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <FiStar size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Tendencias Tech</span>
                  </motion.div>
                  <motion.div 
                    {...animationProps.staggerItem()}
                    className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <FiAward size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">IA</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...animationProps.fadeInRight(0.4)}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 dark:border-purple-900/10 shadow-lg dark:shadow-purple-900/10 hover:shadow-xl transition-all duration-500"
          >
            {/* Background gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0"
            />
            
            <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-transparent to-accent/20 rounded-tl-3xl transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-primary/15 p-4 text-primary shadow-inner group-hover:bg-primary/20 transition-all duration-500">
                  <FiBriefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
                  Mi Experiencia
                </h3>
              </div>

              <div className="space-y-6">
                {/* Practicum Experience */}
                <div className="transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="group relative rounded-xl border border-transparent bg-card/50 p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/10 transition-all duration-500">
                    {/* Background gradient overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-xl"
                    />
                    <div className="mb-2 flex justify-between items-center relative z-10">
                      <h4 className="font-semibold text-card-foreground">Prácticas en Empresa</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">2025</span>
                    </div>
                    <h5 className="mb-2 font-medium text-primary relative z-10">Castroalonso Asesoría S.L</h5>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed relative z-10">
                      Desarrollé una página web con conexión a base de datos SQL como parte de mis prácticas académicas. 
                      También fui responsable de gestionar máquinas virtuales Linux (Ubuntu Server) y de solucionar problemas de hardware en un portátil.
                    </p>
                  </div>
                </div>

                {/* Personal Projects */}
                <div className="transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="group relative rounded-xl border border-transparent bg-card/50 p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/10 transition-all duration-500">
                    {/* Background gradient overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-xl"
                    />
                    <div className="mb-2 flex justify-between items-center relative z-10">
                      <h4 className="font-semibold text-card-foreground">Proyecto Personal</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">2024</span>
                    </div>
                    <h5 className="mb-2 font-medium text-primary relative z-10">Discord Bot con OpenAI</h5>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed relative z-10">
                      Desarrollé un bot de Discord usando la API de OpenAI para proporcionar respuestas interactivas. El bot puede manejar diversas
                      consultas de usuarios y mantener conversaciones naturales, demostrando mis habilidades con APIs e integración backend.
                    </p>
                  </div>
                </div>

                <div className="transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="group relative rounded-xl border border-transparent bg-card/50 p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/10 transition-all duration-500">
                    {/* Background gradient overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0 rounded-xl"
                    />
                    <div className="mb-2 flex justify-between items-center relative z-10">
                      <h4 className="font-semibold text-card-foreground">Proyecto Personal</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">2024</span>
                    </div>
                    <h5 className="mb-2 font-medium text-primary relative z-10">Web Scraping con Selenium</h5>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed relative z-10">
                      Creé múltiples scripts de web scraping utilizando Selenium para automatizar la recopilación y procesamiento de datos de varios
                      sitios web. Este proyecto reforzó mis habilidades en Python, automatización web y manejo de contenido dinámico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
