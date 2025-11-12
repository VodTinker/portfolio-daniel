import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollAnimateProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Wrapper animado para fade-in y slide al hacer scroll entre secciones
 */
const ScrollAnimate = ({
  children,
  direction = "up",
  delay = 0.1,
  duration = 0.7,
  className = ""
}: ScrollAnimateProps) => {
  let initial: any = { opacity: 0 };
  let animate: any = { opacity: 1 };
  switch (direction) {
    case "up":
      initial.y = 40;
      animate.y = 0;
      break;
    case "down":
      initial.y = -40;
      animate.y = 0;
      break;
    case "left":
      initial.x = 40;
      animate.x = 0;
      break;
    case "right":
      initial.x = -40;
      animate.x = 0;
      break;
  }
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimate;
