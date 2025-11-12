import type { Variants } from "framer-motion";

// ============================================
// PROFESSIONAL ANIMATION VARIANTS
// Inspired by Paco Coursey, Lee Robinson, and Awwwards winners
// ============================================

// 1. FADE IN VARIANTS - Subtle and elegant entrance
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1], // Custom cubic-bezier for smooth feel
    }
  },
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Expo out easing
    }
  },
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0,
    y: -30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

// 2. STAGGER CONTAINER - For sequential animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
      delayChildren: 0.2,
    },
  },
};

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster stagger for small items
      delayChildren: 0.1,
    },
  },
};

// 3. SCALE ANIMATIONS - Subtle and professional
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

// 4. SLIDE ANIMATIONS - Smooth directional entrance
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0,
    x: -50,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0,
    x: 50,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

// 5. TEXT REVEAL - Character by character or line by line
export const textReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// 6. CARD HOVER - Professional card interactions with smooth springs
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.6,
    }
  },
  hover: { 
    scale: 1.02,
    y: -6,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      mass: 0.5,
    }
  },
};

export const cardHoverSubtle = {
  rest: { 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.6,
    }
  },
  hover: { 
    scale: 1.01,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 18,
      mass: 0.5,
    }
  },
};

// 7. BUTTON ANIMATIONS - Magnetic and responsive with spring physics
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.4,
    }
  },
};

export const buttonPrimary = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
    }
  },
};

// 8. DRAW ANIMATIONS - For lines and borders
export const drawLine: Variants = {
  hidden: { 
    pathLength: 0,
    opacity: 0,
  },
  visible: { 
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.3,
      },
    }
  },
};

// 9. ROTATION ANIMATIONS - For interactive elements
export const rotateIn: Variants = {
  hidden: { 
    opacity: 0,
    rotate: -10,
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

// 10. SCROLL PROGRESS - For progress indicators
export const scrollProgress = {
  initial: { scaleX: 0, originX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  },
};

// 11. NAVIGATION ACTIVE - For navbar indicators
export const navActive: Variants = {
  inactive: { 
    opacity: 0,
    scale: 0.8,
  },
  active: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    }
  },
};

// 12. IMAGE REVEAL - Progressive image loading effect
export const imageReveal: Variants = {
  hidden: { 
    opacity: 0,
    scale: 1.1,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

// 13. PAGE TRANSITIONS - For route changes
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1],
    }
  },
};

// 14. ACCORDION - For expandable content
export const accordion: Variants = {
  collapsed: { 
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
      opacity: {
        duration: 0.2,
      },
    }
  },
  expanded: { 
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
    }
  },
};

// ============================================
// SPRING CONFIGURATIONS - For natural motion
// ============================================

export const springConfigs = {
  // Gentle spring - for most UI elements
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 14,
    mass: 0.5,
  },
  
  // Bouncy spring - for playful interactions
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },
  
  // Stiff spring - for quick, responsive actions
  stiff: {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  },
  
  // Slow spring - for dramatic effects
  slow: {
    type: "spring" as const,
    stiffness: 60,
    damping: 18,
    mass: 1,
  },

  // Smooth spring - ultra smooth for premium feel
  smooth: {
    type: "spring" as const,
    stiffness: 150,
    damping: 20,
    mass: 0.6,
  },

  // Fluid spring - water-like motion
  fluid: {
    type: "spring" as const,
    stiffness: 80,
    damping: 12,
    mass: 0.7,
  },
};

// ============================================
// EASING FUNCTIONS - For custom bezier curves
// ============================================

export const easings = {
  // Default smooth easing (CSS ease)
  ease: [0.25, 0.1, 0.25, 1],
  
  // Ease out (starts fast, ends slow)
  easeOut: [0, 0, 0.2, 1],
  
  // Ease in (starts slow, ends fast)
  easeIn: [0.4, 0, 1, 1],
  
  // Ease in-out (slow start and end)
  easeInOut: [0.4, 0, 0.2, 1],
  
  // Expo out (very smooth deceleration)
  expoOut: [0.22, 1, 0.36, 1],
  
  // Circ out (circular deceleration)
  circOut: [0, 0.55, 0.45, 1],
  
  // Back out (slight overshoot)
  backOut: [0.34, 1.56, 0.64, 1],
};

// ============================================
// DURATION PRESETS - Consistent timing
// ============================================

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1,
};

// ============================================
// ADVANCED HOVER EFFECTS - Magnetic & fluid
// ============================================

export const magneticHover = {
  rest: { 
    scale: 1,
    x: 0,
    y: 0,
  },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
  },
};

export const floatAnimation: Variants = {
  initial: { 
    y: 0,
  },
  animate: { 
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }
  },
};

export const pulseGlow: Variants = {
  initial: { 
    opacity: 0.5,
    scale: 1,
  },
  animate: { 
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }
  },
};

// ============================================
// SCROLL-BASED ANIMATIONS - Parallax effects
// ============================================

export const parallaxSlow: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom * 0.5,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
    }
  }),
};

export const parallaxFast: Variants = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom * 1.5,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    }
  }),
};

// ============================================
// MICRO-INTERACTIONS - Delightful details
// ============================================

export const shimmer: Variants = {
  initial: { 
    backgroundPosition: "200% 0",
  },
  animate: { 
    backgroundPosition: "-200% 0",
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    }
  },
};

export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(139, 92, 246, 0.3)",
      "0 0 40px rgba(139, 92, 246, 0.6)",
      "0 0 20px rgba(139, 92, 246, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  },
};

export const rotateLoop: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }
  },
};

// ============================================
// ENTRANCE ANIMATIONS - Spectacular reveals
// ============================================

export const blurFadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

export const elasticScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.8,
    }
  },
};
