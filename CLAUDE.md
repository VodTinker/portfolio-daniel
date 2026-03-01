# portfolio-website-astro

Portafolio personal de Daniel Fonov. Astro (static) + React + Tailwind + TypeScript.
Estilo inspirado en kioku.takizen.xyz — tipografía Instrument Serif / Inter.

## Comandos

```bash
npm run dev        # Dev server en http://localhost:3000
npm run build      # astro check + astro build → dist/
npm run preview    # Preview del build estático
bunx biome lint --write    # Lint (Biome, NO eslint)
bunx biome format --write  # Format
npm run deploy     # Build + wrangler pages deploy dist (Cloudflare Pages)
```

**Nota:** El dev también corre en puerto 4321 con `astro dev --port 4321`.

## Arquitectura

```
src/
  pages/index.astro         ← única página; monta <AppContent client:load />
  layouts/Layout.astro      ← HTML shell, Google Fonts, anti-FOUC script
  components/AppContent.tsx ← árbol React con ThemeProvider + LanguageProvider
  components/*Unique.tsx    ← componentes activos (kioku style)
  components/NavbarSimple.tsx TechMarquee.tsx ← también activos
  components/[otros]        ← legacy, NO usados actualmente
  contexts/                 ← LanguageContext (EN/ES) + ThemeContext (dark/light)
  utils/translations.ts     ← strings EN/ES
  utils/projectsData.ts     ← datos de proyectos
  index.css                 ← tokens CSS (--bg, --ink, --coral…), dark override, marquee
```

## Tokens de color

Todos los colores son CSS vars: `hsl(var(--bg))`, `hsl(var(--ink))`, etc.
Dark mode: bloque `.dark { }` en `index.css` sobrescribe los 6 tokens base.
Tailwind: `darkMode: ["class"]` — añadir clase `dark` a `<html>`, NO media query.

## Gotchas

- **Framer Motion `whileInView`**: inicia en `opacity: 0`. Screenshots = blanco hasta scroll.
  Fix temporal: `document.querySelectorAll('[style]').forEach(el => { el.style.opacity='1'; })`
- **Hidratación SSR/cliente**: SSR renderiza EN, localStorage guarda ES → errores de consola
  esperados. React recupera solo, es cosmético.
- **Componentes legacy**: `src/components/` tiene ~30 componentes de versiones anteriores.
  Los activos son: `AppContent`, `NavbarSimple`, `HeroUnique`, `ProjectsUnique`,
  `ThinkingSection`, `ContactUnique`, `FooterMinimal`, `TechMarquee`, `ChatWidget`, `BackToTop`.
- **Anti-FOUC dark mode**: `<script is:inline>` en `Layout.astro` lee localStorage antes del
  primer render para evitar el flash blanco al recargar con dark mode activo.

## Variables de entorno

Copiar `.env.example` a `.env`:
- `OPENAI_API_KEY` — requerida para el chat IA
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` — requeridas para contacto
- `BRAVE_API_KEY`, `GEMINI_API_KEY` — opcionales

## Deploy

Cloudflare Pages (static). Branch `main` = producción.
Branch activo de desarrollo: `rework-classic` (rediseño estilo kioku).
