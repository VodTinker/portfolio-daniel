import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.15, duration: 1.8, ease: "easeInOut" },
      opacity:    { delay: i * 0.15, duration: 0.4 },
    },
  }),
};

export default function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 420 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[460px]"
      initial="hidden"
      animate="visible"
    >
      {/* Main organic loop */}
      <motion.path
        d="M 210,60 C 290,50 360,100 370,180 C 380,260 330,330 260,355 C 190,380 120,350 85,285 C 50,220 70,145 120,105 C 150,82 178,65 210,60 Z"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={0}
        variants={draw}
      />
      {/* Extension — upper right */}
      <motion.path
        d="M 370,180 C 395,160 415,145 420,120"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={1}
        variants={draw}
      />
      <motion.circle
        cx="420" cy="118" r="7"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={1.5}
        variants={draw}
      />
      {/* Extension — lower right */}
      <motion.path
        d="M 260,355 C 285,385 300,410 295,430"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={2}
        variants={draw}
      />
      <motion.circle
        cx="294" cy="432" r="5"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={2.5}
        variants={draw}
      />
      {/* Extension — lower left */}
      <motion.path
        d="M 85,285 C 55,305 30,310 10,300"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={3}
        variants={draw}
      />
      <motion.circle
        cx="8" cy="299" r="7"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={3.5}
        variants={draw}
      />
      {/* Extension — upper left */}
      <motion.path
        d="M 120,105 C 95,75 80,48 88,25"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={4}
        variants={draw}
      />
      <motion.circle
        cx="89" cy="23" r="5"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={4.5}
        variants={draw}
      />
      {/* Inner dashed circle */}
      <motion.circle
        cx="215" cy="210" r="22"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1"
        strokeDasharray="4 6"
        custom={5}
        variants={draw}
      />
      {/* Floating dots */}
      <motion.circle cx="320" cy="100" r="3" fill="hsl(25 12% 10%)" custom={5} variants={draw} />
      <motion.circle cx="140" cy="390" r="3" fill="hsl(25 12% 10%)" custom={5.5} variants={draw} />
      <motion.circle cx="60" cy="175" r="3" fill="hsl(25 12% 10%)" custom={6} variants={draw} />
    </motion.svg>
  );
}
