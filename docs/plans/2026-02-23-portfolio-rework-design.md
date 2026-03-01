# Portfolio Rework — Design Document
**Date:** 2026-02-23
**Status:** Approved

---

## Context

Total visual and structural rework of danielfonov.dev. The current site uses a dark nebula theme with violet/fuchsia gradients that feels generic. The goal is a distinctive, memorable identity inspired by Anthropic's editorial aesthetic.

**Audience:** Technical community and peers (other developers, sysadmins) — people who want to see how Daniel thinks and what he builds.
**Language:** Bilingual ES/EN using existing i18n system.
**Stack:** Astro + React + Framer Motion + Tailwind CSS (unchanged).

---

## Aesthetic Direction — "Editorial Técnico"

Inspired by anthropic.com / claude.ai: warm cream background, prominent editorial serif typography, muted earthy color blocks, organic line-art illustrations, generous whitespace. Light theme only — no dark mode.

The contrast of an editorial/magazine aesthetic for a sysadmin/developer profile is the differentiating factor.

---

## Design Tokens

### Colors
```css
--bg:          #F2EDE6;  /* warm cream — base background */
--surface:     #E8E0D5;  /* slightly darker cream — cards, scrolled navbar */
--border:      #D0C5B8;  /* subtle borders */
--sage:        #B8C9B2;  /* project block 1 */
--terracotta:  #C87B5F;  /* primary accent, CTA button */
--lavender:    #C2BDD6;  /* project block 2 */
--slate:       #9BB8C5;  /* project block 3 */
--sand:        #E8E0D5;  /* project block 4 */
--ink:         #1C1814;  /* primary text — warm near-black */
--muted:       #7A6E65;  /* secondary text */
--faint:       #A89E95;  /* tertiary text, labels */
```

### Typography
| Role | Font | Notes |
|---|---|---|
| Display / Headlines | `Fraunces` (variable) | Serif, organic, Anthropic-like. Free via Google Fonts. |
| Body | `DM Sans` | Clean, legible sans-serif. Contrasts with serif headlines. |
| Labels / Tags / Mono | `JetBrains Mono` | Technical labels, section numbers, tags. |

### Motion
- Fade + slide-up on scroll entry (subtle, not springy)
- SVG illustrations: stroke self-draw animation on viewport entry
- Hover states: gentle opacity/translate, no magnetic effects
- No parallax, no heavy spring physics

---

## Site Structure

Replaces current: Hero → About → Projects → Skills → Contact → Footer

New structure:

```
Navbar
Hero
Work          (replaces Projects)
Thinking      (merges About + Skills)
Contact
Footer
```

---

## Section Specs

### Navbar
- Left: `Daniel Fonov` wordmark in small Fraunces
- Right: text links `Work · Thinking · Contact` + `EN · ES` toggle
- Transparent until scroll → then `--surface` background + subtle backdrop blur
- No pill selector, no heavy borders — just underline or opacity on active link

### Hero
Two-column layout (55% / 45%):

**Left column:**
- Mono label: `Gijón, Spain · Available` (JetBrains Mono, small, `--muted`)
- Large Fraunces headline, ~3 lines. Suggested: *"Between servers and code"* / *"Entre servidores y código"*
- 2–3 sentence description in DM Sans. Honest, personal tone — not CV language.
- Primary CTA button (terracotta fill): `See my work →`
- Secondary text link: `About me` / `Sobre mí`

**Right column:**
- Abstract organic SVG line-art illustration
- Draws itself via stroke animation on page load
- Style: simple continuous line, Anthropic-inspired

### Work
Section label: `002 / WORK` in mono + large Fraunces heading.

Projects rendered as **full-width horizontal feature cards**, stacked vertically. Each card has its own background color:

| # | Project | Block color |
|---|---|---|
| 1 | Mail server infra | `--sage` |
| 2 | Discord bot / OpenAI | `--lavender` |
| 3 | Web scraping / n8n | `--slate` |
| 4 | Portfolio site | `--sand` |

Card anatomy:
- Category label (mono, small)
- Project name (Fraunces, large)
- Short description (DM Sans)
- Tech tags (mono, small)
- Link arrow `→`
- Small line-art illustration (unique per project, top-right corner)

No screenshots. Color + typography + illustration carry the visual weight.

### Thinking
Section label: `003 / THINKING` + Fraunces heading.

Two-column layout:

**Left column — narrative text:**
- Written as flowing prose, not bullet points
- Covers: how Daniel got into systems, what drives him, how he thinks about infrastructure + code
- Timeline references inline as small mono annotations: `Since 2022`, `Since 2024`
- 3–4 paragraphs in DM Sans

**Right column — technology ecosystem:**
Three grouped clusters, each with a small line-art illustration above:
- `Infrastructure` — Linux, Docker, Proxmox, SSH, VPN
- `Development` — React, TypeScript, Python, Astro
- `Automation` — n8n, Bash, CI/CD, Git

Tags rendered in mono with subtle `--border` outline. No progress bars, no percentage numbers.

### Contact
Clean, no form.

- Fraunces heading: *"Let's talk."* / *"Hablamos."*
- One short paragraph
- Email as large prominent link (terracotta on hover)
- Social links as plain text: `GitHub · LinkedIn · Discord`

### Footer
Dark band (contrasts deliberately with the cream site — echoes Anthropic's dark footer):
- Background: `--ink` (`#1C1814`)
- Text: warm light cream
- Left: `Daniel Fonov` + one-liner
- Right: copyright + `Built with Astro + React`

---

## Components to Create / Rewrite

| Component | Action |
|---|---|
| `NavbarSimple.tsx` | Rewrite — new wordmark style, transparent→surface scroll behavior |
| `HeroUnique.tsx` | Rewrite — two-col layout, new palette, line-art SVG |
| `ProjectsUnique.tsx` | Rewrite — horizontal feature cards with color blocks |
| `SkillsUnique.tsx` | Delete — merged into Thinking |
| `AboutUnique.tsx` | Rewrite as `ThinkingSection.tsx` — prose + tech clusters |
| `ContactUnique.tsx` | Rewrite — no form, minimal |
| `FooterMinimal.tsx` | Rewrite — dark band |
| `index.css` / `tailwind.config.js` | Update tokens, add Fraunces + DM Sans + JetBrains Mono |
| `NebulaEffect.tsx` | Delete — not needed in light theme |

---

## Out of Scope
- Dark mode
- New pages (blog, notes)
- Backend changes
- Chat widget redesign (keep as-is for now)
