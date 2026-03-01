# Visual Enhancements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a two-row infinite tech marquee band and diagonal scroll-reveal animations to make the portfolio feel less static.

**Architecture:** Task 1 creates `TechMarquee.tsx` using `react-icons/si` logos + existing `.marquee-track` CSS. Task 2 wires it into AppContent between Hero and Projects. Task 3 updates `ProjectsUnique.tsx` with diagonal entry animations and number hover accent.

**Tech Stack:** React, Framer Motion (already installed), react-icons/si (already installed, v5.5.0), existing `.marquee-track` CSS class in `src/index.css`.

---

### Task 1: Create TechMarquee component

**Files:**
- Create: `src/components/TechMarquee.tsx`

**Context:** The project already has `.marquee-track` CSS class in `src/index.css` (lines ~135-148) that animates `transform: translateX(-50%)` over 30s. We duplicate items so the loop is seamless. Two rows: row 1 scrolls left (default), row 2 scrolls right (`animation-direction: reverse`).

`react-icons/si` package is installed. Import names follow `Si` + PascalCase of the brand. Example: `SiDocker`, `SiReact`. For techs not in simple-icons (Proxmox, Caddy, Tailscale), use `react-icons/fi` fallback icons.

**Step 1: Create the file**

```tsx
import { SiLinux, SiDocker, SiNginx, SiTypescript, SiReact, SiAstro, SiNodedotjs, SiGit, SiN8N } from "react-icons/si";
import { FiServer, FiShield, FiLink2 } from "react-icons/fi";

const ROW_1 = [
  { icon: SiLinux,      name: "Linux"      },
  { icon: SiDocker,     name: "Docker"     },
  { icon: FiServer,     name: "Proxmox"    },
  { icon: SiNginx,      name: "Nginx"      },
  { icon: FiShield,     name: "Caddy"      },
  { icon: FiLink2,      name: "Tailscale"  },
];

const ROW_2 = [
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiReact,      name: "React"      },
  { icon: SiAstro,      name: "Astro"      },
  { icon: SiNodedotjs,  name: "Node.js"    },
  { icon: SiN8N,        name: "n8n"        },
  { icon: SiGit,        name: "Git"        },
];

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_1; reverse?: boolean }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-xs font-mono text-muted select-none shrink-0"
            >
              <Icon size={16} aria-hidden />
              {item.name}
              <span className="text-faint ml-4">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="border-t border-b border-[hsl(var(--border))] py-8 overflow-hidden">
      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>
    </div>
  );
}
```

**Step 2: Verify the file was created**

Run: `ls src/components/TechMarquee.tsx`
Expected: file exists

**Step 3: Commit**

```bash
git add src/components/TechMarquee.tsx
git commit -m "feat: add TechMarquee component with two-row infinite scroll"
```

---

### Task 2: Wire TechMarquee into AppContent

**Files:**
- Modify: `src/components/AppContent.tsx`

**Context:** `AppContent.tsx` renders `<HeroUnique />` then `<ProjectsUnique />` inside `<main>`. Insert `<TechMarquee />` between them.

**Step 1: Read current AppContent.tsx**

Current content of `src/components/AppContent.tsx`:
```tsx
// Wrapper para todos los componentes que necesitan LanguageProvider
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import NavbarSimple from './NavbarSimple';
import HeroUnique from './HeroUnique';
import ProjectsUnique from './ProjectsUnique';
import ThinkingSection from './ThinkingSection';
import ContactUnique from './ContactUnique';
import FooterMinimal from './FooterMinimal';
import ChatWidget from './ChatWidget';
import BackToTop from './BackToTop';

export default function AppContent() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
```

**Step 2: Add the import and component**

Add import line after the `HeroUnique` import:
```tsx
import TechMarquee from './TechMarquee';
```

Change `<main>` block to:
```tsx
<main>
  <HeroUnique />
  <TechMarquee />
  <ProjectsUnique />
  <ThinkingSection />
  <ContactUnique />
</main>
```

**Step 3: Commit**

```bash
git add src/components/AppContent.tsx
git commit -m "feat: insert TechMarquee between hero and projects"
```

---

### Task 3: Diagonal scroll-reveal + hover accent in ProjectsUnique

**Files:**
- Modify: `src/components/ProjectsUnique.tsx`

**Context:** Each project row currently has `initial={{ opacity: 0, y: 24 }}`. We change it to `{ opacity: 0, x: -32, y: 16 }` for a diagonal entry. The stagger delay is already set (`index * 0.07`). We also add a coral accent to the row number on hover — the number span currently has no group-hover class, and `group` is on the inner grid div (line 49).

**Current code of the `motion.article` and its children (lines 39-96):**
```tsx
<motion.article
  key={project.id}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.5, delay: index * 0.07 }}
>
  {/* Top separator */}
  <div className="h-px bg-[hsl(var(--border))]" />

  <div className="grid grid-cols-[48px_1fr] sm:grid-cols-[64px_1fr_auto] gap-x-6 sm:gap-x-10 py-8 items-start group">

    {/* Number */}
    <span className="font-mono text-xs text-muted pt-1 tabular-nums">
      {String(index + 1).padStart(2, "0")}
    </span>
    ...
```

**Step 1: Change initial animation values**

Find this exact string in `src/components/ProjectsUnique.tsx`:
```
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.5, delay: index * 0.07 }}
```

Replace with:
```
  initial={{ opacity: 0, x: -32, y: 16 }}
  whileInView={{ opacity: 1, x: 0, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
```

**Step 2: Add coral hover to the number**

Find:
```tsx
    <span className="font-mono text-xs text-muted pt-1 tabular-nums">
```

Replace with:
```tsx
    <span className="font-mono text-xs text-muted pt-1 tabular-nums group-hover:text-coral transition-colors duration-300">
```

**Step 3: Verify changes look right**

Read the file to confirm both changes applied correctly. The `motion.article` should have `x: -32, y: 16` in initial, and the number span should have `group-hover:text-coral`.

**Step 4: Commit**

```bash
git add src/components/ProjectsUnique.tsx
git commit -m "feat: diagonal scroll-reveal and coral number hover on projects"
```
