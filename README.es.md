# 🚀 VodTinker - Sitio Web Portfolio

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-5.15.3-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

> 🌍 Español | [English](./README.md)

Un moderno sitio web de portfolio multilingüe construido con Astro, React y TypeScript. Incluye animaciones interactivas, un asistente de chat con IA, cambio de tema claro/oscuro y diseño responsivo optimizado para todos los dispositivos.

## ✨ Características

- 🎨 **UI/UX Moderna** - Diseño limpio y profesional con animaciones suaves
- 🌓 **Tema Claro/Oscuro** - Cambio automático y manual con detección de preferencias del sistema
- 🌐 **Multilingüe** - Soporte completo para inglés y español con i18next
- 💬 **Asistente de Chat IA** - Chatbot interactivo potenciado por OpenAI
- 📱 **Totalmente Responsivo** - Diseño mobile-first que funciona en todos los dispositivos
- ⚡ **Optimizado para Rendimiento** - Construido con Astro para tiempos de carga ultrarrápidos
- 🎭 **Animaciones Suaves** - Animaciones profesionales usando Framer Motion y Anime.js
- 🔍 **Amigable con SEO** - Optimizado para motores de búsqueda
- ♿ **Accesible** - Compatible con WCAG y HTML semántico

## 🛠️ Stack Tecnológico

