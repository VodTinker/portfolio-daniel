import type { HTMLMotionProps } from "framer-motion";

/**
 * Estilos comunes para componentes reutilizables
 */
export const commonStyles = {
  // Contenedores de tarjetas con efecto hover
  cardContainer: "group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 dark:border-purple-900/30 shadow-lg dark:shadow-purple-900/10 hover:shadow-xl transition-all duration-500",
  
  // Títulos con gradiente para secciones
  gradientHeading: "relative z-30 mx-auto max-w-[616px] bg-gradient-to-br from-[#1e3a8a] from-30% via-[#3b82f6] via-80% to-[#a5b4fc] bg-clip-text font-title text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-transparent dark:from-[#d4dcf6] dark:via-[#5e4e94] dark:to-[#d9b8f7]",
  
  // Separador debajo de los títulos
  headingDivider: "mx-auto mt-6 h-1 w-24 rounded-full bg-primary/50 dark:bg-primary/80",
  
  // Subtítulo para secciones
  sectionSubtitle: "mx-auto mt-8 max-w-2xl text-lg text-muted-foreground dark:text-gray-300",
  
  // Contenedor para los efectos de fondo borrosos
  blurEffectsContainer: "absolute inset-0 overflow-hidden pointer-events-none",
  
  // Efecto de fondo borroso primario
  primaryBlurEffect: "bg-primary/5 rounded-full filter blur-3xl opacity-70",
  
  // Efecto de fondo borroso de acento
  accentBlurEffect: "bg-accent/5 rounded-full filter blur-3xl opacity-70",
  
  // Botón de categoría/filtro activo
  activeFilterButton: "bg-primary text-white shadow-lg shadow-primary/20 dark:shadow-primary/30",
  
  // Botón de categoría/filtro inactivo
  inactiveFilterButton: "bg-card/80 hover:bg-card text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary dark:bg-white/5 dark:hover:bg-white/10",
  
  // Base para botones de filtro
  filterButtonBase: "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
};

/**
 * Configuraciones de animación reutilizables para componentes
 */
export const animationProps = {
  // Animación de entrada desde abajo (con retraso personalizable)
  fadeInUp: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.7, delay, ease: "easeOut" }
  }),
  
  // Animación más sutil (con retraso personalizable)
  fadeInUpSubtle: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 0.5, delay, ease: "easeOut" }
  }),
  
  // Animación de entrada desde la izquierda
  fadeInLeft: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, delay, ease: "easeOut" }
  }),
  
  // Animación de entrada desde la derecha
  fadeInRight: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: false },
    transition: { duration: 0.6, delay, ease: "easeOut" }
  }),
  
  // Animación de escala con desvanecimiento
  scaleFadeIn: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: false, margin: "-100px" },
    transition: { duration: 0.7, delay, ease: "easeOut" }
  }),
  
  // Animación con efecto de resorte
  springIn: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { 
      type: "spring", 
      stiffness: 100, 
      delay, 
      mass: 0.5 
    }
  }),
  
  // Animación con staggering para elementos en listas
  staggerContainer: (staggerChildren: number = 0.1, delayChildren: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: false },
    transition: {
      delayChildren,
      staggerChildren, 
      ease: "easeOut"
    }
  }),
  
  // Animación para hijos en un contenedor con stagger
  staggerItem: (delay: number = 0): HTMLMotionProps<"div"> => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut"
    }
  })
};

/**
 * Componente decorativo para los elementos del grid de fondo
 * Se puede usar en cualquier sección que necesite el grid
 */
export const decorativeGridMarkup = `
<svg
  className="absolute top-0 left-0 w-full opacity-10 dark:opacity-5"
  viewBox="0 0 1920 1080"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g opacity="0.2">
    <path
      d="M0 0L1920 0L1920 1080L0 1080L0 0Z"
      stroke="url(#grid-gradient)"
      strokeWidth="1.5"
      strokeDasharray="12 12"
    />
    {Array.from({ length: 12 }).map((_, i) => (
      <path
        key={\`horizontal-\${i}\`}
        d={\`M0 \${90 * (i + 1)} H1920\`}
        stroke="url(#grid-gradient)"
        strokeWidth="1"
        strokeDasharray="12 12"
      />
    ))}
    {Array.from({ length: 24 }).map((_, i) => (
      <path
        key={\`vertical-\${i}\`}
        d={\`M\${80 * (i + 1)} 0 V1080\`}
        stroke="url(#grid-gradient)"
        strokeWidth="1"
        strokeDasharray="12 12"
      />
    ))}
  </g>
  <defs>
    <linearGradient
      id="grid-gradient"
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
`;

/**
 * Genera markup HTML para efectos borrosos de fondo
 */
export const generateBlurEffects = (positions: { top?: string; bottom?: string; left?: string; right?: string }[]) => {
  return positions.map((pos, index) => {
    const style = {
      position: "absolute",
      width: "24rem", // w-96
      height: "24rem", // h-96
      ...(pos.top && { top: pos.top }),
      ...(pos.bottom && { bottom: pos.bottom }),
      ...(pos.left && { left: pos.left }),
      ...(pos.right && { right: pos.right }),
    };
    
    const className = index % 2 === 0 
      ? "bg-primary/5 rounded-full filter blur-3xl opacity-70"
      : "bg-accent/5 rounded-full filter blur-3xl opacity-70";
      
    return `<div className="${className}" style="${Object.entries(style).map(([k, v]) => `${k}: ${v};`).join(' ')}"></div>`;
  });
};
