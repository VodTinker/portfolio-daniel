import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg 
              className="h-20 w-20 mb-4" 
              viewBox="0 0 100 100"
            >
              <motion.path
                fill="none"
                strokeWidth="4"
                stroke="currentColor"
                className="text-primary"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20,50 C20,35 35,20 50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.path
                fill="none"
                strokeWidth="4"
                stroke="currentColor"
                className="text-accent"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 C30,40 40,30 50,30 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
              />
            </svg>
            <motion.h1 
              className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Daniel's Portfolio
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
