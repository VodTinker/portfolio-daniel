import { memo } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiCode, FiArrowRight } from "react-icons/fi";
import type { Project } from "../../utils/projectsData";
import { animationProps, commonStyles } from "../../utils/styleUtils";
import { useLanguage } from "../../contexts/LanguageContext";

interface ProjectCardProps {
  project: Project;
  index: number;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  hoveredId: number | null;
}

const ProjectCard = memo(({ 
  project, 
  index, 
  hoveredId, 
  onMouseEnter, 
  onMouseLeave 
}: ProjectCardProps) => {
  const { language } = useLanguage();

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}  
      viewport={{ once: false, margin: "-50px" }}  
      transition={{ 
        duration: 0.7, 
        delay: index * 0.2, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={commonStyles.cardContainer}
      onMouseEnter={() => onMouseEnter(project.id)}
      onMouseLeave={onMouseLeave}
      style={{
        boxShadow: hoveredId === project.id 
          ? '0 20px 60px rgba(139, 92, 246, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)' 
          : undefined
      }}
    >
      {/* Background gradient overlay */}      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-accent/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 z-0"
      />
      
      {/* Glow effect en las esquinas */}
      <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-tr from-transparent via-purple-500/20 to-primary/30 rounded-tl-3xl transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
      <div className="absolute -top-1 -left-1 w-24 h-24 bg-gradient-to-br from-transparent via-blue-500/20 to-primary/30 rounded-br-3xl transform -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
      
      <div className="relative z-10 overflow-hidden">
        {/* Project Image */}
        <div className="h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title[language]}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ 
              transformOrigin: hoveredId === project.id ? "center center" : "center 80%" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{project.title[language]}</h3>
              <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{project.description[language]}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/90 p-3 text-primary backdrop-blur-sm shadow-lg hover:bg-white transition-transform hover:scale-110 hover:-translate-y-1"
              aria-label={`Ver ${project.title[language]} en vivo`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/90 p-3 text-primary backdrop-blur-sm shadow-lg hover:bg-white transition-transform hover:scale-110 hover:-translate-y-1"
            aria-label={`${project.title[language]} repositorio GitHub`}
          >
            <FiGithub size={18} />
          </a>
        </div>
      </div>
      
      {/* Project Info */}
      <div className="p-8 relative z-10">
        <div className="mb-5 flex items-center gap-4">
          <div className="rounded-xl bg-primary/15 dark:bg-primary/25 p-4 text-primary dark:text-primary shadow-inner group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-all duration-500">
            <FiCode size={20} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">{project.title[language]}</h3>
        </div>
        <p className="mb-6 text-muted-foreground/90 dark:text-gray-300 leading-relaxed group-hover:text-muted-foreground dark:group-hover:text-gray-200 transition-colors duration-500">{project.description[language]}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={`${project.id}-${tag}`}
              className="rounded-full bg-primary/10 dark:bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-primary dark:text-primary shadow-sm group-hover:bg-primary/15 dark:group-hover:bg-primary/25 group-hover:shadow transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/30 dark:border-gray-700 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <span className="text-xs text-muted-foreground/70 dark:text-gray-400">Explorar proyecto</span>
          <div className="flex items-center gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                Ver demo <FiArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
