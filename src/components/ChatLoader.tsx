import { motion, useReducedMotion } from "framer-motion";

const DOT_SPRING = { type: "spring" as const, stiffness: 600, damping: 10 };

export default function ChatLoader() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 0" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "hsl(var(--coral))", opacity: 0.6,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", height: 44, padding: "0 2px" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "hsl(var(--coral))",
            display: "inline-block", flexShrink: 0,
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            ...DOT_SPRING,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.12,
            duration: 0.6,
          }}
        />
      ))}
    </div>
  );
}
