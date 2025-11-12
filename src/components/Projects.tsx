import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { useState } from "react";
import { projects, projectCategories } from "../utils/projectsData";
import { useElementVisibility } from "../utils/useElementVisibility";
import ProjectCard from "./ui/ProjectCard";
import { commonStyles, animationProps } from "../utils/styleUtils";
import { SectionTitle, DecorativeEffects } from "./ui/SectionElements";
import DecorativeGrid from "./ui/DecorativeGrid";
import { useLanguage } from "../contexts/LanguageContext";

const Projects = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const isInView = useElementVisibility('projects');
  const { language } = useLanguage();
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="relative px-4 py-32 bg-gradient-to-b from-background to-muted/10 dark:from-background dark:to-muted/5 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DecorativeEffects
          positions={[
            { top: "-5rem", left: "-5rem" }, // -top-20 -left-20
            { top: "50%", right: "-5rem" }, // top-1/2 -right-20
          ]}
        />
        <DecorativeGrid />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionTitle 
          subtitle="Estos son algunos de mis proyectos recientes. Cada proyecto representa mis habilidades y experiencia en diferentes áreas."
          className="dark:text-gray-200"
        >
          Mis Proyectos
        </SectionTitle>
        {/* Oculta el filtro de categorías si hay 2 o menos proyectos */}
        {filteredProjects.length > 2 && (
          <motion.div 
            {...animationProps.staggerContainer(0.1, 0.2)}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {projectCategories.map((category) => (
              <motion.div
                role="button"
                tabIndex={0}
                {...animationProps.staggerItem()}
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveFilter(category.id);
                  }
                }}
                className={`${commonStyles.filterButtonBase} ${
                  activeFilter === category.id 
                    ? commonStyles.activeFilterButton
                    : commonStyles.inactiveFilterButton
                }`}
              >
                {category.name[language]}
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          {...animationProps.staggerContainer(0.15, 0.3)}
          className="grid gap-10 md:grid-cols-2"
        >
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} {...animationProps.staggerItem()}>
              <ProjectCard 
                project={project}
                index={index}
                hoveredId={hoveredId}
                onMouseEnter={setHoveredId}
                onMouseLeave={() => setHoveredId(null)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* "Ver más proyectos" button with enhanced styling */}
        <motion.div
          {...animationProps.scaleFadeIn(0.4)}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/VodTinker"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/90 px-7 py-4 text-center font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 overflow-hidden"
          >
            <span className="relative z-10">Ver más proyectos</span>
            <FiGithub className="relative z-10 ml-1 transition-transform duration-300 group-hover:rotate-6" size={18} />
            <div className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-primary/90 to-accent/90 transition-all duration-300 group-hover:w-full"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
