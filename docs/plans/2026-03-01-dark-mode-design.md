# Dark Mode Design

**Date:** 2026-03-01
**Branch:** rework-classic

## Summary

Add a manual dark mode toggle to the portfolio. Starts in light mode, persists preference in `localStorage`. Uses CSS custom property overrides (no Tailwind `dark:` prefix in components). Warm dark palette to match kioku's aesthetic.

## Decisions

- **Activation:** Manual toggle only (not OS-based). Default: light.
- **Palette:** Warm dark — brown-black tones, cream text.
- **Approach:** CSS vars override (`.dark {}` block in `index.css`).
- **Toggle location:** NavbarSimple, next to EN·ES switcher, before CTA button.

## Dark Palette Tokens

```css
.dark {
  --bg:      25 18%  8%;   /* #1A1410 — warm near-black */
  --surface: 25 15% 13%;   /* #242018 — dark surface */
  --border:  25 12% 22%;   /* #3A3228 — subtle dark border */
  --ink:     36 30% 93%;   /* #F5F1E8 — cream (light bg inverted) */
  --muted:   25  9% 56%;   /* #9A8E80 */
  --faint:   25  6% 40%;   /* #6E6560 */
}
```

Accent tokens (`--coral`, `--sage`, `--terracotta`, `--lavender`, `--slate-blue`) stay unchanged.

## Architecture

### ThemeContext (`src/contexts/ThemeContext.tsx`)
- Same pattern as `LanguageContext`
- State: `"light" | "dark"`, default `"light"`
- Persists to `localStorage("theme")`
- On change: adds/removes class `dark` on `document.documentElement`
- Exports: `ThemeProvider`, `useTheme()`

### NavbarSimple toggle
- Sun/moon SVG icon button (inline, no extra deps)
- Placed between lang switcher and CTA button
- Uses `useTheme()` hook

### Dark sections fix (FooterMinimal, ContactUnique stats band)
- These have hardcoded dark bg (`hsl(25 12% 8%)`)
- In dark mode they become invisible against the dark page bg
- Fix: add `dark:bg-[hsl(25_12%_15%)]` on just these 2 elements

### Provider wiring
- `ThemeProvider` wraps children in `AppContent.tsx` alongside `LanguageProvider`

## Files to Change

| File | Change |
|------|--------|
| `src/index.css` | Add `.dark { ... }` token block |
| `src/contexts/ThemeContext.tsx` | Create new context |
| `src/components/NavbarSimple.tsx` | Add toggle button, import `useTheme` |
| `src/components/FooterMinimal.tsx` | Add `dark:` class on dark bg element |
| `src/components/ContactUnique.tsx` | Add `dark:` class on stats band |
| `src/components/AppContent.tsx` | Wrap with `ThemeProvider` |
