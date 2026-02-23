# Portfolio Rework — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the dark nebula portfolio with a warm editorial aesthetic inspired by anthropic.com — cream background, Fraunces serif, muted earthy color blocks, SVG line-art illustrations.

**Architecture:** Rewrite all visual components in-place (same filenames where possible). New section structure: Navbar → Hero → WorkSection → ThinkingSection → ContactUnique → FooterMinimal. SkillsUnique deleted, AboutUnique replaced by ThinkingSection. NebulaEffect removed.

**Tech Stack:** Astro 5, React 18, Framer Motion, Tailwind CSS, Google Fonts (Fraunces, DM Sans, JetBrains Mono).

**Design Reference:** `docs/plans/2026-02-23-portfolio-rework-design.md`

---

## Task 1: Update fonts in Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Replace the Google Fonts link**

Replace the current `<link href="https://fonts.googleapis.com/css2?...">` tag with:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

**Step 2: Verify fonts load**

Start dev server (`npm run dev`), open browser DevTools → Network → filter "fonts.gstatic.com". Confirm Fraunces, DM Sans, and JetBrains Mono appear in requests.

**Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: replace fonts with Fraunces + DM Sans + JetBrains Mono"
```

---

## Task 2: Replace index.css with editorial design tokens

**Files:**
- Modify: `src/index.css`

**Step 1: Replace entire file contents**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Design Tokens ─────────────────────────────────────── */
:root {
  /* Palette */
  --bg:          36 28% 93%;    /* #F2EDE6 warm cream */
  --surface:     36 20% 87%;    /* #E8E0D5 slightly darker cream */
  --border:      36 15% 77%;    /* #D0C5B8 subtle borders */
  --ink:         25 12% 10%;    /* #1C1814 warm near-black */
  --muted:       24  9% 44%;    /* #7A6E65 secondary text */
  --faint:       24  6% 60%;    /* #A89E95 tertiary */

  /* Accent colours (used for project blocks) */
  --sage:       114 15% 74%;    /* #B8C9B2 */
  --terracotta:  18 50% 58%;    /* #C87B5F */
  --lavender:   264 20% 79%;    /* #C2BDD6 */
  --slate-blue: 196 30% 69%;    /* #9BB8C5 */

  /* Tailwind compat (used by existing shadcn components) */
  --background: var(--bg);
  --foreground:  var(--ink);
  --primary:     var(--terracotta);
  --primary-foreground: 0 0% 100%;
  --secondary:   var(--surface);
  --secondary-foreground: var(--ink);
  --muted-foreground: var(--muted);
  --border: var(--border);
  --radius: 0.5rem;
  --ring: var(--terracotta);
}

/* ─── Base ───────────────────────────────────────────────── */
@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }

  body {
    background-color: hsl(var(--bg));
    color: hsl(var(--ink));
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  /* Remove the old nebula/gradient pseudo-elements */
  body::before,
  body::after {
    content: none;
  }

  h1, h2, h3, h4 {
    font-family: 'Fraunces', Georgia, serif;
  }

  /* Scrollbar */
  ::-webkit-scrollbar        { width: 6px; }
  ::-webkit-scrollbar-track  { background: hsl(var(--surface)); }
  ::-webkit-scrollbar-thumb  { background: hsl(var(--border)); border-radius: 6px; }
  ::-webkit-scrollbar-thumb:hover { background: hsl(var(--muted)); }

  /* Text selection */
  ::selection {
    background: hsl(var(--terracotta) / 0.2);
    color: hsl(var(--ink));
  }
}

/* ─── Utility animations ─────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes strokeDraw {
  from { stroke-dashoffset: 1200; }
  to   { stroke-dashoffset: 0; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* SVG illustration stroke-draw (CSS fallback; Framer Motion is preferred) */
.svg-draw path,
.svg-draw circle,
.svg-draw ellipse {
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: strokeDraw 1.8s ease forwards;
}
```

**Step 2: Visual check**