### Tecnologías Principales
- **[Astro](https://astro.build)** (v5.15.3) - Generador de sitios estáticos
- **[React](https://react.dev)** (v18.3.1) - Framework de UI
- **[TypeScript](https://www.typescriptlang.org/)** (v5.6.2) - JavaScript con tipado seguro
- **[Tailwind CSS](https://tailwindcss.com)** (v3.4.17) - Framework CSS utility-first

### Librerías Adicionales
- **Framer Motion** - Animaciones avanzadas
- **Anime.js** - Librería de animaciones ligera
- **React Icons** - Librería de iconos
- **i18next** - Internacionalización
- **OpenAI API** - Chat potenciado por IA
- **AOS** - Librería Animate On Scroll

### Herramientas de Desarrollo
- **Biome** - Linter y formateador rápido
- **ESLint** - Linting de código
- **Cloudflare Pages** - Plataforma de despliegue

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 18+ o **Bun** (recomendado)
- **npm**, **pnpm**, **yarn**, o **bun**

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/VodTinker/VodTinker-Webpage.git
   cd VodTinker-Webpage
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` y añade tus claves API:
   - `OPENAI_API_KEY` - Para la funcionalidad de chat IA
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_USER_ID` - Para formulario de contacto

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   bun run dev
   ```

5. **Abrir tu navegador**
   Navega a `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo en puerto 3000
npm run build        # Construir para producción
npm run build:clean  # Construcción limpia (elimina caché)
npm run preview      # Previsualizar construcción de producción
npm run lint         # Verificar código con Biome y Astro check
npm run format       # Formatear código con Biome
npm run deploy       # Desplegar a Cloudflare Pages
```

## 📁 Estructura del Proyecto

```
VodTinker-Webpage-main/
├── src/
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes UI reutilizables
│   │   ├── About.tsx     # Sección Acerca de
│   │   ├── Contact.tsx   # Sección Contacto
│   │   ├── Hero.tsx      # Sección Hero
│   │   ├── Navbar.tsx    # Barra de navegación
│   │   ├── Projects.tsx  # Showcase de proyectos
│   │   └── Skills.tsx    # Muestra de habilidades
│   ├── contexts/         # Contextos React
│   │   └── LanguageContext.tsx
│   ├── layouts/          # Layouts Astro
│   │   └── Layout.astro
│   ├── pages/            # Páginas Astro (rutas)
│   │   ├── index.astro   # Página principal
│   │   └── api/          # Rutas API
│   ├── utils/            # Funciones utilitarias
│   │   ├── translations.ts
│   │   ├── animations.ts
│   │   └── projectsData.ts
│   └── index.css         # Estilos globales
├── public/               # Assets estáticos
├── functions/            # Funciones Cloudflare
│   └── api/
│       └── openai-chat.js
├── astro.config.mjs      # Configuración Astro
├── tailwind.config.js    # Configuración Tailwind CSS
├── tsconfig.json         # Configuración TypeScript
└── package.json          # Dependencias y scripts
```

## 🎨 Características Principales Explicadas

### Sistema de Temas
El sitio web cuenta con un sistema de temas avanzado que:
- Detecta preferencias del sistema automáticamente
- Persiste la elección del usuario en localStorage
- Transiciona suavemente entre temas
- Soporta modos claro, oscuro y sistema

### Soporte Multilingüe
Internacionalización completa con:
- Detección de idioma basada en configuración del navegador
- Cambio manual de idioma
- Todo el contenido traducido (Inglés/Español)
- Preferencia de idioma persistente

### Asistente de Chat IA
Chatbot interactivo que:
- Responde preguntas sobre el portfolio
- Proporciona información sobre proyectos y habilidades
- Usa el modelo GPT de OpenAI
- Incluye sistema de comandos (escribe `/help`)

### Diseño Responsivo
- Enfoque mobile-first
- Breakpoints para todos los tamaños de dispositivo
- Interacciones táctiles amigables
- Imágenes optimizadas para diferentes tamaños de pantalla

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# API OpenAI (para funcionalidad de chat)
OPENAI_API_KEY=tu_clave_api_openai

# EmailJS (para formulario de contacto)
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_USER_ID=tu_user_id
```

### Personalización

#### Actualizar Información Personal
Edita `src/utils/translations.ts` para actualizar:
- Biografía personal y descripción
- Habilidades y tecnologías
- Información de contacto
- Enlaces de redes sociales

#### Actualizar Proyectos
Edita `src/utils/projectsData.ts` para añadir o modificar proyectos:
```typescript
export const projects = [
  {
    title: "Nombre del Proyecto",
    description: "Descripción del proyecto",
    technologies: ["React", "TypeScript"],
    image: "/ruta/a/imagen.jpg",
    github: "https://github.com/...",
    demo: "https://url-demo.com"
  }
];
```

#### Modificar Colores del Tema
Edita `tailwind.config.js` para personalizar el esquema de colores:
```javascript
theme: {
  extend: {
    colors: {
      primary: "tu-color",
      secondary: "tu-color",
      // ...
    }
  }
}
```

## 🚀 Despliegue

### Cloudflare Pages (Recomendado)

1. **Construir el proyecto**
   ```bash
   npm run build
   ```

2. **Desplegar**
   ```bash
   npm run deploy
   ```

O conecta tu repositorio GitHub a Cloudflare Pages para despliegues automáticos.

### Otras Plataformas

El sitio es compatible con:
- **Vercel** - `vercel deploy`
- **Netlify** - `netlify deploy`
- **GitHub Pages** - Despliegue de sitio estático
- **Cualquier hosting estático** - Sube la carpeta `dist/`

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestras [Guías de Contribución](CONTRIBUTING.md) primero.

1. Haz fork del repositorio
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Confirma tus cambios (`git commit -m 'Añadir alguna CaracteristicaIncreible'`)
4. Empuja a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Daniel Fonov (VodTinker)**

- GitHub: [@VodTinker](https://github.com/VodTinker)
- LinkedIn: [Daniel Fonov](https://linkedin.com/in/tu-perfil)
- Portfolio: [vodtinker.dev](https://tu-url-portfolio.com)

## 🙏 Agradecimientos

- [Astro](https://astro.build) por el increíble generador de sitios estáticos
- [React](https://react.dev) por el framework de UI
- [Tailwind CSS](https://tailwindcss.com) por el sistema de estilos
- [OpenAI](https://openai.com) por las capacidades de IA
- Todos los contribuidores de código abierto que hicieron esto posible

## 📧 Contacto

¿Tienes preguntas o sugerencias? No dudes en:
- Abrir un [issue](https://github.com/VodTinker/VodTinker-Webpage/issues)
- Enviar un email a tu-email@example.com
- Conectar en [LinkedIn](https://linkedin.com/in/tu-perfil)

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!
