# Portfolio Contrast Enhancement Design

**Goal:** Add visual richness to the editorial rework by alternating dark/light sections, a marquee ticker divider, and grain texture on dark surfaces.

**Architecture:** No structural changes — same component tree. Only background colors, text colors, and two new elements (MarqueeTicker component, CSS grain).

**Approved:** 2026-02-23

---

## Section Rhythm

| Section   | Background       | Text          |
|-----------|-----------------|---------------|
| Hero      | `--ink` (dark)  | `--bg` cream  |
| Work      | `--bg` (cream)  | `--ink`       |
| Thinking  | `--ink` (dark)  | `--bg` cream  |
| Contact   | `--bg` (cream)  | `--ink`       |
| Footer    | `--ink` (dark)  | `--bg` cream  |

---

## Details

### Grain texture
CSS pseudo-element on dark sections using an inline SVG `<feTurbulence>` filter. Opacity ~3%, `pointer-events: none`, `mix-blend-mode: overlay`. Applied via `.dark-grain` utility class in `index.css`.

### MarqueeTicker component
New `src/components/ui/MarqueeTicker.tsx`:
- Horizontal infinite scroll via CSS `@keyframes marquee`
- Content: `LINUX · DOCKER · REACT · PYTHON · NGINX · PROXMOX · TYPESCRIPT · N8N · ASTRO · `
- Font: JetBrains Mono, xs, text-muted
- Background: `--surface`
- Placed twice: between Hero→Work, and between Thinking→Contact

### Navbar color adaptation
When `isScrolled === false` (over dark hero): text-[hsl(var(--bg))] + hamburger lines bg-[hsl(var(--bg))]
When `isScrolled === true`: existing surface bg + text-ink behavior (unchanged)

### Hero (dark variant)
- `bg-ink` section background
- Headline: `text-[hsl(var(--bg))]` + italic second line in `text-[hsl(var(--muted))]` (lighter cream)
- Description + badge: `text-[hsl(var(--muted))]`
- Primary CTA: `bg-terracotta text-white` (unchanged)
- Secondary CTA: `border-white/30 text-[hsl(var(--bg))]`
- Illustration SVG: `text-[hsl(var(--bg))]`
- Grain overlay pseudo-element

### Work (light — no changes)
Structurally unchanged. Minor: card hover lift `hover:-translate-y-1`.

### Thinking (dark variant)
- `bg-ink` section background
- Title, prose, badges: adapt to cream text
- Cluster cards: `border-white/15 bg-white/5`
- Skill tags: `border-white/20 text-[hsl(var(--muted))]`

### Contact (light — no changes)
Unchanged.

---

## Files to touch

- `src/components/HeroUnique.tsx` — dark bg, inverted colors
- `src/components/ThinkingSection.tsx` — dark bg, inverted colors
- `src/components/NavbarSimple.tsx` — cream text when not scrolled
- `src/components/AppContent.tsx` — insert MarqueeTicker instances
- `src/components/ui/MarqueeTicker.tsx` — new file
- `src/index.css` — `.dark-grain` utility + `@keyframes marquee`
