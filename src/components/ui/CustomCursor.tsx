import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let animationFrameId: number;

    // Actualizar posición del mouse
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Detectar si está sobre elemento interactivo
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer');
      setIsPointer(!!isInteractive);
    };

    // Ocultar cursor cuando sale de la ventana
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Animación suave con lerp (interpolación lineal)
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Cursor principal con seguimiento suave
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.2);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.2);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Cursor tipo flecha/puntero */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHidden ? 'opacity-0' : 'opacity-100'} ${
          isPointer ? 'scale-110' : 'scale-100'
        }`}
        style={{
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '24px',
          height: '24px',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'opacity 0.3s ease, scale 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Flecha SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          }}
        >
          {/* Puntero estilo arrow */}
          <path
            d="M5 3L5 17L9 13L12 19L14 18L11 12L17 12L5 3Z"
            fill="currentColor"
            className="text-neutral-900 dark:text-white"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Borde/contorno para mejor visibilidad */}
          <path
            d="M5 3L5 17L9 13L12 19L14 18L11 12L17 12L5 3Z"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="dark:stroke-neutral-900"
            style={{ opacity: 0.3 }}
          />
        </svg>
      </div>

      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }

        /* Ocultar cursor en dispositivos táctiles */
        @media (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
