```
 __      __        _ _____ _       _
 \ \    / /       | |_   _(_)     | |
  \ \  / /__   __| | | |  _ _ __  | | _____ _ __
   \ \/ / _ \ / _` | | | | | '_ \ | |/ / _ \ '__|
    \  / (_) | (_| | | | | | | | ||   <  __/ |
     \/ \___/ \__,_|_|_| |_|_| |_|/_\_\___|_|
```

# VodTinker: Portfolio Gamificado y Retro Cyberpunk

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-6.3.3-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)

> 🌍 Español | [English](./README.md)

Un portfolio interactivo de alta fidelidad con estética retro-cyberpunk construido con **Astro**, **React** y **TypeScript**. Transforma el tradicional CV estático en una experiencia de usuario de 8 bits interactiva, con controles de monitor CRT físicos, personalización visual de temas en tiempo real, marcador de puntuación dinámico persistente, misiones de onboarding y un asistente virtual integrado de Inteligencia Artificial.

```
+--------------------------------------------------+
| DANIEL (LV. 21)               CLASS: SYSADMIN   |
+--------------------------------------------------+
| HP: [██████████████████████░░] 92%               |
| MP: [██████████████░░░░░░░░░░] 68%               |
| XP: [████████████████████░░░░] 85%               |
+--------------------------------------------------+
```

---

## Características

### Onboarding Gamificado ("Misiones Activas")
- **Micro-Misiones secuenciales:** Guía interactiva que introduce paso a paso al visitante por los detalles de la interfaz.
- **Integración con Scoreboard:** Completar tareas reproduce efectos de sonido chiptune retro e incrementa el marcador global de puntuación y monedas en la barra de navegación.
- **HUD Final:** Al completar las 5 misiones, el HUD flotante se transforma en una vitrina de trofeos felicitando al usuario.

### Terminal CRT Interactiva
- **Interruptor analógico:** Apaga o enciende la simulación CRT pulsando el botón de encendido naranja en la cabecera o el punto rojo indicador de energía del monitor.
- **Colores de fósforo:** Alterna entre los fósforos Ámbar, Verde o Cian en la cabecera de la terminal en cualquier momento.
- **Efecto Glitch y Scanlines:** Activa o desactiva interferencias estáticas y el filtro de rejilla analógica en tiempo real.

### Panel de Personalización Visual (Tweaks)
- **Temas Globales en tiempo real:** Barra lateral deslizante que permite cambiar toda la paleta cromática del sitio instantáneamente:
  - **Default Cyberpunk** (Tonos violetas y rosa neón)
  - **Sunset Outrun** (Degradados cálidos estilo synthwave retro)
  - **Green Terminal** (Modo consola clásico estilo Matrix)
  - **Gameboy Classic** (Verde monocromático pixelado de cuatro tonos)
  - **Cyberneon** (Líneas de alto contraste cian y magenta)
- **Persistencia local:** Los temas de color y la configuración del CRT se guardan automáticamente en `localStorage`.

### Asistente IA y Consola de Comandos
- **Chatbot Inteligente:** Un asistente virtual integrado con el modelo GPT de OpenAI para responder a cualquier pregunta sobre mi experiencia, proyectos o biografía.
- **Consola de comandos:** Escribe `/help` o `/clear` en el chat para ejecutar comandos personalizados dentro del chatbot.

### Optimización y Fuentes Locales
- **Tipografías Autoalojadas:** Todo el catálogo de fuentes retro y mono (`Press Start 2P`, `VT323`, `Pixelify Sans`, `Silkscreen`, `JetBrains Mono`) se compila localmente mediante paquetes de `@fontsource`. Esto elimina errores de MIME-type provocados por Cloudflare Fonts en producción y garantiza una carga instantánea y fluida sin peticiones a terceros.

---

## Mock API de Estado Interactiva
Puedes realizar peticiones de prueba a un endpoint simulado para comprobar el estado de mi homelab localmente o previsualizar su respuesta:
```bash
$ curl -s https://vodtinker.dev/api/status
{
  "status": "online",
  "uptime": "99.99%",
  "preferred_sfx": "8-bit chiptunes",
  "current_quest": "Building awesome retro systems"
}
```

---

## Trucos y Easter Eggs Secretos
El sitio web incluye varios huevos de pascua de arcade programados en la interfaz:
- **El Código Konami:** Pulsa la combinación clásica en tu teclado desde cualquier sección de la página de inicio para desbloquear un modo especial secreto:
  `[ ↑ ] [ ↑ ] [ ↓ ] [ ↓ ] [ ← ] [ → ] [ ← ] [ → ] [ B ] [ A ]`
- **Avatar Interactivo:** Haz clic sobre el avatar pixelado de Daniel dentro del marco P1 READY en la cabecera de la web para reproducir efectos de sonido, alterar estadísticas del HUD y subir experiencia (XP) en tiempo real.

---

## Stack Tecnológico

### Tecnologías Core
- **Astro** (v6.3.3) — Framework estático de última generación para lograr un rendimiento óptimo.
- **React** (v19.2.6) — Diseñado para el HUD reactivo, el panel lateral de tweaks y el asistente inteligente.
- **TypeScript** — Tipado estricto en todo el proyecto.
- **CSS Vanilla y Variables HSL** — Permite el cambio de paletas cromáticas dinámico.

### Librerías Clave
- **Framer Motion y Anime.js** — Físicas de píxeles, efectos de sonido y transiciones interactivos.
- **i18next** — Localización robusta para soporte multilingüe (Inglés y Español).
- **OpenAI API** — Conexión fluida con la API de OpenAI en el Edge.
- **@fontsource** — Gestión y almacenamiento óptimo de tipografías web locales.

---

## Inicio Rápido

### Requisitos previos
- **Node.js** 20+ o **Bun** 1.1+ (recomendado)
- Gestor de paquetes **npm** o **bun**

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/VodTinker/portfolio-daniel.git
   cd portfolio-daniel
   ```

2. **Instalar dependencias**
   ```bash
   bun install
   # o bien
   npm install --legacy-peer-deps
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Abre `.env` y rellena tus credenciales:
   - `OPENAI_API_KEY` — Para el asistente inteligente de IA.
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` — Para el formulario de contacto.

4. **Arrancar en desarrollo**
   ```bash
   bun run dev
   # o bien
   npm run dev
   ```

5. **Abrir navegador**
   Accede a `http://localhost:3000`

---

## Scripts Disponibles

```bash
bun run dev          # Inicia el entorno de desarrollo en el puerto 3000
bun run build        # Construye los archivos estáticos de producción (astro check & build)
bun run preview      # Previsualiza la build de producción localmente
bun run lint         # Verifica y lintea el código con Biome y Astro check
bun run format       # Formatea el código automáticamente con Biome
bun run deploy       # Despliega manualmente a Cloudflare Pages mediante Wrangler
```

---

## Estructura del Directorio

```
portfolio-daniel/
├── src/
│   ├── components/        # Componentes en React y JSX
│   │   ├── ui/           # Primitivas visuales
│   │   ├── AppContent.tsx # Gestor de estado global y maquetación de pantalla
│   │   ├── QuestHelper.tsx# HUD flotante interactivo de misiones
│   │   ├── PixelHero.tsx  # Terminal CRT y cabecera de la web
│   │   ├── PixelTweaks.tsx# Panel lateral deslizante de configuraciones estéticas
│   │   ├── PixelChat.tsx  # Chatbot flotante interactivo con IA
│   │   └── Sprites.tsx    # Sprites animados responsivos retro
│   ├── contexts/         # Contextos globales en React
│   │   └── LanguageContext.tsx
│   ├── layouts/          # Plantillas de maquetación en Astro
│   │   └── Layout.astro   # Configuración del head y carga de fuentes locales
│   ├── index.css         # Estilos globales y reglas de paletas variables HSL
│   └── env.d.ts          # Declaraciones de tipos TypeScript globales
├── public/               # Recursos estáticos y efectos de sonido en formato WAV/MP3
└── functions/            # Cloudflare Workers (Función serverless para la API de OpenAI)
```

---

## Despliegue en Producción

### Cloudflare Pages
Este sitio está preconfigurado para compilarse y desplegarse en **Cloudflare Pages** de forma automática con cada push en `main`:
- **Build Command:** `bun run build` (or `npm run build` utilizando las dependencias heredadas de `.npmrc`)
- **Output Directory:** `dist`
- **Root Directory:** `/` (v2 strategy)

---

## Licencia

Este proyecto está bajo la Licencia MIT; consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Daniel Fonov (VodTinker)**
- **Portfolio:** [vodtinker.dev](https://vodtinker.dev)
- **GitHub:** [@VodTinker](https://github.com/VodTinker)
- **LinkedIn:** [Daniel Fonov](https://www.linkedin.com/in/daniel-fonov-b897a82b3/)

---

*Si te ha gustado esta experiencia, ¡no dudes en darle una estrella al repositorio!*
