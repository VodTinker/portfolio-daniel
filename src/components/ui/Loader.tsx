import React, { useMemo } from 'react';

interface LoaderProps {
  words?: string[];
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  words = ['proyectos', 'experiencia', 'habilidades', 'contacto', 'proyectos'],
  className = '' 
}) => {
  // Memoizar el renderizado de palabras para mejor rendimiento
  const wordElements = useMemo(() => 
    words.map((word, index) => (
      <span 
        key={index} 
        className="word block h-full pl-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-bold"
      >
        {word}
      </span>
    )), [words]
  );

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="loader-card relative">
        {/* Efecto de resplandor de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        
        {/* Card principal */}
        <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 dark:from-neutral-950/95 dark:to-black/95 backdrop-blur-xl px-12 py-8 rounded-3xl shadow-2xl border border-purple-500/20">
          <div className="flex items-center gap-3 text-neutral-300 font-semibold text-4xl md:text-5xl h-16 overflow-hidden">
            <p className="whitespace-nowrap loader-text">cargando</p>
            <div className="words-container relative h-full overflow-hidden">
              {/* Gradiente superior e inferior más pronunciado */}
              <div className="words-gradient absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent via-50% to-neutral-900 dark:from-neutral-950 dark:to-neutral-950 z-10 pointer-events-none" />
              
              <div className="words-list">
                {wordElements}
              </div>
            </div>
          </div>

          {/* Barra de progreso animada */}
          <div className="mt-6 w-full h-1.5 bg-neutral-800/50 rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
          </div>

          {/* Puntos decorativos */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="dot w-2.5 h-2.5 bg-purple-500 rounded-full" style={{ animationDelay: '0s' }} />
            <span className="dot w-2.5 h-2.5 bg-pink-500 rounded-full" style={{ animationDelay: '0.2s' }} />
            <span className="dot w-2.5 h-2.5 bg-purple-500 rounded-full" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      <style>{`
        .loader-card {
          animation: floatCard 3s ease-in-out infinite;
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .loader-text {
          animation: textGlow 2s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            opacity: 0.7;
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
          }
        }

        .words-container {
          width: fit-content;
          min-width: 200px;
        }

        .words-list {
          animation: wordSlide 4s infinite ease-in-out;
        }

        .word {
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
          animation: wordGlow 1s ease-in-out infinite;
        }

        @keyframes wordGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
          }
        }

        @keyframes wordSlide {
          10% {
            transform: translateY(-102%);
          }
          25% {
            transform: translateY(-100%);
          }
          35% {
            transform: translateY(-202%);
          }
          50% {
            transform: translateY(-200%);
          }
          60% {
            transform: translateY(-302%);
          }
          75% {
            transform: translateY(-300%);
          }
          85% {
            transform: translateY(-402%);
          }
          100% {
            transform: translateY(-400%);
          }
        }

        .progress-bar {
          animation: progressSlide 2s ease-in-out infinite;
        }

        @keyframes progressSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .dot {
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Pausa la animación cuando el usuario prefiere movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .loader-card,
          .loader-text,
          .word,
          .progress-bar,
          .dot {
            animation: none;
          }
          
          .words-list {
            animation: wordSlideSimple 2s linear infinite;
          }
          
          @keyframes wordSlideSimple {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
