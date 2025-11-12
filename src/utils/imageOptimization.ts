/**
 * Utilidades para optimización de carga de imágenes
 */

// Lazy loading observer para imágenes
export const setupImageLazyLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta lazy loading nativo
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src || '';
    });
  } else {
    // Fallback con Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => imageObserver.observe(img));
  }
};

// Preload para imágenes críticas
export const preloadCriticalImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};