After saving, the browser should show a warm cream background. If it still shows the old dark/blue gradient, hard-refresh with Ctrl+Shift+R.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: replace CSS with editorial warm cream design tokens"
```

---

## Task 3: Update Tailwind config with new tokens + fonts

**Files:**
- Modify: `tailwind.config.js`

**Step 1: Replace the content of tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Keep darkMode for shadcn compatibility but we won't use it
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        sans:   ["DM Sans", "system-ui", "sans-serif"],
        serif:  ["Fraunces", "Georgia", "serif"],
        mono:   ["JetBrains Mono", "monospace"],
      },
      colors: {
        background:  "hsl(var(--bg))",
        foreground:  "hsl(var(--ink))",
        surface:     "hsl(var(--surface))",
        border:      "hsl(var(--border))",
        ink:         "hsl(var(--ink))",
        muted:       "hsl(var(--muted))",
        faint:       "hsl(var(--faint))",
        terracotta:  "hsl(var(--terracotta))",
        sage:        "hsl(var(--sage))",
        lavender:    "hsl(var(--lavender))",
        "slate-blue":"hsl(var(--slate-blue))",
        primary: {
          DEFAULT:    "hsl(var(--terracotta))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--surface))",
          foreground: "hsl(var(--ink))",
        },
        card: {
          DEFAULT:    "hsl(var(--surface))",
          foreground: "hsl(var(--ink))",
        },
        // Keep minimal shadcn compat:
        destructive: { DEFAULT: "hsl(0 84% 60%)", foreground: "hsl(0 0% 100%)" },
        ring:        "hsl(var(--terracotta))",
        input:       "hsl(var(--surface))",
        popover:     { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--ink))" },
        accent:      { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--ink))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "2rem", lg: "4rem", xl: "5rem" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Step 2: Check the dev server compiles without errors**

Look at the terminal running `npm run dev`. No Tailwind errors should appear.

**Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: update Tailwind config with editorial palette and Fraunces font"
```

---

## Task 4: Update navigation config and translations

**Files:**
- Modify: `src/utils/navigationConfig.ts`
- Modify: `src/utils/translations.ts`

**Step 1: Replace navigationConfig.ts**

```ts
export const navLinks = [
  { key: "work",      href: "#work" },
  { key: "thinking",  href: "#thinking" },
  { key: "contact",   href: "#contact" },
];

export const socialLinks = {
  github:   "https://github.com/VodTinker",
  linkedin: "https://www.linkedin.com/in/daniel-fonov-b897a82b3/",
  discord:  "https://discord.gg/mszf2A6T",
  email:    "danielfonov71@vodtinker.dev",
};

export const contactInfo = {
  email:         "danielfonov71@vodtinker.dev",
  location:      "Gijón, Spain",
  discordHandle: "@vodtinker",
};
```

**Step 2: Replace translations.ts**

Replace the entire file with a slimmed-down, restructured version that matches the new sections. Keep `chat` and `botCommands` keys untouched since ChatWidget still uses them.

