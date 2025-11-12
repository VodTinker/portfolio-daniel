import { motion } from "framer-motion";
import { SectionTitle } from "./ui/SectionElements";
import { animationProps } from "../utils/styleUtils";
// import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const Playground = () => {
    const words = [
    {
      text: "Crea",
    },
    {
      text: "experiencias",
    },
    {
      text: "digitales",
    },
    {
      text: "impresionantes",
    },
    {
      text: "con",
    },
    {
      text: "código.",
      className: "text-primary dark:text-primary",
    },
  ];
  return (
    <section
      id="playground"
      className="relative px-4 py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle
          badge="Laboratorio"
          subtitle="Un espacio para experimentar con componentes de UI, animaciones y otras ideas creativas."
        >
          Playground
        </SectionTitle>

        <motion.div
          {...animationProps.fadeInUp(0.2)}
          className="p-8 bg-white/5 backdrop-blur-sm border border-white/5 dark:border-purple-900/10 rounded-2xl shadow-lg dark:shadow-purple-900/10"
        >
          <h3 className="text-xl font-bold mb-4">Efecto Máquina de Escribir</h3>
          <p className="text-muted-foreground mb-6">
            Este es uno de los componentes que he creado. ¡Pasa el cursor sobre el texto para ver la animación!
          </p>
          <div className="flex flex-col items-center justify-center h-[20rem]">
            {/* <TypewriterEffectSmooth words={words} /> */}
            <p className="text-2xl font-bold">Typewriter Effect Here</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Playground;
