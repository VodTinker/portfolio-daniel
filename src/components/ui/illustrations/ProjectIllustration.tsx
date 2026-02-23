import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, ease: "easeInOut" as const },
      opacity:    { duration: 0.3 },
    },
  },
};

const illus: ReactNode[] = [
  // 0 — Mail/DNS
  <>
    <motion.path d="M10,20 L50,20 L50,55 L10,55 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,20 L30,38 L50,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.path d="M55,35 L70,25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M55,42 L72,42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.circle cx="74" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.circle cx="74" cy="42" r="4" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
  // 1 — Discord bot / AI
  <>
    <motion.path d="M8,15 L52,15 Q58,15 58,21 L58,45 Q58,51 52,51 L32,51 L20,62 L20,51 L14,51 Q8,51 8,45 L8,21 Q8,15 14,15 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.path d="M65,22 Q72,32 65,42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M70,16 Q80,32 70,48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
  </>,
  // 2 — Web scraping / grid
  <>
    <motion.path d="M10,10 L70,10 L70,70 L10,70 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,30 L70,30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,50 L70,50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M30,10 L30,70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M50,10 L50,70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
  // 3 — Automation / n8n
  <>
    <motion.path d="M40,12 A28,28 0 1 1 12,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M40,12 L32,20 M40,12 L48,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
];

interface Props {
  variant?: 0 | 1 | 2 | 3;
  className?: string;
}

export default function ProjectIllustration({ variant = 0, className = "" }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-20 h-20 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {illus[variant]}
    </motion.svg>
  );
}