```ts
export const translations = {
  en: {
    nav: {
      work:     "Work",
      thinking: "Thinking",
      contact:  "Contact",
    },

    hero: {
      available: "Available · Gijón, Spain",
      headline1: "Between servers",
      headline2: "and code.",
      description:
        "ASIR student who bridges Linux infrastructure and modern web development. I build systems that work quietly so people can focus on what matters.",
      cta:     "See my work",
      ctaAlt:  "About me",
    },

    work: {
      label:    "002 / WORK",
      title:    "Things I've built",
      viewDemo: "View demo →",
      github:   "GitHub →",
    },

    thinking: {
      label:   "003 / THINKING",
      title:   "How I think",
      prose: [
        "It started in 2022 with a simple question: how do the systems we use every day actually work? That question sent me down two parallel paths — ASIR (network and systems administration) and web development — and I've been walking both ever since.",
        "What I find compelling is the intersection. A web app without reliable infrastructure is fragile. A well-configured server with no useful software running on it is just a warm box. I'm interested in the whole stack: from a Linux kernel parameter that makes Nginx behave differently, to the React component that the user finally sees.",
        "Currently in my second year of ASIR, spending most of my time on automation pipelines, self-hosted services, and anything that involves making systems talk to each other intelligently.",
      ],
      since2022: "Since 2022",
      since2024: "Since 2024",
      clusters: {
        infra:      "Infrastructure",
        dev:        "Development",
        automation: "Automation",
      },
    },

    contact: {
      label:    "004 / CONTACT",
      title:    "Let's talk.",
      subtitle:
        "Open to collaborations, technical conversations, and new opportunities. Usually respond within 24 hours.",
      email:    "Send an email",
      github:   "GitHub",
      linkedin: "LinkedIn",
      discord:  "Discord",
    },

    footer: {
      tagline:   "Bridging systems and the web.",
      copyright: "Daniel Fonov.",
      built:     "Built with Astro + React",
    },

    // Unchanged (used by ChatWidget)
    chat: {
      buttonOpen:     "Ask the AI Assistant",
      buttonClose:    "Close",
      title:          "Daniel AI",
      status:         "Online",
      initialMessage: "Hi! I'm Daniel's AI assistant. How can I help you today?",
      placeholder:    "Type your message...",
      typing:         "Typing...",
    },

    botCommands: {
      title:          "Discord Bot Commands",
      subtitle:       "Explore the available commands",
      commandsTitle:  "Available Commands",
      example:        "Example:",
      addBot:         "Add Bot to Discord",
      videoNotSupported: "Your browser does not support the video element.",
      commands: {
        chat:   "Chat with the AI assistant",
        wallet: "Check your wallet balance",
        image:  "Generate images with DALL-E",
        help:   "Show all available commands",
      },
    },
  },

  es: {
    nav: {
      work:     "Trabajo",
      thinking: "Pensamiento",
      contact:  "Contacto",
    },

    hero: {
      available: "Disponible · Gijón, España",
      headline1: "Entre servidores",
      headline2: "y código.",
      description:
        "Estudiante ASIR que conecta infraestructura Linux con desarrollo web moderno. Construyo sistemas que funcionan en silencio para que las personas se centren en lo que importa.",
      cta:    "Ver mi trabajo",
      ctaAlt: "Sobre mí",
    },

    work: {
      label:    "002 / TRABAJO",
      title:    "Cosas que he construido",
      viewDemo: "Ver demo →",
      github:   "GitHub →",
    },

    thinking: {
      label:   "003 / PENSAMIENTO",
      title:   "Cómo pienso",
      prose: [
        "Empezó en 2022 con una pregunta sencilla: ¿cómo funcionan realmente los sistemas que usamos cada día? Esa pregunta me llevó por dos caminos paralelos —ASIR y desarrollo web— y desde entonces camino por los dos.",
        "Lo que me resulta fascinante es la intersección. Una aplicación web sin infraestructura fiable es frágil. Un servidor bien configurado sin software útil ejecutándose es solo una caja caliente. Me interesa el stack completo: desde un parámetro del kernel Linux que hace que Nginx se comporte diferente, hasta el componente React que el usuario finalmente ve.",
        "Actualmente en segundo año de ASIR, dedicando la mayor parte del tiempo a pipelines de automatización, servicios auto-alojados y todo lo que implique hacer que los sistemas se comuniquen inteligentemente.",
      ],
      since2022: "Desde 2022",
      since2024: "Desde 2024",
      clusters: {
        infra:      "Infraestructura",
        dev:        "Desarrollo",
        automation: "Automatización",
      },
    },

    contact: {
      label:    "004 / CONTACTO",
      title:    "Hablamos.",
      subtitle:
        "Abierto a colaboraciones, conversaciones técnicas y nuevas oportunidades. Normalmente respondo en 24 horas.",
      email:    "Enviar un email",
      github:   "GitHub",
      linkedin: "LinkedIn",
      discord:  "Discord",
    },

    footer: {
      tagline:   "Uniendo sistemas y la web.",
      copyright: "Daniel Fonov.",
      built:     "Hecho con Astro + React",
    },

    chat: {
      buttonOpen:     "Pregunta al Asistente IA",
      buttonClose:    "Cerrar",
      title:          "Daniel AI",
      status:         "En línea",
      initialMessage: "¡Hola! Soy el asistente IA de Daniel. ¿En qué puedo ayudarte hoy?",
      placeholder:    "Escribe tu mensaje...",
      typing:         "Escribiendo...",
    },

    botCommands: {
      title:         "Comandos del Bot de Discord",
      subtitle:      "Explora los comandos disponibles",
      commandsTitle: "Comandos Disponibles",
      example:       "Ejemplo:",
      addBot:        "Agregar Bot a Discord",
      videoNotSupported: "Tu navegador no soporta el elemento de video.",
      commands: {
        chat:   "Chatea con el asistente IA",
        wallet: "Consulta tu saldo de wallet",
        image:  "Genera imágenes con DALL-E",
        help:   "Muestra todos los comandos disponibles",
      },
    },
  },
};

export type Language = "en" | "es";
export type TranslationKey = keyof typeof translations.en;
```

**Step 3: Verify no TS errors**

