import { FiGithub, FiLinkedin, FiArrowUp, FiCode, FiHeart, FiCpu } from "react-icons/fi";
import { SiGithubcopilot } from "react-icons/si";
import { RiDiscordLine } from "react-icons/ri";
import { FaReact, FaRobot } from "react-icons/fa";
import { SiTypescript, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";
import { animationProps, commonStyles } from "../utils/styleUtils";
import { navLinks, socialLinks } from "../utils/navigationConfig";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-border bg-none dark:bg-none px-4 py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16 mb-12">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <motion.h2 
              {...animationProps.fadeInUpSubtle()}
              className={`${commonStyles.gradientHeading} text-3xl !mx-0 md:!mx-0 leading-[1.1]`}
            >
              Daniel Fonov García
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "120px" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent"
            ></motion.div>
            <motion.p 
              {...animationProps.fadeInUpSubtle(0.2)}
              className="mt-4 text-muted-foreground dark:text-gray-300 text-center md:text-left"
            >
              Administrador de Sistemas, Desarrollador Web <br />y Entusiasta de IA
            </motion.p>

            {/* Social Icons */}
            <motion.div 
              {...animationProps.fadeInUpSubtle(0.3)}
              className="mt-6 flex space-x-4"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-card/80 p-3 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:text-primary hover:shadow-lg dark:bg-white/10 dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="GitHub"
              >
                <FiGithub size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-card/80 p-3 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:text-primary hover:shadow-lg dark:bg-white/10 dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-card/80 p-3 text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:text-primary hover:shadow-lg dark:bg-white/10 dark:hover:bg-white/20 dark:hover:text-white"
                aria-label="Discord"
              >
                <RiDiscordLine size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            </motion.div>
          </div>

          {/* Links */}
          <motion.div 
            {...animationProps.fadeInUpSubtle(0.2)}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-5 text-foreground dark:text-white">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-3">
              {navLinks.filter(link => link.href !== "#home").map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="group flex items-center text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary"></span>
                  {link.key}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Additional Resources */}
          <motion.div 
            {...animationProps.fadeInUpSubtle(0.3)}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-5 text-foreground dark:text-white">Recursos</h3>
            <div className="flex flex-col space-y-3">
              <a href="#projects" className="group flex items-center text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary"></span>
                Ver Portfolio
              </a>
              <a href="#contact" className="group flex items-center text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/60 group-hover:bg-primary"></span>
                Chatbot IA
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          {...animationProps.fadeInUpSubtle(0.4)}
          className="flex flex-col items-center justify-between gap-6 border-t border-border/60 dark:border-gray-700 pt-6 md:flex-row"
        >
          <div className="flex items-center text-sm text-muted-foreground dark:text-gray-300">
            <span className="text-foreground dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-all duration-300">© {new Date().getFullYear()} Daniel Fonov García</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground dark:text-gray-300">
            <span className="flex items-center gap-1 flex-wrap">
              Hecho con
              <span className="ml-1 dark:text-gray-200">Github Copilot</span>
              <SiGithubcopilot className="dark:text-gray-200" />
              <span className="ml-1 dark:text-gray-200">+</span>
              <span className="ml-1 dark:text-gray-200">React</span>
              <FaReact className="mx-1 text-cyan-400 dark:text-cyan-300" size={16} title="React" />
              <span className="ml-1 dark:text-gray-200">+</span>
              <span className="ml-1 dark:text-gray-200">TypeScript</span>
              <SiTypescript className="mx-1 text-blue-600 dark:text-blue-400" size={16} title="TypeScript" />
              <span className="ml-1 dark:text-gray-200">+</span>
              <span className="ml-1 dark:text-gray-200">TailwindCSS</span>
              <SiTailwindcss className="mx-1 text-sky-400 dark:text-sky-300" size={16} title="TailwindCSS" />
            </span>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToTop}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80 text-white shadow-lg shadow-primary/25 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-primary/30 focus:outline-none overflow-hidden"
            aria-label="Scroll to top"
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <FiArrowUp size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px]" />
            <span className="absolute -bottom-8 left-0 right-0 h-8 bg-white/20 blur-md transform transition-transform duration-500 group-hover:translate-y-[-8px]"></span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
