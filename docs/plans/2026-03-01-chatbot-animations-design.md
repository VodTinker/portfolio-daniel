# Chatbot Animations — Design

**Date:** 2026-03-01
**Scope:** ChatButton, ChatWidget (window + messages), ChatLoader
**Style:** Expresivas y llamativas — Enfoque A (Teatral con Spring Physics)

---

## Context

The current chatbot has basic Framer Motion animations (opacity+y+scale) and a
ChatLoader with hardcoded purple colors (`rgb(161,94,255)`) out of the portfolio
palette. All animations feel generic. The goal is to make the chatbot a visual
highlight of the portfolio while staying within the design token system
(coral/ink/bg/surface/border).

---

## Design Decisions

### 1. ChatButton — Flip 3D + Pulse Ring

**Flip 3D on open/close:**
- Wrap the icon content in `AnimatePresence` with `mode="wait"`
- Chat icon: `initial={{ rotateY: -90 }} → animate={{ rotateY: 0 }}`
- X icon: `initial={{ rotateY: 90 }} → animate={{ rotateY: 0 }}`
- `perspective` set on the button container via `style={{ perspective: 200 }}`
- `transformOrigin: "center"`, spring `stiffness: 300, damping: 20`

**Pulse ring (idle state only, when chat is closed):**
- A `motion.span` absolutely positioned over the button
- Renders only when `!isOpen`
- Animates: `scale: 1 → 1.6, opacity: 0.6 → 0` in a loop via `animate` + `repeat: Infinity`
- Color: `hsl(var(--coral))`, border only (not filled)
- Duration: 2s, ease: "easeOut"

### 2. ChatWidget Window — Clip-Path Unfold

Replace current `opacity + y + scale` with a clip-path reveal that "unfolds"
the window from the bottom-right corner (origin: the chat button).

```
initial:  clipPath "inset(100% 0% 0% 100% round 28px)"
animate:  clipPath "inset(0% 0% 0% 0% round 4px)"
exit:     clipPath "inset(100% 0% 0% 100% round 28px)"
```

- Open spring: `stiffness: 300, damping: 28`
- Close spring: `stiffness: 400, damping: 32` (faster collapse)
- Keep `opacity: 0 → 1` alongside for smoothness (duration: 0.15s)

### 3. Messages — Differentiated Entrance

**User messages** (right-aligned):
```
initial: { opacity: 0, x: 40, scale: 0.95 }
animate: { opacity: 1, x: 0, scale: 1 }
spring:  stiffness: 400, damping: 22
```

**Assistant messages** — Typewriter effect:
- Store full `content` string, expose a `displayedText` state that grows
- `useEffect` on message mount: `setInterval` at 18ms/char to append characters
- Show a blinking cursor `|` (CSS animation) at the end while typing is active
- Typewriter caps at 120 chars before snapping the rest (prevents slow UX for
  long responses)
- After typewriter completes, cursor fades out
- Entry: fade in only (`opacity: 0 → 1`, 120ms) so the text box appears before
  typing begins

### 4. ChatLoader — Chain Dots (new, replaces purple loader entirely)

Three dots using spring physics chaining. Dot 1 drives the motion; dots 2 and 3
follow with staggered delay, creating a fluid "chain" illusion.

- Each dot: 10×10px circle, `background: hsl(var(--coral))`
- Animation: `y: 0 → -14 → 0`, spring `stiffness: 600, damping: 10`
- Stagger: dot1 delay 0s, dot2 delay 0.12s, dot3 delay 0.24s
- `repeat: Infinity, repeatType: "loop"`
- The `.chat-loader` container: `height: 44px`, `gap: 8px`
- Remove all purple colors and the bar/magnifying-glass SVG entirely

---

## Files Modified

| File | Changes |
|------|---------|
| `ChatButton.tsx` | Flip 3D icon swap + pulse ring |
| `ChatWidget.tsx` | clip-path window + typewriter messages + differentiated user slide |
| `ChatLoader.tsx` | Full rewrite — chain dots in coral |
| `ChatWidget.css` | Remove box-shadow animation that conflicts with clip-path |

## Constraints

- All colors via CSS tokens only (`hsl(var(--coral))`, `hsl(var(--ink))`, etc.)
- `useReducedMotion` check: skip all animations if user prefers reduced motion
- Typewriter must not break `whitespace-pre-line` formatting
- Clip-path `inset()` is supported in all modern browsers (Chrome 55+, FF 54+, Safari 10.1+)