Run: `npx astro check` — expect zero type errors related to the translation keys. (The chat/botCommands keys are unchanged so ChatWidget won't break.)

**Step 4: Commit**

```bash
git add src/utils/navigationConfig.ts src/utils/translations.ts
git commit -m "feat: restructure nav and translations for editorial rework"
```

---

## Task 5: Create SVG illustration components

**Files:**
- Create: `src/components/ui/illustrations/HeroIllustration.tsx`
- Create: `src/components/ui/illustrations/ProjectIllustration.tsx`
- Create: `src/components/ui/illustrations/ClusterIllustration.tsx`

**Step 1: Create the illustrations directory**

```bash
mkdir -p src/components/ui/illustrations
```

**Step 2: Create HeroIllustration.tsx**

Large abstract organic figure for the hero section (Anthropic-style continuous line art):

```tsx
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.15, duration: 1.8, ease: "easeInOut" },
      opacity:    { delay: i * 0.15, duration: 0.4 },
    },
  }),
};

export default function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 420 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[460px]"
      initial="hidden"
      animate="visible"
    >
      {/* Main organic loop — suggests a flowing system */}
      <motion.path
        d="M 210,60 C 290,50 360,100 370,180 C 380,260 330,330 260,355 C 190,380 120,350 85,285 C 50,220 70,145 120,105 C 150,82 178,65 210,60 Z"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={0}
        variants={draw}
      />
      {/* Extension — upper right */}
      <motion.path
        d="M 370,180 C 395,160 415,145 420,120"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={1}
        variants={draw}
      />
      {/* Node — upper right */}
      <motion.circle
        cx="420" cy="118" r="7"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={1.5}
        variants={draw}
      />
      {/* Extension — lower right */}
      <motion.path
        d="M 260,355 C 285,385 300,410 295,430"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={2}
        variants={draw}
      />
      {/* Node — lower right */}
      <motion.circle
        cx="294" cy="432" r="5"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={2.5}
        variants={draw}
      />
      {/* Extension — lower left */}
      <motion.path
        d="M 85,285 C 55,305 30,310 10,300"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={3}
        variants={draw}
      />
      {/* Node — lower left */}
      <motion.circle
        cx="8" cy="299" r="7"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={3.5}
        variants={draw}
      />
      {/* Extension — upper left */}
      <motion.path
        d="M 120,105 C 95,75 80,48 88,25"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        custom={4}
        variants={draw}
      />
      {/* Node — upper left */}
      <motion.circle
        cx="89" cy="23" r="5"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1.5"
        custom={4.5}
        variants={draw}
      />
      {/* Inner detail — small circle in the centre */}
      <motion.circle
        cx="215" cy="210" r="22"
        stroke="hsl(25 12% 10%)"
        strokeWidth="1"
        strokeDasharray="4 6"
        custom={5}
        variants={draw}
      />
      {/* Small floating dots */}
      <motion.circle cx="320" cy="100" r="3" fill="hsl(25 12% 10%)" custom={5} variants={draw} />
      <motion.circle cx="140" cy="390" r="3" fill="hsl(25 12% 10%)" custom={5.5} variants={draw} />
      <motion.circle cx="60" cy="175" r="3" fill="hsl(25 12% 10%)" custom={6} variants={draw} />
    </motion.svg>
  );
}
```

**Step 3: Create ProjectIllustration.tsx**

Small illustration per project card. Accepts a `variant` prop (0–3):

```tsx
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease: "easeInOut" }, opacity: { duration: 0.3 } },
  },
};

const variants = [
  // 0 — Mail/DNS: envelope + network lines
  <>
    <motion.path d="M10,20 L50,20 L50,55 L10,55 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,20 L30,38 L50,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.path d="M55,35 L70,25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M55,42 L72,42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.circle cx="74" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.circle cx="74" cy="42" r="4" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
  // 1 — Discord bot: chat bubble + sound waves
  <>
    <motion.path d="M8,15 L52,15 Q58,15 58,21 L58,45 Q58,51 52,51 L32,51 L20,62 L20,51 L14,51 Q8,51 8,45 L8,21 Q8,15 14,15 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.path d="M65,22 Q72,32 65,42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M70,16 Q80,32 70,48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
  </>,
  // 2 — Web scraping: grid/web
  <>
    <motion.path d="M10,10 L70,10 L70,70 L10,70 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,30 L70,30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M10,50 L70,50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M30,10 L30,70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.path d="M50,10 L50,70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={draw} />
    <motion.circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
  // 3 — Automation/n8n: circular flow arrows
  <>
    <motion.path d="M40,12 A28,28 0 1 1 12,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M40,12 L32,20 M40,12 L48,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
];

interface Props {
  variant?: 0 | 1 | 2 | 3;
  className?: string;
}

export default function ProjectIllustration({ variant = 0, className = "" }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-20 h-20 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {variants[variant]}
    </motion.svg>
  );
}
```

**Step 4: Create ClusterIllustration.tsx**

Small icons for the three tech clusters in the Thinking section:

```tsx
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, ease: "easeInOut" }, opacity: { duration: 0.3 } },
  },
};

const icons = [
  // 0 — Infrastructure: server stack
  <>
    <motion.rect x="8" y="12" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.rect x="8" y="30" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.rect x="8" y="48" width="44" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" variants={draw} />
    <motion.circle cx="45" cy="18" r="2" fill="currentColor" variants={draw} />
    <motion.circle cx="45" cy="36" r="2" fill="currentColor" variants={draw} />
    <motion.circle cx="45" cy="54" r="2" fill="currentColor" variants={draw} />
  </>,
  // 1 — Development: code brackets
  <>
    <motion.path d="M22,15 L8,30 L22,45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={draw} />
    <motion.path d="M38,15 L52,30 L38,45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" variants={draw} />
    <motion.path d="M32,10 L28,50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" variants={draw} />
  </>,
  // 2 — Automation: circular arrows
  <>
    <motion.path d="M30,8 A22,22 0 1 1 8,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" variants={draw} />
    <motion.path d="M30,8 L22,16 M30,8 L38,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" variants={draw} />
    <motion.circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="1.5" variants={draw} />
  </>,
];

interface Props {
  variant?: 0 | 1 | 2;
  className?: string;
}

export default function ClusterIllustration({ variant = 0, className = "" }: Props) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {icons[variant]}
    </motion.svg>
  );
}
```

**Step 5: Commit**

```bash
git add src/components/ui/illustrations/
git commit -m "feat: add SVG line-art illustration components"
```

---

## Task 6: Rewrite NavbarSimple.tsx

**Files:**
- Modify: `src/components/NavbarSimple.tsx`

**Step 1: Replace entire file**

```tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../utils/navigationConfig";
import { useLanguage } from "../contexts/LanguageContext";

export default function NavbarSimple() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, setLanguage, t }      = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Active section detection
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[hsl(var(--surface))] backdrop-blur-sm border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">

        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="font-serif text-lg text-ink hover:opacity-70 transition-opacity"
        >
          Daniel Fonov
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const label = t.nav[link.key as keyof typeof t.nav];
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-ink font-medium"
                    : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Language toggle + mobile hamburger */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-mono">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "en" ? "text-ink font-medium" : "text-muted hover:text-ink"
              }`}
            >
              EN
            </button>
            <span className="text-faint">·</span>
            <button
              onClick={() => setLanguage("es")}
              className={`px-1.5 py-0.5 transition-colors ${
                language === "es" ? "text-ink font-medium" : "text-muted hover:text-ink"
              }`}
            >
              ES
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-ink transition-transform origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-ink transition-transform origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[hsl(var(--surface))] border-t border-[hsl(var(--border))] px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block text-sm text-muted hover:text-ink transition-colors py-1"
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

