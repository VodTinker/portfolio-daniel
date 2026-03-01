import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeInOut" as const },
      opacity:    { duration: 0.3 },
    },
  },
};

const icons: ReactNode[] = [
  // 0 — Infrastructure: server stack
  <>
    <motion.rect x="8" y="12" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.rect x="8" y="30" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.rect x="8" y="48" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.circle cx="45" cy="18" r="2" fill="currentColor" variants={draw} />
    <motion.circle cx="45" cy="36" r="2" fill="currentColor" variants={draw} />
    <motion.circle cx="45" cy="54" r="2" fill="currentColor" variants={draw} />
  </>,
  // 1 — Development: code brackets
  <>
    <motion.path d="M22,15 L8,30 L22,45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={draw} />
    <motion.path d="M38,15 L52,30 L38,45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={draw} />
    <motion.path d="M32,10 L28,50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
  </>,
  // 2 — Automation: circular arrows
  <>
    <motion.path d="M30,8 A22,22 0 1 1 8,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M30,8 L22,16 M30,8 L38,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
];

interface Props {
  variant?: 0 | 1 | 2;
  className?: string;
}

export default function ClusterIllustration({ variant = 0, className = "" }: Props) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {icons[variant]}
    </motion.svg>
  );
}
