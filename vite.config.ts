import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura rutas correctas en Netlify
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimizaciones de build
    target: 'esnext',
    minify: 'terser',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Desactivar sourcemaps en producción
    cssCodeSplit: true, // Split CSS por chunks
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.logs en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        // Separar chunks para mejor caching
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
            if (id.includes('i18next')) {
              return 'i18n';
            }
            // Otros vendors en un chunk separado
            return 'vendor';
          }
        },
        // Nombres de archivos con hash para cache-busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Comprimir assets
    chunkSizeWarningLimit: 1000,
    // Preload de módulos críticos
    modulePreload: {
      polyfill: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons'],
    exclude: ['@vite/client', '@vite/env'],
    // Forzar pre-bundling para evitar re-builds constantes
    force: false,
    esbuildOptions: {
      target: 'esnext',
    },
  },
  esbuild: {
    // Optimizaciones de esbuild
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    target: 'esnext',
  },
  // Mejorar tiempo de desarrollo y reducir consumo
  server: {
    port: 3000,
    host: true,
    // Optimizar HMR
    hmr: {
      overlay: true,
      // Reducir overhead de HMR
      clientPort: 3000,
    },
    // Reducir overhead de watch
    watch: {
      // Ignorar node_modules para reducir watchers
      ignored: [
        '**/node_modules/**', 
        '**/dist/**', 
        '**/.git/**',
        '**/Main/**',
        '**/VodTinker-Webpage/**',
        '**/reactSetup/**',
        '**/public/logo-*.html'
      ],
      // Reducir polling
      usePolling: false,
    },
    // Configuración de caché más agresiva
    fs: {
      // Permitir servir archivos fuera del root
      strict: false,
      // Denegar acceso a ciertos archivos
      deny: [
        '**/Main/index.html',
        '**/VodTinker-Webpage/**/*.html',
        '**/reactSetup/**/*.html',
        '**/public/logo-*.html'
      ],
    },
    // Optimizar headers de respuesta
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
    },
  },
  // Caché más agresivo
  cacheDir: 'node_modules/.vite',
});
