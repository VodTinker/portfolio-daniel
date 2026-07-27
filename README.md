```
 __      __        _ _____ _       _
 \ \    / /       | |_   _(_)     | |
  \ \  / /__   __| | | |  _ _ __  | | _____ _ __
   \ \/ / _ \ / _` | | | | | '_ \ | |/ / _ \ '__|
    \  / (_) | (_| | | | | | | | ||   <  __/ |
     \/ \___/ \__,_|_|_| |_|_| |_|/_\_\___|_|
```

# VodTinker: Retro Cyberpunk & Gamified Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-6.3.3-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)

> 🌍 [Español](./README.es.md) | English

A high-fidelity, interactive retro-cyberpunk portfolio website built with **Astro**, **React**, and **TypeScript**. It transitions the traditional personal CV into an engaging 8-bit experience featuring physical CRT controls, a visual tweaks customizer, real-time scoreboard rewards, dynamic onboarding quests, and an AI companion.

```
+--------------------------------------------------+
| DANIEL (LV. 21)               CLASS: SYSADMIN   |
+--------------------------------------------------+
| HP: [██████████████████████░░] 92%               |
| MP: [██████████████░░░░░░░░░░] 68%               |
| XP: [████████████████████░░░░] 85%               |
+--------------------------------------------------+
```

---

## Features

### Interactive Onboarding Quests
- **Sequential Micro-Quests:** Guides visitors through the unique features of the portfolio via an interactive HUD.
- **Scoreboard Integration:** Completing quests triggers chiptune sound effects and dynamically awards points and coins to the persistent navbar scoreboard.
- **Completed HUD:** Congratulates the user with a virtual trophy display when all 5 quests are completed.

### Interactive CRT Terminal
- **Analog Power Toggle:** Click the screen's orange power switch or the monitor's red dot to boot or shut down the CRT screen effect.
- **Phosphor Cycling:** Toggle between classic Amber, Green, and Cyan phosphor terminal styles using the inline terminal header control.
- **Glitch Noise & Scanlines:** Activate or deactivate real-time static interference lines and scanline filters.

### Visual Tweaks Panel
- **Real-Time Global Themes:** A sidebar customizer to swap the website's entire color palette dynamically:
  - **Default Cyberpunk** (Deep violet and pink accents)
  - **Sunset Outrun** (Vibrant synthwave gradient aesthetics)
  - **Green Terminal** (Matrix-style command line interface)
  - **Gameboy Classic** (Four-shade pixel retro greens)
  - **Cyberneon** (High-contrast cyan and magenta neon outlines)
- **Persistency:** Theme preferences and screen configurations are seamlessly saved to `localStorage`.

### AI Companion & Command System
- **Smart Chatbot:** Fully conversational AI powered by OpenAI's GPT model to answer questions about skills, projects, and bio.
- **Command CLI:** Type `/help` or `/clear` to trigger custom terminal commands inside the chat box.

### Self-Hosted Performance
- **Local Typography:** Packages all custom pixel-art and mono typography (`Press Start 2P`, `VT323`, `Pixelify Sans`, `Silkscreen`, `JetBrains Mono`) locally via `@fontsource`. This bypasses Cloudflare Fonts edge optimization MIME-type issues and guarantees fast local loading.

---

## Interactive Mock Status API
You can query a mock status endpoint of the homelab locally or preview its structure:
```bash
$ curl -s https://vodtinker.dev/api/status
{
  "status": "online",
  "uptime": "99.99%",
  "preferred_sfx": "8-bit chiptunes",
  "current_quest": "Building awesome retro systems"
}
```

---

## Secret Cheat Codes & Easter Eggs
The website features hidden arcade elements built directly into the UI:
- **The Konami Code:** Press the classic sequence on your keyboard anywhere on the homepage to unlock a secret mode:
  `[ ↑ ] [ ↑ ] [ ↓ ] [ ↓ ] [ ← ] [ → ] [ ← ] [ → ] [ B ] [ A ]`
- **Interactive Avatar:** Click on Daniel's avatar inside the P1 READY character sheet frame to cycle stats, play level-up cues, and boost XP in real-time.

---

## Tech Stack

### Core Frameworks & Languages
- **Astro** (v6.3.3) - Static-first compiler for optimal page load times.
- **React** (v19.2.6) - Powers the reactive HUD, visual tweaks panel, and dynamic chatbot.
- **TypeScript** - Type-safety across all components.
- **Vanilla CSS & HSL Tokens** - Dynamic custom theme swapping.

### Additional Libraries
- **Framer Motion & Anime.js** - Interactive pixel physics and transitions.
- **i18next** - Deep localization supporting English and Spanish.
- **OpenAI API** - Intelligent chatbot completions.
- **@fontsource** - Performance-optimized offline-safe typography.

---

## Quick Start

### Prerequisites
- **Node.js** 20+ or **Bun** 1.1+ (recommended)
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VodTinker/portfolio-daniel.git
   cd portfolio-daniel
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your keys:
   - `OPENAI_API_KEY` - For the AI chatbot companion.
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` - For the contact form.

4. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. **Open local preview**
   Go to `http://localhost:3000`

---

## Available Scripts

```bash
bun run dev          # Start development server on port 3000
bun run build        # Build static production files (astro check & build)
bun run preview      # Preview the local production build
bun run lint         # Lint and verify code using Biome and Astro check
bun run format       # Format code with Biome formatter
bun run deploy       # Deploy manually to Cloudflare Pages via Wrangler
```

---

## Project Structure

```
portfolio-daniel/
├── src/
│   ├── components/        # React & UI components
│   │   ├── ui/           # Retro UI primitives
│   │   ├── AppContent.tsx # Global state tracker and component layout
│   │   ├── QuestHelper.tsx# Gamified active onboarding HUD
│   │   ├── PixelHero.tsx  # CRT Terminal & interactive landing header
│   │   ├── PixelTweaks.tsx# Visual settings customization sidebar
│   │   ├── PixelChat.tsx  # Floating AI companion drawer
│   │   └── Sprites.tsx    # Responsive animated retro sprite assets
│   ├── contexts/         # React Context wrappers
│   │   └── LanguageContext.tsx
│   ├── layouts/          # Astro layouts
│   │   └── Layout.astro   # Bootstrapped local fonts & global head configuration
│   ├── index.css         # Custom pixel-cyberpunk theme system CSS
│   └── env.d.ts          # TypeScript type definitions and declarations
├── public/               # Static assets & audio reward SFX
└── functions/            # Cloudflare Pages Workers (Edge Chatbot completion)
```

---

## Deployment

### Cloudflare Pages
This website is pre-configured to build and deploy to **Cloudflare Pages** automatically on every push:
- **Build Command:** `bun run build` (or `npm run build` using `.npmrc` legacy peer overrides)
- **Output Directory:** `dist`
- **Root Directory:** `/` (using Pages v2 strategy)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Daniel Fonov (VodTinker)**
- **Portfolio:** [vodtinker.dev](https://vodtinker.dev)
- **GitHub:** [@VodTinker](https://github.com/VodTinker)
- **LinkedIn:** [Daniel Fonov](https://www.linkedin.com/in/daniel-fonov-garcía)

---

*If you enjoyed this retro gamified experience, feel free to give the repository a star!*
