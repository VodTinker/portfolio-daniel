# Kioku-Style Landing Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mejorar el landing completo para que se parezca visualmente a kioku.takizen.xyz: tipografía más dramática, mock del chat IA en el hero, fila de iconos sociales, y polish en todas las secciones.

**Architecture:** Modificar 5 componentes activos (`HeroUnique`, `NavbarSimple`, `ProjectsUnique`, `ThinkingSection`, `ContactUnique`) + `index.css`. No se crean archivos nuevos. Las animaciones existentes no cambian. `coral` ya está definido en tailwind.config.js y en CSS tokens.

**Tech Stack:** React, TypeScript, Tailwind CSS (tokens CSS custom), Framer Motion, Instrument Serif, Inter

---

## Task 1: index.css — Dual gradient en light mode

**Files:**
- Modify: `src/index.css` (línea ~63, bloque `body`)

**Step 1: Leer el archivo para confirmar la ubicación exacta**

Lee `src/index.css` líneas 55–95.

**Step 2: Añadir el gradiente bottom-right al body en light mode**

En el bloque `body { }` dentro de `@layer base { }`, añadir después de `overflow-x: hidden;`:

```css
/* Dual gradient light mode — kioku depth effect */
background-image:
  radial-gradient(60% 40% at 0% 0%, hsl(4 65% 80% / 0.18) 0%, transparent 60%),
  radial-gradient(50% 35% at 100% 100%, hsl(264 20% 79% / 0.12) 0%, transparent 60%);
```

**Step 3: Verificar visualmente**

Arrancar `npm run dev`, abrir http://localhost:4321. El hero debe tener un tinte rosa-coral muy sutil en top-left y un tinte lavender muy sutil en bottom-right. En dark mode no debe verse diferente (los gradientes se sobreescriben por `.dark body`).

**Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add dual radial gradient to light mode body"
```

---

## Task 2: NavbarSimple — Wordmark con tag monospace

**Files:**
- Modify: `src/components/NavbarSimple.tsx` (línea ~53, el `<a>` del wordmark)

**Step 1: Leer las líneas del wordmark**

Lee `src/components/NavbarSimple.tsx` líneas 47–55.

**Step 2: Añadir el tag monospace junto al wordmark**

Cambiar el contenido del `<a>` del wordmark de:

```tsx
Daniel Fonov
```

a:

```tsx
Daniel Fonov<span className="font-mono text-xs text-muted ml-1.5 opacity-70">df</span>
```

**Step 3: Verificar visualmente**

La navbar debe mostrar "Daniel Fonov" en serif + "df" en monospace pequeño, como "kioku 記憶".

**Step 4: Commit**

```bash
git add src/components/NavbarSimple.tsx
git commit -m "feat: add monospace tag to navbar wordmark (kioku-style)"
```

---

## Task 3: HeroUnique — Headline más grande + social icons + chat IA mock

**Files:**
- Modify: `src/components/HeroUnique.tsx` (reescribir el componente completo)

**Step 1: Leer el componente actual para referencia**

Lee `src/components/HeroUnique.tsx`.

**Step 2: Reescribir HeroUnique.tsx con el nuevo contenido**

Reemplazar el contenido completo del archivo con:

```tsx
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE } as Transition,
});

