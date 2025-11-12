import anime from 'animejs/lib/anime.es.js';

// Configuraciones de tiempos y velocidades
export const timings = {
  fast: 400,
  normal: 800,
  slow: 1200,
};

// Configuraciones de easing
export const easings = {
  smooth: 'easeOutQuad',
  bounce: 'easeOutElastic(1, .5)',
  sharp: 'cubicBezier(.17,.67,.83,.67)',
  spring: 'spring(1, 80, 10, 0)',
  snappy: 'easeOutExpo',
};

// Configuraciones de animaciones de entrada
export const entrancePresets = {
  fadeUp: (delay = 0) => ({
    opacity: [0, 1],
    translateY: [20, 0],
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  fadeDown: (delay = 0) => ({
    opacity: [0, 1],
    translateY: [-20, 0],
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  fadeLeft: (delay = 0) => ({
    opacity: [0, 1],
    translateX: [20, 0],
    translateY: [0, 0], // Añadido para mantener consistencia con el tipo
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  fadeRight: (delay = 0) => ({
    opacity: [0, 1],
    translateX: [-20, 0],
    translateY: [0, 0], // Añadido para mantener consistencia con el tipo
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  zoomIn: (delay = 0) => ({
    opacity: [0, 1],
    scale: [0.9, 1],
    translateY: [0, 0], // Añadido para mantener consistencia con el tipo
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  zoomOut: (delay = 0) => ({
    opacity: [0, 1],
    scale: [1.1, 1],
    translateY: [0, 0], // Añadido para mantener consistencia con el tipo
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
  flipIn: (delay = 0) => ({
    opacity: [0, 1],
    rotateX: [90, 0],
    translateY: [0, 0], // Añadido para mantener consistencia con el tipo
    easing: easings.snappy,
    duration: timings.normal,
    delay,
  }),
};

// Configuraciones de animaciones para efectos hover
export const hoverEffects = {
  float: (el: HTMLElement) => {
    el.addEventListener('mouseenter', () => {
      anime({
        targets: el,
        translateY: -8,
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
    el.addEventListener('mouseleave', () => {
      anime({
        targets: el,
        translateY: 0,
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
  },
  glow: (el: HTMLElement) => {
    const originalBoxShadow = el.style.boxShadow;
    el.addEventListener('mouseenter', () => {
      anime({
        targets: el,
        boxShadow: '0 0 15px rgba(66, 153, 225, 0.6)',
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
    el.addEventListener('mouseleave', () => {
      anime({
        targets: el,
        boxShadow: originalBoxShadow,
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
  },
  scale: (el: HTMLElement) => {
    el.addEventListener('mouseenter', () => {
      anime({
        targets: el,
        scale: 1.05,
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
    el.addEventListener('mouseleave', () => {
      anime({
        targets: el,
        scale: 1,
        easing: easings.smooth,
        duration: timings.fast,
      });
    });
  },
};

// Animaciones para elementos en secuencia
export const sequenceAnimations = {
  staggerChildren: (selector: string, options: any = {}) => {
    const { delay = 0, staggerDelay = 50, ...config } = options;
    return anime({
      targets: document.querySelectorAll(selector),
      ...config,
      delay: anime.stagger(staggerDelay, { start: delay }),
      easing: config.easing || easings.snappy,
      duration: config.duration || timings.normal,
    });
  },
  letterByLetter: (element: HTMLElement, text: string, options: any = {}) => {
    // Guardar el texto original
    element.textContent = '';
    
    // Crear un span para cada letra
    const chars = text.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
    
    // Animar cada letra
    return anime({
      targets: element.querySelectorAll('span'),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: options.duration || timings.normal,
      easing: options.easing || easings.snappy,
      delay: anime.stagger(options.staggerDelay || 30, { start: options.delay || 0 }),
    });
  },
};

// Animaciones para scroll
export const scrollAnimations = {
  // Activa animaciones cuando los elementos son visibles en el viewport
  initScrollObserver: (
    selector: string,
    animationConfig: object,
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px'
  ) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            anime({
              targets: target,
              ...animationConfig,
            });
            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin }
    );

    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
    
    return observer;
  },
  
  // Crea un efecto de parallax al hacer scroll
  parallaxEffect: (selector: string, scrollFactor = 0.2) => {
    const elements = document.querySelectorAll(selector);
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      elements.forEach(element => {
        const translateY = scrollY * scrollFactor;
        (element as HTMLElement).style.transform = `translateY(${translateY}px)`;
      });
    });
  },
};
