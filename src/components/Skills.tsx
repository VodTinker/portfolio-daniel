import { motion } from "framer-motion";
import {
  FiCode,
  FiDatabase,
  FiLayout,
  FiServer,
  FiTool,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiShield,
  FiStar,
  FiBriefcase,
  FiCpu,
  FiChevronDown
} from "react-icons/fi";
import { 
  SiJavascript, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiMysql, 
  SiPython,
  SiReact,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiWebpack
} from "react-icons/si";
import { useElementVisibility } from "../utils/useElementVisibility";
import { animationProps } from "../utils/styleUtils";
import { useState, useEffect } from "react";

const Skills = () => {
  const isInView = useElementVisibility('skills');

  // Estado para la categoría activa
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Modificado: Ahora usamos un array simple en lugar de un objeto por categorías
  const [openSkills, setOpenSkills] = useState<string[]>([]);

  // Eliminado: Ya no necesitamos limpiar las habilidades al cambiar de categoría
  // useEffect(() => {
  //   setOpenSkills((prev) => ({ ...prev, [activeCategory]: [] }));
  // }, [activeCategory]);

  // Reset la categoría activa cuando se desplaza a otra sección
  useEffect(() => {
    if (!isInView) {
      setTimeout(() => {
        setActiveCategory("frontend");
      }, 500);
    }
  }, [isInView]);

  // Mapeo de iconos para las habilidades
  const skillIconMap: Record<string, JSX.Element> = {
    "HTML5": <SiHtml5 className="text-orange-500" />,
    "CSS3": <SiCss3 className="text-blue-500" />,
    "JavaScript (ES6+)": <SiJavascript className="text-yellow-500" />,
    "TypeScript": <SiTypescript className="text-blue-600" />,
    "React": <SiReact className="text-cyan-400" />,
    "Redux": <SiRedux className="text-purple-500" />,
    "Node.js": <SiNodedotjs className="text-green-500" />,
    "Tailwind CSS": <SiTailwindcss className="text-sky-400" />,
    "PostgreSQL": <SiPostgresql className="text-blue-400" />,
    "MySQL": <SiMysql className="text-orange-400" />,
    "Microsoft SQL Server": <FiDatabase className="text-red-500" />,
    "Git/GitHub": <SiGit className="text-orange-600" />,
    "Webpack": <SiWebpack className="text-blue-500" />,
    "Docker": <SiDocker className="text-blue-500" />,
    "Responsive Design": <FiLayout className="text-pink-500" />,
    "OpenAI APIs": <FiCpu className="text-green-500" />,
    "DeepSeek APIs": <FiCpu className="text-violet-500" />,
    "CI/CD": <FiZap className="text-yellow-500" />,
    "Python": (
      <img
        src="https://img.icons8.com/color/48/python--v1.png"
        alt="Python logo"
        className="w-8 h-8 object-contain"
        style={{ display: 'inline-block' }}
      />
    ),
    // "Jest": <FiStar className="text-red-400" />
  };

  const categories = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <FiLayout size={20} />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "backend",
      title: "Backend",
      icon: <FiServer size={20} />,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "database",
      title: "Bases de Datos",
      icon: <FiDatabase size={20} />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "tools",
      title: "Herramientas",
      icon: <FiTool size={20} />,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const skillsByCategory: Record<string, Array<{name: string, level: number, category: string, description: string}>> = {
    frontend: [
      // Ordenadas de mayor a menor nivel
      { name: "Responsive Design", level: 95, category: "frontend", description: "Diseño adaptable para todo tipo de dispositivos, con enfoque en mobile-first y técnicas de diseño fluido." },
      { name: "HTML5", level: 80, category: "frontend", description: "Lenguaje de marcado fundamental para estructurar páginas web. Incluye formularios avanzados, multimedia y APIs del navegador." },
      { name: "CSS3", level: 70, category: "frontend", description: "Lenguaje de estilos utilizado para diseñar y maquetar páginas web. Flexbox, Grid, animaciones y media queries para diseños responsivos." },
      { name: "Redux", level: 70, category: "frontend", description: "Gestión del estado de aplicaciones, middleware y Redux toolkit para flujos de datos predecibles." },
      { name: "Tailwind CSS", level: 70, category: "frontend", description: "Framework CSS de utilidad para construir interfaces rápidamente con clases predefinidas." },
      { name: "React", level: 60, category: "frontend", description: "Componentes funcionales, hooks, context API y optimización de renderizado." },
      { name: "JavaScript (ES6+)", level: 50, category: "frontend", description: "Lenguaje de programación versátil, esencial para el desarrollo web frontend y backend. Promises, async/await, módulos y destructuring." },
      { name: "TypeScript", level: 50, category: "frontend", description: "Superset de JavaScript que añade tipado estático, ideal para proyectos grandes y escalables con interfaces, genéricos y decoradores." },
    ],
    backend: [
      // Ordenadas de mayor a menor nivel
      { name: "OpenAI APIs", level: 90, category: "backend", description: "Integración avanzada con APIs de OpenAI para chat, generación de texto e imágenes, y modelos de IA." },
      { name: "DeepSeek APIs", level: 80, category: "backend", description: "Implementación de modelos DeepSeek para soluciones avanzadas de procesamiento de lenguaje." },
      { name: "Python", level: 45, category: "backend", description: "Lenguaje de programación multipropósito, popular en ciencia de datos, automatización y desarrollo web." },
      { name: "Node.js", level: 40, category: "backend", description: "Desarrollo de APIs RESTful, manejo de eventos asíncronos y middleware con Express." },
    ],
    database: [
      // Ordenadas de mayor a menor nivel
      { name: "Microsoft SQL Server", level: 75, category: "database", description: "Consultas complejas, procedimientos almacenados, transacciones y optimización de rendimiento." },
      { name: "Transact-SQL", level: 70, category: "database", description: "Extensión de SQL utilizada principalmente en Microsoft SQL Server para consultas y procedimientos almacenados." },
      { name: "PostgreSQL", level: 70, category: "database", description: "Diseño de esquemas, consultas avanzadas, funciones y triggers para aplicaciones robustas." },
      { name: "MySQL", level: 50, category: "database", description: "Modelado de datos, normalización, indexación y consultas para aplicaciones web." },
    ],
    tools: [
      // Ordenadas de mayor a menor nivel
      { name: "Git/GitHub", level: 90, category: "tools", description: "Control de versiones, flujos de trabajo con ramas, resolución de conflictos y CI/CD con GitHub Actions." },
      { name: "Webpack", level: 75, category: "tools", description: "Configuración avanzada, optimización de bundles y aplicación de loaders y plugins." },
      { name: "CI/CD", level: 70, category: "tools", description: "Implementación de pipelines para integración y despliegue continuo con herramientas modernas." },
      { name: "Docker", level: 65, category: "tools", description: "Containerización de aplicaciones, Docker Compose, redes y volúmenes para desarrollo y producción." },
    ],
  };

  // Eliminados los arrays de lenguajes de programación que ahora están integrados en las categorías

  const learning = [
    { name: "Protocolo MCP", icon: <FiCode size={18} className="text-primary" /> },
    { name: "Python", icon: <FiServer size={18} className="text-primary" /> },
    { name: "Ciberseguridad", icon: <FiShield size={18} className="text-primary" /> },
  ];

  const education = [
    { name: "Grado Superior ASIR", icon: <FiAward size={18} className="text-primary" />, status: "En curso" },
    { name: "Curso AI", icon: <FiAward size={18} className="text-primary" />, status: "En curso" },
    { name: "Curso Desarrollo Web", icon: <FiAward size={18} className="text-primary" />, status: "En curso" },
  ];

  const getLevelText = (level: number) => {
    if (level >= 85) return "Experto";
    if (level >= 70) return "Avanzado";
    if (level >= 50) return "Intermedio";
    return "Básico";
  };

  const getLevelColor = (level: number) => {
    if (level >= 85) return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
    if (level >= 70) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    if (level >= 50) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300';
  };

  // Función modificada para manejar correctamente el estado
  const toggleSkill = (skillName: string) => {
    setOpenSkills((prev) => {
      if (prev.includes(skillName)) {
        return prev.filter((name) => name !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
  };

  return (
    <section id="skills" className="relative px-4 py-32 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl opacity-30"></div>
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={`horizontal-${i}`}
                d={`M0 ${90 * (i + 1)} H1920`}
                stroke="url(#skills-grid-gradient)"
                strokeWidth="1"
                strokeDasharray="12 12"
              />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={`vertical-${i}`}
                d={`M${80 * (i + 1)} 0 V1080`}
                stroke="url(#skills-grid-gradient)"
                strokeWidth="1"
                strokeDasharray="12 12"
              />
            ))}
          </g>
          <defs>
            <linearGradient
              id="skills-grid-gradient"
              x1="0"
              y1="0"
              x2="1920"
              y2="1080"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Encabezado de sección */}
        <motion.div
          {...animationProps.springIn(0)}
          className="mb-12 text-center"
          transition={{ duration: 0.8, ease: "easeOut", stiffness: 100, damping: 15 }}
        >
          <motion.span 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary inline-block"
          >
            Experiencia
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="relative z-30 mt-5 mx-auto max-w-[616px] bg-gradient-to-br from-[#1e3a8a] from-30% via-[#3b82f6] via-80% to-[#a5b4fc] bg-clip-text font-title text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-transparent dark:from-[#d4dcf6] dark:via-[#5e4e94] dark:to-[#d9b8f7]"
          >
            Mis Habilidades
          </motion.h2>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mx-auto mt-6 h-1 rounded-full bg-primary/50"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
          >
            He trabajado con diversas tecnologías a lo largo de mi carrera.
            Aquí hay una visión general de mis habilidades técnicas.
          </motion.p>
        </motion.div>

        {/* Panel principal con navegación por pestañas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="rounded-xl bg-white/5 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm mb-16"
        >
          {/* Navegación por categorías */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 sm:gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary/15 text-primary shadow-md'
                    : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-muted-foreground'
                }`}
              >
                <div className="transition-transform duration-300 transform-gpu">
                  {category.icon}
                </div>
                <span className="font-medium">{category.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Panel de habilidades activas */}
          <div className="relative min-h-[300px]">
            {/* Habilidades por categoría */}
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: activeCategory === category.id ? 1 : 0,
                  x: activeCategory === category.id ? 0 : 20,
                  position: activeCategory === category.id ? 'relative' : 'absolute',
                  zIndex: activeCategory === category.id ? 10 : 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  mass: 0.85 
                }}
                className="w-full top-0 left-0"
                style={{ display: activeCategory === category.id ? 'block' : 'none' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skillsByCategory[category.id].map((skill) => {
                    // Definir color de la categoría
                    const categoryColor = {
                      frontend: 'from-blue-500 to-indigo-500',
                      backend: 'from-purple-500 to-violet-500',
                      database: 'from-emerald-500 to-teal-500',
                      tools: 'from-amber-500 to-orange-500',
                    }[category.id];
                    const borderColor = {
                      frontend: 'border-blue-600',
                      backend: 'border-purple-600',
                      database: 'border-emerald-600',
                      tools: 'border-amber-600',
                    }[category.id];
                    return (
                      <div
                        key={skill.name}
                        className="rounded-xl bg-white/5 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm flex flex-col relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-0" />
                        <div className="relative z-10 flex flex-col flex-1">
                          <div className="aspect-w-16 aspect-h-9 flex items-center justify-center p-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                              {skillIconMap[skill.name] || <FiBriefcase className="text-primary w-8 h-8" />}
                            </div>
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg font-semibold tracking-tight text-foreground drop-shadow-sm leading-tight">{skill.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-normal max-h-20 overflow-y-auto">
                              {skill.description}
                            </p>
                            <div className="flex flex-wrap text-xs gap-2 mt-auto">
                              <span className="px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/10 font-medium shadow-sm tracking-wide">
                                {getLevelText(skill.level)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificaciones y Aprendizaje */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Actualmente Aprendiendo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 18,
              mass: 0.9,
              delay: 0.3
            }}
            className="rounded-xl bg-white/5 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm flex flex-col"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-lg bg-primary/10 p-3 text-primary"
              >
                <FiTrendingUp size={24} />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-xl font-bold text-card-foreground"
              >
                Actualmente Aprendiendo
              </motion.h3>
            </div>
            <div className="grid gap-3 mt-2">
              {learning.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.08 + 0.15,
                    type: "spring",
                    stiffness: 250,
                    damping: 16
                  }}
                  className="flex items-center gap-3 rounded-lg bg-white/70 dark:bg-white/10 px-4 py-4 shadow-md hover:shadow-xl hover:scale-105 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="transform group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 18,
              mass: 0.9,
              delay: 0.4
            }}
            className="rounded-xl bg-white/5 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm flex flex-col"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, rotate: 10, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-lg bg-primary/10 p-3 text-primary"
              >
                <FiAward size={24} />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-xl font-bold text-card-foreground"
              >
                Certificaciones & Educación
              </motion.h3>
            </div>
            <div className="grid gap-3 mt-2">
              {education.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.08 + 0.15,
                    type: "spring",
                    stiffness: 250,
                    damping: 16
                  }}
                  className="flex items-center justify-between rounded-lg bg-white/70 dark:bg-white/10 px-4 py-4 shadow-md hover:shadow-xl hover:scale-105 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      className="transform transition-transform"
                    >
                      {item.icon}
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                      className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    >
                      {item.name}
                    </motion.span>
                  </div>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="text-xs text-primary rounded-full bg-primary/10 px-3 py-1"
                  >
                    {item.status}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Badge TryHackMe independiente - fuera de las cajas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 18,
            mass: 0.9,
            delay: 0.6
          }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.7,
              type: "spring",
              stiffness: 250,
              damping: 16
            }}
            className="rounded-xl bg-white/5 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm w-fit mx-auto"
          >
            <div className="flex flex-col items-center justify-center text-center space-y-3">
  <motion.span 
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
    className="text-muted-foreground font-medium text-sm block"
  >
    Perfil de TryHackMe 
  </motion.span>

                <iframe 
                  src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4826604" 
                  className="rounded-lg shadow-sm mx-auto"
                  style={{ 
                    border: 'none', 
                    width: '350px', 
                    height: '90px', 
                    background: 'transparent'
                  }}
                  title="TryHackMe Badge"
                  loading="lazy"
                ></iframe>

                <motion.a 
                  href="https://tryhackme.com/p/VoidThinker" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs text-primary hover:text-primary/80 transition-colors duration-300 font-medium inline-block"
                >
                  Ver perfil →
                </motion.a>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;