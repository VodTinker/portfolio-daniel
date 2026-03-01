# Hero Chat Funcional — Design Document

**Date:** 2026-03-01
**Branch:** rework-classic
**Scope:** Activar API del chat, hacer funcional el chat del hero, eliminar el widget flotante.

---

## Goal

Convertir el mock decorativo del chat en el hero en un chat real funcional con IA,
y eliminar el widget flotante de la esquina. Un único punto de entrada para el chat.

---

## Approach

**Enfoque B — Lógica inline en HeroUnique.**
Mover la lógica de estado y API de ChatWidget directamente a HeroUnique.
Sin archivos nuevos. ChatWidget y sus dependencias se eliminan.

---

## Architecture

### API (Cloudflare Pages Function)

- `astro.config.mjs`: `output: 'hybrid'`, descomentar `@astrojs/cloudflare` adapter.
- Renombrar `src/pages/api/_openai-chat.ts.disabled` → `src/pages/api/openai-chat.ts`.
- El endpoint usa `gpt-4o-mini`, detecta el idioma del mensaje, responde como asistente de Daniel.
- `@astrojs/cloudflare` ya está instalado como devDependency.

### HeroUnique.tsx — reescritura funcional

**Imports añadidos:**
- `useState`, `useRef`, `useEffect` from React
- `useReducedMotion` from framer-motion

**Componentes inlineados:**
- `TypewriterText` — animación de tipeo 18ms/char, snap a 120 chars
- `ChatDots` — 3 dots rebotando con framer-motion (extraído de ChatLoader)

**Estado:**
- `messages: Message[]` — inicializado con `t.chat.initialMessage`
- `inputValue: string`
- `isLoading: boolean`
- `latestAssistantId: number | null`
- `messagesEndRef`, `inputRef`, `messageIdRef`

**Lógica:**
- `handleSendMessage()` — POST a `/api/openai-chat`, añade burbuja usuario + burbuja IA
- `handleKeyDown` — Enter envía mensaje
- `useEffect` — actualiza mensaje inicial cuando cambia el idioma
- `useEffect` — auto-scroll al último mensaje

**UI (mantiene look actual de la tarjeta):**
- Header: dot verde + "Daniel AI" + "✕" decorativo
- Área de mensajes: `max-h-[350px] overflow-y-auto`, burbujas IA (izquierda) y usuario (derecha)
- Loading: `ChatDots` inlineado mientras espera respuesta
- Input: `<input type="text">` real con `t.chat.placeholder`
- Botón send: SVG arrow, deshabilitado si `isLoading` o input vacío

### AppContent.tsx

- Eliminar import de `ChatWidget`
- Eliminar `<ChatWidget />` del JSX

### Archivos eliminados

- `src/components/ChatWidget.tsx`
- `src/components/ChatWidget.css`
- `src/components/ChatButton.tsx`
- `src/components/ChatLoader.tsx`

---

## Files to Modify

| File | Change |
|------|--------|
| `astro.config.mjs` | `output: 'hybrid'`, descomentar cloudflare adapter |
| `src/pages/api/_openai-chat.ts.disabled` | Renombrar a `openai-chat.ts` |
| `src/components/HeroUnique.tsx` | Reescribir con lógica de chat funcional |
| `src/components/AppContent.tsx` | Eliminar ChatWidget |
| `src/components/ChatWidget.tsx` | Eliminar |
| `src/components/ChatWidget.css` | Eliminar |
| `src/components/ChatButton.tsx` | Eliminar |
| `src/components/ChatLoader.tsx` | Eliminar |

---

## Non-goals

- No cambios al system prompt del API.
- No cambios a traducciones (`t.chat.*` ya tiene todo lo necesario).
- No cambios al look visual de la tarjeta del hero.
- No dark mode changes.
- No nuevos archivos.
