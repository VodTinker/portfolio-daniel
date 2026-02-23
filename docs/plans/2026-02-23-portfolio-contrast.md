# Portfolio Contrast Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add visual richness by alternating dark/light sections (Hero+Thinking dark, Work+Contact light), a marquee ticker divider, grain texture on dark sections, and navbar color adaptation.

**Architecture:** No structural changes to component tree. Each dark section gets `bg-ink` + inverted text colors. Two `MarqueeTicker` components inserted between sections. CSS grain via `.dark-grain` pseudo-element utility.

**Tech Stack:** React 18, Framer Motion, Tailwind CSS, CSS custom properties (HSL tokens), Astro 5

---

### Task 1: CSS — grain texture + marquee keyframes

**Files:**
- Modify: `src/index.css`

**Step 1: Add `.dark-grain` utility and `@keyframes marquee` at the end of `src/index.css`**

Append after the last block (after `.svg-draw` rules):

```css
/* ─── Dark section grain texture ────────────────────────── */
.dark-grain {
  position: relative;
}
.dark-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  z-index: 1;
}

/* ─── Marquee ticker ─────────────────────────────────────── */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}
```

**Step 2: Verify CSS parses correctly**

Run: `npx astro check`
Expected: 0 errors (CSS is not type-checked, just confirm no import issues)

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add dark-grain utility and marquee keyframes to CSS"
```

---

### Task 2: Create MarqueeTicker component

**Files:**
- Create: `src/components/ui/MarqueeTicker.tsx`

**Step 1: Create the file**

```tsx
// src/components/ui/MarqueeTicker.tsx
const ITEMS = [
  "LINUX", "DOCKER", "REACT", "PYTHON",
  "NGINX", "PROXMOX", "TYPESCRIPT", "N8N",
  "ASTRO", "TAILSCALE", "BASH", "GIT",
];

const text = ITEMS.map((i) => `${i} ·`).join("  ") + "  ";

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden bg-[hsl(var(--surface))] border-y border-[hsl(var(--border))] py-3 select-none">
      <div className="marquee-track" aria-hidden="true">
        {/* Two copies so the scroll loops seamlessly */}
        <span className="text-xs font-mono text-muted px-8 whitespace-nowrap">{text}</span>
        <span className="text-xs font-mono text-muted px-8 whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}
```

**Step 2: Verify type-check**

Run: `npx astro check`
Expected: 0 errors

**Step 3: Commit**

```bash
git add src/components/ui/MarqueeTicker.tsx
git commit -m "feat: create MarqueeTicker component — infinite scroll tech strip"
```

---

### Task 3: Update NavbarSimple — cream text on dark hero

**Files:**
- Modify: `src/components/NavbarSimple.tsx`

The navbar currently uses `text-ink` and `text-muted` unconditionally. When `isScrolled === false` it sits over the dark Hero section, so text must be cream.

**Step 1: Read the current file**

Open `src/components/NavbarSimple.tsx` and locate:
- The wordmark `<a>` tag — has `className="... text-ink ..."`
- The desktop links — have `text-muted` and `text-ink` for active/inactive
- The language toggle buttons — same pattern
- The hamburger lines — `bg-ink`

**Step 2: Modify the className logic**

Change the wordmark class:
```tsx
// Before:
className="font-serif text-lg text-ink hover:opacity-70 transition-opacity"

// After:
className={`font-serif text-lg transition-opacity hover:opacity-70 ${
  isScrolled ? "text-ink" : "text-[hsl(var(--bg))]"
}`}
```

Change desktop link active/inactive classes:
```tsx
// Before (active):
"text-ink font-medium"
// After (active):
isScrolled ? "text-ink font-medium" : "text-[hsl(var(--bg))] font-medium"

// Before (inactive):
"text-muted hover:text-ink"
// After (inactive):
isScrolled ? "text-muted hover:text-ink" : "text-[hsl(var(--bg))]/60 hover:text-[hsl(var(--bg))]"
```

Change language toggle buttons:
```tsx
// Before (active lang):
language === "en" ? "text-ink font-medium" : "text-muted hover:text-ink"

