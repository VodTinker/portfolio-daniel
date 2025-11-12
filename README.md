# 🚀 VodTinker Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-5.15.3-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

> 🌍 [Español](./README.es.md) | English

A modern, multilingual portfolio website built with Astro, React, and TypeScript. Features interactive animations, an AI-powered chat assistant, dark/light theme switching, and a responsive design optimized for all devices.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Theme** - Automatic and manual theme switching with system preference detection
- 🌐 **Multilingual** - Full support for English and Spanish with i18next
- 💬 **AI Chat Assistant** - Interactive chatbot powered by OpenAI
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Performance Optimized** - Built with Astro for lightning-fast load times
- 🎭 **Smooth Animations** - Professional animations using Framer Motion and Anime.js
- 🔍 **SEO Friendly** - Optimized for search engines
- ♿ **Accessible** - WCAG compliant with semantic HTML

## 🛠️ Tech Stack

### Core Technologies
- **[Astro](https://astro.build)** (v5.15.3) - Static site generator
- **[React](https://react.dev)** (v18.3.1) - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** (v5.6.2) - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** (v3.4.17) - Utility-first CSS framework

### Additional Libraries
- **Framer Motion** - Advanced animations
- **Anime.js** - Lightweight animation library
- **React Icons** - Icon library
- **i18next** - Internationalization
- **OpenAI API** - AI-powered chat
- **AOS** - Animate On Scroll library

### Development Tools
- **Biome** - Fast linter and formatter
- **ESLint** - Code linting
- **Cloudflare Pages** - Deployment platform

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)
- **npm**, **pnpm**, **yarn**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VodTinker/VodTinker-Webpage.git
   cd VodTinker-Webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   - `OPENAI_API_KEY` - For the AI chat feature
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` - For contact form

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Available Scripts

```bash
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run build:clean  # Clean build (removes cache)
npm run preview      # Preview production build
npm run lint         # Lint code with Biome and Astro check
npm run format       # Format code with Biome
npm run deploy       # Deploy to Cloudflare Pages
```

## 📁 Project Structure

```
VodTinker-Webpage-main/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── About.tsx     # About section
│   │   ├── Contact.tsx   # Contact section
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── Projects.tsx  # Projects showcase
│   │   └── Skills.tsx    # Skills display
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.tsx
│   ├── layouts/          # Astro layouts
│   │   └── Layout.astro
│   ├── pages/            # Astro pages (routes)
│   │   ├── index.astro   # Home page
│   │   └── api/          # API routes
│   ├── utils/            # Utility functions
│   │   ├── translations.ts
│   │   ├── animations.ts
│   │   └── projectsData.ts
│   └── index.css         # Global styles
├── public/               # Static assets
├── functions/            # Cloudflare Functions
│   └── api/
│       └── openai-chat.js
├── astro.config.mjs      # Astro configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Key Features Explained

### Theme System
The website features an advanced theme system that:
- Detects system preferences automatically
- Persists user choice in localStorage
- Smoothly transitions between themes
- Supports light, dark, and system modes

### Multilingual Support
Full internationalization with:
- Language detection based on browser settings
- Manual language switching
- All content translated (English/Spanish)
- Persistent language preference

### AI Chat Assistant
Interactive chatbot that:
- Answers questions about the portfolio
- Provides information about projects and skills
- Uses OpenAI's GPT model
- Includes command system (type `/help`)

### Responsive Design
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly interactions
- Optimized images for different screen sizes

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# OpenAI API (for chat feature)
OPENAI_API_KEY=your_openai_api_key

# EmailJS (for contact form)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
```

### Customization

#### Update Personal Information
Edit `src/utils/translations.ts` to update:
- Personal bio and description
- Skills and technologies
- Contact information
- Social media links

#### Update Projects
Edit `src/utils/projectsData.ts` to add or modify projects:
```typescript
export const projects = [
  {
    title: "Project Name",
    description: "Project description",
    technologies: ["React", "TypeScript"],
    image: "/path/to/image.jpg",
    github: "https://github.com/...",
    demo: "https://demo-url.com"
  }
];
```

#### Modify Theme Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: "your-color",
      secondary: "your-color",
      // ...
    }
  }
}
```

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

Or connect your GitHub repository to Cloudflare Pages for automatic deployments.

### Other Platforms

The site is compatible with:
- **Vercel** - `vercel deploy`
- **Netlify** - `netlify deploy`
- **GitHub Pages** - Static site deployment
- **Any static hosting** - Upload the `dist/` folder

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Daniel Fonov (VodTinker)**

- GitHub: [@VodTinker](https://github.com/VodTinker)
- LinkedIn: [Daniel Fonov](https://www.linkedin.com/in/daniel-fonov-b897a82b3/)
- Portfolio: [vodtinker.dev](https:/vodtinker.dev)

## 🙏 Acknowledgments

- [Astro](https://astro.build) for the amazing static site generator
- [React](https://react.dev) for the UI framework
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [OpenAI](https://openai.com) for the AI capabilities
- All open-source contributors who made this possible

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an [issue](https://github.com/VodTinker/VodTinker-Webpage/issues)
- Send an email to danielfonov71@vodtinker.dev
- Connect on [LinkedIn](https://www.linkedin.com/in/daniel-fonov-b897a82b3/)

---

⭐ If you like this project, please give it a star on GitHub!
