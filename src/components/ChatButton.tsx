import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const FLIP_SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ position: "relative", width: 56, height: 56 }}>
      {/* Pulse ring — visible only when chat is closed */}
      <AnimatePresence>
        {!isOpen && !shouldReduceMotion && (
          <motion.span
            key="pulse-ring"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.65, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "2px solid hsl(var(--coral))",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={onClick}
        aria-label={isOpen ? "Cerrar chat" : "Abrir asistente"}
        whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        style={{ perspective: 200, width: "100%", height: "100%" }}
        className="rounded-full bg-[hsl(var(--ink))] border border-[hsl(var(--border))] shadow-md flex items-center justify-center text-[hsl(var(--bg))] cursor-pointer"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={shouldReduceMotion ? {} : { rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={shouldReduceMotion ? {} : { rotateY: -90, opacity: 0 }}
              transition={FLIP_SPRING}
              style={{ display: "flex" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={shouldReduceMotion ? {} : { rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={shouldReduceMotion ? {} : { rotateY: 90, opacity: 0 }}
              transition={FLIP_SPRING}
              style={{ display: "flex" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
