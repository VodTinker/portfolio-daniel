/**
 * Utilidades de optimización de rendimiento
 */

// Debounce para eventos que se disparan frecuentemente
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle para limitar la frecuencia de ejecución
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy loading de imágenes con Intersection Observer
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          const src = target.dataset.src;
          
          if (src) {
            target.src = src;
            target.classList.add('loaded');
            observer.unobserve(target);
          }
        }
      });
    },
    {
      rootMargin: '50px', // Precargar 50px antes de que entre en viewport
      threshold: 0.01,
    }
  );

  observer.observe(img);
  return () => observer.disconnect();
};

// Preload de recursos críticos
export const preloadResource = (href: string, as: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Preconnect a dominios externos
export const preconnect = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Memoización simple
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Detectar preferencia de reducción de movimiento
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Web Vitals helper
export const reportWebVitals = (metric: any) => {
  // Solo en desarrollo
  if (import.meta.env.DEV) {
    console.log(metric);
  }
};

// Optimización de scroll con requestAnimationFrame
export const optimizedScroll = (callback: () => void) => {
  let ticking = false;

  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Cache de componentes con localStorage
export const cacheData = (key: string, data: any, ttl: number = 3600000) => {
  const item = {
    value: data,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getCachedData = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
};
