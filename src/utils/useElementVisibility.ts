import { useEffect, useState } from 'react';

/**
 * Hook para detectar si un elemento está visible en el viewport
 * @param elementId - ID del elemento DOM a observar
 * @param threshold - Opcional: margen del viewport para determinar visibilidad (default: 0)
 * @returns boolean que indica si el elemento está visible
 */
export const useElementVisibility = (elementId: string, threshold: number = 0): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(elementId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isElementVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) - threshold &&
          rect.bottom >= threshold
        );
        setIsVisible(isElementVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar en el montaje inicial
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementId, threshold]);

  return isVisible;
};
