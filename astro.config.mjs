import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import cloudflare from '@astrojs/cloudflare'; // Solo necesario para output: 'server'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Usaremos nuestro index.css
    }),
  ],
  // Modo estático - todo se genera en build time
  output: 'static',
  // adapter: cloudflare(), // No necesario para static
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
      // Mantener optimizaciones similares a tu config de Vite
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
