import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder, FiArrowUpRight } from "react-icons/fi";
import { projects } from "../utils/projectsData";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ProjectsMinimal = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { language } = useLanguage();

  return (
    <section id="projects" className="relative px-6 py-32 md:py-40">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
            <FiFolder className="w-4 h-4" />
            <span className="text-sm font-medium">Trabajos seleccionados</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                Proyectos destacados
              </h2>
            </div>
            <div>
              <p className="text-xl text-foreground/60 leading-relaxed">
                Una selección de proyectos que muestran mi experiencia 
                en desarrollo full stack, sistemas y tecnologías modernas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid - Estilo minimalista */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-all duration-500">
                
                {/* Imagen del proyecto */}
                <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-foreground/5">
                  <div className="aspect-video relative">
                    <img
                      src={project.image}
                      alt={project.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Contenido del proyecto */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Número del proyecto */}
                    <div className="text-sm font-mono text-foreground/40">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Título */}
                    <h3 className="text-3xl md:text-4xl font-bold group-hover:text-foreground/80 transition-colors duration-300">
                      {project.title[language]}
                    </h3>

                    {/* Descripción */}
                    <p className="text-lg text-foreground/60 leading-relaxed">
                      {project.description[language]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-6">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:gap-3"
                      >
                        Ver proyecto
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/20 rounded-full font-medium transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/5"
                    >
                      <FiGithub className="w-4 h-4" />
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA para ver más */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/VodTinker"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-foreground/20 font-medium transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/5"
          >
            Ver todos los proyectos en GitHub
            <FiArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsMinimal;