export default function HeroUnique() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 pt-20 pb-24 sm:pt-24 sm:pb-32 text-center relative overflow-hidden"
    >
      {/* Available badge */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-muted border border-[hsl(var(--border))] px-3 py-1.5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(114_30%_55%)] inline-block" />
          {t.hero.available}
        </span>
      </motion.div>

      {/* Headline — kioku scale */}
      <motion.h1
        {...fadeUp(0.1)}
        className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-light leading-[1.04] tracking-tight text-ink mb-6 max-w-5xl"
      >
        {t.hero.headline1}
        <br />
        <em className="italic text-coral">{t.hero.headline2}</em>
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="text-base sm:text-lg text-muted leading-relaxed max-w-md mb-10"
      >
        {t.hero.description}
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-ink text-[hsl(var(--bg))] text-sm font-medium rounded-sm hover:opacity-85 transition-opacity"
        >
          {t.hero.cta} →
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[hsl(var(--border))] text-ink text-sm font-medium rounded-sm hover:border-[hsl(var(--muted))] transition-colors"
        >
          {(t.hero as any).ctaSecondary ?? "Contact"}
        </a>
      </motion.div>

      {/* Social icons row */}
      <motion.div {...fadeUp(0.35)} className="flex items-center gap-5 mb-16">
        <a
          href="https://github.com/VodTinker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/daniel-fonov"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://discord.com/users/vodtinker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          className="text-muted hover:text-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        </a>
      </motion.div>

      {/* Chat IA mock — decorativo, sin interacción */}
      <motion.div
        {...fadeUp(0.45)}
        className="w-full max-w-2xl rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--online))]" aria-hidden />
            <span className="text-sm font-medium text-ink">Daniel AI</span>
          </div>
          <span className="text-muted text-sm opacity-40" aria-hidden>✕</span>
        </div>

        {/* Messages */}
        <div className="px-4 pt-5 pb-4 space-y-4">
          {/* AI bubble */}
          <div className="flex gap-3 items-start">
            <div
              aria-hidden
              className="w-7 h-7 rounded-full border border-[hsl(var(--coral)/0.25)] flex-shrink-0 flex items-center justify-center"
              style={{ background: "hsl(var(--coral) / 0.1)" }}
            >
              <span className="text-[9px] font-mono text-coral">AI</span>
            </div>
            <div className="bg-[hsl(var(--bg))] border border-[hsl(var(--border))] rounded-lg px-4 py-3 text-sm text-ink leading-relaxed text-left max-w-sm">
              Hola, soy el asistente IA de Daniel. ¿Sobre qué proyecto quieres saber más?
            </div>
          </div>
        </div>

        {/* Input row */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--bg))] px-3 py-2">
            <span className="flex-1 text-sm text-muted select-none" aria-hidden>
              Escribe tu pregunta...
            </span>
            <span aria-hidden className="text-muted opacity-40 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 3: Verificar que compila sin errores**

```bash
npm run build 2>&1 | head -30
```

Expected: sin errores de TypeScript.

**Step 4: Verificar visualmente**

En el dev server: el hero debe mostrar el titular muy grande, fila de 3 iconos sociales, y el mock del chat IA debajo. Tanto en light como en dark mode.

**Step 5: Commit**

```bash
git add src/components/HeroUnique.tsx
git commit -m "feat: hero — larger headline, social icons row, chat IA decorative mock"
```

---

## Task 4: ProjectsUnique — Escala tipográfica

**Files:**
- Modify: `src/components/ProjectsUnique.tsx` (2 líneas de clases)

**Step 1: Leer las líneas del section header y los títulos de proyectos**

Lee `src/components/ProjectsUnique.tsx` líneas 65–75 (section header h2) y líneas 160–170 (h3 del proyecto).

**Step 2: Aumentar la escala del section header**

Cambiar la clase del `<motion.h2>` del section header de:
```
className="font-serif text-4xl sm:text-5xl font-light text-ink"
```
a:
```
className="font-serif text-5xl sm:text-6xl font-light text-ink"
```

**Step 3: Aumentar la escala de los títulos de proyectos**

Cambiar la clase del `<motion.h3>` del título de proyecto de:
```
className="font-serif text-xl sm:text-2xl font-light mb-3 leading-snug"
```
a:
```
className="font-serif text-2xl sm:text-3xl font-light mb-3 leading-snug"
```

**Step 4: Verificar visualmente**

Los encabezados de sección y títulos de proyecto deben verse más grandes y dominantes.

**Step 5: Commit**

```bash
git add src/components/ProjectsUnique.tsx
git commit -m "feat: projects — increase section header and title scale"
```

---

## Task 5: ThinkingSection — Headline más grande + hover en clusters + bullets en badges

**Files:**
- Modify: `src/components/ThinkingSection.tsx`

**Step 1: Leer el componente**

Lee `src/components/ThinkingSection.tsx` líneas 33–45 (el h2) y líneas 79–103 (las cluster cards y los badges).

