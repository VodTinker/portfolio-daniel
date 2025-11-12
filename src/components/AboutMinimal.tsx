import { motion } from "framer-motion";
import { FiUser, FiCode, FiTrendingUp, FiCpu } from "react-icons/fi";

const AboutMinimal = () => {
  return (
    <section id="about" className="relative px-6 py-32 md:py-40">
      <div className="container mx-auto max-w-6xl">
        
        {/* Layout asimétrico moderno */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Columna izquierda - Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10">
              <FiUser className="w-4 h-4" />
              <span className="text-sm font-medium">Sobre mí</span>
            </div>

            {/* Título grande */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Construyendo el
              <span className="block text-foreground/40">futuro digital</span>
            </h2>

            {/* Descripción */}
            <div className="space-y-6 text-lg md:text-xl text-foreground/70 leading-relaxed">
              <p>
                Soy un <span className="text-foreground font-medium">estudiante de ASIR</span> apasionado 
                por la tecnología y la innovación. Mi enfoque está en crear soluciones elegantes que 
                combinen diseño y funcionalidad.
              </p>
              <p>
                Especializado en <span className="text-foreground font-medium">administración de sistemas</span>,{" "}
                <span className="text-foreground font-medium">desarrollo full stack</span> e{" "}
                <span className="text-foreground font-medium">inteligencia artificial</span>. 
                Siempre buscando aprender y mejorar.
              </p>
            </div>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-12 pt-8 border-t border-foreground/10">
              <div>
                <div className="text-4xl font-bold">2+</div>
                <div className="text-sm text-foreground/50 mt-1">Años de experiencia</div>
              </div>
              <div>
                <div className="text-4xl font-bold">20+</div>
                <div className="text-sm text-foreground/50 mt-1">Tecnologías</div>
              </div>
              <div>
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm text-foreground/50 mt-1">Proyectos</div>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - Cards de expertise */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Card 1 */}
            <div className="group p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500">
              <FiCode className="w-8 h-8 mb-4 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">Full Stack Development</h3>
              <p className="text-foreground/60">
                React, TypeScript, Node.js, y tecnologías modernas para crear aplicaciones web robustas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500">
              <FiCpu className="w-8 h-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Administración de Sistemas</h3>
              <p className="text-foreground/60">
                Linux, redes, seguridad y gestión de infraestructura IT empresarial.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500">
              <FiTrendingUp className="w-8 h-8 mb-4 text-cyan-500" />
              <h3 className="text-xl font-bold mb-2">Inteligencia Artificial</h3>
              <p className="text-foreground/60">
                Machine Learning, Python y exploración de las posibilidades de la IA.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMinimal;