**Step 2: Visual check**

Open the browser. The navbar should be transparent over the hero, show "Daniel Fonov" wordmark in serif, and three text links (Work · Thinking · Contact) + EN · ES toggle. On scroll it should become a warm cream bar.

**Step 3: Commit**

```bash
git add src/components/NavbarSimple.tsx
git commit -m "feat: rewrite navbar — wordmark, text links, no dark mode toggle"
```

---

## Task 7: Rewrite HeroUnique.tsx

**Files:**
- Modify: `src/components/HeroUnique.tsx`

**Step 1: Replace entire file**

```tsx
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import HeroIllustration from "./ui/illustrations/HeroIllustration";

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroUnique() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-16 pt-28 pb-24"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left column */}
          <div className="lg:col-span-7">
            {/* Status */}
            <motion.p
              {...fadeUp(0.05)}
              className="font-mono text-xs text-muted mb-8 tracking-wide"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--sage))] mr-2 align-middle" />
              {t.hero.available}
            </motion.p>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-serif text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-ink mb-8"
            >
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-muted leading-relaxed max-w-md mb-10 text-base sm:text-lg"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.28)}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm bg-[hsl(var(--terracotta))] text-white hover:opacity-90 transition-opacity"
              >
                {t.hero.cta}
                <span className="text-white/70">→</span>
              </a>
              <a
                href="#thinking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("thinking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm border border-[hsl(var(--border))] text-ink hover:border-[hsl(var(--muted))] transition-colors"
              >
                {t.hero.ctaAlt}
              </a>
            </motion.div>
          </div>

          {/* Right column — illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm lg:max-w-none">
              <HeroIllustration />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

**Step 2: Visual check**

The hero should show: cream background, large serif headline "Between servers / and code.", description, two buttons, and the line-art illustration drawing itself on the right. The illustration should animate on load.

**Step 3: Commit**

```bash
git add src/components/HeroUnique.tsx
git commit -m "feat: rewrite hero with editorial layout and SVG illustration"
```

---

## Task 8: Rewrite ProjectsUnique.tsx as WorkSection

The existing `ProjectsUnique.tsx` becomes the Work section. Rewrite it in-place.

**Files:**
- Modify: `src/components/ProjectsUnique.tsx`

**Step 1: Replace entire file**

```tsx
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { projects } from "../utils/projectsData";
import ProjectIllustration from "./ui/illustrations/ProjectIllustration";