**Step 2: Aumentar la escala del heading**

Cambiar la clase del `<motion.h2>` de:
```
className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mb-10"
```
a:
```
className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink mb-10"
```

**Step 3: Añadir hover state a las cluster cards**

Cambiar la clase del `<motion.div>` de cada cluster card de:
```
className="border border-[hsl(var(--border))] rounded-sm p-5 bg-[hsl(var(--surface))]"
```
a:
```
className="border border-[hsl(var(--border))] hover:border-[hsl(var(--coral)/0.35)] rounded-sm p-5 bg-[hsl(var(--surface))] transition-colors duration-200"
```

**Step 4: Añadir bullet coral a los timeline badges**

Cambiar el primer badge de:
```tsx
<span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm">
  {t.thinking.since2022}
</span>
```
a:
```tsx
<span className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm inline-flex items-center gap-1.5">
  <span className="text-coral text-[10px]" aria-hidden>·</span>
  {t.thinking.since2022}
</span>
```

Repetir para el segundo badge (`since2024`).

**Step 5: Verificar visualmente**

Las cluster cards deben tener un sutil borde coral al hover. Los badges deben tener el bullet coral. El heading es más grande.

**Step 6: Commit**

```bash
git add src/components/ThinkingSection.tsx
git commit -m "feat: thinking — larger headline, cluster hover border, coral badge bullets"
```

---

## Task 6: ContactUnique — Stats más grandes + CTA headline dramático

**Files:**
- Modify: `src/components/ContactUnique.tsx` (2 líneas de clases)

**Step 1: Leer las líneas de los stats y el heading CTA**

Lee `src/components/ContactUnique.tsx` líneas 36–43 (los números de stats) y líneas 68–73 (el h2 del CTA).

**Step 2: Aumentar los números de stats**

Cambiar la clase del `<span>` del valor numérico de:
```
className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-ink mb-2"
```
a:
```
className="font-serif italic text-6xl sm:text-7xl lg:text-8xl text-coral mb-2"
```

**Step 3: Aumentar el heading del CTA**

Cambiar la clase del `<motion.h2>` del contact CTA de:
```
className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-ink mb-4 leading-[1.05]"
```
a:
```
className="font-serif text-5xl sm:text-7xl lg:text-[9rem] font-light text-ink mb-4 leading-[1.02]"
```

**Step 4: Verificar visualmente**

Los números de stats deben verse enormes en coral. El "Hablemos." del CTA debe ser muy grande y dominante, como el kioku hero.

**Step 5: Commit**

```bash
git add src/components/ContactUnique.tsx
git commit -m "feat: contact — coral stats numbers, dramatic CTA headline scale"
```

---

## Task 7: Verificación final completa

**Step 1: Arrancar el dev server si no está corriendo**

```bash
npm run dev
```

**Step 2: Revisar checklist visual en http://localhost:4321**

- [ ] Navbar: "Daniel Fonov df" con el tag mono pequeño
- [ ] Hero: headline muy grande (debe desbordar en mobile de forma elegante), segunda línea en coral italic
- [ ] Hero: fila de 3 iconos sociales (GitHub, LinkedIn, Discord)
- [ ] Hero: mock del chat IA centrado con header, burbuja de mensaje, y input
- [ ] Hero (light mode): tinte rosa sutil top-left + lavender bottom-right
- [ ] Projects: sección header más grande, títulos de proyecto más grandes
- [ ] Thinking: headline más grande, hover en clusters, bullets en badges
- [ ] Contact: números de stats en coral gigante, "Hablemos." muy grande
- [ ] Dark mode: todo se ve bien (nav, hero, secciones)

**Step 3: Corregir cualquier problema visual que aparezca**

Si algo no se ve bien, hacer el fix y commit por separado con `fix: ...`.

**Step 4: Build de producción para verificar que no hay errores**

```bash
npm run build
```

Expected: `astro check` y `astro build` exitosos, sin errores TypeScript.

**Step 5: Commit final si hay fixes pendientes**

```bash
git add -p
git commit -m "fix: kioku redesign final visual corrections"
```
