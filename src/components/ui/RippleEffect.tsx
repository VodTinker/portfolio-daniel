import { useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';

interface RippleEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function RippleEffect({
  children,
  className = '',
  color = 'rgba(139, 92, 246, 0.4)',
  duration = 600,
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remover el ripple después de la animación
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, duration);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      style={{ isolation: 'isolate' }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px',
            borderRadius: '50%',
            backgroundColor: color,
            animation: `ripple-animation ${duration}ms cubic-bezier(0, 0, 0.2, 1)`,
            transform: 'scale(0)',
            opacity: 1,
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-animation {
          to {
            transform: scale(15);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