const blockColors = [
  "bg-sage",
  "bg-lavender",
  "bg-[hsl(var(--slate-blue))]",
  "bg-surface",
];

const textOnBlock = [
  "text-[hsl(114_25%_25%)]",  // sage → dark green
  "text-[hsl(264_30%_30%)]",  // lavender → dark purple
  "text-[hsl(196_40%_25%)]",  // slate-blue → dark blue
  "text-ink",                  // surface → normal ink
];

export default function ProjectsUnique() {
  const { t, language } = useLanguage();

  return (
    <section id="work" className="py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted tracking-widest mb-3">
            {t.work.label}
          </p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink">
            {t.work.title}
          </h2>
        </motion.div>

        {/* Project cards — full-width stacked */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-sm overflow-hidden ${blockColors[i % blockColors.length]}`}
            >
              <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-start gap-6">

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-xs tracking-widest mb-3 opacity-60 uppercase ${textOnBlock[i % textOnBlock.length]}`}>
                    {project.category}
                  </p>
                  <h3 className={`font-serif text-2xl sm:text-3xl mb-3 ${textOnBlock[i % textOnBlock.length]}`}>
                    {project.title[language as "en" | "es"]}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 max-w-xl opacity-75 ${textOnBlock[i % textOnBlock.length]}`}>
                    {project.description[language as "en" | "es"]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className={`font-mono text-xs px-2 py-1 rounded-sm border border-current opacity-50 ${textOnBlock[i % textOnBlock.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-5">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium hover:opacity-60 transition-opacity ${textOnBlock[i % textOnBlock.length]}`}
                      >
                        {t.work.viewDemo}
                      </a>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium hover:opacity-60 transition-opacity ${textOnBlock[i % textOnBlock.length]}`}
                    >
                      {t.work.github}
                    </a>
                  </div>
                </div>

                {/* Illustration */}
                <div className={`opacity-40 group-hover:opacity-70 transition-opacity flex-shrink-0 ${textOnBlock[i % textOnBlock.length]}`}>
                  <ProjectIllustration variant={(i % 4) as 0 | 1 | 2 | 3} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

**Step 2: Visual check**

Four full-width cards each with a distinct muted color block (sage, lavender, slate, sand). Each shows project name in serif, description, mono tags, and a small line-art illustration top-right.

**Step 3: Commit**

```bash
git add src/components/ProjectsUnique.tsx
git commit -m "feat: rewrite projects as editorial color-block feature cards"
```

---

## Task 9: Create ThinkingSection.tsx (merges About + Skills)

**Files:**
- Create: `src/components/ThinkingSection.tsx`

**Step 1: Create the file**

```tsx
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import ClusterIllustration from "./ui/illustrations/ClusterIllustration";

const infraTech  = ["Linux", "Ubuntu/Arch", "Docker", "Proxmox", "Tailscale", "Caddy", "SSH", "VPN"];
const devTech    = ["React", "TypeScript", "Astro", "Python", "Node.js", "HTML/CSS"];
const autoTech   = ["n8n", "Bash", "CI/CD", "Git", "Selenium", "PowerShell"];

function TechCluster({
  illustration,
  label,
  tags,
  delay = 0,
}: {
  illustration: 0 | 1 | 2;
  label: string;
  tags: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-sm border border-[hsl(var(--border))]"
    >
      <ClusterIllustration variant={illustration} className="text-muted mb-4" />
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded-sm bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ThinkingSection() {
  const { t } = useLanguage();

  return (
    <section id="thinking" className="py-24 px-6 sm:px-10 lg:px-16 bg-[hsl(var(--surface))]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted tracking-widest mb-3">{t.thinking.label}</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight text-ink">
            {t.thinking.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — prose */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="space-y-5 text-muted leading-relaxed text-base sm:text-[1.05rem]">
              {t.thinking.prose.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Inline timeline references */}
            <div className="mt-8 flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-faint">{t.thinking.since2022}</span>
                <span className="w-8 h-px bg-[hsl(var(--border))]" />
                <span className="font-mono text-xs text-muted">Web Dev + IT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-faint">{t.thinking.since2024}</span>
                <span className="w-8 h-px bg-[hsl(var(--border))]" />
                <span className="font-mono text-xs text-muted">ASIR + Systems</span>
              </div>
            </div>
          </motion.div>

          {/* Right — tech clusters */}
          <div className="lg:col-span-5 space-y-4">
            <TechCluster
              illustration={0}
              label={t.thinking.clusters.infra}
              tags={infraTech}
              delay={0.15}
            />
            <TechCluster
              illustration={1}
              label={t.thinking.clusters.dev}
              tags={devTech}
              delay={0.25}
            />
            <TechCluster
              illustration={2}
              label={t.thinking.clusters.automation}
              tags={autoTech}
              delay={0.35}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
```

**Step 2: Visual check**

Section should show a slightly darker cream background (`--surface`), serif heading, 3 paragraphs of prose on left, three bordered tech clusters (each with a small line-art icon) on right.

**Step 3: Commit**

```bash
git add src/components/ThinkingSection.tsx
git commit -m "feat: create ThinkingSection merging About and Skills"
```

---

## Task 10: Rewrite ContactUnique.tsx

**Files:**
- Modify: `src/components/ContactUnique.tsx`

**Step 1: Replace entire file**

```tsx
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { socialLinks } from "../utils/navigationConfig";

export default function ContactUnique() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="font-mono text-xs text-muted tracking-widest mb-4">
            {t.contact.label}
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-ink mb-6">
            {t.contact.title}
          </h2>

          <p className="text-muted leading-relaxed mb-10">
            {t.contact.subtitle}
          </p>

          {/* Primary CTA — email */}
          <a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex items-center gap-3 text-lg text-ink font-medium hover:text-[hsl(var(--terracotta))] transition-colors mb-8 group"
          >
            {socialLinks.email}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>

          {/* Social links */}
          <div className="flex gap-6 mt-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {t.contact.github}
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {t.contact.linkedin}
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              {t.contact.discord}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
```

**Step 2: Visual check**

Clean section with large serif heading, subtitle, big email link that turns terracotta on hover, and three plain text social links.

**Step 3: Commit**

```bash
git add src/components/ContactUnique.tsx
git commit -m "feat: rewrite contact section — no form, email + plain text socials"
```

---

## Task 11: Rewrite FooterMinimal.tsx

**Files:**
- Modify: `src/components/FooterMinimal.tsx`

**Step 1: Replace entire file**

```tsx
import { useLanguage } from "../contexts/LanguageContext";
import { socialLinks } from "../utils/navigationConfig";

export default function FooterMinimal() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--ink))] text-[hsl(36_20%_80%)] px-6 sm:px-10 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Left */}
        <div>
          <p className="font-serif text-lg text-[hsl(36_20%_92%)] mb-1">Daniel Fonov</p>
          <p className="text-sm opacity-50">{t.footer.tagline}</p>
        </div>

        {/* Right */}
        <div className="text-sm text-right space-y-1 opacity-50">
          <p>© {year} {t.footer.copyright}</p>
          <p>{t.footer.built}</p>
        </div>

      </div>
    </footer>
  );
}
```

**Step 2: Visual check**

Footer should be a dark (`--ink`) band at the bottom — sharp contrast against the cream above. Left: "Daniel Fonov" in serif. Right: copyright + built with.

**Step 3: Commit**

```bash
git add src/components/FooterMinimal.tsx
git commit -m "feat: rewrite footer as dark editorial band"
```

---

## Task 12: Update AppContent.tsx and remove unused components

**Files:**
- Modify: `src/components/AppContent.tsx`
- Modify: `src/pages/index.astro`
- Delete: `src/components/SkillsUnique.tsx` (content now in ThinkingSection)

**Step 1: Update AppContent.tsx**

```tsx
import { LanguageProvider } from "../contexts/LanguageContext";
import NavbarSimple      from "./NavbarSimple";
import HeroUnique        from "./HeroUnique";
import ProjectsUnique    from "./ProjectsUnique";
import ThinkingSection   from "./ThinkingSection";
import ContactUnique     from "./ContactUnique";
import FooterMinimal     from "./FooterMinimal";
import ChatWidget        from "./ChatWidget";
import BackToTop         from "./BackToTop";

export default function AppContent() {
  return (
    <LanguageProvider>
      <NavbarSimple />
      <main>
        <HeroUnique />
        <ProjectsUnique />
        <ThinkingSection />
        <ContactUnique />
      </main>
      <FooterMinimal />
      <ChatWidget />
      <BackToTop />
    </LanguageProvider>
  );
}
```

**Step 2: Update index.astro — remove NebulaEffect and ScrollProgressIndicator**

The NebulaEffect is the dark glowing blob background — incompatible with the light theme.
The ScrollProgressIndicator was styled for the dark theme but can be kept if restyled. For now, remove both for a clean slate.

Replace `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import '../index.css';
import AppContent from '../components/AppContent';
---

<Layout title="Daniel Fonov — Portfolio">
  <div class="relative min-h-screen">
    <AppContent client:load />
  </div>
</Layout>

<script>
  window.scrollTo(0, 0);
</script>
```

**Step 3: Remove SkillsUnique.tsx**

```bash
rm src/components/SkillsUnique.tsx
```

**Step 4: Full visual review**

Open `http://localhost:3001` in browser. Scroll through all sections:
- [ ] Hero: cream bg, serif headline, illustration drawing itself ✓
- [ ] Work: four color-block cards, serif project names, line-art illustrations ✓
- [ ] Thinking: slightly darker cream, prose left, tech clusters right ✓
- [ ] Contact: clean, large email link, text socials ✓
- [ ] Footer: dark band, serif wordmark ✓
- [ ] Navbar: transparent → cream on scroll, text links ✓
- [ ] Language toggle EN/ES works ✓

**Step 5: Commit**

```bash
git add src/components/AppContent.tsx src/pages/index.astro
git commit -m "feat: wire up new section structure, remove NebulaEffect and SkillsUnique"
```

---

## Task 13: Polish pass — spacing, typography, and mobile

**Files:**
- Modify: various components as needed

**Step 1: Check mobile layout (375px)**

Open Chrome DevTools → Toggle device emulation → iPhone SE (375×667).

Common fixes needed:
- Headline `clamp()` values — check they don't overflow on mobile
- Project cards — padding reduction on mobile already handled by `sm:p-10`
- Thinking section — prose columns stack on mobile (already `grid-cols-1` default)

**Step 2: Fix any overflow or font-size issues**

If the hero headline overflows on mobile, reduce the minimum size in `clamp`:
```
font-size: clamp(2.5rem, 8vw, 6rem);  /* adjust the 2.5rem if needed */
```

**Step 3: Verify no dark mode class leaks**

Search for any remaining `dark:` classes in the new components. They shouldn't break anything but they're dead code.

```bash
grep -r "dark:" src/components/NavbarSimple.tsx src/components/HeroUnique.tsx src/components/ProjectsUnique.tsx src/components/ThinkingSection.tsx src/components/ContactUnique.tsx src/components/FooterMinimal.tsx
```

Remove any found.

**Step 4: Final commit**

```bash
git add -p  # stage only the relevant hunks
git commit -m "polish: mobile layout fixes and remove dark class remnants"
```

---

## Done — Summary of changes

| File | Action |
|---|---|
| `src/layouts/Layout.astro` | Updated Google Fonts (Fraunces + JetBrains Mono) |
| `src/index.css` | Replaced with editorial cream design tokens |
| `tailwind.config.js` | New color palette, Fraunces + JetBrains Mono fonts |
| `src/utils/navigationConfig.ts` | New nav links (work/thinking/contact) |
| `src/utils/translations.ts` | Restructured copy for all new sections |
| `src/components/ui/illustrations/*.tsx` | Created 3 SVG illustration components |
| `src/components/NavbarSimple.tsx` | Rewritten — wordmark, text links, no dark toggle |
| `src/components/HeroUnique.tsx` | Rewritten — 2-col, serif headline, SVG illustration |
| `src/components/ProjectsUnique.tsx` | Rewritten — color-block feature cards |
| `src/components/ThinkingSection.tsx` | Created — merges About + Skills |
| `src/components/ContactUnique.tsx` | Rewritten — clean, no form |
| `src/components/FooterMinimal.tsx` | Rewritten — dark editorial band |
| `src/components/AppContent.tsx` | Updated — new structure, ThinkingSection |
| `src/pages/index.astro` | Cleaned up — removed NebulaEffect |
| `src/components/SkillsUnique.tsx` | Deleted |
