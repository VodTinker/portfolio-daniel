# Visual Enhancements Design

**Date:** 2026-03-01
**Branch:** rework-classic

## Summary

Two visual enhancements to make the page feel less static:
1. A two-row infinite marquee band with tech logos + names between Hero and Projects.
2. Diagonal scroll-reveal animation for project rows + hover accent on number/description.

## Enhancement 1: Tech Marquee Band

**Component:** New `TechMarquee.tsx` (rendered between HeroUnique and ProjectsUnique in AppContent)

**Layout:**
- `border-t border-b border-[hsl(var(--border))]`, `py-10`, transparent bg
- Two rows: row 1 scrolls left (→), row 2 scrolls right (←), each `duration: 30s`
- Uses existing `.marquee-track` CSS class. Row 2 adds `animation-direction: reverse`

**Items (inline SVG + mono label):**

Row 1 (infra): Linux, Docker, Proxmox, Nginx, Caddy, Tailscale
Row 2 (dev): TypeScript, React, Astro, Node.js, n8n, Git

Each item: `<span class="flex items-center gap-2 px-6">SVG + text-xs font-mono text-muted</span>`
Separator between items: `·` in `text-faint`

**SVGs:** Inline, 18×18px, `fill="currentColor"` or `stroke="currentColor"`. Simple recognizable icons for each tech. No external deps.

**Duplicate items** in each marquee track (×2) for seamless loop (existing pattern).

## Enhancement 2: Projects Diagonal Scroll-Reveal

**Component:** `ProjectsUnique.tsx` — update existing `whileInView` animations

**Current:** each row has a basic `opacity: 0 → 1` reveal
**New initial state:** `{ opacity: 0, x: -32, y: 16 }` with stagger `delay: index * 0.08`
**New animate state:** `{ opacity: 1, x: 0, y: 0 }`
**Easing:** `[0.22, 1, 0.36, 1]` (existing EASE constant)

**Hover effect on each row:**
- Number (e.g. "01"): `group-hover:text-coral transition-colors`
- Row title: `group-hover:translate-x-1 transition-transform duration-200`
- Wrap each row `<div>` with `group` class

## Files

| File | Change |
|------|--------|
| `src/components/TechMarquee.tsx` | Create new marquee component |
| `src/components/AppContent.tsx` | Add `<TechMarquee />` between Hero and Projects |
| `src/components/ProjectsUnique.tsx` | Update animations + add hover group effects |