// After (active lang):
language === "en"
  ? (isScrolled ? "text-ink font-medium" : "text-[hsl(var(--bg))] font-medium")
  : (isScrolled ? "text-muted hover:text-ink" : "text-[hsl(var(--bg))]/60 hover:text-[hsl(var(--bg))]")
```

Change the dot separator `<span className="text-faint">`:
```tsx
// After:
className={isScrolled ? "text-faint" : "text-[hsl(var(--bg))]/40"}
```

Change hamburger lines `bg-ink`:
```tsx
// After:
className={`block w-5 h-px transition-transform origin-center ${
  isScrolled ? "bg-ink" : "bg-[hsl(var(--bg))]"
} ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
// (same pattern for the other two lines)
```

**Step 3: Verify**

Run: `npx astro check`
Expected: 0 errors

**Step 4: Commit**

```bash
git add src/components/NavbarSimple.tsx
git commit -m "feat: navbar adapts to dark hero — cream text when not scrolled"
```

---

### Task 4: HeroUnique — dark background variant

**Files:**
- Modify: `src/components/HeroUnique.tsx`

**Step 1: Change section background and text colors**

```tsx
// Before:
<section
  id="home"
  className="min-h-screen flex items-center px-6 sm:px-10 lg:px-16 pt-28 pb-20"
>

// After:
<section
  id="home"
  className="dark-grain bg-ink min-h-screen flex items-center px-6 sm:px-10 lg:px-16 pt-28 pb-20"
>
```

**Step 2: Update badge text color**

```tsx
// Before:
<span className="inline-flex items-center gap-2 text-xs font-mono text-muted">
  <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />

// After:
<span className="inline-flex items-center gap-2 text-xs font-mono text-[hsl(var(--bg))]/60">
  <span className="w-1.5 h-1.5 rounded-full bg-sage inline-block" />
```

**Step 3: Update headline colors**

```tsx
// Before:
className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] tracking-tight text-ink mb-6"
// After:
className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] tracking-tight text-[hsl(var(--bg))] mb-6"
```

The italic second line:
```tsx
// Before:
<em className="not-italic text-muted">
// After:
<em className="not-italic text-[hsl(var(--bg))]/60">
```

**Step 4: Update description**

```tsx
// Before:
className="text-base sm:text-lg text-muted leading-relaxed max-w-md mb-10"
// After:
className="text-base sm:text-lg text-[hsl(var(--bg))]/60 leading-relaxed max-w-md mb-10"
```

**Step 5: Update secondary CTA**

```tsx
// Before:
className="inline-flex items-center px-5 py-2.5 rounded-sm border border-[hsl(var(--border))] text-ink text-sm font-medium hover:border-ink transition-colors"
// After:
className="inline-flex items-center px-5 py-2.5 rounded-sm border border-white/30 text-[hsl(var(--bg))] text-sm font-medium hover:border-white/60 transition-colors"
```

**Step 6: Update illustration wrapper color**

```tsx
// Before:
<div className="w-full max-w-sm lg:max-w-none text-[hsl(var(--ink))]">
// After:
<div className="w-full max-w-sm lg:max-w-none text-[hsl(var(--bg))]">
```

**Step 7: Verify**

Run: `npx astro check`
Expected: 0 errors

**Step 8: Commit**

```bash
git add src/components/HeroUnique.tsx
git commit -m "feat: hero dark variant — ink background, cream text, grain texture"
```

---

### Task 5: ThinkingSection — dark background variant

**Files:**
- Modify: `src/components/ThinkingSection.tsx`

**Step 1: Change section background**

```tsx
// Before:
<section id="thinking" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
// After:
<section id="thinking" className="dark-grain bg-ink px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
```

**Step 2: Update section label color**

```tsx
// Before:
className="text-xs font-mono text-muted tracking-widest uppercase mb-4"
// After:
className="text-xs font-mono text-[hsl(var(--bg))]/50 tracking-widest uppercase mb-4"
```

**Step 3: Update title color**

```tsx
// Before:
className="font-serif text-4xl sm:text-5xl font-light text-ink mb-10"
// After:
className="font-serif text-4xl sm:text-5xl font-light text-[hsl(var(--bg))] mb-10"
```

**Step 4: Update prose paragraphs**

```tsx
// Before:
className="text-base text-muted leading-relaxed"
// After:
className="text-base text-[hsl(var(--bg))]/60 leading-relaxed"
```

**Step 5: Update timeline badges border/text**

```tsx
// Before:
className="text-xs font-mono text-muted px-3 py-1.5 border border-[hsl(var(--border))] rounded-sm"
// After:
className="text-xs font-mono text-[hsl(var(--bg))]/50 px-3 py-1.5 border border-white/15 rounded-sm"
```

**Step 6: Update cluster card borders and backgrounds**

The `clusterAccent` array currently uses `border-terracotta/40`, `border-sage/40`, `border-lavender/40`.
Change to white-based borders for dark bg:

```tsx
// Before:
const clusterAccent = [
  "border-terracotta/40",
  "border-sage/40",
  "border-lavender/40",
] as const;

// After:
const clusterAccent = [
  "border-terracotta/50",
  "border-sage/50",
  "border-lavender/50",
] as const;
```

Update card background:
```tsx
// Before:
className={`border ${clusterAccent[i]} rounded-sm p-5 bg-[hsl(var(--surface))]`}
// After:
className={`border ${clusterAccent[i]} rounded-sm p-5 bg-white/5`}
```

**Step 7: Update cluster name text and illustration**

```tsx
// Before:
<div className="text-muted">
  <ClusterIllustration variant={i as 0 | 1 | 2} />
</div>
<span className="text-sm font-mono text-ink">
// After:
<div className="text-[hsl(var(--bg))]/50">
  <ClusterIllustration variant={i as 0 | 1 | 2} />
</div>
<span className="text-sm font-mono text-[hsl(var(--bg))]">
```

**Step 8: Update skill tag colors**

```tsx
// Before:
className="px-2 py-0.5 text-xs font-mono text-muted border border-[hsl(var(--border))] rounded-sm"
// After:
className="px-2 py-0.5 text-xs font-mono text-[hsl(var(--bg))]/60 border border-white/20 rounded-sm"
```

**Step 9: Verify**

Run: `npx astro check`
Expected: 0 errors

**Step 10: Commit**

```bash
git add src/components/ThinkingSection.tsx
git commit -m "feat: thinking section dark variant — ink background, cream text, inverted cards"
```

---

### Task 6: AppContent — insert MarqueeTicker between sections

**Files:**
- Modify: `src/components/AppContent.tsx`

**Step 1: Add import**

```tsx
import MarqueeTicker from './ui/MarqueeTicker';
```

**Step 2: Insert tickers in JSX**

```tsx
// Before:
<main>
  <HeroUnique />
  <ProjectsUnique />
  <ThinkingSection />
  <ContactUnique />
</main>

// After:
<main>
  <HeroUnique />
  <MarqueeTicker />
  <ProjectsUnique />
  <MarqueeTicker />
  <ThinkingSection />
  <MarqueeTicker />
  <ContactUnique />
</main>
```

**Step 3: Verify build**

Run: `npx astro build`
Expected: `[build] Complete!`

**Step 4: Commit**

```bash
git add src/components/AppContent.tsx
git commit -m "feat: insert MarqueeTicker dividers between sections"
```

---

### Task 7: Final type check + push

**Step 1: Full type check**

Run: `npx astro check`
Expected: 0 errors

**Step 2: Full build**

Run: `npx astro build`
Expected: `[build] Complete!`

**Step 3: Push branch**

```bash
git push origin rework-classic
```
