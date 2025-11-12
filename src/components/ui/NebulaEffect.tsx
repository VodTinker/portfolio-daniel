import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  speed: number;
  layer: number; // Para efecto parallax
  parallaxOffset: number;
}

export default function NebulaEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const isDarkRef = useRef(false);
  const blendModeRef = useRef<'screen' | 'normal'>('screen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detectar modo oscuro
    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains('dark');
      // 'screen' para modo oscuro (suma luz), 'normal' para modo claro (colores directos más vibrantes)
      blendModeRef.current = isDarkRef.current ? 'screen' : 'normal';
      if (canvas) {
        canvas.style.mixBlendMode = blendModeRef.current;
      }
    };
    updateTheme();
    
    // Observer para cambios de tema
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Ajustar canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Seguimiento del mouse para interactividad - throttled
    let lastMouseUpdate = 0;
    const mouseThrottle = 16; // ~60 FPS
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < mouseThrottle) return;
      
      lastMouseUpdate = now;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Seguimiento del scroll para parallax - throttled
    let lastScrollUpdate = 0;
    const scrollThrottle = 16; // ~60 FPS
    
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollUpdate < scrollThrottle) return;
      
      lastScrollUpdate = now;
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Crear partículas estelares con capas de parallax - optimizado
    const stars: Star[] = [];
    // Reducir estrellas según dispositivo para mejor rendimiento
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const numStars = isMobile ? 75 : isTablet ? 100 : 120; // Optimizado: menos partículas

    for (let i = 0; i < numStars; i++) {
      const layer = Math.random(); // 0-1, donde 0 es más lejano y 1 más cercano
      const yPos = Math.random() * canvas.height;
      stars.push({
        x: Math.random() * canvas.width,
        y: yPos,
        baseY: yPos,
        size: Math.random() * 2 + 0.5 + layer * 1.5, // Estrellas más cercanas son más grandes
        opacity: Math.random() * 0.5 + 0.3 + layer * 0.2,
        speed: Math.random() * 0.3 + 0.1 + layer * 0.4,
        layer: layer,
        parallaxOffset: 0,
      });
    }

    let animationId: number;
    let time = 0;
    let lastFrameTime = performance.now();
    const targetFPS = isMobile ? 30 : 60; // 30 FPS en móvil, 60 en desktop
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle para mantener 60 FPS constantes
      const deltaTime = currentTime - lastFrameTime;
      
      if (deltaTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = currentTime - (deltaTime % frameInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Dibujar estrellas con efecto de brillo pulsante, parallax e interactividad
      stars.forEach((star, index) => {
        // Efecto parallax basado en scroll
        star.parallaxOffset = scrollRef.current * star.layer * 0.5;

        // Interactividad con el mouse - las estrellas se alejan
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - (star.y - star.parallaxOffset);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        let mouseOffsetX = 0;
        let mouseOffsetY = 0;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          mouseOffsetX = -(dx / distance) * force * 30 * star.layer;
          mouseOffsetY = -(dy / distance) * force * 30 * star.layer;
        }

        // Posición final con parallax y offset del mouse
        const finalX = star.x + mouseOffsetX;
        const finalY = star.y - star.parallaxOffset + mouseOffsetY;

        // Pulsación suave
        const pulse = Math.sin(time * (0.5 + star.layer * 0.5) + index * 0.1) * 0.3 + 0.7;
        const currentOpacity = star.opacity * pulse;

        // Tamaño dinámico basado en la capa (parallax)
        const displaySize = star.size * (0.5 + star.layer * 0.5);

        // Dibujar estrella con resplandor
        const gradient = ctx.createRadialGradient(
          finalX,
          finalY,
          0,
          finalX,
          finalY,
          displaySize * 4
        );

        // Colores ajustados según modo claro/oscuro y capa - Paleta colorida mejorada
        const colors = isDarkRef.current
          ? (star.layer > 0.7 
            ? ['255, 220, 255', '230, 180, 255', '200, 150, 255'] // Estrellas cercanas - rosa/magenta brillante
            : star.layer > 0.4
            ? ['180, 200, 255', '150, 180, 255', '120, 160, 255'] // Estrellas medias - azul cyan
            : ['200, 150, 255', '180, 130, 240', '160, 110, 220']) // Estrellas lejanas - púrpura
          : (star.layer > 0.7 
            ? ['139, 92, 246', '147, 51, 234', '168, 85, 247'] // Modo claro - púrpura vibrante cercanas
            : star.layer > 0.4
            ? ['59, 130, 246', '37, 99, 235', '29, 78, 216'] // Modo claro - azul vibrante medias
            : ['99, 102, 241', '79, 70, 229', '67, 56, 202']); // Modo claro - índigo lejanas

        // Opacidad ajustada para modo claro (aumentada para mejor visibilidad)
        const adjustedOpacity = isDarkRef.current ? currentOpacity : currentOpacity * 0.5;

        gradient.addColorStop(0, `rgba(${colors[0]}, ${adjustedOpacity})`);
        gradient.addColorStop(0.5, `rgba(${colors[1]}, ${adjustedOpacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${colors[2]}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(finalX, finalY, displaySize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brillante de la estrella - más visible en modo claro
        ctx.fillStyle = `rgba(${colors[0]}, ${adjustedOpacity * (isDarkRef.current ? 1 : 2)})`;
        ctx.beginPath();
        ctx.arc(finalX, finalY, displaySize * (isDarkRef.current ? 1 : 1.5), 0, Math.PI * 2);
        ctx.fill();

        // Movimiento flotante más pronunciado para estrellas cercanas
        star.y -= star.speed * 0.15 * (1 + star.layer);
        star.x += Math.sin(time * 0.5 + index) * 0.2 * (1 + star.layer * 0.5);

        // Reiniciar cuando salen de la pantalla
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.baseY = star.y;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ mixBlendMode: blendModeRef.current, zIndex: 0 }}
    />
  );
}
