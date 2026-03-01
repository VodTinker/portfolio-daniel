# Kioku-Style Landing Redesign — Design Document

**Date:** 2026-03-01
**Branch:** rework-classic
**Scope:** Full landing page — hero, projects, thinking, contact, navbar

---

## Goal

Bring the portfolio visually closer to kioku.takizen.xyz: more dramatic typography scale,
a hero UI preview (chat IA mock), social icon row, and polish across all sections.
The existing palette, tokens, and animations are already correct — this is an enhancement,
not a rewrite from scratch.

---

## Approach

Enfoque B: Redesign hero + polish secciones.
Cambios quirúrgicos en cada componente activo, sin tocar routing, data, ni animaciones existentes.

---

## Design Decisions

### Hero (`HeroUnique.tsx`)
- **Headline scale:** `text-8xl lg:text-9xl xl:text-[10rem]` (up from 7xl).
  The second line (`y código.`) uses a larger italic serif in coral, visually dominant like kioku's "better".
- **Social icons row:** GitHub, LinkedIn, Discord icon buttons (SVG 16px, text-muted)
  below the two CTAs, horizontally centered with gap-5.
- **Chat IA mock:** A polished static UI preview card below the social icons.
  Full-width centered, max-w-2xl. Contains:
  - Header bar: `Daniel AI ●` (green dot) + `×` icon, with bg-surface border-b
  - Single AI message bubble with a CSS typewriter animation (no JS, `@keyframes typing`)
  - Input row with placeholder `Escribe tu pregunta...` + send arrow button
  - Background: `hsl(var(--surface))`, border `hsl(var(--border))`, subtle shadow
  - Purely decorative — no interaction
- **Dual gradient in light mode:** rose top-left (existing) + lavender bottom-right (new, 6% opacity)

### Navbar (`NavbarSimple.tsx`)
- Wordmark: add `<span class="font-mono text-xs text-muted ml-1.5">df</span>`
  after "Daniel Fonov" — same pattern as kioku's `kioku 記憶`.
- Remove the theme toggle button (dark mode still works via `<html class="dark">`,
  but removing the toggle simplifies the navbar for now — can be added back later).

### Projects (`ProjectsUnique.tsx`)
- Section headline: `text-5xl sm:text-6xl` (up from 4xl/5xl)
- Project titles: `text-2xl sm:text-3xl` (up from xl/2xl)
- Keep hover reveal + clip-path exactly as-is (already excellent, better than kioku)

### Thinking (`ThinkingSection.tsx`)
- Section headline: `text-4xl sm:text-5xl lg:text-6xl` (up from 3xl/4xl/5xl)
- Cluster cards: add `hover:border-[hsl(var(--coral)/0.3)] transition-colors`
- Timeline badges: prepend a small coral `·` bullet before text

### Contact (`ContactUnique.tsx`)
- Stats numbers: `text-7xl sm:text-8xl lg:text-9xl` italic serif coral
  (up from 4xl/5xl/6xl) — already in a dark band, make numbers more dominant
- CTA headline: `text-5xl sm:text-7xl lg:text-[9rem]` — very large kioku scale

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/HeroUnique.tsx` | Larger headline, chat IA mock, social icons row |
| `src/components/ProjectsUnique.tsx` | Larger section header + project titles |
| `src/components/ThinkingSection.tsx` | Larger headline, cluster hover, badge bullets |
| `src/components/ContactUnique.tsx` | Larger stats + CTA headline |
| `src/components/NavbarSimple.tsx` | Monospace tag next to wordmark |
| `src/index.css` | Dual gradient in light mode body |

---

## Non-goals

- No changes to FooterMinimal (already correct dark layout).
- No changes to TechMarquee, ChatWidget, BackToTop.
- No routing, data, or animation changes.
- No new files created.
- Dark mode token values stay the same.
