import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Usaremos nuestro index.css
    }),
  ],
  // Modo híbrido — páginas estáticas pero la API corre como Cloudflare Pages Function
  // En Astro 5, output: 'hybrid' fue eliminado; output: 'static' + adapter es el equivalente
  output: 'static',
  adapter: cloudflare(),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion')) {
                return 'framer-motion';
              }
              if (id.includes('react-icons')) {
                return 'icons';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },
});
