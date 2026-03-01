import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// output: 'static' (default) — páginas estáticas puras
// La API /api/openai-chat corre como Cloudflare Pages Function (functions/api/openai-chat.ts)
// Cloudflare Pages detecta el directorio functions/ automáticamente, sin adapter
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Usaremos nuestro index.css
    }),
  ],
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
